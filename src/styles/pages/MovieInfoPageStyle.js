import { makeStyles } from "@mui/styles";

const MovieInfoStyle = makeStyles((theme) => ({
    root: {
        fontWeight: "600",
        color: "#ffffff",
    },
    backdrop_container: {
        position: "absolute",
        width: "1214px",
        height: "719px",
        left: "50%",
        top: "15%",
        transform: "translate(-50%, -50%)",
    },
    backdrop_blur1: {
        zIndex: "1",
        position: "absolute",
        width: "669px",
        height: "580px",
        left: "50%",
        top: "15%",
        transform: "translate(-50%, -50%)",
        transform: "rotate(-90deg)",
        background: "linear-gradient(180deg, rgba(5, 16, 58, 0) 0%, #05103A 98.54%)",
    },
    backdrop_blur2: {
        zIndex: "1",
        position: "absolute",
        width: "669px",
        height: "607px",
        right: "50%",
        top: "15%",
        transform: "translate(-50%, -50%)",
        background: "linear-gradient(180deg, #05103A 0%, rgba(5, 16, 58, 0) 98.54%)",
        transform: "rotate(-90deg)",
    },
    backdrop_blur3: {
        zIndex: "1",
        position: "absolute",
        width: "1187px",
        height: "474px",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        background: "linear-gradient(180deg, rgba(5, 16, 58, 0) 0%, rgba(5, 16, 58, 0.640592) 41.25%, rgba(5, 16, 58, 0.957524) 94.37%)",
    },
    backdrop_blur4: {
        zIndex: "1",
        position: "absolute",
        left: "50%",
        top: "100%",
        transform: "translate(-50%, -50%)",
        width: "1187px",
        height: "300px",
        backgroundColor: "#05103A",
    },
    backdrop: {
        zIndex: "0",
        left: "50%",
        top: "70%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        width: "1187px",
        height: "669px",
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