import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getAllBranches = createAsyncThunk("branchesSlice/fetchBranches", async (parameter: any) => {
  const { locale, schoolsId, page, limit } = parameter;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/institutes-branches?limit=${limit ? limit : "12"}&page=${page || "1"}&instituteId=${schoolsId}`, {
    method: 'GET',
    headers: {
      "Accept-Language": locale,
    },
  })
  const result = await res.json();
  return result;
})

const branchesSlice = createSlice({
  name: "branchesSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBranches.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getAllBranches.fulfilled, (state: any, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(getAllBranches.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
})

export const { } = branchesSlice.actions;
export default branchesSlice.reducer