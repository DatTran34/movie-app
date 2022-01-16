import { makeStyles } from "@mui/styles";

const NavBarStyle = makeStyles((theme) => ({
    navbar_container:
    {
        padding: "0.5rem",
        borderRadius: "30px",
        background: "#27244f",
        color:"#CCD2E3",
        boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.25)"
    },
    navbar_panel:{
        position: "absolute",
        top: "65px",
        background: "rgba(51, 45, 89, 0.6)",
        transform: "translateX(-45)",
        border : "none",
        borderRadius: "0 10px 10px 10px",
        boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.25)",
        webkitBackdropFilter: "blur(40px)",
        backdropFilter: "blur(40px)"
    },
    column:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        width:"200px",
    },
    row:{
        width:"400px",
    },
    navbar_panel_item:{
        color: "#ffffff",
        cursor:"pointer",
        padding:"0.5rem",
        "&:hover":{
            background: "#fbc108",
        },
    },
    search_language_box: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "transparent",
        borderBottom: "1px solid #fff",
        transition: "width 0.5s",
        padding: "0.5rem",
        color: "#ffffff"
    },
    input_language: {
        fontWeight: "500",
        background:"transparent",
        color:"#ffffff",
        border:"none",
        outline:"none",
    },
    navbar_button:{
        padding:"10px 20px",
        cursor:"pointer",
        borderRadius:"10px",
    },
    navbar_button_hover:{
        borderRadius: "10px 10px 0 0",
        backgroundColor: "#fbc108",
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
        width: '60%',
        fontSize: "0.75rem",
        transition: "width 0.5s",
        padding: "0.5rem",
        
    },

    navbar_searchBox_searching: {
        backgroundColor: "#16214A",
        width: '100%',
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
        width:"100%",
        background: "rgba(51, 45, 89, 0.6)",
        boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.25)",
        webkitBackdropFilter: "blur(40px)",
        backdropFilter: "blur(40px)",
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
        cursor:"pointer",
        '&:hover' : {
            background: "#fbc108",
        }
    },
    navbar_search_panel_last_item: {
        padding:"10px",
        display:"flex",
        flexDirection:"row",
        cursor:"pointer"
    },
    item:{
        padding:"5px"
    },
    item_span:{
        padding:"5px",
        color:"#fb4e68"
    }
}))

export default NavBarStyle