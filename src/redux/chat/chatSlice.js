// src/redux/chat/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/config'; // مسیر به api

// Async thunk برای بارگذاری چت‌ها
export const fetchChats = createAsyncThunk('chat/fetchChats', async () => {
  const response = await api.get('/channels');
  return response.data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.channels = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer;
