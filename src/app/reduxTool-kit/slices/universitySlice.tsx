import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUniversity = createAsyncThunk("universitySlice/fetchUniversity", async (parameter : any) => {
    const { universityId, locale } = parameter;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/universities/client/${universityId}`, {
        method: 'GET',
        headers: {
            "Accept-Language": locale,
        },
    })
    const result = await res.json();    
    return result;
})


const universitySlice = createSlice({
    name: "universitySlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversity.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const { } = universitySlice.actions;
export default universitySlice.reducer;