import "./styles.css";
import { createRandomSong, createRandomMovie } from "../../data";
import { useMovieSong } from "../../hooks";
export function MoviePlaylist() {
  const { movies, removeMovie, addMovie } = useMovieSong();

  const renderedMovies = movies.map((movie) => {
    return (
      <li key={movie}>
        {movie}
        <button onClick={() => removeMovie(movie)} className="button is-danger">
          X
        </button>
      </li>
    );
  });

  return (
    <div className="content">
      <div className="table-header">
        <h3 className="subtitle is-3">Movie Playlist</h3>
        <div className="buttons">
          <button
            onClick={() => addMovie(createRandomMovie())}
            className="button is-link"
          >
            + Add Movie to Playlist
          </button>
        </div>
      </div>
      <ul>{renderedMovies}</ul>
    </div>
  );
}

export function SongPlaylist() {
  const { songs, removeSong, addSong } = useMovieSong();

  const renderedSongs = songs.map((song) => {
    return (
      <li key={song}>
        {song}
        <button onClick={() => removeSong(song)} className="button is-danger">
          X
        </button>
      </li>
    );
  });

  return (
    <div className="content">
      <div className="table-header">
        <h3 className="subtitle is-3">Song Playlist</h3>
        <div className="buttons">
          <button
            onClick={() => addSong(createRandomSong())}
            className="button is-link"
          >
            + Add Song to Playlist
          </button>
        </div>
      </div>
      <ul>{renderedSongs}</ul>
    </div>
  );
}

export function MovieSongPage() {
  const { resetAll } = useMovieSong();
  return (
    <div className="container is-fluid">
      <button onClick={() => resetAll()} className="button is-danger">
        Reset Both Playlists
      </button>
      <hr />
      <MoviePlaylist />
      <hr />
      <SongPlaylist />
    </div>
  );
}
