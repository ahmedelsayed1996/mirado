import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getReviewINS = createAsyncThunk("getReviewINS/fetchGetReviewINS", async (parameter: any) => {
    const { limit, institute_branch_id, language } = parameter;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/institute-reviews?limit=${limit || "20"}&page=1&institute_branch_id=${institute_branch_id}`, {
        method: 'GET',
        headers: {
            "Accept-Language": language,
        },
    })
    const result = await res.json();
    // console.log("Review Slice", result);

    return result;
})

const reviewINSSlice = createSlice({
    name: 'reviewINSSlice',
    initialState: {

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReviewINS.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getReviewINS.fulfilled, (state: any, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(getReviewINS.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export const { } = reviewINSSlice.actions;
export default reviewINSSlice.reducer;