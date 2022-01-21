import { Stack, Box, CircularProgress } from "@mui/material";
import { React, useEffect, useState } from "react";
import { getImageMovie } from "../axios/MovieResquest";
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import MovieCardStyle from "../styles/components/MovieCardStyle";
import classNames from "classname";

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        display: "inline-flex",
        backgroundColor: "#363761",
        borderRadius: "100%",
        padding: "5px",
      }}
    >
      <CircularProgress
        style={{ color: "#4CCDEB" }}
        size={30}
        variant="determinate"
        color="primary"
        value={props.value * 10}
      />
      <Box
        sx={{
          left: "50%",
          top: "50%",
          padding: "20px",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#CCD2E3",
        }}
      >
        <div color="#CCD2E3" style={{ fontSize: "14px" }}>
          {`${props.value}`}
        </div>
      </Box>
    </Box>
  );
}

function MovieCard({ movie, isMovie }) {
  const history = useHistory();
  const movieCardStyle = MovieCardStyle();
  console.log(isMovie);
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
        {/* <CircularProgressWithLabel value={movie.vote_average} /> */}
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
