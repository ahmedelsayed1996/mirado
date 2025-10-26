import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";

export const getTotalPriceUNI = createAsyncThunk("getTotalPriceUNI/fetchGetTotalPriceUNI", async (parameter: any) => {
    const { universityId, programId, userId, locale } = parameter;
    const { tokenMainSite } = parseCookies();
    // console.log("data" , universityId, programId );
    const data = JSON.stringify({
        "university_id": universityId,
        "program_id": programId
    })
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/university-orders/total-price`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${tokenMainSite}`,
        },
        body: data,
    })
    const result = await res.json();
    // console.log(result);
    return result;
})


const calcTotalPriceUNISlice = createSlice({
    name: "calcTotalPriceUNISlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTotalPriceUNI.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const { } = calcTotalPriceUNISlice.actions;
export default calcTotalPriceUNISlice.reducer;