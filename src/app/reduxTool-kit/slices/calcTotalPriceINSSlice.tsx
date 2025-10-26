import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTotalPriceINS = createAsyncThunk("getTotalPriceINS/fetchGetTotalPriceINS", async (parameter: any) => {
    const { schoolsId, courseId, userId, locale } = parameter;
    // console.log("asdasdasd" , locale);
    // const data = JSON.stringify({
    //     "university_id": schoolsId,
    //     "program_id": courseId
    // })
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/institute-orders/data/${courseId}`, {
        method: 'GET',
        headers: {
            "Accept-Language": locale,
        },
        // body: data,
    })
    const result = await res.json();
    // console.log(result);
    return result;
})


const calcTotalPriceINSSlice = createSlice({
    name: "calcTotalPriceINSSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTotalPriceINS.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const { } = calcTotalPriceINSSlice.actions;
export default calcTotalPriceINSSlice.reducer;