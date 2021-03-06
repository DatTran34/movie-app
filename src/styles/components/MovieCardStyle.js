import { makeStyles } from "@mui/styles";
import { keyframes } from "@mui/styled-engine";

const MovieCardStyle = makeStyles((theme) => ({
  // card: {
  //   display: "flex",
  //   height: "20rem",
  //   flexDirection: "column",
  //   justifyContent: "flex-end",
  //   position: "relative",
  //   // "&:hover $img": {
  //   //   position: "absolute",
  //   //   top: "-10px",
  //   //   left: "0px",
  //   //   transform: "scale(1.2)",
  //   //   border: "3px solid #4CCDEB"
  //   //   //animation: `${bounce} 0.4s ease`,
  //   // },
  //   // "&:hover $imdb_rating_box": {
  //   //   top: "-20px",
  //   //   right: "-5px",
  //   // },
  //   // "&:hover $circular": {
  //   //     bottom: "0px",
  //   //     left: "0px",
  //   // },
  //   // "&:hover $content": {
  //   //   paddingTop: "1.25rem",
  //   // },
  // },
  "@keyframes cardEffect": {
    "0%": {
      opacity: "0",
    },
    "100%": {
      opacity: "100%",
    },
  },

  box: {
    cursor: "pointer",
    position: "relative",

    "& img": {
        width: "100%",
        height: "100%"
      },
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
    color: "#4CCDEB",
    borderRadius: "100%",
    padding: "5px",
    border: "2.5px solid #4CCDEB",
    transition: "all 0.3s ease-out",
    boxShadow: "3px 3px 10px rgba(76, 205, 235, 0.5)"
  },
  img: {
    animation: `$cardEffect 0.4s ease-in-out`,
    transition: "all 0.2s ease-out",
    boxShadow: "2px 2px 9px 5px rgba(0,0,0,0.75)",
    "&:hover" :{
      transform: "scale(1.05)",
      boxShadow: "5px 5px 16px 5px rgba(0,0,0,0.75)",
    }
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
    padding: " 0.125rem 0.5rem",
    textAlign: "center",
    width: "50%",
    backgroundColor: "#29bdae",
    color: "#172a46",
  },
  year: {
    textAlign: "center",
    width: "50%",
    color: "#4CCDEB",
  },
  movie_color_rating:{
    color: "#29bdae",
    border: "2.5px solid #29bdae",
  },
  movie_color:{
    color: "#29bdae",
  }
}));

export default MovieCardStyle;
