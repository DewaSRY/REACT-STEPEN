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
  const [removePhoto, response] = useRemovePhotosMutation();

  return (
    <div className={style["photo-container"]}>
      {data.map((photo) => (
        <div className={style["photo-lists"]} key={photo.id}>
          <img src={photo.url} alt={"photoOf"} />
          <Button
            loading={response.isLoading}
            onClick={() => removePhoto(photo)}
            outline
            rounded
          >
            <GoTrash size={12} />
          </Button>
        </div>
      ))}
    </div>
  );
}
export function PhotoList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, result] = useAddPhotosMutation();
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
      <h3>Photo in {album.title}</h3>
      <Button
        loading={result.isLoading}
        onClick={handleAddPhoto}
        outline
        rounded
        buttonType="success"
      >
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
  let content: JSX.Element;
  if (isLoading) {
    content = <Skeleton className="h-10 w-full" times={2} />;
  } else if (error) {
    content = <div></div>;
  } else {
    content = (
      <>
        {data.map((album) => (
          <AlbumsListItem key={album.id} album={album} />
        ))}
      </>
    );
  }
  return (
    <div>
      <div className={style["album-lists"]}>
        <h3>Albums for {user.name}</h3>
        <Button
          loading={result.isLoading}
          onClick={handleAddAlbums}
          rounded
          outline
          buttonType="warning"
        >
          +Add albums
        </Button>
      </div>
      {content}
    </div>
  );
}
function AlbumsListItem({ album }) {
  const [removeAlbum, response] = useRemoveAlbumMutation();
  const header = (
    <>
      <Button
        className="mr-2"
        loading={response.isLoading}
        onClick={() => removeAlbum(album)}
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
    <div className={style["expand-panel"]}>
      <div className={style["expand-header"]}>
        <div className={style["expand-header-wrapper"]}>{header}</div>
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
  }, [fetchUser]);

  let content: JSX.Element;
  if (isLoading) {
    content = <Skeleton times={5} className="h-10 w-full p-3 m-3" />;
  } else if (error) {
    content = <div>We get an error</div>;
  } else {
    content = (
      <>
        {data.map((users) => (
          <UsersListItem key={users.id} user={users} />
        ))}
      </>
    );
  }
  return (
    <div>
      <div className={style["user-lists"]}>
        <span>User</span>
        <Button onClick={() => addUser()} outline>
          + Add User
        </Button>
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
      <Button onClick={() => removeUser(user.id)} outline rounded>
        <GoTrash />
      </Button>
      {error && <>Error deleting user....</>}
      <span className={style["user-name"]}>{user.name}</span>
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
    <div>
      <UsersList />
    </div>
  );
}
