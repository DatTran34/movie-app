import { makeStyles } from "@mui/styles";

const NavBarStyle = makeStyles((theme) => ({
    navbar_container:
    {
        background: "#374269",
        height:"3.5rem",
        color:"white"
    },
    navbar_panel:{
        position: "absolute",
        top: "48px",
        background: "#393650",
        transform: "translateX(-45)",
        border : "none",
        color: "white",
        borderRadius:"10px"
    },
    column:{
        width:"200px",
    },
    row:{
        width:"400px",
    },
    navbar_panel_item:{
        cursor:"pointer",
        padding:"0.5rem",
        "&:hover":{textDecoration:"underline"},
    },
    navbar_button:{
        padding:"10px 20px",
        cursor:"pointer",
        borderRadius:"10px"
    },
    navbar_button_hover:{
        background: "#393650",
    },
    navbar_search:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        padding:"0 10px"
    },
    navbar_input:{
        background:"#393650",
        borderRadius:"10px",
        padding:"7px 50px",
        color:"white",
        border:"none",
        outline:"none",
        // "&:focus":{outline:"none", width:"500px"},
        "&::placeholder": { color: "white" }
    },
    navbar_input_searching:{
        width:"500px"
    },
    navbar_search_panel:{
        position: "absolute",
        top: "58px",
        width:"600px",
        background: "#393650",
        transform: "translateX(-45)",
        border : "none",
        borderRadius:"10px",
        color: "white",
        display: "flex",
        flexDirection:"column",
    },
    navbar_search_panel_item: {
        padding:"10px",
        borderBottom: "1px solid #9C9AA7",
        display:"flex",
        flexDirection:"row",
      
    },
    navbar_search_panel_last_item: {
        padding:"10px",
        display:"flex",
        flexDirection:"row",
      
    },
    item:{
        padding:"5px"
    },
    item_span:{
        padding:"5px",
        color:"#979797"
    }
}))

export default NavBarStyle