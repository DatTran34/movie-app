import { makeStyles } from "@mui/styles";

const MovieStyle = makeStyles((theme) => ({
    container: {
        padding: "20px",
        margin:"0 150px"
    },
    header: {
        color: "white",
        fontSize: "24px",
        fontWeight: "600",
        textAlign: "left"
    },
    description: {
        color: "#9C9C9C",
        fontSize: "14px",
        fontWeight: "600",
        textAlign: "left",
        
    },
    left_box: {
        background: "#2D375A",
        borderRadius: "10px"
    },
    right_box: {
        background: "#2D375A",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "20px",
        borderRadius: "10px"
    },
    upcoming_box: {
        overflow: "auto",
        width: "100%",
        maxWidth: "360px",
        display: "flex",
        height: "400px"
    },
    overlay_inner:{
        margin:"auto",
      
    },
    upcoming_box_title: {
        color: "#F6C700",
        fontWeight: "700",
        fontSize: "24px",
        paddingBottom:"20px"
    },
    pageButton:{
        color:"white"
    }
}))

export default MovieStyle