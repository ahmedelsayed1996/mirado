import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk("postsSlice/fetchPosts", async (parameter: any) => {
    const { limit, language } = parameter;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs?published=true&limit=${limit || "10"}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
        },
    })

    const result = await res.json();
    return result;
})

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllPosts.fulfilled, (state: any, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getAllPosts.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})
export const { } = postsSlice.actions;
export default postsSlice.reducer;