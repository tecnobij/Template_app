import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchImagesFromSlider = createAsyncThunk(
  'images/fetchImagesFromSlider',
  async (
    { page, search }: { page: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6',
      });
      if (search) {
        params.append('search', search);
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/V1/images/images/slider?${params.toString()}`
      );
      return {
        data: response.data.data,
        hasMore: response.data.hasMore,
        hasMore_search: response.data.hasMore_search,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch images'
      );
    }
  }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [] as any[],
    loading: false,
    error: null as string | null,
    hasMore: true,
    hasMore_search: true,
    page: 1,
    search: '',
  },
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
      state.images = [];
      state.hasMore_search = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesFromSlider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImagesFromSlider.fulfilled, (state, action) => {
        state.loading = false;
        state.images = [...state.images, ...action.payload.data]
        state.hasMore = action.payload.hasMore;
        state.hasMore_search = action.payload.hasMore_search;
      })
      .addCase(fetchImagesFromSlider.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Failed to fetch images';
      });
  },
});

export const { incrementPage, setSearch } = imagesSlice.actions;

export default imagesSlice.reducer;
