import { Grid, Stack } from "@mui/material";
import { React, useEffect, useState } from "react";
import {
  getFilteredMovies,
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
      if (searchParams !== null) {
        
        getFilteredMovies(searchParams, page)
          .then((data) => {
            setPeopleList(
              data.results.map((person) => {
                return { media_type: "person", ...person };
              })
            );
            setIsLoading(false)
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }, [searchParams, page]);

    console.log(peopleList)

    const handlePrevPage = () => {
      setPage(page - 1);
    };
    const handleNextPage = () => {
      setPage(page + 1);
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
                  <Grid item xs={12} md={6} style={{ padding: "10px" }} key={key}>
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
