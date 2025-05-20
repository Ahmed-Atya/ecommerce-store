import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieService from "../../services/cookies";

export const CategoriesApiSlice = createApi({
  reducerPath: "categoriesApi",
  refetchOnReconnect: true,
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Categories","Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_STRAPI_API_URL,
  }),

  endpoints: (builder) => ({
    getDashboardCategories: builder.query({
      query: () => {
   
        return {
          url: `/api/categories?populate=*`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookieService.get("jwt")}`,
          },
        };
      },
    
    }),

  }),
});

export const {
 useGetDashboardCategoriesQuery
} = CategoriesApiSlice;
