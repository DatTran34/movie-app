import { Grid, List, ListItem, Stack } from "@mui/material";
import { React, useEffect, useState } from "react";
import HomeStyle from "../styles/HomeStyle";
import NavBar from "../components/NavBar/NavBar";
import MovieList from "../components/MovieList";
import SmallMovieCard from "../components/SmallMovieCard";
import { getTrendingMovies, getUpComingMovies } from "../axios/MovieResquest";
import MovieStyle from "../styles/MovieStyle";
import VerticalScrollBox from "../components/VerticalScrollBox";
function HomePage({ history }) {
  const movieStyle = MovieStyle();
  const [upcomingList, setUpComingList] = useState([]);
  const [filter, setFilter] = useState({
    media_type: "movie",
    content: "popular",
  });
  const [searchParams, setSearchParams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //new URLSearchParams("?category=Popular&media_type=movie")
    var array = [];
    array.push(new URLSearchParams("?category=Popular&media_type=movie"));
    array.push(new URLSearchParams("?category=Up Coming&media_type=movie"));
    setSearchParams([...array]);
    getUpComingMovies()
      .then((data) => {
        setUpComingList(data.results);
      })
      .catch((e) => {
        console.error(e);
      });
    setIsLoading(false);
  }, []);

  const homeStyle = HomeStyle();
  return (
    <div>
      <NavBar></NavBar>
      {isLoading === true ? (
        <div>Loading</div>
      ) : (
        <Stack paddingTop="200px" position="relative">
          <div className={movieStyle.container}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              style={{ margin: "10px 0", maxWidth: "70rem"  }}
            >
              <Grid style={{ maxWidth: "47rem"}} item xs={12} md={8.5}>
                {searchParams.map((searchParam, key) => {
                  return (
                    <div key={key}>
                      <div className={movieStyle.header}>
                        {searchParam.get("category")}{" "}
                        {searchParam.get("media_type").charAt(0).toUpperCase() +
                          searchParam.get("media_type").slice(1)}
                        s{" "}
                      </div>
                      <MovieList searchParams={searchParam}></MovieList>
                    </div>
                  );
                })}
              </Grid>
              <Grid item xs={12} md={3.5}>
                <div className={movieStyle.right_box}>
                  <VerticalScrollBox
                    title={"Up Coming"}
                    data={upcomingList}
                  ></VerticalScrollBox>
                </div>
              </Grid>
            </Grid>
          </div>
        </Stack>
      )}
    </div>
  );
}

export default HomePage;
