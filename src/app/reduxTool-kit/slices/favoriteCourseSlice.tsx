import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type FavaCourse = {
   language: string, userId: number | string, courseId: number | string, tokenMainSite: string
}

export const fetchFavoriteCourse = createAsyncThunk("favorite/fetchFav", async (params: FavaCourse) => {
   const { language, userId, courseId, tokenMainSite } = params

   var myHeaders = new Headers();
   myHeaders.append("Accept-Language", language);
   myHeaders.append("Content-Type", "application/json");
   myHeaders.append("Authorization", `Bearer ${tokenMainSite}`)

   var raw = JSON.stringify({
      userId,
      courseId
   });

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
   };

   const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/course`, requestOptions)
   if (!result.ok) {
      const res = await result.json();
      throw new Error(res.message);
   }
   const data = await result.json()
   return data;
})

const favoriteSlice = createSlice({
   name: "favorite",
   initialState: { loading: false, favorite: [], error: null },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchFavoriteCourse.pending, (state: any) => {
         state.loading = true
      }).addCase(fetchFavoriteCourse.fulfilled, (state: any, action) => {
         state.loading = false;
         state.favorite = action.payload
      }).addCase(fetchFavoriteCourse.rejected, (state: any, action) => {
         state.loading = false
         state.error = action.error.message || "Failed to fetch Favorite"
      })
   }
})

export const { } = favoriteSlice.actions
export default favoriteSlice.reducer