import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Comarca } from "../../models/municipio.interface";

interface SearchComarcaState {
  selectedComarca: number | null;
  selectedNomComarca: string | null;
  selectedIdProvComarca: number | null;
  comarcas: Comarca[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SearchComarcaState = {
  selectedComarca: null,
  selectedNomComarca: "",
  selectedIdProvComarca: null,
  comarcas: [],
  status: "idle",
  error: null,
};

export const fetchComarcas = createAsyncThunk(
  "comarcas/fetchComarcas",
  async () => {
    const response = await axios.get<Comarca[]>(
      `${process.env.REACT_APP_BACKEND_URL}/comarcas`
    );
    return response.data;
  }
);

export const searchComarcaSlice = createSlice({
  name: "searchComarca",
  initialState,
  reducers: {
    setSelectedComarca: (
      state,
      action: PayloadAction<{
        idcomarca: number;
        idprovincia: number;
        nom: string;
      } | null>
    ) => {
      state.selectedComarca = action.payload?.idcomarca || null;
      state.selectedIdProvComarca = action.payload?.idprovincia || null;
      state.selectedNomComarca = action.payload?.nom || null;
    },
    setSelectedNomComarca: (state, action: PayloadAction<string | null>) => {
      state.selectedNomComarca = action.payload;
      console.log("MIOCMA", state.selectedNomComarca);
    },

    setSelectedIdProvComarca: (state, action: PayloadAction<number | null>) => {
      state.selectedIdProvComarca = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComarcas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchComarcas.fulfilled,
        (state, action: PayloadAction<Comarca[]>) => {
          state.status = "succeeded";
          state.comarcas = action.payload;
        }
      )
      .addCase(fetchComarcas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const {
  setSelectedComarca,
  setSelectedNomComarca,
  setSelectedIdProvComarca,
} = searchComarcaSlice.actions;

export default searchComarcaSlice.reducer;
