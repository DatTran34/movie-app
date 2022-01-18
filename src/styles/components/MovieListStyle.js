
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
  col: {
   
  },
  pageButton: {
    color: "white",
  },
}));

export default MovieListStyle;
