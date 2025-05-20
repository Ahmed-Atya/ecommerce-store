import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieService from "../../services/cookies";


export const ProductsApiSlice = createApi({
  reducerPath: "ProductsApi",
  refetchOnReconnect: true,
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_STRAPI_API_URL,
  }),

  endpoints: (builder) => ({
    getDashboardProducts: builder.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `/api/products?pagination[page]=${page}&pagination[pageSize]=20&populate=*`,
        };
      },
      providesTags: (result) => {
        if (result) {
          return [
            ...result.data.map(({ documentId }) => ({
              type: "Products",
              documentId,
            })),
            { type: "Products", id: "LIST" },
          ];
        }
        return [{ type: "Products", id: "LIST" }];
      },
    }),
    deleteDashboardProduct: builder.mutation({
      query(documentId) {
        return {
          url: `/api/products/${documentId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cookieService.get("jwt")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    updateDashboardProduct: builder.mutation({
      query:({ documentId, body }) =>({
    
          url: `/api/products/${documentId}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${cookieService.get("jwt")}`,
          },
          body,
       
      }),
      async onQueryStarted({id,...patch},{dispatch, queryFulfilled}){
        const patchResult= dispatch(
          ProductsApiSlice.util.updateQueryData("getDashboardProducts",id,(draft)=>{
            Object.assign(draft,patch);
          })
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    createDashboardProduct: builder.mutation({
      query:({body }) =>({
    
          url: `/api/products`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookieService.get("jwt")}`,
          },
          body,
       
      }),
      async onQueryStarted({id,...patch},{dispatch, queryFulfilled}){
        const patchResult= dispatch(
          ProductsApiSlice.util.updateQueryData("getDashboardProducts",id,(draft)=>{
            Object.assign(draft,patch);
          })
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductMutation,
  useUpdateDashboardProductMutation,
  useCreateDashboardProductMutation,
} = ProductsApiSlice;
