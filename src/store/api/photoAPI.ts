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
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => {
            return { type: "Photo", id: photo.id };
          });
          tags.push({ type: "AlbumPhoto", id: album.id });
          return tags;
        },
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
        invalidatesTags: (result, error, album) => {
          return [{ type: "AlbumPhoto", id: album.id }];
        },
      }),
      removePhotos: builder.mutation<void, Photo>({
        query: (photo) => {
          return {
            method: "DELETE",
            url: `/photos/${photo.id}`,
          };
        },
        invalidatesTags: (result, error, photo) => {
          return [{ type: "Photo", id: photo.id }];
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
