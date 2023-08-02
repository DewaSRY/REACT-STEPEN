import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createRandomPhotos } from "../../data";
export const photoApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:3001/",
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => {
            return { type: "Photo", id: photo.id };
          });
          tags.push({ type: "AlbumPhoto", id: album.id });
          return tags;
        },
        query: (album) => {
          return {
            url: "/photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
      }),
      addPhotos: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "AlbumPhoto", id: album.id }];
        },
        query: (album) => {
          return {
            method: "POST",
            url: "/photos",
            body: {
              albumid: album.id,
              url: createRandomPhotos(),
            },
          };
        },
      }),
      removePhotos: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: "Photo", id: photo.id }];
        },
        query: (photo) => {
          return {
            method: "DELETE",
            url: `/photos/${photo.id}`,
          };
        },
      }),
    };
  },
});
export const {
  useAddPhotosMutation,
  useFetchPhotosQuery,
  useRemovePhotosMutation,
} = photoApi;
