import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { parseCookies } from "nookies";

export const getAllFavorites = createAsyncThunk("FavoriteSlice/fetchFavorite", async (parameter: any) => {
    const { tokenMainSite } = parseCookies();
    const { language } = parameter;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites`, {
        method: 'GET',
        headers: {
            "Accept-Language": language,
            Authorization: `Bearer ${tokenMainSite}`
        },
    })
    const result = await res.json();
    return result;
});

const favoritesSlice = createSlice({
    name: "favoritesSlice",
    initialState: {},
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllFavorites.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllFavorites.fulfilled, (state: any, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(getAllFavorites.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    },
});

export const { } = favoritesSlice.actions;
export default favoritesSlice.reducer;