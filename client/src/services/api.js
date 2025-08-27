import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for unified error formatting
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customMessage = error.response?.data?.error || error.message || 'API Communication Failure';
    return Promise.reject(new Error(customMessage));
  }
);

// Course API endpoints
export const fetchCourses = (params) => apiClient.get('/courses', { params });
export const fetchCourseById = (id) => apiClient.get(`/courses/${id}`);
export const createCourse = (payload) => apiClient.post('/courses', payload);
export const updateCourse = (id, payload) => apiClient.put(`/courses/${id}`, payload);
export const deleteCourse = (id) => apiClient.delete(`/courses/${id}`);

// Lesson API endpoints
export const fetchLessons = (courseId) => apiClient.get('/lessons', { params: { courseId } });
export const createLesson = (payload) => apiClient.post('/lessons', payload);
export const deleteLesson = (id) => apiClient.delete(`/lessons/${id}`);

// Enrollment API endpoints
export const fetchEnrollments = (params) => apiClient.get('/enrollments', { params });
export const createEnrollment = (payload) => apiClient.post('/enrollments', payload);
export const updateProgress = (id, progressPercentage) => apiClient.patch(`/enrollments/${id}`, { progressPercentage });
export const deleteEnrollment = (id) => apiClient.delete(`/enrollments/${id}`);
export const exportEnrollmentsCsvUrl = `${API_BASE_URL}/enrollments/export/csv`;

// Analytics API endpoints
export const fetchStats = () => apiClient.get('/stats');

export default apiClient;
