import axiosInstance from '../../api/axiosInstance';

export const fetchBlogs = async () => {
  const response = await axiosInstance.get('/blogs');
  return response.data;
};

export const fetchBlogById = async (id) => {
  const response = await axiosInstance.get(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (data) => {
  const response = await axiosInstance.post('/blogs', data);
  return response.data;
};

export const updateBlog = async (id, data) => {
  const response = await axiosInstance.put(`/blogs/${id}`, data);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axiosInstance.delete(`/blogs/${id}`);
  return response.data;
};
