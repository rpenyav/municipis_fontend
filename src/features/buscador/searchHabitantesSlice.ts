import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchHabitantesState {
  selectedHabitantes: string;
}

const initialState: SearchHabitantesState = {
  selectedHabitantes: "",
};

export const searchHabitantesSlice = createSlice({
  name: "searchHabitantes",
  initialState,
  reducers: {
    setSelectedHabitantes: (state, action: PayloadAction<string>) => {
      state.selectedHabitantes = action.payload;
    },
  },
});

export const { setSelectedHabitantes } = searchHabitantesSlice.actions;

export default searchHabitantesSlice.reducer;
