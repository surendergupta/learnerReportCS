export async function getDashboardData() {
  try {
    const response = await fetch("/api/dashboard");
    return await response.json();
  } catch (error) {
    return [];
  }
}
export async function getStudentDashboardData() {
  try {
    const response = await fetch("/api/studentinfo");
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function getUsers() {
  try {
    const response = await fetch("http://localhost:3000/student/getstudent");
    return await response.data.json();
  } catch (error) {
    return [];
  }
}
