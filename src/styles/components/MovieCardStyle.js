import { makeStyles } from "@mui/styles";
const MovieCardStyle = makeStyles((theme) => ({
    box : {
        height:"225px",
        width:"150px",
        position: "relative"
    },
    imdb_rating_box:{
        position: "absolute",
        top: "5px",
        right:"5px",
        padding:"4px 6px",
        borderRadius:"10px",
        background: "#F6C700",
        fontSize:"12px",
        fontWeight:"700",
        color: "#05103A",
       
    },
    img:{
        width: "150px",
        borderRadius:"10px"
    },
    content:{
        position: "absolute",
        bottom:"0",
        minWidth:"150px",
        minHeight:"110px",
        background: "linear-gradient(to bottom, transparent 0%,  rgba(5, 16, 60) 60%, rgba(5, 16, 58) 100%)",
        fontSize:"12px",
        fontWeight:"700",
        color: "white",
        borderRadius:"10px"
    },
    title:{
        fontSize:"14px",
    },
    time:{
        color:"#BDBDBD"
    },
    year:{
        color:"#4CCDEB"
    }
}))

export default MovieCardStyle