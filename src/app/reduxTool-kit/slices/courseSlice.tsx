import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCourse = createAsyncThunk("courseSlice/fetchCourse", async (parameter: any) => {
    const { courseId, language } = parameter;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${courseId}?format=true`, {
        method: 'GET',
        headers: {
            "Accept-Language": language,
        },
    })
    const result = await res.json();
    // console.log("course" , result)

    return result;
})

// const courseSlice = createSlice({
//     name: "courseSlice",
//     initialState: {},
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getCourse.fulfilled, (state, action) => {
//             return action.payload
//         })
//     }
// })
const courseSlice = createSlice({
    name: 'courseSlice',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourse.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getCourse.fulfilled, (state: any, action) => {
                state.loading = false;
                state.course = action.payload;
            })
            .addCase(getCourse.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { } = courseSlice.actions;
export default courseSlice.reducer;