import { makeStyles } from "@mui/styles";

const MovieStyle = makeStyles((theme) => ({
    container:{
        padding:"20px"
    },
   header:{
       color:"white",
       fontSize:"24px",
       fontWeight:"600",
       textAlign:"left"
   },
   description:{
    color:"#9C9C9C",
    fontSize:"14px",
    fontWeight:"600",
    textAlign:"left"
   },
   right_box:{
    background:"#2D375A",
   },
   left_box:{
    background:"#2D375A",
    marginLeft:"20px"
   }
}))

export default MovieStyle