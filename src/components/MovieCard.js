import { Stack, Box, CircularProgress } from "@mui/material";
import {
  getMovieInfo
} from "../axios/TmdbRequest";
import { React, useEffect, useState } from "react";
import { getImageMovie } from "../axios/MovieResquest";
import { useHistory } from "react-router";
import { getRapidMovieInfo } from "../axios/RapidImdbRequest";
import { makeStyles } from "@mui/styles";
import MovieCardStyle from "../styles/components/MovieCardStyle";
import classNames from "classname";
import blank_poster from "../images/blank_poster.jpg"
function MovieCard({ movie, isMovie }) {
  const history = useHistory();
  const movieCardStyle = MovieCardStyle();
  const [tmdbMovieInfo, setTmdbMovieInfo] = useState([]);
  const [runtime, setRuntime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imdb_id, setImdb_id] = useState(null);
  const calRuntime = (total) => {
    var hours = total / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return `${rhours}h${rminutes}m`;
  };

  useEffect(() => {
    if (movie.id === null) return;
    getMovieInfo("movie", movie.id)
      .then((data) => {
        setTmdbMovieInfo(data);
        setImdb_id(data.imdb_id);
        setRuntime(calRuntime(data.runtime));
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [movie.id]);

  return (
      <div onClick={() => history.push(`/${movie.media_type}/${movie.id}`)}>
        <div className={movieCardStyle.box}>
          {movie.poster_path === null ? (
            <img
            className={movieCardStyle.img}
            src={blank_poster}
            />
          ) : (
            <img
              className={movieCardStyle.img}
              src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
          )}
          <div
            className={classNames({
              [movieCardStyle.movie_color_rating]: isMovie,
              [movieCardStyle.rating]: true,
            })}
          >
            {(movie.vote_average === 0) ? (
              `NR`
            ) : (
              movie.vote_average
            )} 
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
              <Stack direction="row" spacing={1} style={{alignItems: "center", justifyContent: "flex-start", width: "100%"}} >
                <div className={movieCardStyle.time}>
                  {runtime}
                </div>
                <div
                  className={classNames({
                    [movieCardStyle.movie_color]: isMovie,
                    [movieCardStyle.year]: true,
                  })}
                >
                  {movie.release_date.slice(0, 4)}
                </div>
              </Stack>
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
