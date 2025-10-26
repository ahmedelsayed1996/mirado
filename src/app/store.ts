import { configureStore } from "@reduxjs/toolkit";
import branchesSlice from "./reduxTool-kit/slices/branchesSlice";
import branchSlice from "./reduxTool-kit/slices/branchSlice";
import calcTotalPriceINSSlice from "./reduxTool-kit/slices/calcTotalPriceINSSlice";
import calcTotalPriceUNISlice from "./reduxTool-kit/slices/calcTotalPriceUNISlice";
import citiesSlice from "./reduxTool-kit/slices/citiesSlice";
import countriesSlice from "./reduxTool-kit/slices/countriesSlice";
import coursesByBranchSlice from "./reduxTool-kit/slices/coursesByBranch";
import courseSlice from "./reduxTool-kit/slices/courseSlice";
import coursesSlice from "./reduxTool-kit/slices/coursesSlice";
import displayUserSlice from "./reduxTool-kit/slices/displayUserSlice";
import favoriteSlice from "./reduxTool-kit/slices/favoriteCourseSlice";
import favoritesSlice from "./reduxTool-kit/slices/favoritesSlice";
import fieldsSlice from "./reduxTool-kit/slices/fieldSlice";
import orderInsSlice from "./reduxTool-kit/slices/InstituteOrder";
import languageSchoolSlice from "./reduxTool-kit/slices/languageSchoolSlice";
import languageSchoolsSlice from "./reduxTool-kit/slices/languageSchoolsSlice";
import majorsSlice from "./reduxTool-kit/slices/majorSlice";
import orderUNISlice from "./reduxTool-kit/slices/orderUNISlice";
import postsSlice from "./reduxTool-kit/slices/postsSlice";
import programSlice from "./reduxTool-kit/slices/programSlice";
import programsSlice from "./reduxTool-kit/slices/programsSlice";
import requestSlice from "./reduxTool-kit/slices/requestsSlice";
import reviewINSSlice from "./reduxTool-kit/slices/reviewINSSlice";
import reviewUNISlice from "./reduxTool-kit/slices/reviewUNISlice";
import statesSlice from "./reduxTool-kit/slices/statesSlice";
import removeFavCourseSlice from "./reduxTool-kit/slices/unFavoriteCourseSlice";
import universitiesSlice from "./reduxTool-kit/slices/universitiesSlice";
import universitySlice from "./reduxTool-kit/slices/universitySlice";
import userSlice from "./reduxTool-kit/slices/userSlice";
export const store = configureStore({
  reducer: {
    universities: universitiesSlice,
    university: universitySlice,
    reviewUNI: reviewUNISlice,
    programs: programsSlice,
    program: programSlice,
    languageSchools: languageSchoolsSlice,
    languageSchool: languageSchoolSlice,
    branches: branchesSlice,
    reviewINS: reviewINSSlice,
    branch: branchSlice,
    courses: coursesSlice,
    coursesByBranch: coursesByBranchSlice,
    favoriteCourse: favoriteSlice,
    unFavCourseSlice: removeFavCourseSlice,
    orderInsSlice: orderInsSlice,
    course: courseSlice,
    totalPriceUNI: calcTotalPriceUNISlice,
    orderUNI: orderUNISlice,
    totalPriceINS: calcTotalPriceINSSlice,
    user: userSlice,
    displayUser: displayUserSlice,
    posts: postsSlice,
    countries: countriesSlice,
    cities: citiesSlice,
    majors: majorsSlice,
    fields: fieldsSlice,
    states: statesSlice,
    request: requestSlice,
    favorites: favoritesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
