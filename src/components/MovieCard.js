import { Stack, Box, CircularProgress } from "@mui/material";
import { React, useEffect, useState } from "react";
import { getImageMovie } from "../axios/MovieResquest";
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import MovieCardStyle from "../styles/components/MovieCardStyle";
import classNames from "classname";

function MovieCard({ movie, isMovie }) {
  const history = useHistory();
  const movieCardStyle = MovieCardStyle();
  return (
    <div onClick={() => history.push(`/${movie.media_type}/${movie.id}`)}>
      <div className={movieCardStyle.box}>
        <div className={movieCardStyle.imdb_rating_box}>IMBD 8.9</div>
        <img
          className={movieCardStyle.img}
          src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
        <div
          className={classNames({
            [movieCardStyle.movie_color_rating]: isMovie,
            [movieCardStyle.rating]: true,
          })}
        >
          {movie.vote_average}
        </div>
      </div>
      <Stack
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-start"
        textAlign="start"
        className={movieCardStyle.content}
        spacing={0.5}
      >
        {movie.media_type === "movie" ? (
          <>
            <div className={movieCardStyle.title}>{movie.title}</div>
            <div
              className={classNames({
                [movieCardStyle.movie_color]: isMovie,
                [movieCardStyle.year]: true,
              })}
            >
              {movie.release_date.slice(0, 4)}
            </div>
          </>
        ) : (
          <>
            <div className={movieCardStyle.title}>{movie.name}</div>
            <div
              className={classNames({
                [movieCardStyle.movie_color]: isMovie,
                [movieCardStyle.year]: true,
              })}
            >
              {movie.first_air_date.slice(0, 4)}
            </div>
          </>
        )}
      </Stack>
    </div>
  );
}

export default MovieCard;
