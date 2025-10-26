import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCountries = createAsyncThunk(
  "countriesSlice/fetchCountries",
  async (parameter: { language: string; entity:string}) => {
    const { language, entity } = parameter;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/countries?limit=9000&page=1&entity=${entity}`,
      {
        method: "GET",
        headers: {
          "Accept-Language": language,
        },
      }
    );

    const result = await res.json();
    return result;
  }
);

const countriesSlice = createSlice({
  name: "countriesSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getAllCountries.fulfilled, (state: any, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(getAllCountries.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = countriesSlice.actions;
export default countriesSlice.reducer;
