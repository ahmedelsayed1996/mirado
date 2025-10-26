import {toast} from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createOrderUNI = createAsyncThunk("createOrderUNI/fetchCreateOrderUNI", async (parameter : any) => {
    const { convertedPrice, programId, totalPriceUNI, universityId, userId, selectedOffice } = parameter;
    // console.log("data" , universityId, programId );
    const data = JSON.stringify({
        // "user_id": userId,
        "user_id": null,
        "university_id": universityId,
        "program_id": programId,
        "office_id": selectedOffice,
        "total_price": totalPriceUNI,
        "converted_price": convertedPrice ? convertedPrice : ""
    })
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/university-orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: data,
    })
    if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
    }
    const result = await res.json();
    console.log(result);
    return result;
})


const orderUNISlice = createSlice({
    name: "orderUNISlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrderUNI.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(createOrderUNI.rejected, (state, action) => {
            if (action.payload) {
                console.log("Error one");
            } else {
                toast.error("Something  Wrong Please Try Again");
                console.log("Error two")
            }
        })
    }
})

export const { } = orderUNISlice.actions;
export default orderUNISlice.reducer;