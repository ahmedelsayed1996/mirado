import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getReviewUNI = createAsyncThunk("getReviewUNI/fetchGetReviewUNI", async (parameter: any) => {
    const { limit, university_id, language } = parameter;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/university-reviews?limit=${limit || "20"}&page=1&university_id=${university_id}`, {
        method: 'GET',
        headers: {
            "Accept-Language": language,
        },
    })
    const result = await res.json();
    // console.log("Review Slice", result);

    return result;
})

const reviewUNISlice = createSlice({
    name: 'reviewUNISlice',
    initialState: {

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReviewUNI.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getReviewUNI.fulfilled, (state: any, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(getReviewUNI.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});


export const { } = reviewUNISlice.actions;
export default reviewUNISlice.reducer;