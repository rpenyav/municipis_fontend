import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchVegueriaState {
  selectedVegueria: string;
}

const initialState: SearchVegueriaState = {
  selectedVegueria: "",
};

export const searchVegueriaSlice = createSlice({
  name: "searchVegueria",
  initialState,
  reducers: {
    setSelectedVegueria: (state, action: PayloadAction<string>) => {
      state.selectedVegueria = action.payload;
    },
  },
});

export const { setSelectedVegueria } = searchVegueriaSlice.actions;

export default searchVegueriaSlice.reducer;
