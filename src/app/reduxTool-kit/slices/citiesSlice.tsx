import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCities = createAsyncThunk("citiesSlice/fetchCities", async (parameter: any) => {
    const { language , stateId , countryId } = parameter;
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cities?limit=1&page=1&stateId=${stateId}&countryId=${countryId}`, {
        method: 'GET',
        headers: {
            "Accept-Language": `${language}`,
        },
    });

    const result = await response.json();
    return result;
});

const citiesSlice = createSlice({
    name: "citiesSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCities.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllCities.fulfilled, (state: any, action) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(getAllCities.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    },
})

export const { } = citiesSlice.actions;
export default citiesSlice.reducer;