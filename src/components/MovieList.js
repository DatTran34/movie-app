import { React, useEffect, useState } from "react";
import { getFiltered, getMultiSearch } from "../axios/MovieResquest";
import MovieListStyle from '../styles/components/MovieListStyle';
import { useHistory, useLocation } from "react-router";
import MovieCard from "./MovieCard";
import { Stack } from "@mui/material";

function MovieList({ searchParams }) {
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
      if(searchParams.has("query")){
        getMultiSearch(searchParams.get("media_type"), searchParams.get("query"), page)
        .then((data) => {
          console.log(data)
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
      } else {
        getFiltered(searchParams, page)
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
                  <MovieCard movie={movie} />
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

export default MovieList;
