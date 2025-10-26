import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLanguageSchool = createAsyncThunk("languageSchoolSlice/fetchLanguageSchool", async (parameter : any) => {
    const { schoolsId, locale } = parameter;
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/institutes/${schoolsId}?format=true`, {
        method: 'GET',
        headers: {
            "Accept-Language": locale,
        },
    })
    const result = await res.json();    
    // console.log("language School" , result);
    
    return result;
})

const languageSchoolSlice = createSlice({
    name: "languageSchoolSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLanguageSchool.fulfilled , (state , action)=>{
            return action.payload;
        })
    }
});

export const { } = languageSchoolSlice.actions;
export default languageSchoolSlice.reducer;