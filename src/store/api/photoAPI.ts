import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createRandomPhotos } from "../../data";
type Album = {
  title: string;
  id: string;
  userId: string;
};
type Photo = {
  url: string;
  albumId: string;
  id: string;
};
export const photoApi = createApi({
  reducerPath: "photos",
  tagTypes: ["photo", "AlbumPhoto"],
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:3001/",
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query<Photo[], Album>({
        query: (album) => {
          return {
            url: "/photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
        providesTags: (result, _error, album) =>
          result
            ? [
                ...result.map((album) => ({
                  type: "photo" as const,
                  id: album.id,
                })),
                { type: "AlbumPhoto", id: album.id },
              ]
            : ["AlbumPhoto"],
      }),
      addPhotos: builder.mutation<Photo[], Album>({
        query: (album) => {
          const photoId = album.id + "-" + Math.round(Math.random() * 100);
          return {
            method: "POST",
            url: "/photos",
            body: {
              albumId: album.id,
              url: createRandomPhotos(),
              id: photoId,
            },
          };
        },
        invalidatesTags: (_result, _error, album) => [
          { type: "AlbumPhoto", id: album.id },
        ],
      }),
      removePhotos: builder.mutation<void, Photo>({
        query: (photo) => {
          return {
            method: "DELETE",
            url: `/photos/${photo.id}`,
          };
        },
        invalidatesTags: (_result, _error, photo) => {
          return [{ type: "photo", id: photo.id }];
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
