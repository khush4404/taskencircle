import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentUser } from './authAPI';

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
  return await fetchCurrentUser();
});
