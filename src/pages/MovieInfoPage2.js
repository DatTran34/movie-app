import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import {
  getMovieInfo,
  getCast,
  getRecommendedMovie,
} from "../axios/TmdbRequest";
import { getRapidMovieInfo } from "../axios/RapidImdbRequest";
import React, { useEffect, useState } from "react";
import Style from "../styles/Style";
import avatar from "../images/avatar.png";
import imdb from "../images/imdb.png";
import metacritic from "../images/metacritic.png";
import Rotten_Tomatoes1 from "../images/Rotten_Tomatoes1.png";
import Rotten_Tomatoes2 from "../images/Rotten_Tomatoes2.png";
import Rotten_Tomatoes3 from "../images/Rotten_Tomatoes3.png";
import { Box } from "@mui/system";
import Award from "../components/Award";
import NavBar from "../components/NavBar/NavBar";
import { useParams } from "react-router";
import { useHistory, useLocation } from "react-router";
import VerticalScrollBox from "../components/VerticalScrollBox";

import { makeStyles } from "@mui/styles";

const MovieInfoPageStyle = makeStyles((theme) => ({
  grid: {
    justifyContent: "center",
    // alignContent:"center",
    // ["@media (min-width:720px)"]: {
    //   gridTemplateColumns: "1fr 2fr",
    // },
    // ["@media (min-width:1200px)"]: {
    //   gridTemplateColumns: "1fr 3fr",
    // },
    display: "grid",
    padding: "1rem",
    gridGap: "1rem",
    margin: "auto",
    background: "white",
    ["@media (min-width:960px)"]: {
      maxWidth: "70rem",
      gridTemplateColumns: "1fr 2fr",
    },
    ["@media (min-width:1200px)"]: {
      gridTemplateColumns: "1fr 3fr",
    },
  },
  col: {
    background: "pink",
  },
  img: {
    "& img": {
      width: "100%",
      display: "block",
      margin: "auto",
    },
  },
  info_grid: {
    display: "grid",
    //background: "#2d375a",
    gridGap: "1rem",
    //padding: "1rem",
    borderRadius: "1rem",
  },
  info_col: {
    //background: "yellow",
    color: "#fff",
  },
  info_col_grid: {
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "1fr 1fr",
  },
  info_text_box: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  trailer_genres_grid: {
    display: "grid",
    gridGap: "1rem",
    background: "red",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  trailer_genres_col: {
    background: "blue",
  },
  cast_container: {
    background: "#172a46",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
    marginBottom: "1rem",
  },
  cast: {
    width: "100%",
  },
  cast_overlay_outter: {
    overflow: "auto",
    display: "flex",
    alignItems: "flex-start",
    height: "300px",
  },
  cast_overlay_inner: {},
  cast_title: {
    color: "#F6C700",
    fontWeight: "700",
    fontSize: "24px",
    paddingBottom: "20px",
  },
}));

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        backgroundColor: "#363761",
        borderRadius: "100%",
        padding: "5px",
      }}
    >
      <CircularProgress
        style={{ color: "#4CCDEB" }}
        size={48}
        variant="determinate"
        color="primary"
        value={props.value * 10}
      />
      <Box
        sx={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#CCD2E3",
        }}
      >
        <Stack color="#CCD2E3">{`${props.value}`}</Stack>
      </Box>
    </Box>
  );
}

function MovieInfoPage2() {
  const movieInfoPageStyle = MovieInfoPageStyle();
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const style = Style();
  const [tmdbMovieInfo, setTmdbMovieInfo] = useState([]);
  const [rapidMovieInfo, setRapidMovieInfo] = useState([]);
  const [recommendedMovie, setRecommendedMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imdb_id, setImdb_id] = useState(null);
  const [runtime, setRuntime] = useState([]);
  const calRuntime = (total) => {
    var hours = total / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return `${rhours}h${rminutes}m`;
  };
  useEffect(() => {
    Promise.all([
      getMovieInfo("movie", params.id),
      getCast("movie", params.id),
      getRecommendedMovie("movie", params.id),
    ])
      .then(([urlOneData, urlTwoData, urlThreeData]) => {
        setTmdbMovieInfo(urlOneData);
        setRuntime(calRuntime(urlOneData.runtime));
        setImdb_id(urlOneData.imdb_id);
        setCast(urlTwoData.cast);
        setRecommendedMovie(urlThreeData.results);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (imdb_id === null) return;
    getRapidMovieInfo(imdb_id)
      .then((data) => {
        setRapidMovieInfo(data);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [imdb_id]);

  const addQuery = (key, value) => {
    // returns path: '/app/books'
    let searchParams = new URLSearchParams(location.search);
    checkMediaType(searchParams);
    // returns the existing query string: '?genre=fiction&year=2019'
    searchParams.set(key, value);
    history.push({
      pathname: "/filter",
      search: searchParams.toString(),
    });
  };
  const checkMediaType = (searchParams) => {
    if (!searchParams.has("media_type")) {
      searchParams.set("media_type", "movie");
    }
  };
  console.log(cast);
  return (
    <>
      <NavBar></NavBar>
      <Stack padding="12rem 1.5rem " position="relative">
        {!loading ? (
          <Stack>Loading..</Stack>
        ) : (
          <>
            {/* <Stack className={style.backdrop_container}>
              <Stack className={style.backdrop_blur1}></Stack>
              <Stack className={style.backdrop_blur2}></Stack>
              <Stack className={style.backdrop_blur3}></Stack>
              <Stack className={style.backdrop_blur4}></Stack>
              <img
                className={style.backdrop}
                src={`http://image.tmdb.org/t/p/original/${tmdbMovieInfo.backdrop_path}`}
              />
            </Stack> */}
            <div className={movieInfoPageStyle.grid}>
              <div className={movieInfoPageStyle.col}>
                <div className={movieInfoPageStyle.img}>
                  <img
                    src={`http://image.tmdb.org/t/p/original/${tmdbMovieInfo.poster_path}`}
                  />
                </div>
              </div>
              <div className={movieInfoPageStyle.col}>
                <div className={movieInfoPageStyle.info_grid}>
                  <div
                    className={`${movieInfoPageStyle.info_col} ${style.name}`}
                  >
                    {tmdbMovieInfo.title}
                  </div>
                  <div
                    className={`${movieInfoPageStyle.info_col} ${movieInfoPageStyle.trailer_genres_grid}`}
                  >
                    <div
                      className={`${style.trailer_button} ${movieInfoPageStyle.trailer_genres_col}`}
                    >
                      Watch Trailer
                    </div>
                    {tmdbMovieInfo.genres.map((genre, key) => (
                      <div
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          addQuery("genre", `${genre.id}`);
                        }}
                        key={key}
                        className={`${style.category_button} ${movieInfoPageStyle.trailer_genres_col}`}
                      >
                        <div>{genre.name}</div>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`${movieInfoPageStyle.info_col} ${movieInfoPageStyle.info_col_grid}`}
                  >
                    <div className={movieInfoPageStyle.info_text_box}>
                      <div className={style.title}>STATUS</div>
                      <div className={style.content}>
                        {tmdbMovieInfo.status}
                      </div>
                    </div>
                    <div className={movieInfoPageStyle.info_text_box}>
                      <div className={style.title}>COUNTRY</div>
                      <div className={style.content}>
                        {tmdbMovieInfo.production_countries[0]?.name}
                      </div>
                    </div>
                    <div className={movieInfoPageStyle.info_text_box}>
                      <div className={style.title}>RUNTIME</div>
                      <div className={style.content}>{runtime}</div>
                    </div>
                    <div className={movieInfoPageStyle.info_text_box}>
                      <div className={style.title}>DIRECTOR</div>
                      <div className={style.content}>
                        {rapidMovieInfo.Director}
                      </div>
                    </div>
                  </div>
                  <div className={movieInfoPageStyle.info_col}>
                    {tmdbMovieInfo.overview}
                  </div>
                </div>
              </div>
              <div className={movieInfoPageStyle.col}>
                <div className={movieInfoPageStyle.cast_container}>
                  <div className={movieInfoPageStyle.cast_title}>Cast</div>
                  <div className={movieInfoPageStyle.cast}>
                    <div className={movieInfoPageStyle.cast_overlay_outter}>
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={1}
                        className={movieInfoPageStyle.cast_overlay_inner}
                      >
                        {cast?.map((person, key) => {
                          return (
                            <Stack
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                              spacing={1}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                history.push(`/movie/${person.id}`)
                              }
                            >
                              <img style={{width:"4rem"}}
                                src={`http://image.tmdb.org/t/p/w500/${person.profile_path}`}
                              />
                              <Stack
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                style={{ textAlign: "left" }}
                                spacing={1}
                              >
                                <div style={{color: "#4CCDEB", fontWeight: "600"}} >
                                  {person.name}
                                </div>
                                <div style={{color: "white", fontWeight: "500"}}>
                                  {person.character}
                                </div>
                              </Stack>
                            </Stack>
                          );
                        })}
                      </Stack>
                    </div>
                  </div>
                </div>
                <VerticalScrollBox
                  title={"Known For"}
                  data={recommendedMovie}
                ></VerticalScrollBox>
              </div>
              <div className={movieInfoPageStyle.col}>d</div>
            </div>
          </>
        )}
      </Stack>
    </>
  );
}

export default MovieInfoPage2;
