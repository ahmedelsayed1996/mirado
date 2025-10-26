import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("userSlice/fetchUser", async (parameter: any) => {
    const { tokenMainSite, locale } = parameter;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Accept-Language": locale,
            Authorization: `Bearer ${tokenMainSite}`
        },
    })
    const result = await res.json();
    // console.log("result", result);

    return result;
})


const userSlice = createSlice({
    name: "userSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const { } = userSlice.actions;
export default userSlice.reducer;