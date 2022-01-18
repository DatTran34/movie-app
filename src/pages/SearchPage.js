import { Stack } from "@mui/material";
import { React, useEffect, useState } from "react";
import NavBar2 from "../components/NavBar/NavBar2";
import PeopleList from "../components/PeopleList";
import {  getUpComingMovies } from "../axios/MovieResquest";
import { useHistory, useLocation } from "react-router";
import CategoryTags from "../components/CategoryTags";
import VerticalScrollBox from "../components/VerticalScrollBox";
import MovieList from "../components/MovieList";
import MovieStyle from "../styles/MovieStyle";


function SearchPage() {
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
      <NavBar2></NavBar2>
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
              <MovieList searchParams={searchParams}></MovieList>
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

export default SearchPage;
