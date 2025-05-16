import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import {
  isLabelWithInternallyDisabledControl,
  setSelectionRange,
} from "@testing-library/user-event/dist/utils";
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

const key = "674126bf";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("inception");
  // const [watched, setWatched] = useState([]);
  // const query = "Interstellar";
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  function handleSelect(selected) {
    console.log(selected);
    setSelectedId(selected);
  }
  function handleBack() {
    setSelectedId(null);
  }
  function handleAddMovie(movie) {
    // console.log(movie);

    // console.log(movie);
    // console.log(latest);
    setWatched((movies) => [...movies, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    setSelectedId(null);
  }

  // useEffect(function () {
  //   async function fetchMovies() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(
  //         `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`
  //       );
  //       const data = await res.json();
  //       console.log(data);
  //       setMovies(data.Search);
  //       // console.log(movies);
  //       setIsLoading(false);

  //       if (data.Response === "False") {
  //         console.log("FFFFFFFFFFFFFFF");
  //         throw new Error("EEEEEEEEEEEEEEEEEEE");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //       // console.log(e.message);
  //       // setError(e.message);
  //       // setError(e);
  //     }
  //   }
  //   fetchMovies();
  // }, []);

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.log(err.name);
          if (err?.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  // Add key and query to the dependency array if they can change

  return (
    <>
      <Navbar query={query} setQuery={setQuery}>
        <NumResults movies={movies} />
      </Navbar>

      <Main
        selectedId={selectedId}
        movies={movies}
        handleSelect={handleSelect}
        isLoading={isLoading}
        error={error}
        handleBack={handleBack}
        watched={watched}
        setWatched={setWatched}
        handleAddMovie={handleAddMovie}
        setSelectedId={setSelectedId}
      />
    </>
  );
}

function Navbar({ children, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
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
function Search({ query, setQuery }) {
  // const [query, setQuery] = useState("");

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
      Found <strong>{movies?.length ?? 0}</strong> results
    </p>
  );
}

function Main({
  selectedId,
  movies,
  handleSelect,
  isLoading,
  error,
  handleBack,
  watched,
  setWatched,
  handleAddMovie,
  setSelectedId,
}) {
  console.log(watched);
  // console.log(error);
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
        {/* {isLoading ? (
          <Loader />
        ) : (
          <MoviesList movies={movies} handleSelect={handleSelect} />
        )} */}

        {isLoading && <Loader />}
        {!isLoading && !error && (
          <MoviesList movies={movies} handleSelect={handleSelect} />
        )}
        {/* {error && <Error />} */}
        <Error message={error} />
      </Box>
      <Box>
        <WatchedList
          selectedId={selectedId}
          watched={watched}
          handleAddMovie={handleAddMovie}
          handleBack={handleBack}
          setWatched={setWatched}
          setSelectedId={setSelectedId}
        />
      </Box>
    </main>
  );
}
function Error({ message }) {
  // console.log(message);
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      <div>{isOpen && children}</div>
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
            handleSelect={() => handleSelect(movie.imdbID)}
          />
        ))}
      </ul>
    </div>
  );
}

function Movie({ movie, handleSelect }) {
  // console.log(movie);
  return (
    <li key={movie.imdbID} onClick={handleSelect}>
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

function WatchedList({
  selectedId,
  watched,
  handleAddMovie,
  handleBack,
  setWatched,
  setSelectedId,
}) {
  // const [isOpen2, setIsOpen2] = useState(true);
  // console.log(selectedId);
  return (
    <div>
      {/* <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button> */}

      {selectedId ? (
        <SelectedMovie
          selectedId={selectedId}
          handleAddMovie={handleAddMovie}
          handleBack={handleBack}
          watched={watched}
          setSelectedId={setSelectedId}
        />
      ) : (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} setWatched={setWatched} />
        </>
      )}
    </div>
  );
}
function WatchedMovieList({ watched, setWatched }) {
  function handleDeleteMovie(id) {
    console.log(id);
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleDeleteMovie={handleDeleteMovie}
        />
      ))}
    </ul>
  );
}
function WatchedSummary({ watched }) {
  console.log(watched);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  console.log(typeof avgImdbRating, Math.round(avgImdbRating * 100) / 100);
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  console.log(avgUserRating);
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
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)} </span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} mins</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ movie, handleDeleteMovie }) {
  console.log(movie);
  const { imdbRating, runtime, poster, title, userRating, imdbID } = movie;
  return (
    <li>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} mins</span>
        </p>
        <button
          onClick={() => handleDeleteMovie(imdbID)}
          className="btn-delete"
        >
          ✖️
        </button>
      </div>
    </li>
  );
}

function SelectedMovie({
  selectedId,
  setSelectedId,
  handleAddMovie,
  handleBack,
  watched,
}) {
  const messages = ["Terrible", "Bad", "Okay", "Good", "Excellent"];
  const [movie, setMovie] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const WatchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  console.log(userRating);
  console.log(movie);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbID,
  } = movie;
  console.log(movie.Director);

  function handleAdd() {
    const NewWatchedMovie = {
      title,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      year,
      imdbRating,
      userRating,
      imdbID,
    };
    handleAddMovie(NewWatchedMovie);
  }
  function handle() {
    handleBack();
    setMovie({});
  }
  console.log(movie);

  useEffect(
    function () {
      async function getMovieById(id) {
        setIsLoad(true);
        console.log(id);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${id}`
        );
        console.log(res);
        const movie = await res.json();
        console.log(movie);
        setMovie(movie);
        setIsLoad(false);
      }
      getMovieById(selectedId);
    },
    [selectedId]
  );

  useEffect(() => {
    if (title === "" || title === undefined || title === null) {
      document.title = "usePopcorn";
    } else {
      document.title = `Movie | ${title}`;
    }
    return function () {
      console.log("Cleaned Up");
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    function callBack(e) {
      if (e.code === "Escape") {
        setSelectedId(null);
        console.log("Closed");
      }
    }
    document.addEventListener("keydown", callBack);
    return () => {
      document.addEventListener("keydown", callBack);
    };
  }, [setSelectedId]);

  return (
    <div className="details">
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handle}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  {" "}
                  <StarRating
                    maxRating={5}
                    color="red"
                    messages={messages}
                    onSetRating={setUserRating}
                    defaultRating={0}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add To Watchlist
                    </button>
                  )}
                </>
              ) : (
                <p>You already rated this movie with {WatchedUserRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Loader() {
  return (
    <>
      <p className="loader">Loading...</p>
    </>
  );
}
