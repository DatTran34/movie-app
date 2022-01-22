import { makeStyles } from "@mui/styles";

const MovieInfoStyle = makeStyles((theme) => ({
  grid: {
    justifyContent: "center",
    display: "grid",
    padding: "1rem",
    gridGap: "1rem",
    margin: "auto",
    ["@media (min-width:960px)"]: {
      maxWidth: "70rem",
      gridTemplateColumns: "1fr 2fr",
    },
    ["@media (min-width:1200px)"]: {
      gridTemplateColumns: "1fr 3fr",
    },
  },
  col: {},
  img: {
    position: "relative",
    "& img": {
      width: "100%",
      display: "block",
      margin: "auto",
    },
  },
  info_grid: {
    display: "grid",
    gridGap: "1rem",
    borderRadius: "1rem",
  },
  info_col: {
    color: "#fff",
  },
  info_col_grid: {
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "1fr 1fr",
  },
  info_text_box: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  trailer_genres_grid: {
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  trailer_genres_col: {},
  cast_container: {
    background: "#172a46",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
  },
  cast: {
    width: "100%",
  },
  cast_overlay_outter: {
    overflow: "auto",
    display: "flex",
    alignItems: "flex-start",
    height: "20rem",
  },
  cast_overlay_inner: {},
  cast_title: {
    color: "#F6C700",
    fontWeight: "700",
    fontSize: "24px",
    paddingBottom: "20px",
  },
  root: {
    fontWeight: "600",
    color: "#CCD2E3",
  },
  backdrop_container: {
    position: "absolute",
    width: "1214px",
    height: "719px",
    left: "0",
    top: "0",
  },
  backdrop_blur1: {
    zIndex: "1",
    position: "absolute",
    width: "669px",
    height: "580px",
    left: "0",
    top: "0",
    transform: "rotate(-90deg)",
    background:
      "linear-gradient(180deg, rgba(5, 16, 58, 0) 0%, #05103A 98.54%)",
  },
  backdrop_blur2: {
    zIndex: "1",
    position: "absolute",
    width: "669px",
    height: "607px",
    right: "0",
    top: "0",
    background:
      "linear-gradient(180deg, #05103A 0%, rgba(5, 16, 58, 0) 98.54%)",
    transform: "rotate(-90deg)",
  },
  backdrop_blur3: {
    zIndex: "1",
    position: "absolute",
    width: "1187px",
    height: "474px",
    left: "0",
    top: "0",
    background:
      "linear-gradient(180deg, rgba(5, 16, 58, 0) 0%, rgba(5, 16, 58, 0.640592) 41.25%, rgba(5, 16, 58, 0.957524) 94.37%)",
  },
  backdrop_blur4: {
    zIndex: "1",
    position: "absolute",
    left: "0",
    top: "0",
    width: "1187px",
    height: "300px",
    backgroundColor: "#05103A",
  },
  backdrop: {
    zIndex: "0",
    left: "0",
    top: "0",
    transform: "translate(0%, 0%)",
    position: "absolute",
    height: "669px",
  },
  poster: {
    width: "320px",
    borderRadius: "20px",
  },
  movie_name: {
    fontWeight: "800",
    fontSize: "3rem",
  },
  year: {
    color: "#CCD2E3",
    paddingTop: "20px",
    fontSize: "1.5rem",
  },
  trailer_button: {
    padding: "10px 20px",
    backgroundColor: "#4CCDEB",
    borderRadius: "10px",
  },
  category_button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#CCD2E3",
    border: "2px solid #CCD2E3",
    borderRadius: "50px",
    padding: "0px 20px",
  },
  title: {
    color: "#4CCDEB",
  },
  content: {
    color: "#CCD2E3",
  },
  cast_image: {
    width: "50px",
    height: "50px",
    boxSizing: "border-box",
    border: "2px solid #4CCDEB",
    borderRadius: "100px",
    objectFit: "cover",
  },
  rating: {
    position: "absolute",
    width: "2.5rem",
    height: "2.5rem",
    bottom: "0",
    left: "0",
    transform: "translate(50%, -100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#112b42",
    fontWeight: "600",
    color: "#4CCDEB",
    borderRadius: "100%",
    padding: "5px",
    border: "2.5px solid #4CCDEB",
    transition: "all 0.3s ease-out",
    boxShadow: "3px 3px 10px rgba(76, 205, 235, 0.5)"
  },
  movie_color_rating:{
    color: "#29bdae",
    border: "2.5px solid #29bdae",
  },
}));

export default MovieInfoStyle;
