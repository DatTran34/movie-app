import { React, useEffect, useState } from "react";
import HomeStyle from "../styles/HomeStyle";
import NavBar from "../components/NavBar/NavBar";
import MovieList from "../components/MovieList";
import { getUpComingMovies } from "../axios/MovieResquest";
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
    <>

    <div>
    <NavBar></NavBar>
    <div className={movieStyle.container}>
      <div className={movieStyle.grid}>
        <div className={movieStyle.col}>
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
        </div>
        <div className={movieStyle.col}>
          <VerticalScrollBox
            isMovie={true}
            title={"Up Coming"}
            data={upcomingList}
          ></VerticalScrollBox>
        </div>
      </div>
    </div>
  </div>
    </>
  );
}

export default HomePage;
