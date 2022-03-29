import { makeStyles } from "@mui/styles";

const PersonInfoPageStyle = makeStyles((theme) => ({
  right_box: {
    margin: "0 20px 0 20px",
  },
  credits_box_container: {
    display: "grid",
    backgroundColor: "#172a46",
    padding: "1rem 1rem",
    marginBottom: "1rem",
  },
  credits_box_title: {
    color: "#bb86fc",
    fontSize: "1.5rem",
    fontWeight: "700",
    textAlign: "left",
  },
  credits_box_position: {
    color: "#4ccdeb",
    fontSize: "1.5rem",
    fontWeight: "700",
    textAlign: "left",
  },
  credits_box: {
    background: "#112240",
    marginTop: "0.5rem",
    padding: "1rem",
    paddingTop: "0.5rem",
    color: "#CCD2E3",
    textAlign: "left",
  },
  year_box_movie_name: {
    color: "#4CCDEB",
    fontWeight: "600",
    cursor: "pointer",
  },
  year_box_actor_name: {
    color: "#CCD2E3",
    fontWeight: "500",
  },
}));

export default PersonInfoPageStyle