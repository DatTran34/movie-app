import { React, useEffect, useState } from "react";
import { getFiltered, getMultiSearch } from "../axios/MovieResquest";
import MovieListStyle from "../styles/components/MovieListStyle";
import { useHistory, useLocation } from "react-router";
import MovieCard from "./MovieCard";
import { CircularProgress, Stack } from "@mui/material";
import classNames from "classname";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LoadingProcess from "./LoadingProcess";
function MovieList() {
  const history = useHistory();
  const location = useLocation();
  const movieListStyle = MovieListStyle();
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMovie, setIsMovie] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(1);
  console.log(page)
  useEffect(() => {
    if (searchParams === null) return;
    if (searchParams.get("media_type") === "movie") {
      setIsMovie(true);
    } else if (searchParams.get("media_type") === "tv") {
      setIsMovie(false);
    }
    if (!searchParams.has("page")) {
      searchParams.set("page", 1);
      setPage(1);
    } else {
      setPage(searchParams.get("page"));
    }
    if (searchParams.has("query")) {
      getMultiSearch(
        searchParams.get("media_type"),
        searchParams.get("query"),
        page
      )
        .then((data) => {
          console.log(data);
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
  }, [location, page]);
  const handleNextPage = (level) => {
    const page = searchParams.get("page");
    searchParams.set("page", parseInt(page) + level);
    history.push({
      pathname: "/filter",
      search: searchParams.toString(),
    });
  };

  const handlePrevPage = (level) => {
    const page = searchParams.get("page");
    if (searchParams.get("page") !== "1") {
      searchParams.set("page", parseInt(page) - level);
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
        <LoadingProcess/>
      ) : (
        <>
          <div className={movieListStyle.grid}>
            {movieList?.map((movie, key) => {
              return <MovieCard key={key} movie={movie} isMovie={isMovie} />;
            })}
          </div>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            className={movieListStyle.pagination}
          >
            {parseInt(page) === 1 ? (
              <>
                <Stack direction="row" p={1} spacing={2}>
                  <div
                    className={classNames({
                      [movieListStyle.movie_color]: isMovie,
                      [movieListStyle.pagination_number_focus]: true,
                      [movieListStyle.pagination_number]: true,
                    })}
                  >
                    {page}
                  </div>
                  <div
                    className={movieListStyle.pagination_number}
                    onClick={() => {
                      handleNextPage(1);
                    }}
                  >{`${parseInt(page) + 1}`}</div>
                  <div
                    className={movieListStyle.pagination_number}
                    onClick={() => {
                      handleNextPage(2);
                    }}
                  >{`${parseInt(page) + 2}`}</div>
                </Stack>
                <ArrowRightIcon
                  className={movieListStyle.pagination_btn}
                  onClick={() => {
                    handleNextPage(1);
                  }}
                />
              </>
            ) : (
              <>
                {parseInt(page) === 2 ? (
                  <>
                    <ArrowLeftIcon
                      className={movieListStyle.pagination_btn}
                      onClick={() => {
                        handlePrevPage(1);
                      }}
                    />
                    <Stack direction="row" p={1} spacing={2}>
                      <div
                        className={movieListStyle.pagination_number}
                        onClick={() => {
                          handlePrevPage(1);
                        }}
                      >
                        {page - 1}
                      </div>
                      <div
                        className={classNames({
                          [movieListStyle.movie_color]: isMovie,
                          [movieListStyle.pagination_number_focus]: true,
                          [movieListStyle.pagination_number]: true,
                        })}
                      >
                        {page}
                      </div>
                      <div
                        className={movieListStyle.pagination_number}
                        onClick={() => {
                          handleNextPage(1);
                        }}
                      >{`${parseInt(page) + 1}`}</div>
                      <div
                        className={movieListStyle.pagination_number}
                        onClick={() => {
                          handleNextPage(2);
                        }}
                      >{`${parseInt(page) + 2}`}</div>
                    </Stack>
                    <ArrowRightIcon
                      className={movieListStyle.pagination_btn}
                      onClick={() => {
                        handleNextPage(1);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <ArrowLeftIcon
                      className={movieListStyle.pagination_btn}
                      onClick={() => {
                        handlePrevPage(1);
                      }}
                    />
                    <Stack direction="row" p={1} spacing={2}>
                      <div
                        className={movieListStyle.pagination_number}
                        onClick={() => {
                          handlePrevPage(2);
                        }}
                      >
                        {page - 2}
                      </div>
                      <div
                        className={movieListStyle.pagination_number}
                        onClick={() => {
                          handlePrevPage(1);
                        }}
                      >
                        {page - 1}
                      </div>
                      <div
                        className={classNames({
                          [movieListStyle.movie_color]: isMovie,
                          [movieListStyle.pagination_number_focus]: true,
                          [movieListStyle.pagination_number]: true,
                        })}
                      >
                        {page}
                      </div>
                      <div
                        className={movieListStyle.pagination_number}
                        onClick={() => {
                          handleNextPage(1);
                        }}
                      >{`${parseInt(page) + 1}`}</div>
                      <div
                        className={movieListStyle.pagination_number}
                        onClick={() => {
                          handleNextPage(2);
                        }}
                      >{`${parseInt(page) + 2}`}</div>
                    </Stack>
                    <ArrowRightIcon
                      className={movieListStyle.pagination_btn}
                      onClick={() => {
                        handleNextPage(1);
                      }}
                    />
                  </>
                )}
              </>
            )}
          </Stack>
        </>
      )}
    </>
  );
}

export default MovieList;
