import { Grid, List, ListItem, Stack } from "@mui/material";
import { React, useEffect, useState } from "react";
import HomeStyle from "../styles/HomeStyle";
import NavBar from "../components/NavBar/NavBar";
import MovieList from "../components/MovieList";
import SmallMovieCard from "../components/SmallMovieCard";
import { getTrendingMovies, getUpComingMovies } from "../axios/MovieResquest";
import MovieStyle from "../styles/MovieStyle";
import { useHistory, useLocation } from "react-router";
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
  //*****************function to handle Query Params*********************/
  const removeQuery = (key) => {
    let pathname = location.pathname;
    // returns path: '/app/books'
    let searchParams = new URLSearchParams(location.search);
    // returns the existing query string: '?type=fiction&author=fahid'
    searchParams.delete(key);
    history.push({
      pathname: "filter",
      search: searchParams.toString(),
    });
  };
  let searchParams = new URLSearchParams(location.search);

//   useEffect(() => {
//     getUpComingMovies()
//       .then((data) => {
//         setUpComingList(data.results);
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//     setKindOfSearch({
//       title: match.params.title,
//       content: match.params.content,
//     });
//   }, []);

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
              <Stack>
                <Stack>hsd</Stack>
                <input
                  className={movieStyle.input_role_switch}
                  type="checkbox"
                  role="switch"
                  value={checked}
                  onChange={handleChange}
                />
              </Stack>
              <MovieList searchParams={searchParams}></MovieList>
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
