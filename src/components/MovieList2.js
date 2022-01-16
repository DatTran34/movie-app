import { React, useEffect, useState } from "react";
import { getFilteredMovies } from "../axios/MovieResquest";
import { makeStyles } from "@mui/styles";
import MovieCard from "./MovieCard";
import { useHistory, useLocation } from "react-router";
import MovieCard2 from "./MovieCard2";
import { Stack } from "@mui/material";
const MovieListStyle = makeStyles((theme) => ({
  grid: {
    display: "grid",
    gridGap: "1rem",
    margin: "auto",
    gridTemplateColumns: "repeat(2,1fr)",
    ["@media (min-width:640px)"]: {
      gridTemplateColumns: "repeat(3,1fr)",
    },
    ["@media (min-width:960px)"]: {
      gridTemplateColumns: "repeat(3,1fr)",
    },
    ["@media (min-width:1200px)"]: {
      gridTemplateColumns: "repeat(4,1fr)",
    },
  },
  col: {
   
  },
  pageButton: {
    color: "white",
  },
}));

function MovieList2({ searchParams }) {
  const history = useHistory();
  const location = useLocation();
  const movieListStyle = MovieListStyle();
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (searchParams !== null) {
      if (searchParams.get("page") === null) {
        searchParams.set("page", 1);
        setPage(1);
      } else {
        setPage(searchParams.get("page"));
      }
      getFilteredMovies(searchParams, page)
        .then((data) => {
          setMovieList(
            data.results.map((movie) => {
              return { media_type: searchParams.get("media_type"), ...movie };
            })
          );
          setIsLoading(false);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [searchParams, page]);

  const handleNextPage = () => {
    const page = searchParams.get("page");
    searchParams.set("page", parseInt(page) + 1);
    history.push({
      pathname: "/filter",
      search: searchParams.toString(),
    });
  };

  const handlePrevPage = () => {
    const page = searchParams.get("page");
    if (searchParams.get("page") !== "1") {
      searchParams.set("page", parseInt(page) - 1);
      history.push({
        pathname: "/filter",
        search: searchParams.toString(),
      });
    }
  };
  return (
    <>
      {" "}
      {isLoading === true ? (
        <>Loading</>
      ) : (
        <>
          <div className={movieListStyle.grid}>
            {movieList?.map((movie, key) => {
              return (
                <div className={movieListStyle.col} key={key}>
                  <MovieCard2 movie={movie} />
                </div>
              );
            })}
          </div>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            className={movieListStyle.pageButton}
          >
            <div onClick={handlePrevPage}>Previous</div>
            <div>Page {page}</div>
            <div onClick={handleNextPage}>Next</div>
          </Stack>
        </>
      )}
    </>
  );
}

export default MovieList2;
