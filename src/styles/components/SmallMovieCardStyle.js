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
    year:{
        color:"#F6C700",
        fontWeight: "600"
    },
    title:{
        color:"white",
        fontWeight: "600"
    }
}))

export default MovieCardStyle