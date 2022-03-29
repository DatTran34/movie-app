import { makeStyles } from "@mui/styles";
const MovieCardStyle = makeStyles((theme) => ({
    root: {
        width: "100%",
        padding: "0.5rem 1rem ",
        "&:hover" : {
          background: "#0a192f"
        }
    },
    img:{
        width: "60px"
    },
    time: {
        padding: " 0.125rem 0.5rem",
        backgroundColor: "#29bdae",
        color: "#172a46",
      },
    year:{
        color:"#CCD2E3",
        fontWeight: "600"
    },
    title:{
        color:"#CCD2E3",
        fontWeight: "600",
        width: "10rem",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    }
}))

export default MovieCardStyle