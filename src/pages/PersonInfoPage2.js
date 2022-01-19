import React, { useState, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import {
  getPersonInfo,
  getPersonMovieCredits,
  getPersonCombinedCredits,
} from "../axios/TmdbRequest";
import { getPersonDetails, getPersonBio } from "../axios/ImdbRequest";
import Style from "../styles/Style";
import NavBar from "../components/NavBar/NavBar";
import { useParams } from "react-router";
//import PersonInfoPageStyle from "../styles/pages/PersonInfoPageStyle";
import CreditMovieList from "../components/CreditMovieList";
import MovieStyle from "../styles/MovieStyle";
import VerticalScrollBox from "../components/VerticalScrollBox";
import cast_img from "../images/cast_img.jpg";

import { makeStyles } from "@mui/styles";

const PersonInfoPageStyle = makeStyles((theme) => ({
  grid_info: {
    display: "grid",
    background: "white",
    justifyContent: "center",
    gridGap: "1rem",
    ["@media (min-width:960px)"]: {
      gridTemplateColumns: "1fr 3fr",
      background: "red",
      "& img": {
        width: "70%",
      },
    },
    ["@media (min-width:1200px)"]: {
      gridTemplateColumns: "1fr 2.5fr 1fr",
      background: "blue",
    },
    width: "100%",
  },
  col: {
    background: "pink",
    "& img": {
      width: "100%",
    },
  },
}));

function PersonInfoPage2() {
  const params = useParams();
  const movieStyle = MovieStyle();
  const [age, setAge] = useState(null);
  const [imdbPersonInfo, setImdbPersonInfo] = useState([]);
  const [tmdbPersonInfo, setTmdbPersonInfo] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  const [imdb_id, setImdb_id] = useState(null);
  const [loading, setLoading] = useState(false);
  const style = Style();
  const personInfoPageStyle = PersonInfoPageStyle();

  useEffect(() => {
    Promise.all([getPersonInfo(params.id), getPersonMovieCredits(params.id)])
      .then(([urlOneData, urlTwoData]) => {
        setTmdbPersonInfo(urlOneData);
        setImdb_id(urlOneData.imdb_id);
        setMovieCredits(
          urlTwoData.cast.map((movie) => {
            return { media_type: "movie", ...movie };
          })
        );
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (imdb_id === null) return;
    Promise.all([getPersonDetails(imdb_id), getPersonBio(imdb_id)])
      .then(([urlOneData, urlTwoData]) => {
        setImdbPersonInfo({
          ...urlOneData.results,
          ...urlTwoData.results.biography,
        });
        let dob = tmdbPersonInfo.birthday.replace(/-/g, "");
        setAge(
          calculate_age(
            new Date(dob.slice(0, 4), dob.slice(4, 6), dob.slice(6, 8))
          )
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, [imdb_id]);
  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  return (
    <>
      <NavBar></NavBar>
      <div style={{ padding: "12rem 1.5rem", position: "relative" }}>
        {!loading ? (
          <div>Loading..</div>
        ) : (
          <>
            <div className={personInfoPageStyle.grid_info}>
              <div className={personInfoPageStyle.col}>
                <img src={cast_img}></img>
              </div>
              <div className={personInfoPageStyle.col}>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Stack className={style.name}>{tmdbPersonInfo.name}</Stack>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Stack className={style.box}>
                      <Stack className={style.title}>POPULARITY</Stack>
                      <Stack className={style.content}>
                        {tmdbPersonInfo.popularity
                          ? `${tmdbPersonInfo.popularity}`
                          : "Unknown"}
                      </Stack>
                    </Stack>
                    <Stack className={style.box}>
                      <Stack className={style.title}>BIRTHDAY</Stack>
                      <Stack className={style.content}>
                        {tmdbPersonInfo.birthday
                          ? `${tmdbPersonInfo.birthday} (${age} years old)`
                          : "Unknown"}
                      </Stack>
                    </Stack>
                    <Stack className={style.box}>
                      <Stack className={style.title}>HEIGHT</Stack>
                      <Stack className={style.content}>
                        {tmdbPersonInfo.height
                          ? `${tmdbPersonInfo.height}`
                          : "Unknown"}
                      </Stack>
                    </Stack>
                    <Stack className={style.box}>
                      <Stack className={style.title}>PLACE OF BIRTH</Stack>
                      <Stack className={style.content}>
                        {tmdbPersonInfo.place_of_birth
                          ? `${tmdbPersonInfo.place_of_birth}`
                          : "Unknown"}
                      </Stack>
                    </Stack>
                    <Stack className={style.box}>
                      <Stack className={style.title}>STAR SIGN</Stack>
                      <Stack className={style.content}>
                        {imdbPersonInfo.star_sign
                          ? `${imdbPersonInfo.star_sign}`
                          : "Unknown"}
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack textAlign="left">
                    <Stack className={style.title}>BIOGRAPHY</Stack>
                    <Stack className={style.content_overview}>
                      {tmdbPersonInfo.biography
                        ? `${tmdbPersonInfo.biography}`
                        : "Unknown"}
                    </Stack>
                  </Stack>
                </Stack>
              </div>
              <div className={personInfoPageStyle.col}>cast</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PersonInfoPage2;
