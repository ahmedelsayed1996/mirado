import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProgram = createAsyncThunk("programSlice/fetchProgram", async (parameter : any) => {
    const { programId, locale } = parameter;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/programs/${programId}`, {
        method: 'GET',
        headers: {
            "Accept-Language": locale,
        },
    })
    const result = await res.json();   
    // console.log(result) 
    return result;
})

const programSlice = createSlice({
    name:"programSlice",
    initialState: {},
    reducers: {},
    extraReducers : (builder) =>{
        builder.addCase(getProgram.fulfilled , ( state , action)=>{
            return action.payload;
        })
    }
})

export const { } = programSlice.actions;
export default   programSlice.reducer;