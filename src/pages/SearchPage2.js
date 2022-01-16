import { Grid, List, ListItem, Stack } from "@mui/material";
import { React, useEffect, useState } from "react";
import HomeStyle from "../styles/HomeStyle";
import NavBar from "../components/NavBar/NavBar";
import MovieList from "../components/MovieList";
import PeopleList from "../components/PeopleList";
import SmallMovieCard from "../components/SmallMovieCard";
import { getTrendingMovies, getUpComingMovies } from "../axios/MovieResquest";
import { useHistory, useLocation } from "react-router";
import CategoryTags from "../components/CategoryTags";
import VerticalScrollBox from "../components/VerticalScrollBox";
import MovieList2 from "../components/MovieList2";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/styles";
const MovieStyle = makeStyles((theme) => ({
  container: {
    paddingTop: "12rem",
  },
  header: {
    color: "white",
    fontSize: "24px",
    fontWeight: "600",
    textAlign: "left",
  },
  grid: {
    display: "grid",
    padding: "1rem",
    gridGap: "1rem",
    margin: "auto",
    ["@media (min-width:960px)"]: {
      maxWidth: "70rem",
      gridTemplateColumns: "2fr 1fr",
    },
  },
  col: {

  },
  input_role_switch: {
    appearance: "none",
    WebkitAppearance: "none",
    position: "relative",
    display: "inline-block",
    width: "9em",
    height: "2em",
    margin: "-.2em 0",
    border: "none",
    boxSizing: "content-box",
    padding: "0",
    borderRadius: "1em",
    background: "#4CCDEB",
    boxShadow:
      "0 .15em .25em rgba(0,0,0,0.5) inset, 0 -.5px 0 rgba(255,255,255,0.2) inset",
    transition: "background-color 250ms ease, box-shadow 250ms ease",
    fontSize: "100%",
    textSizeAdjust: "100%",
    WebkitTextSizeAdjust: "100%",
    userSelect: "none",
    outline: "none",
    "&:before": {
      cursor: "pointer",
      content: "''",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      position: "absolute",
      width: "4.5em",
      height: "2em",
      left: "0",
      top: "0",
      background: "#ffffff",
      boxShadow:
        "0 1px 1px #fff inset, 0 .2em .5em rgba(255,255,255,0.7) inset, 0 -.2em .3em rgba(0,0,0,0.2) inset, 0 .05em .25em rgba(0,0,0,0.7)",
      borderRadius: "1em",
      transform: "translate(0%, 0%)",
      transition: "transform 250ms ease",
      color: "rgba(0,0,0,0.3)",
      lineHeight: "1",
    },
    "&:focus::before": {
      background: "#ffffff",
    },
    "&:checked": {
      backgroundColor: "var(--bg-checked, var(--bg, #4CCDEB))",
    },
    "&:focus::visible": {
      boxShadow:
        "0 .15em .25em rgba(0,0,0,0.5) inset, 0 -.5px 0 rgba(255,255,255,0.2) inset, 0 0 0 2px rgba(255,255,255,0.8), 0 0 0 4px var(--bg-checked, var(--bg, rgb(60,130,250)))",
    },
    "&:checked::before": {
      transform: "translate(100%, 0%)",
    },
    "&:indeterminate::before": {
      transform: "translate(70%, 20%)",
      content: "'-'",
    },
    "&:disabled::before": {
      opacity: "0.4",
    },
  },
  input_role_switch_movie: {
    position: "absolute",
    left: "0",
    top: "0",
    fontWeight: "600",
    transform: "translate(30%, 0%)",
    color: "#4CCDEB",
    cursor: "pointer",
  },
  input_role_switch_tv: {
    position: "absolute",
    right: "0",
    top: "0",
    fontWeight: "600",
    transform: "translate(-130%, 0%)",
    color: "#4CCDEB",
    cursor: "pointer",
  },
}));

function SearchPage2() {
  const history = useHistory();
  const location = useLocation();
  const movieStyle = MovieStyle();
  const [upcomingList, setUpComingList] = useState([]);

  const [checked, setChecked] = useState(false);
  const searchParams = new URLSearchParams(location.search);

  const handleChange = () => {
    setChecked(!checked);
    let searchParams = new URLSearchParams(location.search);
    if (!checked) {
      searchParams.set("media_type", "tv");
    } else {
      searchParams.set("media_type", "movie");
    }
    searchParams.delete("genre");
    history.push({
      pathname: "filter",
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    let searchParams = new URLSearchParams(location.search);
    if (searchParams.get("media_type") === "movie") {
      setChecked(false);
    } else {
      setChecked(true);
    }
    getUpComingMovies()
      .then((data) => {
        setUpComingList(
          data.results.map((movie) => {
            return { media_type: "movie", ...movie };
          })
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }, [location]);
  return (
    <div>
      <NavBar></NavBar>
      <div className={movieStyle.container}>
        <div className={movieStyle.grid}>
          <div className={movieStyle.col}>
            <div className={movieStyle.header}>Filtered Movies</div>
            <Stack direction="row" alignItems="center" spacing={2} p={1}>
              <Stack position="relative" onClick={handleChange}>
                <input
                  className={movieStyle.input_role_switch}
                  type="checkbox"
                  role="switch"
                  checked={checked}
                />
                <Stack className={movieStyle.input_role_switch_movie}>
                  Movie
                </Stack>
                <Stack className={movieStyle.input_role_switch_tv}>TV</Stack>
              </Stack>
              <CategoryTags />
            </Stack>
            {searchParams.get("category") === "person" ? (
              <PeopleList searchParams={searchParams}></PeopleList>
            ) : (
              <MovieList2 searchParams={searchParams}></MovieList2>
            )}
          </div>
          <div className={movieStyle.col}>
            <VerticalScrollBox
              title={"Up Coming"}
              data={upcomingList}
            ></VerticalScrollBox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage2;
