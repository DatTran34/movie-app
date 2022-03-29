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
  const [isPerson, setIsPerson] = useState(false);
  const [isMovie, setIsMovie] = useState(true);
  const searchParams = new URLSearchParams(location.search);

  const handleChange = () => {
    setIsMovie(!isMovie);
    if (isMovie) {
      searchParams.set("media_type", "tv");
    } else {
      searchParams.set("media_type", "movie");
    } 
    searchParams.delete("genre");
    if(searchParams.has("category"))
    {
      if (searchParams.get("category") === "Now Playing") {
        searchParams.set("category", "Airing Today");
      } else if (searchParams.get("category") === "Airing Today") {
        searchParams.set("category", "Now Playing");
      } else if (searchParams.get("category") === "On The Air") {
        searchParams.set("category", "Up Coming");
      } else if (searchParams.get("category") === "Up Coming") {
        searchParams.set("category", "On The Air");
      }
    } 
    history.push({
      pathname: "filter",
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    if (searchParams.get("media_type") === "movie") {
      setIsMovie(true);
      setIsPerson(false)
    } else if (searchParams.get("media_type") === "tv"){
      setIsMovie(false);
      setIsPerson(false)
    } else {
      setIsPerson(true)
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
    searchParams.set("media_type", key);
    history.push({
      pathname: "/filter",
      search: searchParams.toString(),
    });
  };
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
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      py={1}
                    >
                      <CategoryTags isPerson={isPerson}/>
                    </Stack>
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
                      <CategoryTags isMovie={isMovie}/>
                    </Stack>
                    <MovieList isMovie={isMovie} searchParams={searchParams}></MovieList>
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
                    isMovie={true}
                    title={"Up Coming"}
                    data={upcomingList}
                  ></VerticalScrollBox>
              </>
            ) : (
              <>
                <VerticalScrollBox
                  isMovie={true}
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
