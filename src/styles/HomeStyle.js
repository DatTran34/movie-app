import { makeStyles } from "@mui/styles";

const HomeStyle = makeStyles((theme) => ({
    item: {
        backgroundColor: "yellow",
        border: "solid 1px black"
    },
    competitionList: {
        padding:"1rem"
    },
    leagueIcon:{
        backgroundColor: "#D2DAE2",
        height: "3rem",
        width: "3rem",
        borderRadius: "50%"
    }
}))

export default HomeStyle