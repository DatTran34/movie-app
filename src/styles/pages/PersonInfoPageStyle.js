import { makeStyles } from "@mui/styles";

const PersonInfoPageStyle = makeStyles((theme) => ({
    right_box: {
        margin: "0 20px 0 20px",
    },
    credits_box_container: {
        paddingBottom: "20px",
    },
    credits_box_title: {
        color: "white",
        fontSize: "26px",
        fontWeight: "700",
        textAlign: "left",
        padding: "10px 0",
        
    },
    credits_box: {
        borderRadius: "10px",
        background: "#2D375A",
        padding: "10px",
        color: "#CCD2E3",
        textAlign: "left",
    },
    year_box_movie_name: {
        color: "#4CCDEB",
        fontWeight: "600",
        cursor:"pointer"
    },
    year_box_actor_name: {
        color: "#CCD2E3",
        fontWeight: "500",
    },
}))

export default PersonInfoPageStyle