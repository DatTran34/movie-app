import { makeStyles } from "@mui/styles";

const NavBarStyle = makeStyles((theme) => ({
    navbar_container:
    {
        background: "#374269",
        height:"3.5rem",
        color:"#CCD2E3"
    },
    navbar_panel:{
        position: "absolute",
        top: "48px",
        background: "#ececf8",
        transform: "translateX(-45)",
        border : "none",
        borderRadius: "0 10px 10px 10px"
    },
    column:{
        width:"200px",
    },
    row:{
        width:"400px",
    },
    navbar_panel_item:{
        color: "#05103a",
        cursor:"pointer",
        padding:"0.5rem",
        "&:hover":{
            background: "#4CCDEB",
        },
    },
    navbar_button:{
        padding:"10px 20px",
        cursor:"pointer",
        borderRadius:"10px"
    },
    navbar_button_hover:{
        borderRadius: "10px 10px 0 0",
        backgroundColor: "#4CCDEB",
        color: "#ffffff"
    },
    navbar_search:{
        position: "relative",
        flex: "0",
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        padding:"0 1rem",
        color: "#CCD2E3"
    },
    navbar_searchBox:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1C1656",
        boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "20px",
        width: '30%',
        fontSize: "0.75rem",
        transition: "width 0.5s",
        padding: "0.5rem",
        
    },
    navbar_searchBox_searching: {
        backgroundColor: "#16214A",
        width: '70%',
    },
    navbar_input:{
        background:"transparent",
        // '&:placeholder-shown ': {
        //     backgroundColor: "transparent",   
        // },
        // '$navbar_input:hover ~$navbar_searchButton': {
        //     display: "flex",
        // },
        color:"#CCD2E3",
        border:"none",
        outline:"none",
    },
    
    navbar_searchButton:{
        display: "none",
        cursor: "pointer",
        padding: "0.25rem 1rem",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20px",
        backgroundColor: "#374269",
        transition: "all 1s ease-out"
    },
    navbar_searchButton_searching: {
        display: "flex",
    },
    navbar_search_panel:{
        position: "absolute",
        top: "60px",
        width:"70%",
        background: "#374269",
        transform: "translateX(-45)",
        border : "none",
        borderRadius:"5px",
        color: "#ffffff",
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
        color:"#BDBDBD"
    }
}))

export default NavBarStyle