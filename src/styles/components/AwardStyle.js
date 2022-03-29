import { makeStyles } from "@mui/styles";

const AwardStyle = makeStyles((theme) => ({
  award_container: {
    background: "#172a46",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
  },
  award: {
    width: "100%",
  },
  award_overlay_inner: {
    overflow: "auto",
    whiteSpace: "nowrap",
  },
  award_overlay_inner: {},
  award_title: {
    color: "#F6C700",
    fontWeight: "700",
    fontSize: "24px",
    paddingBottom: "20px",
  },
  award_card: {
    display: "inline-block",
    width: "15rem",
    height: "15rem",
    backgroundColor: "#2D375A",
  },
  container: {
    display: "grid",
    backgroundColor: "yellow",
    gridGap: "1rem",
    //gridTemplateColumns: "1fr 1fr 1fr",
    ["@media (min-width:550px)"]: {
      gridTemplateColumns: "1fr",
    },
    ["@media (min-width:960px)"]: {
      gridTemplateColumns: "1fr 1fr",
    },
    overflow: "auto",
    whiteSpace: "nowrap",
    height: "21rem",

  },
  title: {
    color: "#ffffff",
    margin: "20px",
  },
  panel: {
    backgroundColor: "#2D375A",
    padding: "10px",
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "350px",
    height: "227px",
    padding: "10px",
    backgroundColor: "#0a192f",
  },
  trophy: {
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: "translate(-50%, -50%)",
    width: "80px",
  },
  circle: {
    position: "absolute",
    left: "50%",
    top: "45%",
    transform: "translate(-50%, -50%)",
    width: "200px",
  },
  blur: {
    zIndex: "1",
    position: "absolute",
    left: "50%",
    top: "60%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    height: "45px",
    background:
      "linear-gradient(180deg, rgba(10, 25, 47, 0) 0%, rgba(10, 25, 47, 0.9) 51.67%, #0a192f 100%)",
  },
  hide: {
    zIndex: "1",
    position: "absolute",
    left: "50%",
    top: "75%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    height: "45px",
    background: "#0a192f",
  },
  content: {
    zIndex: "2",
  },
  award_name: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#F6C700",
    width: "22rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  year: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#BDBDBD",
  },
  event_name: {
    fontSize: "10px",
    fontWeight: "600",
    color: "#BDBDBD",
    width: "22rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  award: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#ffffff",
    width: "22rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

export default AwardStyle;
