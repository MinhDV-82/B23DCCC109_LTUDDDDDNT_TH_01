export function validateAssignmentForm(title: string, dueDate: string) {
  const errors: { title?: string; dueDate?: string } = {};

  if (!title || title.trim() === '') {
    errors.title = 'Tiêu đề bài tập không được để trống.';
  }

  if (!dueDate || dueDate.trim() === '') {
    errors.dueDate = 'Vui lòng chọn hạn nộp bài tập.';
  } else {
    const dueTime = new Date(dueDate).getTime();
    if (isNaN(dueTime)) {
      errors.dueDate = 'Định dạng hạn nộp không hợp lệ.';
    } else if (dueTime < Date.now()) {
      errors.dueDate = 'Hạn nộp không được ở trong quá khứ.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}