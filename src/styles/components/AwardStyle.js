import { makeStyles } from "@mui/styles";

const AwardStyle = makeStyles((theme) => ({
  award_container: {
    background: "#2D375A",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "1rem",
  },
  award: {
    width: "100%",
  },
  award_overlay_outter: {
    overflow: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  award_overlay_inner: {},
  award_title: {
    color: "#F6C700",
    fontWeight: "700",
    fontSize: "24px",
    paddingBottom: "20px",
  },
  award_card: {
    background: "#05103A",
    width:"20rem",
    height:"20rem"
  },

  root: {},
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
    width: "200px",
    height: "227px",
    padding: "10px",
    backgroundColor: "#05103A",
    borderRadius: "10px",
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
      "linear-gradient(180deg, rgba(5, 16, 58, 0) 0%, rgba(5, 16, 58, 0.9) 51.67%, #05103A 100%)",
  },
  hide: {
    zIndex: "1",
    position: "absolute",
    left: "50%",
    top: "75%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    height: "45px",
    background: "#05103A",
  },
  content: {
    zIndex: "2",
  },
  award_name: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#F6C700",
  },
  year: {
    fontSize: "10px",
    fontWeight: "600",
    color: "#BDBDBD",
  },
  event_name: {
    fontSize: "10px",
    fontWeight: "600",
    color: "#BDBDBD",
  },
  award: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#ffffff",
  },
}));

export default AwardStyle;
