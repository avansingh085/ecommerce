import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filData: [],
  items: [],
  searchVal: "",
  price: 0,
  isLogin: false, // Set to default, update after login check
  selectedItem: null,
  currClick: {},
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    UpdateFilData: (state, action) => {
      state.filData = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setCurrentClick: (state, action) => {
      state.currClick = action.payload;
    },
    setSearch: (state, action) => {
      state.searchVal = action.payload;
    },
    updatePrice: (state, action) => {
      state.price += parseInt(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    selectItem: (state, action) => {
      state.selectedItem = state.items.find(item => item.id === action.payload) || null;
    },
  },
});

export const { setCurrentClick, addItem, removeItem, selectItem, UpdateFilData, updatePrice, setLogin, setSearch } = itemsSlice.actions;
export default itemsSlice.reducer;
