import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Provincia } from "../../models/municipio.interface";

interface SearchProvinciaState {
  selectedProvincia: number | null;
  selectedNomProvincia: string | null;
  provincias: Provincia[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SearchProvinciaState = {
  selectedProvincia: null,
  selectedNomProvincia: "",
  provincias: [],
  status: "idle",
  error: null,
};

export const fetchProvincias = createAsyncThunk(
  "provincias/fetchProvincias",
  async () => {
    const response = await axios.get<Provincia[]>(
      `${process.env.REACT_APP_BACKEND_URL}/provincias`
    );
    return response.data;
  }
);

export const searchProvinciaSlice = createSlice({
  name: "searchProvincia",
  initialState,
  reducers: {
    setSelectedProvincia: (
      state,
      action: PayloadAction<{ idprovincia: number; nom: string } | null>
    ) => {
      state.selectedProvincia = action.payload?.idprovincia || null;
      state.selectedNomProvincia = action.payload?.nom || null;
    },
    setSelectedNomProvincia: (state, action: PayloadAction<string | null>) => {
      state.selectedNomProvincia = action.payload;
      console.log("MIOCMAPROINCI", state.selectedNomProvincia);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvincias.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProvincias.fulfilled,
        (state, action: PayloadAction<Provincia[]>) => {
          state.status = "succeeded";
          state.provincias = action.payload;
        }
      )
      .addCase(fetchProvincias.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const { setSelectedProvincia, setSelectedNomProvincia } =
  searchProvinciaSlice.actions;

export default searchProvinciaSlice.reducer;
