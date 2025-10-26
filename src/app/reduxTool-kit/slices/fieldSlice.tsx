import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllFields = createAsyncThunk("FieldsSlice/fetchFields", async (parameter: any) => {
    const { language, idMajor } = parameter;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/fields`, {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/majors/${idMajor}`, {
        method: 'GET',
        headers: {
            "Accept-Language": language,
        },
    })
    const result = await res.json();
    return result;
})


const fieldsSlice = createSlice({
    name: "fieldsSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllFields.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllFields.fulfilled, (state: any, action) => {
                state.loading = false;
                state.fields = action.payload;
            })
            .addCase(getAllFields.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})
export const { } = fieldsSlice.actions;
export default fieldsSlice.reducer;