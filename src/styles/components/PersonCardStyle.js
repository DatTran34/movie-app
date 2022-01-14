import { makeStyles } from "@mui/styles";
const PersonCardStyle = makeStyles((theme) => ({
    box : {
        height:"160px",
        width:"365px",
        position: "relative",
        borderRadius:"10px",
        cursor:"pointer",
        background:"#16214A",
        position:"relative"
    }, img:{
        height:"140px",
        padding:"10px",
        borderRadius:"20px"
    },
    yellowColumn:{
        position:"absolute",
        top:"0",
        left:"0",
        background:"#F6C700",
        height:"100%",
        borderRadius: "10px 0 0 10px",
        color:"#F6C700",
    },
    info:{
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"center",
        padding:"25px 0"
    },
    header:{
        color:"#4CCDEB",
        fontWeight:"700",
        fontSize:"24px"
    },
    content:{
        color:"#FFFFFF",
        fontWeight:"600",
        textAlign:"left"
    }
}))

export default PersonCardStyle