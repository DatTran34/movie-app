import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { getPersonInfo, getPersonMovieCredits,getPersonCombinedCredits } from "../axios/TmdbRequest";
import { getPersonDetails, getPersonBio } from "../axios/ImdbRequest";
import Style from '../styles/Style'
import NavBar from "../components/NavBar/NavBar"
import { useParams } from "react-router";
import PersonInfoPageStyle from "../styles/pages/PersonInfoPageStyle";
import MovieCard from "../components/MovieCard";
function PersonInfoPage() {
  const params = useParams()
  const [imdbPersonInfo, setImdbPersonInfo] = useState([]);
  const [tmdbPersonInfo, setTmdbPersonInfo] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  const [combinedCredits, setCombinedCredits] = useState([])
  const [imdb_id, setImdb_id] = useState(null);
  const [loading, setLoading] = useState(false);
  const style = Style()
  const personInfoPageStyle = PersonInfoPageStyle()
  useEffect(() => {
    getPersonInfo(params.id)
      .then((data) => {
        setTmdbPersonInfo(data);
        setImdb_id(data.imdb_id);
      })
      .catch((e) => {
        console.log(e);
      });

    getPersonMovieCredits(params.id)
      .then((data) => {
        setMovieCredits(data.cast.map((movie) => {
          return { media_type: "movie", ...movie };
        }));
      })
      .catch((e) => {
        console.log(e);
      });

    getPersonCombinedCredits(params.id)
      .then((data) => {
        console.log(data.cast)
        setCombinedCredits(data.cast.map((movie) => {
          if(movie.media_type === "movie")
          {
            return movie.release_date
          }
          else{
            return movie.first_air_date
          }
        }));
      })
      .catch((e) => {
        console.log(e);
      });

  }, []);

  console.log(combinedCredits)

  useEffect(() => {
    if (imdb_id === null) return
    Promise.all([
      getPersonDetails(imdb_id),
      getPersonBio(imdb_id)
    ]).then(([urlOneData, urlTwoData]) => {
      setImdbPersonInfo({ ...urlOneData.results, ...urlTwoData.results.biography })
      setLoading(true)
    }).catch((e) => { console.log(e) })
  }, [imdb_id])
  return (
    <>
      <NavBar></NavBar>
      <Stack paddingTop="200px" position="relative">
        {!loading ? (
          <Stack>Loading..</Stack>
        ) : (
          <>
            <Grid container style={{ zIndex: "1" }}>
              <Grid item xs={3}>
                <img
                  className={style.poster}
                  src={`http://image.tmdb.org/t/p/original/${tmdbPersonInfo.profile_path}`}
                />
              </Grid>
              <Grid item xs={6} className={style.root}>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Stack className={style.name}>
                      {tmdbPersonInfo.name}
                    </Stack>

                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Stack>
                      <Stack className={style.title}>POPULARITY</Stack>
                      <Stack className={style.content}>
                        {tmdbPersonInfo.popularity}
                      </Stack>
                    </Stack>
                    <Stack>
                      <Stack className={style.title}>BIRTHDAY</Stack>
                      <Stack className={style.content}>
                        {tmdbPersonInfo.birthday}
                      </Stack>
                    </Stack>
                    <Stack>
                      <Stack className={style.title}>HEIGHT</Stack>
                      <Stack className={style.content}>
                        {imdbPersonInfo.height}
                      </Stack>
                    </Stack>
                    <Stack>
                      <Stack className={style.title}>PLACE OF BIRTH</Stack>
                      <Stack className={style.content}>
                        {tmdbPersonInfo.place_of_birth}
                      </Stack>
                    </Stack>
                    <Stack>
                      <Stack className={style.title}>STAR SIGN</Stack>
                      <Stack className={style.content}>
                        {imdbPersonInfo.star_sign}
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack textAlign="left">
                    <Stack className={style.title}>BIOGRAPHY</Stack>
                    <Stack className={style.content}>
                      {tmdbPersonInfo.biography}
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack
                  backgroundColor="#16214A"
                  p={2}
                  m={2}
                  borderRadius="10px"
                  spacing={2}
                >
                  <Stack
                    color="#ffffff"
                    fontWeight="800"
                    fontSize="1.5rem"
                    textAlign="start"
                  >
                    Cast
                  </Stack>
                  <Stack spacing={2}>
                    {/* {cast.slice(0, 4).map((person, key) => (
                      <Stack direction="row" key={key}>
                        <img
                          className={style.cast_image}
                          src={`http://image.tmdb.org/t/p/w500/${person.profile_path}`}
                        />
                        <Stack pl={2} textAlign="start">
                          <Stack className={style.title}>
                            {person.original_name}
                          </Stack>
                          <Stack className={style.content}>
                            {person.character}
                          </Stack>
                        </Stack>
                      </Stack>
                    ))} */}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Grid container style={{ zIndex: "1", marginTop: "20px" }}>
              <Grid item xs={3}>
                ds
              </Grid>
              <Grid item xs={9} >
                <div className={personInfoPageStyle.right_box}>
                  <div className={personInfoPageStyle.container}>
                    <div className={personInfoPageStyle.known_for_title}>Known For</div>
                    <div className={personInfoPageStyle.known_for_box}>
                      <div className={personInfoPageStyle.known_for_box_overlay_outter}>
                        <Stack direction="row"
                          justifyContent="center"
                          alignItems="flex-start"
                          spacing={1}
                          className={personInfoPageStyle.known_for_box_overlay_inner}
                        >
                          {movieCredits.slice(0, 8).map((movie, key) => {
                            return (<MovieCard movie={movie} key={key}></MovieCard>)
                          })}
                        </Stack>
                      </div>
                    </div>
                  </div>
                  <div className={personInfoPageStyle.container}>
                    <div className={personInfoPageStyle.known_for_title}>Known For</div>
                    <div className={personInfoPageStyle.credits_box}>Known For</div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </Stack>
    </>
  );
}

export default PersonInfoPage;
