import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";

export const getAllRequests = createAsyncThunk(
  "RequestSlice/fetchRequest",
  async (parameter: any) => {
    const { tokenMainSite } = parseCookies();
    const { language } = parameter;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/orders`,
      {
        method: "GET",
        headers: {
          "Accept-Language": language,
          Authorization: `Bearer ${tokenMainSite}`,
        },
      }
    );
    const result = await res.json();
    return result;
  }
);

const requestSlice = createSlice({
  name: "requestSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRequests.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getAllRequests.fulfilled, (state: any, action) => {
        state.loading = false;
        state.request = action.payload;
      })
      .addCase(getAllRequests.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = requestSlice.actions;
export default requestSlice.reducer;
