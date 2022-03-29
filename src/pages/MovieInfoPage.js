import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import {
  getMovieInfo,
  getCast,
  getRecommendedMovie,
} from "../axios/TmdbRequest";
import { getRapidMovieInfo } from "../axios/RapidImdbRequest";
import React, { useEffect, useState } from "react";
import Style from "../styles/Style";
import female_ava from "../images/female_ava.png";
import male_ava2 from "../images/male_ava2.png";
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
import classNames from "classname";
import MovieInfoPageStyle from "../styles/pages/MovieInfoPageStyle";
import YouTube from "react-youtube";
import Modal from "@mui/material/Modal";
import Carousel from 'react-material-ui-carousel'
const Trailer = ({videoId}) => {
  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={_onReady} />;
};

function MovieInfoPage() {
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
  const [openTrailers, setOpenTrailers] = React.useState(false);
  const handleOpenTrailers = () => setOpenTrailers(true);
  const handleCloseTrailers = () => setOpenTrailers(false);
  const calRuntime = (total) => {
    var hours = total / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return `${rhours}h${rminutes}m`;
  };
  console.log(tmdbMovieInfo)
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
        setRecommendedMovie(
          urlThreeData.results.map((movie) => {
            return { media_type: "movie", ...movie };
          })
        );
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
    if (!searchParams.has("media_type")) {
      searchParams.set("media_type", "movie");
    }
    // returns the existing query string: '?genre=fiction&year=2019'
    searchParams.set(key, value);
    history.push({
      pathname: "/filter",
      search: searchParams.toString(),
    });
  };
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
                  <div
                    className={classNames({
                      [movieInfoPageStyle.movie_color_rating]: true,
                      [movieInfoPageStyle.rating]: true,
                    })}
                  >
                    {tmdbMovieInfo.vote_average}
                  </div>
                </div>
              </div>
              <div className={movieInfoPageStyle.col}>
                <div className={movieInfoPageStyle.info_grid}>
                  <Stack>
                    <div className={`${style.name}`}>
                      {`${
                        tmdbMovieInfo.title
                      } (${tmdbMovieInfo.release_date.slice(0, 4)})`}
                    </div>
                  </Stack>
                  <div className={`${movieInfoPageStyle.trailer_genres_grid}`}>
                    <div
                      onClick={handleOpenTrailers}
                      className={`${style.trailer_button}`}
                    >
                      Watch Trailer
                    </div>
                    <div
                      className={`${style.rating_genre_grid}`}
                    >
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
                            className={movieInfoPageStyle.imdb_box}
                          >
                            <img
                              className={movieInfoPageStyle.imdb_img}
                              src={imdb}
                            />
                            <div className={movieInfoPageStyle.imdb_number}>
                              {rapidMovieInfo?.Ratings[0].Value.slice(0, -3)}
                            </div>
                          </Stack>
                        )}
                        {rapidMovieInfo?.Ratings[1] && (
                          <Stack
                            spacing={0.5}
                            direction="row"
                            className={movieInfoPageStyle.tomato_box}
                          >
                            <img
                              className={movieInfoPageStyle.tomato_img}
                              src={Rotten_Tomatoes2}
                            />
                            <div className={movieInfoPageStyle.tomato_number}>
                              {rapidMovieInfo?.Ratings[1].Value}
                            </div>
                          </Stack>
                        )}
                        {rapidMovieInfo?.Ratings[2] && (
                          <Stack
                            spacing={1.5}
                            direction="row"
                            p={0.5}
                            px={1}
                            className={movieInfoPageStyle.metacritic_box}
                          >
                            <img
                              className={movieInfoPageStyle.metacritic_img}
                              src={metacritic}
                            />
                            <div
                              className={movieInfoPageStyle.metacritic_number}
                            >
                              {rapidMovieInfo?.Ratings[2].Value.slice(0, -4)}
                            </div>
                          </Stack>
                        )}
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={1}
                        className={`${movieInfoPageStyle.genres_grid}`}
                      >
                        {tmdbMovieInfo.genres.map((genre, key) => (
                          <div
                            onClick={() => {
                              addQuery("genre", `${genre.id}`);
                            }}
                            key={key}
                            className={`${style.category_button}`}
                          >
                            <div>{genre.name}</div>
                          </div>
                        ))}
                      </Stack>
                    </div>
                  </div>
                  <div className={`${movieInfoPageStyle.info_col_grid}`}>
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
                      <div className={style.title}>DIRECTOR</div>
                      <div className={style.content}>
                        {rapidMovieInfo.Director}
                      </div>
                    </div>
                    <div className={movieInfoPageStyle.info_text_box}>
                      <div className={style.title}>BUDGET</div>
                      <div className={style.content}>
                        {`$${tmdbMovieInfo.budget.toLocaleString("en-US")}`}
                      </div>
                    </div>
                    <div className={movieInfoPageStyle.info_text_box}>
                      <div className={style.title}>REVENUE</div>
                      <div className={style.content}>
                        {`$${tmdbMovieInfo.revenue.toLocaleString("en-US")}`}
                      </div>
                    </div>
                  </div>
                  <div className={movieInfoPageStyle.overview}>
                    {tmdbMovieInfo.overview}
                  </div>
                </div>
              </div>
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
                            onClick={() => history.push(`/person/${person.id}`)}
                          >
                            <>
                            {(person.profile_path === null) ? (
                              <>
                              {(person.gender === 1) ? (
                                <img
                                className={movieInfoPageStyle.cast_image}
                                src={female_ava}
                              />
                              ) : (
                                <img
                                className={movieInfoPageStyle.cast_image}
                                src={male_ava2}
                              />
                              )}
                              </>
                            ) : (
                              <img
                                className={movieInfoPageStyle.cast_image}
                                src={`http://image.tmdb.org/t/p/original/${person.profile_path}`}
                              />
                            )}
                            </>

                            <Stack
                              direction="column"
                              justifyContent="center"
                              alignItems="flex-start"
                              style={{ textAlign: "left" }}
                              spacing={0.025}
                            >
                              <div
                                style={{
                                  color: "#4CCDEB",
                                  fontWeight: "600",
                                  width: "10rem",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {person.name}
                              </div>
                              <div
                                style={{
                                  color: "white",
                                  fontWeight: "500",
                                  width: "10rem",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                }}
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
              <Award ImdbID={imdb_id} />
              <VerticalScrollBox
                isMovie={true}
                title={"Similar Movies"}
                data={recommendedMovie}
              ></VerticalScrollBox>
              <div>

              </div>
            </div>
          </>
        )}
      </Stack>
      <Modal
        open={openTrailers}
        onClose={handleCloseTrailers}
        style={{ padding: "100px" }}
      >
        <Carousel
          style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
          
          navButtonsProps={{
            // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
            style: {
              backgroundColor: "cornflowerblue",
              borderRadius: 0,
            },
          }}
        >
          {tmdbMovieInfo.videos?.results.map((video, key) => (
            <div
              style={{
                display: "flex", flexDirection: "row", justifyContent: "center",
                width: "100%",
                height: "400px",
              }}
            >
              <Trailer key={key} videoId={video.key} />
            </div>
          ))}
        </Carousel>
      </Modal>
    </>
  );
}

export default MovieInfoPage;
