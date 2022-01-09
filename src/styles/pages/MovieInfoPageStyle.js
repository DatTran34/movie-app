import { makeStyles } from "@mui/styles";

const MovieInfoStyle = makeStyles((theme) => ({
    root: {
        fontWeight: "600",
        color: "#ffffff",
    },
    poster: {
        width: "320px",
        borderRadius: "20px",
    },
    movie_name: {
        fontWeight: "800",
        fontSize: "3rem",
    },
    year:{
        color: "#BDBDBD",
        paddingTop: "20px",
        fontSize: "1.5rem",
    },
    trailer_button:{
        padding: "10px 20px",
        backgroundColor: "#4CCDEB",
        borderRadius: "10px",
    },
    category_button:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#BDBDBD",
        border: "2px solid #BDBDBD",
        borderRadius: "50px",
        padding: "0px 20px",
    },
    title:{
        color: "#4CCDEB"
    },
    content:{
        color: "#ffffff",
    },
    cast_image: {
        width: "50px",
        height: "50px",
        boxSizing: "border-box",
        border: "2px solid #4CCDEB",
        borderRadius: "100px"
    },
}))

export default MovieInfoStyle