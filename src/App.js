import { useState } from "react";
import StarRating from "./StarRating";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [selectedMovie, setSelectedMovie] = useState(null);
  function handleSelect(selected) {
    console.log(selected);
    setSelectedMovie(selected);
  }
  return (
    <>
      <Navbar>
        <NumResults movies={movies} />
      </Navbar>

      <Main
        selectedMovie={selectedMovie}
        movies={movies}
        handleSelect={handleSelect}
      />
    </>
  );
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ selectedMovie, movies, handleSelect }) {
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <main className="main">
      {/* Passing props as an element explicitly */}
      {/* <Box
        element={<MoviesList movies={movies} handleSelect={handleSelect} />}
      />
      <Box
        element={
          <>
            <WatchedList selectedMovie={selectedMovie} watched={watched} />
          </>
        }
      /> */}

      {/* Reusable component via children prop */}
      <Box>
        <MoviesList movies={movies} handleSelect={handleSelect} />
      </Box>
      <Box>
        <WatchedList selectedMovie={selectedMovie} watched={watched} />
      </Box>
    </main>
  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}
function MoviesList({ movies, handleSelect }) {
  // const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div>
      <ul className="list">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            handleSelect={() => handleSelect(movie)}
          />
        ))}
      </ul>
    </div>
  );
}

function Movie({ movie, handleSelect }) {
  console.log(movie);
  return (
    <li key={movie.imdbID} onClick={() => handleSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedList({ selectedMovie, watched }) {
  // const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div>
      {/* <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button> */}
      <WatchedSummary watched={watched} />
      {selectedMovie ? (
        <SelectedMovie selectedMovie={selectedMovie} />
      ) : (
        <>
          <WatchedMovieList watched={watched} />
        </>
      )}
    </div>
  );
}
function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function SelectedMovie({ selectedMovie }) {
  const messages = ["Terrible", "Bad", "Okay", "Good", "Excellent"];
  return (
    <div className="details">
      <img src={selectedMovie.Poster} alt={selectedMovie.imdbID} />
      <h4>{selectedMovie.Title}</h4>
      <p>{selectedMovie.Year}</p>
      <StarRating maxRating={5} messages={messages} defaultRating={2} />
    </div>
  );
}
