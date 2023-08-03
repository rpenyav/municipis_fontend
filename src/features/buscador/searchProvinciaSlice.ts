// features/searchProvincia/searchProvinciaSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchProvinciaState {
  selectedProvince: string;
}

const initialState: SearchProvinciaState = {
  selectedProvince: "",
};

export const searchProvinciaSlice = createSlice({
  name: "searchProvincia",
  initialState,
  reducers: {
    setSelectedProvince: (state, action: PayloadAction<string>) => {
      state.selectedProvince = action.payload;
    },
  },
});

export const { setSelectedProvince } = searchProvinciaSlice.actions;

export default searchProvinciaSlice.reducer;
