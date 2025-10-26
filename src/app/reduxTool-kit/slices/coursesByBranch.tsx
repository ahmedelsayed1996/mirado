import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type coursesBybranch = {
  language: string;
  limit?: number | string;
  page?: number | string;
  instituteID: number | string;
  tokenMainSite: string
};

export const fetchCoursesByBranch = createAsyncThunk(
  "coursesBybranch/fetchCourses",
  async (params: coursesBybranch) => {
    const { language, limit, page, instituteID, tokenMainSite } = params;


    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL
      }/courses/branches-with-courses/${instituteID}?limit=${limit || "3"}&page=${page || 1
      }`,
      {
        method: "GET",
        headers: {
          "Accept-Language": language,
          Authorization: `Bearer ${tokenMainSite}`
        },
      }
    );

    const data = await result.json();
    return data;
  }
);

const coursesByBranchSlice = createSlice({
  name: "coursesByBranchSlice",
  initialState: { loading: false, courses: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesByBranch.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(fetchCoursesByBranch.fulfilled, (state: any, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCoursesByBranch.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
      });
  },
});

export const { } = coursesByBranchSlice.actions;
export default coursesByBranchSlice.reducer;
