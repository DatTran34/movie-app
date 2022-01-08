import { makeStyles } from "@mui/styles";

const HomeStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: "yellow",
        border: "solid 1px black"
    },
    title: {
        padding:"1rem"
    },
    row:{
        backgroundColor: "#D2DAE2",
        height: "3rem",
        width: "3rem",
        borderRadius: "50%"
    }
}))

export default HomeStyle