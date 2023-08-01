import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Municipio } from "../../models/municipio.interface";

/**
 * Representa el estado de los municipios en el Redux store.
 */
interface MunicipiosState {
  municipios: Municipio[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

/**
 * Representa el estado inicial de los municipios en el Redux store.
 */
const initialState: MunicipiosState = {
  municipios: [],
  status: "idle",
  error: null,
};

/**
 * Acción asincrónica para buscar los municipios desde el backend.
 * Esta acción se despacha cuando necesitamos cargar los municipios en nuestra aplicación.
 */
export const fetchMunicipios = createAsyncThunk(
  "municipios/fetchMunicipios",
  async () => {
    const response = await axios.get<Municipio[]>(
      `${process.env.REACT_APP_BACKEND_URL}/municipis`
    );

    console.log("MIDAT", response.data);
    return response.data;
  }
);

/**
 * Slice para el estado de los municipios en el Redux store.
 * Esta slice maneja las acciones y los estados de los municipios en nuestra aplicación.
 */
export const municipiosSlice = createSlice({
  name: "municipios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * Maneja la acción `fetchMunicipios.pending` cuando la acción `fetchMunicipios` está pendiente.
     */
    builder.addCase(fetchMunicipios.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    /**
     * Maneja la acción `fetchMunicipios.fulfilled` cuando la acción `fetchMunicipios` se ha completado con éxito.
     */
    builder.addCase(
      fetchMunicipios.fulfilled,
      (state, action: PayloadAction<Municipio[]>) => {
        state.status = "succeeded";
        state.municipios = action.payload;
        state.error = null;
      }
    );

    /**
     * Maneja la acción `fetchMunicipios.rejected` cuando la acción `fetchMunicipios` ha fallado.
     */
    builder.addCase(fetchMunicipios.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Unknown error occurred";
    });
  },
});

/**
 * Exportamos el reducer de la slice de municipios para usarlo en nuestro Redux store.
 */
export default municipiosSlice.reducer;
