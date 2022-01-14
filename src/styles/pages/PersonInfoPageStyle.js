import { makeStyles } from "@mui/styles";

const PersonInfoPageStyle = makeStyles((theme) => ({
    right_box:{
        margin:"10px 10px 0 0",
    },
    container:{
        paddingBottom:"20px"
    },
    known_for_box: {
        borderRadius:"10px",
        background:"#2D375A",
        padding:"10px",
    },
    known_for_box_overlay_outter:{
        overflow: "auto",
        display: "flex",
        height: "345px",
    },
    known_for_box_overlay_inner:{
        margin:"auto"
        
    },known_for_title : {
        color:"white",
        fontSize:"26px",
        fontWeight:"700",
        textAlign:"left",
        paddingBottom:"20px"
    },
    credits_box:{
        borderRadius:"10px",
        background:"#2D375A",
        padding:"10px",
        height:"400px"
    }
}))

export default PersonInfoPageStyle