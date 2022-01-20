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

    ["@media (min-width:960px)"]: {
      maxWidth: "70rem",
      gridTemplateColumns: "1fr 2fr",
    },
    ["@media (min-width:1200px)"]: {
      gridTemplateColumns: "1fr 3fr",
    },
  },
  col: {},
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
  info_text_box: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
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
            <div className={personInfoPageStyle.grid}>
              <div className={personInfoPageStyle.col}>
                <div className={personInfoPageStyle.img}>
                  <img  src={`http://image.tmdb.org/t/p/original/${tmdbPersonInfo.profile_path}`} />
                </div>
              </div>
              <div className={personInfoPageStyle.col}>
                <div className={personInfoPageStyle.info_grid}>
                  <div
                    className={`${personInfoPageStyle.info_col} ${style.name}`}
                  >
                    {tmdbPersonInfo.name}
                  </div>
                  <div  className={`${personInfoPageStyle.info_col} ${personInfoPageStyle.info_text_box}`}>
                    <div className={style.title}>POPULARITY</div>
                    <div className={style.content}>
                      {tmdbPersonInfo.popularity
                        ? `${tmdbPersonInfo.popularity}`
                        : "Unknown"}
                    </div>
                  </div>
                  <div className={`${personInfoPageStyle.info_col} ${personInfoPageStyle.info_text_box}`}>
                    <div className={style.title}>BIRTHDAY</div>
                    <div className={style.content}>
                      {tmdbPersonInfo.birthday
                        ? `${tmdbPersonInfo.birthday} (${age} years old)`
                        : "Unknown"}
                    </div>
                  </div>
                  <div className={`${personInfoPageStyle.info_col} ${personInfoPageStyle.info_text_box}`}>
                    <div className={style.title}>HEIGHT</div>
                    <div className={style.content}>
                      {tmdbPersonInfo.height
                        ? `${tmdbPersonInfo.height}`
                        : "Unknown"}
                    </div>
                  </div>
                  <div className={`${personInfoPageStyle.info_col} ${personInfoPageStyle.info_text_box}`}>
                    <div className={style.title}>PLACE OF BIRTH</div>
                    <div className={style.content}>
                      {tmdbPersonInfo.place_of_birth
                        ? `${tmdbPersonInfo.place_of_birth}`
                        : "Unknown"}
                    </div>
                  </div>
                  <div className={`${personInfoPageStyle.info_col} ${personInfoPageStyle.info_text_box}`}>
                    <div className={style.title}>STAR SIGN</div>
                    <div className={style.content}>
                      {imdbPersonInfo.star_sign
                        ? `${imdbPersonInfo.star_sign}`
                        : "Unknown"}
                    </div>
                  </div>
                  <div className={personInfoPageStyle.info_col}>
                    <div className={style.title}>BIOGRAPHY</div>
                    <div className={style.content_overview}>
                      {tmdbPersonInfo.biography
                        ? `${tmdbPersonInfo.biography}`
                        : "Unknown"}
                    </div>
                  </div>
                 
                </div>
              
              
              
              
              </div>
              <div className={personInfoPageStyle.col}>
                <VerticalScrollBox
                  title={"Known For"}
                  data={movieCredits}
                ></VerticalScrollBox>
              </div>
              <div className={personInfoPageStyle.col}>
                <CreditMovieList params={params}></CreditMovieList>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PersonInfoPage2;
