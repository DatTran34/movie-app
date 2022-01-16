import { makeStyles } from "@mui/styles";
import { keyframes } from "@mui/styled-engine";

const bounce = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.2);
  }
`;

const MovieCardStyle = makeStyles((theme) => ({
    box : {
        position: "relative",
        cursor:"pointer",
        position: "relative",
        backgroundColor: "yellow",
        "& img": {
            width: "100%",
            height: "100%"
          },
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
        zIndex:"2"
    },
    img:{
        borderRadius:"10px",
        transition: "all 0.4s ease-out",
        "&:hover": {
            position: "absolute",
            top: "-10px",
            left: "0px",
            transform: "scale(1.2)",
            //animation: `${bounce} 0.4s ease`,
        }
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