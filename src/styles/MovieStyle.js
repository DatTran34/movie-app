import { makeStyles } from "@mui/styles";

const MovieStyle = makeStyles((theme) => ({
  container: {
    padding: "20px",
    margin: "0 150px",
  },
  header: {
    color: "white",
    fontSize: "24px",
    fontWeight: "600",
    textAlign: "left",
  },
  description: {
    color: "#9C9C9C",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "left",
  },
  left_box: {
    borderRadius: "10px",
  },
  pageButton: {
    color: "white",
  },
  input_role_switch: {
    appearance: "none",
    WebkitAppearance: "none",
    position: "relative",
    display: "inline-block",
    width: "9em",
    height: "2em",
    margin: "-.2em 0",
    border: "none",
    boxSizing: "content-box",
    padding: "0",
    borderRadius: "1em",
    background: "#4CCDEB",
    boxShadow:
      "0 .15em .25em rgba(0,0,0,0.5) inset, 0 -.5px 0 rgba(255,255,255,0.2) inset",
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
      background: "#ffffff",
      boxShadow:
        "0 1px 1px #fff inset, 0 .2em .5em rgba(255,255,255,0.7) inset, 0 -.2em .3em rgba(0,0,0,0.2) inset, 0 .05em .25em rgba(0,0,0,0.7)",
      borderRadius: "1em",
      transform: "translate(0%, 0%)",
      transition: "transform 250ms ease",
      color: "rgba(0,0,0,0.3)",
      lineHeight: "1",
    },
    "&:focus::before": {
      background: "#ffffff",
    },
    "&:checked": {
      backgroundColor: "var(--bg-checked, var(--bg, #4CCDEB))",
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
  input_role_switch_movie: {
    position: "absolute",
    left: "0",
    top: "0",
    fontWeight: "600",
    transform: "translate(30%, 0%)",
    color: "#4CCDEB",
    cursor: "pointer",
  },
  input_role_switch_tv: {
    position: "absolute",
    right: "0",
    top: "0",
    fontWeight: "600",
    transform: "translate(-130%, 0%)",
    color: "#4CCDEB",
    cursor: "pointer",
  },
}));

export default MovieStyle;
