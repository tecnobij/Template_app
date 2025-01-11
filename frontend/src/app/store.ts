import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from '../features/imagesSlice';
import categoryReducer from '../features/categorySlice';
const store = configureStore({
  reducer: {
    category: categoryReducer,

    images: imagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
