// import { Button } from "../component";
// import { useEffect, useState } from "react";
// import { useThunk } from "../hooks/use-Thunk";
// import { useSelector } from "react-redux";
// import {
//   fetchUser,
//   addUser,
//   removeUser,
//   useFetchAlbumsQuery,
//   useAddAlbumMutation,
//   useRemoveAlbumMutation,
//   useFetchPhotosQuery,
//   useAddPhotosMutation,
//   useRemovePhotosMutation,
// } from "../store";
// import { GoTrashcan, GoChevronDown, GoArrowLeft } from "react-icons/go";
// import classNames from "classnames";
// function Skeleton({ times, className }) {
//   const outerClassNames = classNames(
//     "relative overflow-hidden bg-gray-200 rounded mb-2.5  ",
//     className
//   );
//   const innerClassNames = classNames(
//     "animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-white to-gray-200"
//   );
//   const boxes = Array(times)
//     .fill(0)
//     .map((_, id) => {
//       return (
//         <div key={id} className={outerClassNames}>
//           Loading..........................................
//           <div className={innerClassNames} />
//         </div>
//       );
//     });
//   return boxes;
// }
// export function PhotoListItem({ data }) {
//   const [removePhoto] = useRemovePhotosMutation();
//   const handleRemovePhoto = () => removePhoto(data);
//   const renderPhoto = data.map((photo) => {
//     return (
//       <div
//         onClick={handleRemovePhoto}
//         className="relative cursor-pointer m-2"
//         key={photo.id}
//       >
//         <img className="h-20 w-20" src={photo.url} alt={"photoOf"} />
//         <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
//           {/* <Button loading={resultRemovePhoto.isLoading}> */}
//           <GoTrashcan className="text-3xl" />
//           {/* </Button> */}
//         </div>
//       </div>
//     );
//   });
//   return <div>{renderPhoto}</div>;
// }
// export function PhotoList({ album }) {
//   const { data, isFetching, error } = useFetchPhotosQuery(album);
//   const [addPhoto, addPhotoresult] = useAddPhotosMutation();
//   const handleAddPhoto = () => {
//     addPhoto(album);
//   };
//   let content;
//   if (isFetching) {
//     content = <Skeleton times={2} />;
//   } else if (error) {
//     content = <div>There is come Error</div>;
//   } else {
//     content = <PhotoListItem data={data} />;
//   }
//   return (
//     <div className="m-2 p-4    ">
//       <h3 className="text-lg font-bold">Photo in {album.title}</h3>
//       <Button loading={addPhotoresult.isLoading} onClick={handleAddPhoto}>
//         + Add Photo
//       </Button>
//       <div className="mx-8 flex flex-row  flex-wrap justify-center">
//         {content}
//       </div>
//     </div>
//   );
// }
// function AlbumsList({ user }) {
//   const { data, error, isLoading } = useFetchAlbumsQuery(user);
//   const [addAlbum, result] = useAddAlbumMutation();
//   const handleAddAlbums = () => {
//     addAlbum(user);
//   };
//   let content;
//   if (isLoading) {
//     content = <Skeleton className="h-10 w-full" times={2} />;
//   } else if (error) {
//     content = <div></div>;
//   } else {
//     content = data.map((album) => (
//       <AlbumsListItem key={album.id} album={album} />
//     ));
//   }

//   return (
//     <div>
//       <div className="m-2 flex-row items-center justify-between">
//         <h3 className="text-lg font-bold">Albums for {user.name}</h3>
//         <Button loading={result.isLoading} onClick={handleAddAlbums}>
//           +Add albums
//         </Button>
//       </div>
//       {content}
//     </div>
//   );
// }
// function AlbumsListItem({ album }) {
//   const [removeAlbum, response] = useRemoveAlbumMutation();
//   const handleremoveAlbums = () => {
//     removeAlbum(album);
//   };
//   //   console.log(response);
//   const header = (
//     <>
//       <Button
//         className="mr-2"
//         loading={response.isLoading}
//         onClick={handleremoveAlbums}
//       >
//         <GoTrashcan />
//       </Button>
//       {album.title}
//     </>
//   );
//   return (
//     <ExpandAblePanel key={album.id} header={header}>
//       <PhotoList album={album} />
//     </ExpandAblePanel>
//   );
// }
// function ExpandAblePanel({ header, children }) {
//   const [expanded, setExpanded] = useState(false);
//   const handleExpanded = () => setExpanded(!expanded);
//   return (
//     <div className="mb-2 border rounded ">
//       <div className="flex p-2 justify-between items-center cursor-pointer">
//         <div className="flex flex-row items-center justify-between">
//           {header}
//         </div>
//         <div onClick={handleExpanded}>
//           {expanded ? <GoChevronDown /> : <GoArrowLeft />}
//         </div>
//       </div>
//       {expanded && <div className="p-2 border-t">{children}</div>}
//     </div>
//   );
// }

// function UsersList() {
//   const [runfetchUser, userIsLoading, userError] = useThunk(fetchUser);
//   const [runAddUser, addUserIsLoading, addUserError] = useThunk(addUser);
//   const { data } = useSelector((state) => state.users);
//   useEffect(() => {
//     runfetchUser();
//   }, [runfetchUser]);
//   const handleUserAdd = () => {
//     runAddUser();
//   };
//   let content;
//   if (userIsLoading) {
//     content = <Skeleton times={5} className="h-10 w-full p-3 m-3" />;
//   } else if (userError) {
//     content = <div>We get an error</div>;
//   } else {
//     content = data.map((users) => (
//       <UsersListItem key={users.id} user={users} />
//     ));
//   }
//   return (
//     <div>
//       <div className="flex flex-row justify-between m-3">
//         <h1 className="m-2 text-xl ">User</h1>
//         <Button loading={addUserIsLoading} onClick={handleUserAdd}>
//           + Add User
//         </Button>
//         {addUserError && "Error creating user..."}
//       </div>
//       {content}
//     </div>
//   );
// }

// function UsersListItem({ user }) {
//   const [runRemoveUser, loadingRemoveuser, errorRemoveUser] =
//     useThunk(removeUser);
//   const handleRemoveUser = () => {
//     runRemoveUser(user);
//   };
//   const header = (
//     <>
//       <Button
//         className="mr-3"
//         loading={loadingRemoveuser}
//         onClick={handleRemoveUser}
//       >
//         <GoTrashcan />
//       </Button>
//       {errorRemoveUser && <>Error deleting user....</>}
//       {user.name}
//     </>
//   );
//   return (
//     <ExpandAblePanel header={header}>
//       <AlbumsList user={user} />
//     </ExpandAblePanel>
//   );
// }
// export function ApiAsync() {
//   return (
//     <div className="container mx-auto">
//       <UsersList />
//     </div>
//   );
// }
