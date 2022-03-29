import { makeStyles } from "@mui/styles";

const MovieStyle = makeStyles((theme) => ({
  container: {
    paddingTop: "7rem",
  },
  header: {
    color: "#ccd6f6",
    fontSize: "3rem",
    fontWeight: "600",
    textAlign: "left",
  },
  grid: {
    display: "grid",
    padding: "1rem",
    gridGap: "1rem",
    margin: "auto",
    ["@media (min-width:960px)"]: {
      maxWidth: "70rem",
      gridTemplateColumns: "2fr 1fr",
    },
  },
  col: {

  },
  input_role_switch: {
    appearance: "none",
    WebkitAppearance: "none",
    position: "relative",
    display: "inline-block",
    width: "9em",
    height: "2em",
    margin: "-.2em 0",
    border: "2px solid #4CCDEB",
    boxSizing: "content-box",
    padding: "0",
    // borderRadius: "1em",
    // background: "#4CCDEB",
    // boxShadow:
    //   "0 .15em .25em rgba(0,0,0,0.5) inset, 0 -.5px 0 rgba(255,255,255,0.2) inset",
    transition: "background-color 250ms ease, box-shadow 250ms ease",
    fontSize: "100%",
    textSizeAdjust: "100%",
    WebkitTextSizeAdjust: "100%",
    userSelect: "none",
    outline: "none",
    "&:before": {
      cursor: "pointer",
      content: "''",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      position: "absolute",
      width: "4.5em",
      height: "2em",
      left: "0",
      top: "0",
      background: "#4CCDEB",
      // boxShadow:
      //   "0 1px 1px #fff inset, 0 .2em .5em rgba(255,255,255,0.7) inset, 0 -.2em .3em rgba(0,0,0,0.2) inset, 0 .05em .25em rgba(0,0,0,0.7)",
      // borderRadius: "1em",
      transform: "translate(0%, 0%)",
      transition: "transform 250ms ease",
      color: "rgba(0,0,0,0.3)",
      lineHeight: "1",
    },
    "&:focus::before": {
      background: "#4CCDEB",
    },
    "&:checked": {
      backgroundColor: "var(--bg-checked, var(--bg, #0a192f))",
    },
    "&:focus::visible": {
      boxShadow:
        "0 .15em .25em rgba(0,0,0,0.5) inset, 0 -.5px 0 rgba(255,255,255,0.2) inset, 0 0 0 2px rgba(255,255,255,0.8), 0 0 0 4px var(--bg-checked, var(--bg, rgb(60,130,250)))",
    },
    "&:checked::before": {
      transform: "translate(100%, 0%)",
    },
    "&:indeterminate::before": {
      transform: "translate(70%, 20%)",
      content: "'-'",
    },
    "&:disabled::before": {
      opacity: "0.4",
    },
  },
  movie_color_input_role_switch: {
    border: "2px solid #29bdae",
    "&:before": {
      background: "#29bdae",
      color: "rgba(0,0,0,0.3)",
    },
    "&:focus::before": {
      background: "#29bdae",
    },
  },
  input_role_switch_movie: {
    position: "absolute",
    left: "0",
    top: "0",
    fontWeight: "600",
    transform: "translate(30%, 10%)",
    color: "#0a192f",
    cursor: "pointer",
  },
  input_role_switch_tv: {
    position: "absolute",
    right: "0",
    top: "0",
    fontWeight: "600",
    transform: "translate(-130%, 10%)",
    color: "#0a192f",
    cursor: "pointer",
  },
  search_filter: {
    width: "100%",
    backgroundColor: "#172a46",
    borderRadius: "1opx",
    margin: "1rem 0rem"
  },
  search_filter_title: {
    padding: "1rem",
    backgroundColor: "#4ccdeb",
    color: "#fff"
  },
  search_filter_box: {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    flexDirection: "row",
    justifyContent: "space-between",
    "&:hover" : {
      backgroundColor: "#0a192f"
    }
  },
  search_filter_media_type: {
    color: "#CCD2E3"
  },
  search_filter_number: {
    color: "#CCD2E3"
  }
}));

export default MovieStyle;
