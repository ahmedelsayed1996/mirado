import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllStates = createAsyncThunk("statesSlice/fetchCourses", async (parameter: any) => {
    const { language,countryId } = parameter;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/states?limit=1000&page=1&countryId=${countryId}&format=true`, {
        method: 'GET',
        headers: {
            "Accept-Language": language,
        },
    })
    const result = await res.json();
    return result;
})


const statesSlice = createSlice({
    name: "statesSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllStates.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllStates.fulfilled, (state: any, action) => {
                state.loading = false;
                state.states = action.payload;
            })
            .addCase(getAllStates.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})
export const { } = statesSlice.actions;
export default statesSlice.reducer;