import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createRandomAlbums } from "../../data";
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
type Users = {
  name: string;
  id: number;
};
type Album = {
  title: string;
  userId: string;
  id: number;
  albumId: string;
};
const albumName = createRandomAlbums();
export const albumsApi = createApi({
  reducerPath: "albums",
  tagTypes: ["album", "userAlbums"],
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:3001",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation<void, Album>({
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (_result, _error, album) => {
          console.log("test while query", album);
          return [{ type: "album", id: album.id }];
        },
      }),
      addAlbum: builder.mutation<Album[], Users>({
        query: (user) => {
          const albumId = user.id + "-" + Math.round(Math.random() * 100);
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: albumName,
              id: albumId,
            },
          };
        },
        invalidatesTags: (_result, _error, user) => {
          return [{ type: "userAlbums", id: user.id }];
        },
      }),
      fetchAlbums: builder.query<Album[], Users>({
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
        providesTags: (result, _error, user) =>
          result
            ? [
                ...result.map((album) => ({
                  type: "album" as const,
                  id: album.id,
                })),
                { type: "userAlbums", id: user.id },
              ]
            : ["userAlbums"],
      }),
    };
  },
});
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
// export default albumsApi;
