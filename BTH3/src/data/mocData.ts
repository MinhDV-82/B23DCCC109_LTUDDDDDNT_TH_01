import { Student, Subject, ScheduleItem, Assignment, GradeItem } from '../types';

// 1. Thông tin sinh viên mặc định
export const initialStudent: Student = {
  id: '20210001',
  name: 'Nguyễn Văn Minh',
  class: 'CNTT-K64',
  major: 'Công nghệ thông tin',
  email: 'minh.nv@example.edu.vn',
  phone: '0987654321',
};

// 2. Danh sách môn học đang học
export const mockSubjects: Subject[] = [
  {
    id: 'INT3120',
    name: 'Phát triển ứng dụng di động',
    credits: 3,
    lecturer: 'ThS. Nguyễn Văn A',
    room: 'A2-301',
    description: 'Học lập trình ứng dụng đa nền tảng với React Native, Navigation, State Management.',
  },
  {
    id: 'INT3115',
    name: 'Công nghệ phần mềm',
    credits: 3,
    lecturer: 'TS. Trần Thị B',
    room: 'A2-205',
    description: 'Quy trình Agile/Scrum, thiết kế kiến trúc hệ thống và kiểm thử phần mềm.',
  },
  {
    id: 'INT3104',
    name: 'Cơ sở dữ liệu nâng cao',
    credits: 4,
    lecturer: 'PGS. TS. Lê Văn C',
    room: 'B1-102',
    description: 'Tối ưu hóa truy vấn SQL, NoSQL và thiết kế cơ sở dữ liệu phân tán.',
  },
  {
    id: 'INT3130',
    name: 'Trí tuệ nhân tạo',
    credits: 3,
    lecturer: 'TS. Phạm Hoàng D',
    room: 'C3-404',
    description: 'Các thuật toán tìm kiếm, Machine Learning cơ bản và xử lý ngôn ngữ tự nhiên.',
  },
];

// 3. Thời khóa biểu trong tuần
export const mockSchedules: ScheduleItem[] = [
  {
    id: 'SCH01',
    subjectId: 'INT3120',
    subjectName: 'Phát triển ứng dụng di động',
    dayOfWeek: 'Thứ 2',
    time: '07:00 - 09:30',
    room: 'A2-301',
    lecturer: 'ThS. Nguyễn Văn A',
    lessonContent: 'Thực hành React Navigation kết hợp Bottom Tabs và Stack.',
  },
  {
    id: 'SCH02',
    subjectId: 'INT3115',
    subjectName: 'Công nghệ phần mềm',
    dayOfWeek: 'Thứ 3',
    time: '09:45 - 11:45',
    room: 'A2-205',
    lecturer: 'TS. Trần Thị B',
    lessonContent: 'Báo cáo Sprint 2 dự án nhóm.',
  },
  {
    id: 'SCH03',
    subjectId: 'INT3104',
    subjectName: 'Cơ sở dữ liệu nâng cao',
    dayOfWeek: 'Thứ 5',
    time: '13:00 - 15:30',
    room: 'B1-102',
    lecturer: 'PGS. TS. Lê Văn C',
    lessonContent: 'Index và tối ưu hóa câu lệnh truy vấn.',
  },
  {
    id: 'SCH04',
    subjectId: 'INT3130',
    subjectName: 'Trí tuệ nhân tạo',
    dayOfWeek: 'Thứ 6',
    time: '07:00 - 09:30',
    room: 'C3-404',
    lecturer: 'TS. Phạm Hoàng D',
    lessonContent: 'Thuật toán A* và bài toán Minimax trong trò chơi.',
  },
];

// 4. Danh sách bài tập
export const initialAssignments: Assignment[] = [
  {
    id: 'ASG01',
    subjectId: 'INT3120',
    subjectName: 'Phát triển ứng dụng di động',
    title: 'Hoàn thành Bài thực hành 3 (BTH3)',
    dueDate: '2026-10-18',
    isCompleted: false,
    description: 'Xây dựng ứng dụng quản lý học tập bằng React Native với 5 Tab và Stack Navigation.',
  },
  {
    id: 'ASG02',
    subjectId: 'INT3115',
    subjectName: 'Công nghệ phần mềm',
    title: 'Viết tài liệu SRS cho đồ án môn học',
    dueDate: '2026-10-22',
    isCompleted: true,
    description: 'Đặc tả yêu cầu chức năng và phi chức năng theo chuẩn IEEE.',
  },
  {
    id: 'ASG03',
    subjectId: 'INT3104',
    subjectName: 'Cơ sở dữ liệu nâng cao',
    title: 'Bài tập lớn: Thiết kế CSDL MongoDB',
    dueDate: '2026-10-25',
    isCompleted: false,
    description: 'Mô hình hóa dữ liệu dạng Document và viết aggregation pipeline.',
  },
];

// 5. Kết quả học tập (Bảng điểm)
export const mockGrades: GradeItem[] = [
  {
    subjectId: 'INT3120',
    subjectName: 'Phát triển ứng dụng di động',
    credits: 3,
    attendanceScore: 9.5,
    midtermScore: 8.5,
    finalScore: 9.0,
    averageScore: 8.9,
    letterGrade: 'A',
  },
  {
    subjectId: 'INT3115',
    subjectName: 'Công nghệ phần mềm',
    credits: 3,
    attendanceScore: 9.0,
    midtermScore: 7.5,
    finalScore: 8.0,
    averageScore: 8.0,
    letterGrade: 'B+',
  },
  {
    subjectId: 'INT3104',
    subjectName: 'Cơ sở dữ liệu nâng cao',
    credits: 4,
    attendanceScore: 8.5,
    midtermScore: 8.0,
    finalScore: 8.5,
    averageScore: 8.4,
    letterGrade: 'B+',
  },
  {
    subjectId: 'INT3130',
    subjectName: 'Trí tuệ nhân tạo',
    credits: 3,
    attendanceScore: 10.0,
    midtermScore: 9.0,
    finalScore: 9.2,
    averageScore: 9.3,
    letterGrade: 'A+',
  },
];