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
import SeasonSelector from "../components/SeasonSelector";
import MovieInfoPageStyle from "../styles/pages/MovieInfoPageStyle";
import VerticalScrollBox from "../components/VerticalScrollBox";
import classNames from "classname";
function TvShowInfoPage() {
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
    return `${rhours}h ${rminutes}m`;
  };
  useEffect(() => {
    Promise.all([
      getMovieInfo("tv", params.id),
      getCast("tv", params.id),
      getRecommendedMovie("tv", params.id),
    ])
      .then(([urlOneData, urlTwoData, urlThreeData]) => {
        setTmdbMovieInfo(urlOneData);
        setRuntime(calRuntime(urlOneData.episode_run_time));
        setImdb_id(urlOneData.external_ids.imdb_id);
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
      searchParams.set("media_type", "tv");
    }
  };

  console.log(tmdbMovieInfo);
  return (
    <>
      <NavBar></NavBar>
      <Stack paddingTop="200px" position="relative">
        {!loading ? (
          <Stack>Loading..</Stack>
        ) : (
          <>
            {/* <Stack className={style.backdrop_container} >
                            <Stack className={style.backdrop_blur1}></Stack>
                            <Stack className={style.backdrop_blur2}></Stack>
                            <Stack className={style.backdrop_blur3}></Stack>
                            <Stack className={style.backdrop_blur4}></Stack>
                            <img className={style.backdrop} src={`http://image.tmdb.org/t/p/original/${tmdbMovieInfo.backdrop_path}`}/>
                        </Stack> */}
            <div className={movieInfoPageStyle.grid}>
              <div className={movieInfoPageStyle.col}>
                <div className={movieInfoPageStyle.img}>
                  <img
                    src={`http://image.tmdb.org/t/p/original/${tmdbMovieInfo.poster_path}`}
                  />
                  <div
                    className={classNames({
                      [movieInfoPageStyle.movie_color_rating]: true,
                      [movieInfoPageStyle.rating]: true,
                    })}
                  >
                    {tmdbMovieInfo.vote_average}
                  </div>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    {rapidMovieInfo?.Ratings[0] && (
                      <Stack
                        spacing={0.5}
                        direction="row"
                        py={0.5}
                        px={1}
                        backgroundColor="#F6C700"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <img
                          style={{ width: "60px", height: "25px" }}
                          src={imdb}
                        />
                        <Stack
                          pb={0.25}
                          color="#000000"
                          fontWeight="800"
                          fontSize="1.5rem"
                        >
                          {rapidMovieInfo?.Ratings[0].Value.slice(0, -3)}
                        </Stack>
                      </Stack>
                    )}
                    {rapidMovieInfo?.Ratings[1] && (
                      <Stack
                        spacing={0.5}
                        direction="row"
                        p={0.5}
                        px={1}
                        backgroundColor="#ffffff"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <img
                          style={{ width: "30px", height: "30px" }}
                          src={Rotten_Tomatoes2}
                        />
                        <Stack
                          pb={0.25}
                          color="#000000"
                          fontWeight="800"
                          fontSize="1.5rem"
                        >
                          {rapidMovieInfo?.Ratings[1].Value}
                        </Stack>
                      </Stack>
                    )}
                    {rapidMovieInfo?.Ratings[2] && (
                      <Stack
                        spacing={1.5}
                        direction="row"
                        p={0.5}
                        px={1}
                        backgroundColor="#66CC33"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <img
                          style={{ width: "30px", height: "30px" }}
                          src={metacritic}
                        />
                        <Stack
                          pb={0.25}
                          color="#ffffff"
                          fontWeight="800"
                          fontSize="1.5rem"
                        >
                          {rapidMovieInfo?.Ratings[2].Value.slice(0, -4)}
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                </div>
              </div>
              <div className={movieInfoPageStyle.col}>
                <div className={movieInfoPageStyle.info_grid}>
                  <div
                    className={`${movieInfoPageStyle.info_col} ${style.name}`}
                  >
                    {tmdbMovieInfo.name}
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
                        {rapidMovieInfo.Country}
                      </div>
                    </div>
                    <div className={movieInfoPageStyle.info_text_box}>
                      <div className={style.title}>RUNTIME</div>
                      <div className={style.content}>{runtime}</div>
                    </div>
                    <div className={movieInfoPageStyle.info_text_box}>
                      <div className={style.title}>CREATOR</div>
                      <div className={style.content} style={{display: "flex", flexDirection: "column"}}>
                        {tmdbMovieInfo.created_by.map((person) => {
                          return <div>{`${person.name}`}</div>
                        }
                        )}
                      </div>
                    </div>
                    <div className={movieInfoPageStyle.info_text_box}>
                      <div className={style.title}>NUMBER OF SEASONS</div>
                      <div className={style.content}>
                        {tmdbMovieInfo.number_of_seasons}
                      </div>
                    </div>
                    <div className={movieInfoPageStyle.info_text_box}>
                      <div className={style.title}>NUMBER OF EPISODES</div>
                      <div className={style.content}>
                       {tmdbMovieInfo.number_of_episodes}
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
                                history.push(`/person/${person.id}`)
                              }
                            >
                              <img
                                style={{ width: "4rem" }}
                                src={`http://image.tmdb.org/t/p/w500/${person.profile_path}`}
                              />
                              <Stack
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                style={{ textAlign: "left" }}
                                spacing={1}
                              >
                                <div
                                  style={{
                                    color: "#4CCDEB",
                                    fontWeight: "600",
                                  }}
                                >
                                  {person.name}
                                </div>
                                <div
                                  style={{ color: "white", fontWeight: "500" }}
                                >
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
              </div>
              <Award ImdbID={imdb_id} />
              <VerticalScrollBox
                isMovie={false}
                title={"Recommendations"}
                data={recommendedMovie}
              ></VerticalScrollBox>
              <SeasonSelector seasons={tmdbMovieInfo.seasons} />
            </div>
          </>
        )}
      </Stack>
    </>
  );
}

export default TvShowInfoPage;
