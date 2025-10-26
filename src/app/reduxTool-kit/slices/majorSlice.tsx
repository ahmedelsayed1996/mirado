import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllMajors = createAsyncThunk("MajorsSlice/fetchCourses", async (parameter: any) => {
    const { language } = parameter;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/majors?limit=9000&page=1`, {
        method: 'GET',
        headers: {
            "Accept-Language": language,
        },
    })
    const result = await res.json();
    return result;
})


const majorsSlice = createSlice({
    name: "majorsSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMajors.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllMajors.fulfilled, (state: any, action) => {
                state.loading = false;
                state.majors = action.payload;
            })
            .addCase(getAllMajors.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})
export const { } = majorsSlice.actions;
export default majorsSlice.reducer;