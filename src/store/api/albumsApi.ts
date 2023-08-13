import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createRandomAlbums } from "../../data";
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:3001",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          console.log("inside album", album);
          console.log("inside result", result);
          return [{ type: "album", id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          console.log("inside user", user);
          console.log("inside result", result);
          console.log("inside error", error);
          return [{ type: "userAlbums", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: createRandomAlbums(),
            },
          };
        },
      }),
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return { type: "album", id: album.id };
          });
          tags.push({ type: "userAlbums", id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
