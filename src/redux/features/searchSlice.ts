import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ISearchState {
  searchTerm: string;
}
const initialState: ISearchState = {
  searchTerm: "",
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export const searchTerm = (state: RootState) => state.search.searchTerm;
export const searchReducer = searchSlice.reducer;
