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
  right_box: {
    background: "#2D375A",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "10px",
  },
  upcoming_box: {
    overflow: "auto",
    width: "100%",
    display: "flex",
    height: "500px",
  },
  overlay_inner: {
    margin: "auto",
  },
  upcoming_box_title: {
    color: "#F6C700",
    fontWeight: "700",
    fontSize: "24px",
    paddingBottom: "20px",
  },
  pageButton: {
    color: "white",
  },
  input_role_switch: {
    appearance: "none",
    WebkitAppearance: "none",
    position: "relative",
    display: "inline-block",
    width: "7em",
    height: "2em",
    margin: "-.2em 0",
    boxSizing: "content-box",
    padding: "0",
    border: "none",
    borderRadius: "1em",
    background: "rgba(160,160,160,0.7)",
    boxShadow:
      "0 .15em .25em rgba(0,0,0,0.5) inset, 0 -.5px 0 rgba(255,255,255,0.2) inset",
    transition: "background-color 250ms ease, box-shadow 250ms ease",
    fontSize: "100%",
    textSizeAdjust: "100%",
    WebkitTextSizeAdjust: "100%",
    userSelect: "none",
    outline: "none",
    "&:before": {
      content: "''",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      position: "absolute",
      width: "4em",
      height: "2em",
      left: "0",
      top: "0",
      background: "rgba(240,240,240,0.9)",
      boxShadow:
        "0 1px 1px #fff inset, 0 .2em .5em rgba(255,255,255,0.7) inset, 0 -.2em .3em rgba(0,0,0,0.2) inset, 0 .05em .25em rgba(0,0,0,0.7)",
      borderRadius: "1em",
      transform: "translate(20%, 20%)",
      transition: "transform 250ms ease",
      color: "rgba(0,0,0,0.3)",
      lineHeight: "1",
    },
    "&:focus::before": {
      background: "rgba(255,255,255,0.9)",
    },
    "&:checked": {
      backgroundColor: "var(--bg-checked, var(--bg, rgb(60,130,250)))",
    },
    "&:focus::visible": {
      boxShadow:
        "0 .15em .25em rgba(0,0,0,0.5) inset, 0 -.5px 0 rgba(255,255,255,0.2) inset, 0 0 0 2px rgba(255,255,255,0.8), 0 0 0 4px var(--bg-checked, var(--bg, rgb(60,130,250)))",
    },
    "&:checked::before": {
      transform: "translate(120%, 20%)",
    },
    "&:indeterminate::before": {
      transform: "translate(70%, 20%)",
      content: "'-'",
    },
    "&:disabled::before": {
      opacity: "0.4",
    },
  },
}));

export default MovieStyle;
