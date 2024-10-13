import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './globalSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    filData:itemsReducer,
    price:itemsReducer,
    isLogin:itemsReducer,
    searchVal: itemsReducer,
    currClick:itemsReducer
  },
});

export default store;
