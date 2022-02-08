import { makeStyles } from "@mui/styles";

const Style = makeStyles((theme) => ({
    root: {
        fontWeight: "600",
        color: "#CCD2E3",
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
        left: "0",
        top: "0",
        transform: "translate(0%, 0%)",
        position: "absolute",
        height: "669px",
    },
    poster: {
        width: "320px",
        borderRadius: "20px",
    },
    name: {
        fontWeight: "800",
        fontSize: "4rem",
    },
    year:{
        color: "#CCD2E3",
        paddingTop: "20px",
        fontSize: "1.5rem",
    },
    trailer_button:{
        textAlign: "center",
        padding: "10px 20px",
        cursor: "pointer",
        backgroundColor: "#4CCDEB",
        maxWidth:"10rem"
    },
    category_button:{
        display: "flex",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0.1rem",
        border:"2px solid #4CCDEB",
        color:"#4CCDEB",
        fontWeight:"600",
        backgroundColor:"rgba(76, 205, 235, 0.1)",
        maxHeight:"3rem"
    },
    box: {
        width: "6.5rem"
    },
    title:{
        color: "#4CCDEB"
    },
    content:{
        color: "#CCD2E3",
    },
    content_overview:{
        color: "#CCD2E3",
    },
    cast_image: {
        width: "50px",
        height: "50px",
        boxSizing: "border-box",
        border: "2px solid #4CCDEB",
        borderRadius: "100px",
        objectFit: "cover",
    },
}))

export default Style