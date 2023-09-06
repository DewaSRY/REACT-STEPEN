// import "./styles.css";
import style from "./MovieSong.module.scss";
import { FC } from "react";
import { createRandomSong, createRandomMovie } from "../data";
import { useSelectors, useReducerDispatch } from "../Feature/store";
import { Button } from "./Button";
interface DisplayPlayListProps {
  label: string;
  lists: string[];
  removeBtn: (arg: string) => void;
  clickButton: () => void;
}
export const DisplayPlayList: FC<DisplayPlayListProps> = ({
  label,
  lists,
  clickButton,
  removeBtn,
}) => {
  const renderedSongs = lists.map((song) => {
    return (
      <li key={song}>
        {song}
        <Button onClick={() => removeBtn(song)} buttonType="warning" outline>
          X
        </Button>
      </li>
    );
  });
  return (
    <div className={style["content"]}>
      <div className={style["table-header"]}>
        <h3 className="subtitle is-3">{label} Playlist</h3>
        <Button onClick={() => clickButton()}>+ Add {label} to Playlist</Button>
      </div>
      <ul>{renderedSongs}</ul>
    </div>
  );
};

export default function MovieSongPage() {
  const { songs, movies } = useSelectors((s) => s);
  const { removeMovie, removeSong, addMovie, addSong, movieSongRest } =
    useReducerDispatch();

  return (
    <div className={style["container-movie-song"]}>
      <Button
        onClick={() => movieSongRest()}
        buttonType="danger"
        outline
        rounded
      >
        Reset Both Playlists
      </Button>

      <hr />
      <DisplayPlayList
        label="Movie"
        lists={movies}
        removeBtn={removeMovie}
        clickButton={() => addMovie(createRandomMovie())}
      />
      <hr />
      <DisplayPlayList
        label="Songs"
        lists={songs}
        removeBtn={removeSong}
        clickButton={() => addSong(createRandomSong())}
      />
      <hr />
    </div>
  );
}
