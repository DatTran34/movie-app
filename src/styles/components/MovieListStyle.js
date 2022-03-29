
import { makeStyles } from "@mui/styles";
const MovieListStyle = makeStyles((theme) => ({
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
    backgroundColor: "#4ccdeb",
    color: "#172a46",
    // border: "1px solid #4ccdeb"
  },
  movie_color:{
    backgroundColor: "#29bdae",
    color: "#172a46",
  },
  pagination_btn: {
    backgroundColor: "#172a46",
    padding: "0.5rem",
    cursor: "pointer"
  }
}));

export default MovieListStyle;
