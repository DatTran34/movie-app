import { Grid, List, ListItem, Stack } from "@mui/material";
import { React, useEffect, useState } from "react";
import HomeStyle from "../styles/HomeStyle";
import NavBar from "../components/NavBar/NavBar";
import MovieList from "../components/MovieList";
import SmallMovieCard from "../components/SmallMovieCard";
import { getTrendingMovies, getUpComingMovies } from "../axios/MovieResquest";
import MovieStyle from "../styles/MovieStyle";
import { useHistory, useLocation } from "react-router";
import CategoryTags from "../components/CategoryTags";
function SearchPage() {
  const history = useHistory();
  const location = useLocation();
  const movieStyle = MovieStyle();
  const [upcomingList, setUpComingList] = useState([]);
  const [kindOfSearch, setKindOfSearch] = useState({
    title: "movie",
    content: "popular",
  });
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked)
    let searchParams = new URLSearchParams(location.search);
    if(!checked){
      searchParams.set("media_type", "tv")
    }
    else{
      searchParams.set("media_type", "movie")
    }
    searchParams.delete("genre");
    history.push({
      pathname: "filter",
      search: searchParams.toString(),
    });
  };

  

  useEffect(() => {
    getUpComingMovies()
      .then((data) => {
        setUpComingList(data.results.map((movie) => {
          return { media_type: "movie", ...movie };
        }));
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const homeStyle = HomeStyle();
  return (
    <div>
      <NavBar></NavBar>
      <Stack paddingTop="200px" position="relative">
        <div className={movieStyle.container}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            style={{ margin: "10px 0" }}
          >
            <Grid style={{ maxWidth: "750px" }} item xs={12} md={8.5}>
              <div className={movieStyle.header}>Filtered Movies</div>
              <Stack direction="row" alignItems="center" spacing={2} p={1}>
                <Stack position="relative" onClick={handleChange}>
                  <input
                    className={movieStyle.input_role_switch}
                    type="checkbox"
                    role="switch"
                    checked={checked}
                    
                  />
                  <Stack className={movieStyle.input_role_switch_movie} >Movie</Stack>
                  <Stack className={movieStyle.input_role_switch_tv} >TV</Stack>
                </Stack>
                <CategoryTags/>
              </Stack>
              <MovieList searchParams={new URLSearchParams(location.search)} ></MovieList>
            </Grid>
            <Grid item xs={12} md={3.5}>
              <div className={movieStyle.right_box}>
                <div className={movieStyle.upcoming_box_title}>Up Coming</div>
                <div className={movieStyle.upcoming_box}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={1}
                    className={movieStyle.overlay_inner}
                  >
                    {upcomingList?.map((movie, key) => {
                      return (
                        <SmallMovieCard
                          movie={movie}
                          history={history}
                          key={key}
                        ></SmallMovieCard>
                      );
                    })}
                  </Stack>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Stack>
    </div>
  );
}

export default SearchPage;
