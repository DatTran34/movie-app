import { Grid, Stack } from "@mui/material";
import React from "react";
import clsx from "clsx";
import { useHistory, useLocation } from "react-router";
import { makeStyles } from "@mui/styles";
import classNames from "classname";
const PersonCardStyle = makeStyles((theme) => ({
  animatedItem: {
    animation: `$myEffect 0.4s ease`,
  },
  box: {
    cursor: "pointer",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
    },
    "&:hover $details": {
      display: "flex",
    },
  },
  details: {
    display: "none",
    position: "absolute",
    zIndex: "2",
    top: "0",
    right: "0",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    transform: "translate(110%, 0%)",
    transition: "all 1s ease",
  },
  imdb_rating_box: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: " 0.25rem 0.5rem",
    borderRadius: "10px",
    background: "#F6C700",
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "#05103A",
    zIndex: "2",
    transition: "all 0.3s ease-out",
  },
  rating: {
    position: "absolute",
    width: "1.75rem",
    height: "1.75rem",
    bottom: "10px",
    left: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#112b42",
    fontWeight: "600",
    color: "#29bdae",
    borderRadius: "100%",
    padding: "5px",
    border: "2.5px solid #29bdae",
    transition: "all 0.3s ease-out",
    boxShadow: "3px 3px 10px rgba(76, 205, 235, 0.5)",
  },
  img: {
    transition: "all 0.2s ease-out",
  },
  content: {
    paddingTop: "0.75rem",
    fontWeight: "600",
  },
  title: {
    width: "10rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: "#CCD2E3",
  },
  time: {
    color: "#BDBDBD",
  },
  year: {
    color: "#bb86fc",
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      width: "50%",
      height: "50%",
    },
    "100%": {
      opacity: 1,
      width: "100%",
      height: "100%",
    },
  },
}));

function PersonCard({ person }) {
  const personCardStyle = PersonCardStyle();
  const history = useHistory();
  return (
    <div style={{ position: "relative" }}>
      <div onClick={() => history.push(`/person/${person.id}`)}>
        <div className={personCardStyle.box}>
          <div className={personCardStyle.imdb_rating_box}>
            {person.popularity}
          </div>
          <img
            className={personCardStyle.img}
            src={`http://image.tmdb.org/t/p/w500/${person.profile_path}`}
          />
          {/* <div
            className={classNames({
              [personCardStyle.animatedItem]: true,
              [personCardStyle.details]: true,
            })}
          >
            g
          </div> */}
          {/* <div
            className={classNames({
              [personCardStyle.rating]: true,
            })}
          >
            {movie.vote_average}
          </div> */}
          {/* <CircularProgressWithLabel value={movie.vote_average} /> */}
        </div>
        <Stack
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-start"
          textAlign="start"
          className={personCardStyle.content}
          spacing={0.5}
        >
          <div className={personCardStyle.title}>{person.name}</div>
          <div
            className={classNames({
              [personCardStyle.year]: true,
            })}
          >
            {person.known_for_department}
          </div>
        </Stack>
      </div>
    </div>
  );
}

export default PersonCard;
