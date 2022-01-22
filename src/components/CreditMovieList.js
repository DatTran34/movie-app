import React, { useState, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import { getPersonCombinedCredits } from "../axios/TmdbRequest";
import PersonInfoPageStyle from "../styles/pages/PersonInfoPageStyle";
import { makeStyles } from "@mui/styles";
import { useHistory, useLocation } from "react-router";
const YearSelectorStyle = makeStyles((theme) => ({
  root: {
    "& select": {
      backgroundColor: "#172a46",
      padding: "10px",
      color: "#CCD2E3",
      border: "none",
      alignItems: "left",
      fontWeight:"600",
      fontSize:"14px"
    },
    alignItems: "left",
  },
  selectItems: {
    backgroundColor: "DodgerBlue",
  },
}));

function YearSelector({ yearCollection, setYearSelector }) {
  const yearSelectorStyle = YearSelectorStyle();
  const handleYear = (e) => {
    setYearSelector(e.target.value);
  };
  if (Object.entries(yearCollection).length === 0) {
    return null;
  } else {
    return (
      <div className={yearSelectorStyle.root}>
        <select onChange={handleYear}>
          {Object.entries(yearCollection)?.map(([k, v], key) => {
            return (
              <option value={k} key={key}>
                {k}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

function CreditMovieList({ params }) {
    const history = useHistory();
  const personInfoPageStyle = PersonInfoPageStyle();
  const [credits, setCredits] = useState(null);
  const [filteredCredits, setFilteredCredits] = useState({});
  const [yearSelector, setYearSelector] = useState("2021");
  const [yearCollection, setYearCollection] = useState({});
  useEffect(() => {
    Promise.all([getPersonCombinedCredits(params.id)])
      .then(([urlData]) => {
        let year = {};
        urlData.cast.map((movie) => {
          if (movie.media_type === "movie") {
            year = {
              [new Date(movie.release_date).getFullYear()]: "year",
              ...year,
            };
          } else {
            year = {
              [new Date(movie.first_air_date).getFullYear()]: "year",
              ...year,
            };
          }
        });
        urlData.crew.map((movie) => {
          if (movie.media_type === "movie") {
            year = {
              [new Date(movie.release_date).getFullYear()]: "year",
              ...year,
            };
          } else {
            year = {
              [new Date(movie.first_air_date).getFullYear()]: "year",
              ...year,
            };
          }
        });
        setYearCollection(year);
        setCredits(urlData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (credits === null) return;
    let acting = {};
    let crew = {};
    let directing = {};
    let production = {};
    credits.cast.map((movie) => {
      let a = Object.assign({}, generateYearOfCredits(movie, acting));
      acting = { ...a, ...acting };
    });
    credits.crew.map((movie) => {
      if (movie.department === "Crew") {
        let a = Object.assign({}, generateYearOfCredits(movie, crew));
        crew = { ...a, ...crew };
      } else if (movie.department === "Directing") {
        let a = Object.assign({}, generateYearOfCredits(movie, directing));
        directing = { ...a, ...directing };
      } else if (movie.department === "Production") {
        let a = Object.assign({}, generateYearOfCredits(movie, production));
        production = { ...a, ...production };
      }
    });
    setFilteredCredits({
      ["Acting"]: acting,
      ["Production"]: production,
      ["Crew"]: crew,
      ["Directing"]: directing,
    });
  }, [credits,yearSelector]);
  //============ GENERATE YEAR OF CREDITS ============
  const generateYearOfCredits = (data, object) => {
    if (data.media_type === "movie") {
      if (
        new Date(data.release_date).getFullYear().toString() === yearSelector
      ) {
        let array = object[new Date(data.release_date).getFullYear()];
        if (array === undefined) {
          array = [data];
        } else {
          array.push(data);
        }
        object = {
          [new Date(data.release_date).getFullYear()]: array,
          ...object,
        };
      }
    } else {
      if (
        new Date(data.first_air_date).getFullYear().toString() === yearSelector
      ) {
        let array = object[new Date(data.first_air_date).getFullYear()];
        if (array === undefined) {
          array = [data];
        } else {
          array.push(data);
        }
        object = {
          [new Date(data.first_air_date).getFullYear()]: array,
          ...object,
        };
      }
    }
    return object;
  };

  return (
    <div className={personInfoPageStyle.credits_box_container}>
      <div className={personInfoPageStyle.credits_box_title}>
        Filter Credits By Year
      </div>
      <YearSelector
        yearCollection={yearCollection}
        setYearSelector={setYearSelector}
      ></YearSelector>
      <div>
        {Object.entries(filteredCredits).map(([k, v], key) => {
          if (Object.entries(v).length === 0) {
            return null;
          }
          return (
            <div key={key}>
              <div className={personInfoPageStyle.credits_box_title}>{k}</div>
              <div className={personInfoPageStyle.credits_box}>
                {Object.entries(v).map(([k, v], key) => {
                  return (
                    <div key={key}>
                      {v.map((movie, key) => {
                        if (movie.media_type === "movie") {
                          return (
                            <Stack
                              direction="row"
                              justifyContent="flex-start"
                              spacing={0.5}
                              mt={1}
                              key={key}
                            >
                              <div
                                className={
                                  personInfoPageStyle.year_box_movie_name
                                }
                                onClick={() => history.push(`/movie/${movie.id}`)}
                              >
                                {movie.title}
                              </div>
                              {(movie.character !== undefined && movie.character !== "") &&
                              (
                                <>
                                  <div style={{ color: "#BDBDBD" }}>as</div>
                                  <div>{movie.character}</div>
                                </>
                              )}
                            </Stack>
                          );
                        } else {
                          
                          return (
                            <Stack
                              direction="row"
                              justifyContent="flex-start"
                              spacing={0.5}
                              mt={1}
                              key={key}
                            >
                              <div
                                className={
                                  personInfoPageStyle.year_box_movie_name
                                }
                                onClick={() => history.push(`/movie/${movie.id}`)}
                              >
                                {`${movie.name} - ${movie.episode_count} episodes`}
                              </div>
                              {(movie.character !== undefined && movie.character !== "") &&
                              (
                                <>
                                  <div style={{ color: "#BDBDBD" }}>as</div>
                                  <div>{movie.character}</div>
                                </>
                              )}
                            </Stack>
                          );
                        }
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreditMovieList;
