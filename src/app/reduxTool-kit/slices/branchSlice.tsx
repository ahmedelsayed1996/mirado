






import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getBranch = createAsyncThunk("branchSlice/fetchBranch", async (parameter : any) => {
    const { locale, schoolsId, branchsId } = parameter;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/institutes-branches/${branchsId}?format=true`, {
        method: 'GET',
        headers: {
            "Accept-Language": locale,
        },
    })
    const result = await res.json();
    return result;
})

const branchSlice = createSlice({
    name: "branchSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBranch.fulfilled, (state, action) => {
            return action.payload
        })
    }
})
export const { } = branchSlice.actions;
export default branchSlice.reducer;