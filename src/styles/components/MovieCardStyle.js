import { makeStyles } from "@mui/styles";
const MovieCardStyle = makeStyles((theme) => ({
    box : {
        height:"245px",
        width:"165px",
        position: "relative",
        cursor:"pointer"
    },
    imdb_rating_box:{
        position: "absolute",
        top: "10px",
        right:"10px",
        padding:"4px 6px",
        borderRadius:"10px",
        background: "#F6C700",
        fontSize:"12px",
        fontWeight:"700",
        color: "#05103A",
       
    },
    img:{
        width: "165px",
        height:"245px",
        borderRadius:"10px"
    },
    content:{
        paddingTop:"1rem",
        fontSize:"14px",
        fontWeight:"600"
    },
    title:{
        
        color: "#ffffff"
    },
    time:{
        color:"#BDBDBD"
    },
    year:{
        color:"#4CCDEB"
    }
}))

export default MovieCardStyle