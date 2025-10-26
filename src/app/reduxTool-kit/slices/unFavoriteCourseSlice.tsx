import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type RemoveFavCourse = {
   userId: number, courseId: number, tokenMainSite: string
}
export const fetchUnFavoriteCourse = createAsyncThunk("removeFavCourse/fetch", async (params: RemoveFavCourse) => {
   const { userId, courseId, tokenMainSite } = params

   var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   myHeaders.append("Authorization", `Bearer ${tokenMainSite}`)

   var raw = JSON.stringify({
      userId,
      courseId
   });

   var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
   };

   const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/course`, requestOptions)
   if (!result.ok) {
      const res = await result.json();
      throw new Error(res.message);
   }
   const data = await result.json()
   return data
})

const removeFavCourseSlice = createSlice({
   name: "unFavCourse",
   initialState: { loading: false, unfavorite: [], error: null },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchUnFavoriteCourse.pending, (state: any) => {
         state.loading = true
      }).addCase(fetchUnFavoriteCourse.fulfilled, (state: any, action) => {
         state.loading = false;
         state.unfavorite = action.payload
      }).addCase(fetchUnFavoriteCourse.rejected, (state: any, action) => {
         state.loading = false
         state.error = action.error.message || "Failed to fetch UnFavorite"
      })
   }
})

export const { } = removeFavCourseSlice.actions
export default removeFavCourseSlice.reducer