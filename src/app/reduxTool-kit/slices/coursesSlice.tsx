import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";


export const getAllCourses = createAsyncThunk("coursesSlice/fetchCourses", async (parameter: any) => {
    const { search, country, state, city, majors, fields, language, recommended, limt, instituteBranchId, course_language, time_of_course, required_level, userId, page, sortOrder, max_no_of_students_per_class, course_start_dates } = parameter;

    const { tokenMainSite } = parseCookies();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses?limit=${limt || "10"}&page=${page || "1"}&status=active&institute_branch_id=${instituteBranchId}${userId ? `&user_id=${userId}` : ""}&required_level=${required_level || ""}${sortOrder ? `&sortBy=min_cost&sortOrder=${sortOrder}` : ""}&max_no_of_students_per_class=${max_no_of_students_per_class || ""}${course_start_dates ? `&course_start_dates=${course_start_dates}` : ""}&time_of_course=${time_of_course || ""}`, {
        method: 'GET',
        headers: {
            "Accept-Language": language,
            Authorization: `Bearer ${tokenMainSite}`
        },
    })
    const result = await res.json();
    return result;



})
const coursesSlice = createSlice({
    name: "coursesSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllCourses.fulfilled, (state: any, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(getAllCourses.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})
export const { } = coursesSlice.actions;
export default coursesSlice.reducer;