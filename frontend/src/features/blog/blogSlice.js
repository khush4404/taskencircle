import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBlogs, fetchBlogById, createBlog, updateBlog, deleteBlog } from './blogAPI';

export const getBlogs = createAsyncThunk('blog/getBlogs', async () => {
  return await fetchBlogs();
});

export const getBlogById = createAsyncThunk('blog/getBlogById', async (id) => {
  return await fetchBlogById(id);
});

export const addBlog = createAsyncThunk('blog/addBlog', async (data) => {
  return await createBlog(data);
});

export const editBlog = createAsyncThunk('blog/editBlog', async ({ id, data }) => {
  return await updateBlog(id, data);
});

export const removeBlog = createAsyncThunk('blog/removeBlog', async (id) => {
  return await deleteBlog(id);
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    blog: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBlog(state) {
      state.blog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.blog = action.payload;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((b) => (b._id === action.payload._id ? action.payload : b));
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload._id);
      });
  },
});

export const { clearBlog } = blogSlice.actions;
export default blogSlice.reducer;
