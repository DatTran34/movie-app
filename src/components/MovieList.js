import { Grid, Stack } from "@mui/material";
import { React, useEffect, useState } from "react";
import {
  getFilteredMovies,
  getMovies,
  getTrendingMovies,
  getUpComingMovies,
} from "../axios/MovieResquest";
import MovieStyle from "../styles/MovieStyle";
import MovieCard from "./MovieCard";
function MovieList({ searchParams }) {
  const movieStyle = MovieStyle();
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getFilteredMovies(searchParams)
      .then((data) => {
        console.log(data);
        setMovieList(
            data.results.map((movie) => {
              return { media_type: searchParams.get("media_type"), ...movie };
            })
        );
        setIsLoading(false)
      })
      .catch((e) => {
        console.error(e);
      });
  }, [searchParams]);
  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };
  
  return (
    <>
      {" "}
      {isLoading === true ? (
        <>Loading</>
      ) : (
        <>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            className={movieStyle.left_box}
          >
            {movieList?.map((movie, key) => {
              return (
                <Grid item xs={4} md={3} style={{ padding: "10px" }} key={key}>
                  <MovieCard movie={movie}></MovieCard>
                </Grid>
              );
            })}
          </Grid>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            className={movieStyle.pageButton}
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
