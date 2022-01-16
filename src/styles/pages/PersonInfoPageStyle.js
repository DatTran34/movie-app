import { makeStyles } from "@mui/styles";

const PersonInfoPageStyle = makeStyles((theme) => ({
    right_box: {
        margin: "10px 20px 0 20px",
    },
    container: {
        paddingBottom: "20px"
    }, known_for_title: {
        color: "white",
        fontSize: "26px",
        fontWeight: "700",
        textAlign: "left",
        paddingBottom: "20px"
    },
    credits_box: {
        borderRadius: "10px",
        background: "#2D375A",
        padding: "15px",
    },
    year_box: {
        background: "#3F496D",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "15px"
    },
    year_box_title: {
        color: "#F6C700",
        fontWeight: "700",
        textAlign: "left",
        fontSize: "24px"
    },
    year_box_content: {
        color: "#ffffff",
        textAlign: "left",
    },
    year_box_movie_name: {
        color: "#4CCDEB",
        fontWeight: "600",
    },
    year_box_actor_name: {
        color: "#ffffff",
        fontWeight: "500",
    },
}))

export default PersonInfoPageStyle