import { Grid, Stack } from "@mui/material";
import { React, useEffect, useState } from "react";
import {
  getFiltered,getMultiSearch
} from "../axios/MovieResquest";
import MovieStyle from "../styles/MovieStyle";
import { useHistory, useLocation } from "react-router";
import PersonCard from "./PersonCard";
import { makeStyles } from "@mui/styles";
import classNames from "classname";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
const PeopleListStyle = makeStyles((theme) => ({
  grid: {
    display: "grid",
    gridGap: "1rem",
    margin: "auto",
    gridTemplateColumns: "repeat(2,1fr)",
    ["@media (min-width:550px)"]: {
      gridTemplateColumns: "repeat(3,1fr)",
    },
    ["@media (min-width:720px)"]: {
      gridTemplateColumns: "repeat(4,1fr)",
    },
    ["@media (min-width:960px)"]: {
      gridTemplateColumns: "repeat(3,1fr)",
    },
    ["@media (min-width:1200px)"]: {
      gridTemplateColumns: "repeat(4,1fr)",
    },
  },
  pagination: {
    userSelect: "none",
    color: "#CCD2E3",
    margin: "2rem 0"
  },
  pagination_number: {
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    fontWeight: "600"
  },
  pagination_number_focus: {
    backgroundColor: "#bb86fc",
    color: "#172a46",
    // border: "1px solid #4ccdeb"
  },
  movie_color:{
    backgroundColor: "#4ccdeb",
    color: "#172a46",
  },
  pagination_btn: {
    backgroundColor: "#172a46",
    padding: "0.5rem",
    cursor: "pointer"
  }
}));
function PeopleList({ searchParams }) {
  const history = useHistory();
  const location = useLocation();
  const peopleListStyle = PeopleListStyle();
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


  const handleNextPage = (level) => {
    const page = searchParams.get("page");
    searchParams.set("page", parseInt(page) + level);
    history.push({
      pathname: "/filter",
      search: searchParams.toString(),
    });
  };

  const handlePrevPage = (level) => {
    const page = searchParams.get("page");
    if (searchParams.get("page") !== "1") {
      searchParams.set("page", parseInt(page) - level);
      history.push({
        pathname: "/filter",
        search: searchParams.toString(),
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
          <div className={peopleListStyle.grid}>
            {peopleList?.map((person, key) => {
              return (
                  <PersonCard key={key} person={person}/>
              );
            })}
          </div>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            className={peopleListStyle.pagination}
          >
            {parseInt(page) === 1 ? (
                <>
                  <Stack direction="row"  p={1} spacing={2}>
                    <div className={classNames({[peopleListStyle.pagination_number_focus]: true, [peopleListStyle.pagination_number]: true,})}>{page}</div>
                    <div className={peopleListStyle.pagination_number} onClick={() => {handleNextPage(1)}}>{`${parseInt(page) + 1}`}</div>
                    <div className={peopleListStyle.pagination_number} onClick={() => {handleNextPage(2)}}>{`${parseInt(page) + 2}`}</div>
                  </Stack>
                  <ArrowRightIcon className={peopleListStyle.pagination_btn} onClick={() => {handleNextPage(1)}}/>                
                </>
              ) : (
                <>
                  {parseInt(page) === 2 ? (
                    <>
                      <ArrowLeftIcon className={peopleListStyle.pagination_btn} onClick={() => {handlePrevPage(1)}}/>
                      <Stack direction="row"  p={1} spacing={2}>
                        <div className={peopleListStyle.pagination_number} onClick={() => {handlePrevPage(1)}}>{page - 1}</div>
                        <div className={classNames({[peopleListStyle.pagination_number_focus]: true, [peopleListStyle.pagination_number]: true,})}>{page}</div>
                        <div className={peopleListStyle.pagination_number} onClick={() => {handleNextPage(1)}}>{`${parseInt(page) + 1}`}</div>
                        <div className={peopleListStyle.pagination_number} onClick={() => {handleNextPage(2)}}>{`${parseInt(page) + 2}`}</div>
                      </Stack>
                      <ArrowRightIcon className={peopleListStyle.pagination_btn} onClick={() => {handleNextPage(1)}}/>                
                    </>
                  ) : (
                    <>
                      <ArrowLeftIcon className={peopleListStyle.pagination_btn} onClick={() => {handlePrevPage(1)}}/>
                      <Stack direction="row"  p={1} spacing={2}>
                        <div className={peopleListStyle.pagination_number} onClick={() => {handlePrevPage(2)}}>{page - 2}</div>
                        <div className={peopleListStyle.pagination_number} onClick={() => {handlePrevPage(1)}}>{page - 1}</div>
                        <div className={classNames({[peopleListStyle.pagination_number_focus]: true, [peopleListStyle.pagination_number]: true,})}>{page}</div>
                        <div className={peopleListStyle.pagination_number} onClick={() => {handleNextPage(1)}}>{`${parseInt(page) + 1}`}</div>
                        <div className={peopleListStyle.pagination_number} onClick={() => {handleNextPage(2)}}>{`${parseInt(page) + 2}`}</div>
                      </Stack>
                      <ArrowRightIcon className={peopleListStyle.pagination_btn} onClick={() => {handleNextPage(1)}}/>
                    </>
                  )}
                </>
              )}
          </Stack>
        </>
      )}
    </>
  );
}

export default PeopleList
