import { Stack } from "@mui/material";
import { React, useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import PeopleList from "../components/PeopleList";
import {  getUpComingMovies } from "../axios/MovieResquest";
import { useHistory, useLocation } from "react-router";
import CategoryTags from "../components/CategoryTags";
import VerticalScrollBox from "../components/VerticalScrollBox";
import MovieList from "../components/MovieList";
import MovieStyle from "../styles/MovieStyle";
import classNames from "classname";
function SearchPage() {
  const history = useHistory();
  const location = useLocation();
  const movieStyle = MovieStyle();
  const [upcomingList, setUpComingList] = useState([]);

  const [isMovie, setIsMovie] = useState(true);
  const searchParams = new URLSearchParams(location.search);

  const handleChange = () => {
    setIsMovie(!isMovie);
    let searchParams = new URLSearchParams(location.search);
    if (isMovie) {
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
      setIsMovie(true);
    } else {
      setIsMovie(false);
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
  const addQuery = (key) => {
    console.log("ss")
    let searchParams = new URLSearchParams(location.search);
    searchParams.set("media_type", key);
    history.push({
      pathname: "/filter",
      search: searchParams.toString(),
    });
  };
  console.log(isMovie)
  return (
    <div>
      <NavBar></NavBar>
      <div className={movieStyle.container}>
        <div className={movieStyle.grid}>
          <div className={movieStyle.col}>
              <>
                {searchParams.get("media_type") === "person" ? (
                  <>
                    <div className={movieStyle.header}>Popular People</div>
                    <CategoryTags media_type={searchParams.get("media_type")}/>
                    <PeopleList searchParams={searchParams}></PeopleList>
                  </>
                ) : (
                  <>
                    <div className={movieStyle.header}>FILTERED MOVIES</div>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      py={1}
                    >
                      
                      <Stack position="relative" onClick={handleChange}>
                        <input
                          className={classNames({[movieStyle.movie_color_input_role_switch]: isMovie,[movieStyle.input_role_switch]: true})}
                          type="checkbox"
                          role="switch"
                          checked={!isMovie}
                        />
                        <Stack className={movieStyle.input_role_switch_movie}>
                          Movie
                        </Stack>
                        <Stack className={movieStyle.input_role_switch_tv}>
                          TV
                        </Stack>
                      </Stack>
                      <CategoryTags />
                    </Stack>
                    <MovieList searchParams={searchParams}></MovieList>
                  </>
                )}
              </>
          </div>
          <div className={movieStyle.col}>
          {searchParams.get("query") ? (
              <>
                  <Stack className={movieStyle.search_filter}>
                    <div className={movieStyle.search_filter_title}>Search Results</div>
                    <Stack>
                      <Stack className={movieStyle.search_filter_box} onClick={() => {addQuery("movie")}}>
                        <div className={movieStyle.search_filter_media_type}>Movies</div>
                        <div className={movieStyle.search_filter_number}>551</div>
                      </Stack>
                      <Stack className={movieStyle.search_filter_box} onClick={() => {addQuery("tv")}}>
                        <div className={movieStyle.search_filter_media_type}>Tv Show</div>
                        <div className={movieStyle.search_filter_number}>120</div>
                      </Stack>
                      <Stack className={movieStyle.search_filter_box} onClick={() => {addQuery("person")}}>
                        <div className={movieStyle.search_filter_media_type}>People</div>
                        <div className={movieStyle.search_filter_number}>37</div>
                      </Stack>
                    </Stack>
                  </Stack>
                  <VerticalScrollBox
                    title={"Up Coming"}
                    data={upcomingList}
                  ></VerticalScrollBox>
              </>
            ) : (
              <>
                <VerticalScrollBox
                  title={"Up Coming"}
                  data={upcomingList}
                ></VerticalScrollBox>
              </>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
