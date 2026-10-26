# THỰC HÀNH 4: ỨNG DỤNG QUẢN LÝ HỌC TẬP - API & OFFLINE MODE

## 1. Giới thiệu tổng quan
Ứng dụng Quản lý học tập hỗ trợ đầy đủ chế độ trực tuyến và ngoại tuyến:
- Kết nối REST API qua mock server (json-server).
- Bộ nhớ đệm dữ liệu ngoại tuyến bằng AsyncStorage theo chiến lược Stale-While-Revalidate (Cache-first).
- Hàng đợi thao tác ngoại tuyến (Outbox Queue) cho phép thêm/sửa dữ liệu khi mất kết nối mạng.
- Tự động đồng bộ khi có kết nối mạng trở lại, xử lý xung đột dữ liệu dựa trên mốc thời gian (updatedAt).
- Tính điểm trung bình tích lũy hệ 4 (GPA) theo trọng số tín chỉ.

---

## 2. Hướng dẫn cài đặt và khởi chạy

### Yêu cầu môi trường
- Node.js >= 18
- Android SDK và máy ảo Android Emulator
- json-server

### Bước 1: Cài đặt phụ thuộc
```bash
npm install
```

### Bước 2: Khởi động Mock API Server
Khởi chạy json-server với độ trễ 800ms trên cổng 3001:
```bash
npx json-server --watch db.json --port 3001 --delay 800
```

### Bước 3: Thiết lập kết nối mạng trên máy ảo Android
Chuyển tiếp cổng kết nối từ máy ảo về máy chủ phát triển:
```bash
adb reverse tcp:3001 tcp:3001
adb reverse tcp:8081 tcp:8081
```

### Bước 4: Khởi chạy ứng dụng React Native
```bash
npm start
# Mở một terminal mới:
npm run android
```

---

## 3. Sơ đồ luồng dữ liệu (Data Flow Diagram)

### Luồng đọc dữ liệu (Query Flow)
```
Màn hình (Screen)
       │
       ▼
Custom Hook (useCachedQuery / useAppData)
       │
       ├───> AsyncStorage (Cache-First: hiển thị dữ liệu đã lưu ngay lập tức)
       │
       └───> Service API (Gọi ngầm để lấy dữ liệu mới nhất)
                 │
                 ▼
             HTTP Client (AbortController timeout 10s)
                 │
                 ▼
             Mock API (json-server)
                 │
                 ▼
             Cập nhật lại Cache & Render lại Màn hình
```

### Luồng ghi dữ liệu (Mutation Flow)
```
Màn hình (Screen)
       │
       ▼
Thực hiện thao tác (Đổi trạng thái bài tập / Thêm bài / Sửa hồ sơ)
       │
       ├─── Trạng thái mạng: ONLINE
       │         │
       │         ├───> Cập nhật UI lập tức (Optimistic Update)
       │         ├───> Gọi Service API gửi lên Server
       │         └───> Ghi đè Cache AsyncStorage nếu thành công
       │
       └─── Trạng thái mạng: OFFLINE
                 │
                 ├───> Cập nhật UI lập tức kèm nhãn "Chưa đồng bộ"
                 ├───> Đẩy thao tác vào Outbox Queue (AsyncStorage)
                 └───> Khi NetInfo báo Online trở lại:
                           │
                           ▼
                       useOutboxSync tự động gửi tuần tự Outbox lên Server
```

---

## 4. Cơ chế xử lý xung đột dữ liệu (Conflict Resolution)
Ứng dụng áp dụng quy tắc Last-Write-Wins có kiểm tra dấu thời gian (Timestamp Check):
1. Mỗi bản ghi hỗ trợ chỉnh sửa (Sinh viên, Bài tập) đều có trường `updatedAt` theo chuẩn ISO 8601.
2. Khi thiết bị ngoại tuyến thực hiện chỉnh sửa, thao tác được lưu trong Outbox kèm theo `updatedAt` tại thời điểm chỉnh sửa ngoại tuyến.
3. Khi có mạng trở lại, hook `useOutboxSync` thực hiện đồng bộ:
   - Lấy dữ liệu hiện tại trên server về để đối chiếu.
   - Nếu `server.updatedAt > localAction.body.updatedAt`: Có xung đột dữ liệu (bản ghi trên server đã bị thay đổi bởi phiên khác sau thời điểm thiết bị này sửa ngoại tuyến).
   - Hệ thống hiển thị thông báo cảnh báo xung đột (Conflict Alert) cho người dùng, hủy thao tác ghi đè cục bộ và nạp lại dữ liệu mới nhất từ server.
   - Nếu không có xung đột (`server.updatedAt <= localAction.body.updatedAt`): Thực hiện gửi yêu cầu PATCH lên server và xóa thao tác khỏi hàng đợi Outbox.

---

## 5. Danh sách 7 kịch bản kiểm thử bắt buộc

1. **Kịch bản 1**: Tắt json-server rồi mở ứng dụng lần đầu (khi chưa có cache).
   - Kết quả: Hiển thị giao diện thông báo lỗi kết nối mạng có nút "Thử lại", ứng dụng không bị dừng đột ngột (crash).
2. **Kịch bản 2**: Mở ứng dụng khi có mạng để nạp dữ liệu, bật chế độ máy bay, tắt ứng dụng và mở lại.
   - Kết quả: Dữ liệu tải từ cache AsyncStorage hiển thị đầy đủ, xuất hiện thanh thông báo Offline và thời điểm cập nhật lần cuối.
3. **Kịch bản 3**: Trong khi Offline, tích hoàn thành 2 bài tập và thêm 1 bài tập mới.
   - Kết quả: Giao diện cập nhật ngay lập tức (Optimistic Update), các bài tập liên quan hiển thị nhãn "Chưa đồng bộ", badge thông báo số lượng chưa đồng bộ xuất hiện.
4. **Kịch bản 4**: Tắt chế độ máy bay (kết nối mạng trở lại).
   - Kết quả: Hệ thống tự động kích hoạt tiến trình đồng bộ, nhãn "Chưa đồng bộ" biến mất, file `db.json` được cập nhật đúng các thay đổi.
5. **Kịch bản 5**: Khi Offline sửa thông tin sinh viên; đồng thời sửa trực tiếp file `db.json` với `updatedAt` mới hơn thời điểm sửa ngoại tuyến; bật lại mạng.
   - Kết quả: Ứng dụng phát hiện xung đột, hiển thị hộp thoại cảnh báo và ưu tiên giữ dữ liệu mới hơn từ server.
6. **Kịch bản 6**: Tìm kiếm môn học không tồn tại hoặc chọn học kỳ không có môn học.
   - Kết quả: Hiển thị trạng thái rỗng (EmptyState) với thông điệp rõ ràng.
7. **Kịch bản 7**: Kéo để làm mới (Pull-to-refresh) trên các danh sách môn học, lịch học, bài tập.
   - Kết quả: Hiển thị vòng xoay đang tải và dữ liệu được nạp lại mới nhất từ máy chủ.
