import style from "./ApiAsync.module.scss";
import { Button } from "../../component";
import { GoTrash, GoChevronDown, GoArrowLeft } from "react-icons/go";
import { useEffect, useState } from "react";
import { useUserStore } from "../../hooks/use-User.store";
import {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
  useFetchPhotosQuery,
  useAddPhotosMutation,
  useRemovePhotosMutation,
} from "../../store";
interface SkeletonProps {
  times: number;
  className?: string;
}
function Skeleton({ times, className }: SkeletonProps) {
  const classStyle = [style["skeleton"], className].join(" ");
  const boxes = Array(times)
    .fill(0)
    .map((_, id) => {
      return (
        <div key={id} className={classStyle}>
          <div className={style["blink"]} />
        </div>
      );
    });
  return boxes;
}
export function PhotoListItem({ data }) {
  const [removePhoto] = useRemovePhotosMutation();
  const handleRemovePhoto = () => removePhoto(data);
  const renderPhoto = data.map((photo) => {
    return (
      <div
        onClick={handleRemovePhoto}
        className="relative cursor-pointer m-2"
        key={photo.id}
      >
        <img className="h-20 w-20" src={photo.url} alt={"photoOf"} />
        <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
          {/* <Button loading={resultRemovePhoto.isLoading}> */}
          <GoTrash className="text-3xl" />
          {/* </Button> */}
        </div>
      </div>
    );
  });
  return <div>{renderPhoto}</div>;
}
export function PhotoList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoresult] = useAddPhotosMutation();
  const handleAddPhoto = () => {
    addPhoto(album);
  };
  let content;
  if (isFetching) {
    content = <Skeleton times={2} />;
  } else if (error) {
    content = <div>There is come Error</div>;
  } else {
    content = <PhotoListItem data={data} />;
  }
  return (
    <div className="m-2 p-4    ">
      <h3 className="text-lg font-bold">Photo in {album.title}</h3>
      <Button loading={addPhotoresult.isLoading} onClick={handleAddPhoto}>
        + Add Photo
      </Button>
      <div className="mx-8 flex flex-row  flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
}
function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, result] = useAddAlbumMutation();
  const handleAddAlbums = () => {
    addAlbum(user);
  };
  let content;
  if (isLoading) {
    content = <Skeleton className="h-10 w-full" times={2} />;
  } else if (error) {
    content = <div></div>;
  } else {
    content = data.map((album) => (
      <>
        <AlbumsListItem key={album.id} album={album} />
      </>
    ));
  }

  return (
    <div>
      <div className="m-2 flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={result.isLoading} onClick={handleAddAlbums}>
          +Add albums
        </Button>
      </div>
      {content}
    </div>
  );
}
function AlbumsListItem({ album }) {
  const [removeAlbum, response] = useRemoveAlbumMutation();
  const handleremoveAlbums = () => {
    removeAlbum(album);
  };
  //   console.log(response);
  const header = (
    <>
      <Button
        className="mr-2"
        loading={response.isLoading}
        onClick={handleremoveAlbums}
      >
        <GoTrash />
      </Button>

      {album.title}
    </>
  );
  return (
    <ExpandAblePanel key={album.id} header={header}>
      <PhotoList album={album} />
    </ExpandAblePanel>
  );
}
function ExpandAblePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpanded = () => setExpanded(!expanded);
  return (
    <div className="mb-2 border rounded ">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          {header}
        </div>
        <div onClick={handleExpanded}>
          {expanded ? <GoChevronDown /> : <GoArrowLeft />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}

function UsersList() {
  const { data, addUser, fetchUser, error, isLoading } = useUserStore();
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let content;
  if (isLoading) {
    content = <Skeleton times={5} className="h-10 w-full p-3 m-3" />;
  } else if (error) {
    content = <div>We get an error</div>;
  } else {
    content = data.map((users) => (
      <>
        <UsersListItem key={users.id} user={users} />
      </>
    ));
  }
  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl ">User</h1>
        <Button onClick={() => addUser()}>+ Add User</Button>
        {error && "Error creating user..."}
      </div>
      {content}
    </div>
  );
}

function UsersListItem({ user }) {
  const { removeUser, error } = useUserStore();
  const header = (
    <>
      <Button className="mr-3" onClick={() => removeUser(user.id)}>
        <GoTrash />
      </Button>
      {error && <>Error deleting user....</>}
      {user.name}
    </>
  );
  return (
    <ExpandAblePanel header={header}>
      <AlbumsList user={user} />
    </ExpandAblePanel>
  );
}
export function ApiAsyncPage() {
  return (
    <div className="container mx-auto">
      <UsersList />
    </div>
  );
}
