import axiosInstance from '../../api/axiosInstance';

export const loginUser = async (values) => {
  const response = await axiosInstance.post('/auth/login', values);
  return response.data;
};

export const registerUser = async (values) => {
  const response = await axiosInstance.post('/auth/register', values);
  return response.data;
};

// Fetch current user info from backend
export const fetchCurrentUser = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};
