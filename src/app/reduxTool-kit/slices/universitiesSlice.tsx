import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";


export const getAllUniversities = createAsyncThunk("universitiesSlice/fetchUniversities", async (parameter: any) => {
  const { page, search, country, state, city, majors, fields, language, recommended, limt, userId, academic_degree, rating } = parameter;
  const { tokenMainSite } = parseCookies();
  console.log(search);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/universities?limit=${limt || "10"}&searchTerm=${search || ""}&country_id=${country || ""}&state_id=${state || ""}&city_id=${city || ""}&major_id=${majors || ""}&field_id=${fields || ""}&page=${page || "1"}${recommended == "true" ? `&recommend=${recommended}` : ""}${userId ? `&user_id=${userId}` : ""}${academic_degree ? `&academic_degree=${academic_degree}` : ""}${rating ? `&rating=${rating}` : ""}`, {
    method: 'GET',
    headers: {
      "Accept-Language": language,
      Authorization: `Bearer ${tokenMainSite || ""}`
    },
  })
  const result = await res.json();
  return result;
})

const universitiesSlice = createSlice({
  name: "universitiesSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUniversities.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getAllUniversities.fulfilled, (state: any, action) => {
        state.loading = false;
        state.universities = action.payload;
      })
      .addCase(getAllUniversities.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
})

export const { } = universitiesSlice.actions;
export default universitiesSlice.reducer;