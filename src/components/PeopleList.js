import { Grid, Stack } from "@mui/material";
import { React, useEffect, useState } from "react";
import {
  getFiltered,getMultiSearch
} from "../axios/MovieResquest";
import MovieStyle from "../styles/MovieStyle";
import MovieCard from "./MovieCard";
import { useHistory, useLocation } from "react-router";
import PersonCard from "./PersonCard";

function PeopleList({ searchParams }) {
  const history = useHistory();
  const location = useLocation();
  const movieStyle = MovieStyle();
  const [peopleList, setPeopleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    searchParams.get("page");
    if (searchParams !== null) {
      if (searchParams.get("page") === null) {
        searchParams.set("page", 1)
        setPage(1)
      }
      else {
        setPage(searchParams.get("page"))
      }
      if(searchParams.has("query")){
        getMultiSearch(searchParams.get("media_type"), searchParams.get("query"), page)
        .then((data) => {
          setPeopleList(
            data.results.map((movie) => {
              return { media_type: searchParams.get("media_type"), ...movie };
            })
          );
          setIsLoading(false);
        })
        .catch((e) => {
          console.error(e);
        });
      } else {
      getFiltered(searchParams)
        .then((data) => {
          console.log(data)
          setPeopleList(
            data.results.map((person) => {
              return { media_type: "person", ...person };
            })
          );
          setIsLoading(false)
        })
        .catch((e) => {
          console.error(e);
        });}
    }
  }, [searchParams]);


  const handleNextPage = () => {
    const page = searchParams.get("page");
    searchParams.set("page", parseInt(page) + 1)
    history.push({
      pathname: "/filter",
      search: searchParams.toString()
    });
  };

  const handlePrevPage = () => {
    const page = searchParams.get("page");
    if (searchParams.get("page") !== "1") {
      searchParams.set("page", parseInt(page) - 1)
      history.push({
        pathname: "/filter",
        search: searchParams.toString()
      });
    }
  };

  return (
    <>
      {" "}
      {isLoading === true ? (
        <>Loading</>
      ) : (
        <>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            className={movieStyle.left_box}
          >
            {peopleList?.map((person, key) => {
              return (
                <Grid item xs={12} md={3} style={{ padding: "10px" }} key={key}>
                  <PersonCard person={person}></PersonCard>
                </Grid>
              );
            })}
          </Grid>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            className={movieStyle.pageButton}
          >
            <div onClick={handlePrevPage}>Previous</div>
            <div>Page {page}</div>
            <div onClick={handleNextPage}>Next</div>
          </Stack>
        </>
      )}
    </>
  );
}

export default PeopleList
