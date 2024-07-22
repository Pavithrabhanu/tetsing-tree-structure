import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  treeData: [],
  highlightedNodes: [],
  additionalData: null,
  theme: 'light', // default theme
};

// Create slice
const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    setTreeData(state, action) {
      state.treeData = action.payload;
    },
    setHighlightedNodes(state, action) {
      state.highlightedNodes = action.payload;
    },
    setAdditionalData(state, action) {
      state.additionalData = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setTreeData,
  setHighlightedNodes,
  setAdditionalData,
  setTheme,
} = treeSlice.actions;

export default treeSlice.reducer;
