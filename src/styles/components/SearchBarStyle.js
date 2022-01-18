import { makeStyles } from "@mui/styles";

const SearchBarStyle = makeStyles((theme) => ({
  navbar_search_1: {
    position: "relative",
    flex: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    color: "#CCD2E3",
  },
  navbar_search_2: {
    display: "grid",
    gridGap: "0.5rem",
    color: "#CCD2E3",
  },
  navbar_searchBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "1px solid #CCD2E3",
    borderRadius: "10px",
    fontSize: "0.75rem",
    transition: "width 0.5s",
    padding: "0.5rem",
    "$:hover": {
      backgroundColor: "#CCD2E3",
    },
    
  },
  navbar_searchBox_searching: {
    backgroundColor: "#CCD2E3",
    color: "#1f2845",
  },
  navbar_searchBox_searching_scale_width: {
    width: "100%",
  },
  navbar_input: {
    background: "transparent",
    // '&:placeholder-shown ': {
    //     backgroundColor: "transparent",
    // },
    // '$navbar_input:hover ~$navbar_searchButton': {
    //     display: "flex",
    // },
    border: "none",
    outline: "none",
    color:"white"
  },
  navbar_input_searching: {
        color:"#1f2845"
  },

  navbar_searchButton: {
    display: "none",
    cursor: "pointer",
    padding: "0.25rem 1rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    backgroundColor: "#374269",
    transition: "all 1s ease-out",
  },
  navbar_searchButton_searching: {
    display: "flex",
    color:"white"
  },
  navbar_search_panel_absolute: {
    position: "absolute",
    top: "60px",
    width: "100%",
  },
  navbar_search_panel: {
    background: "rgba(51, 45, 89, 0.6)",
    boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.25)",
    webkitBackdropFilter: "blur(40px)",
    backdropFilter: "blur(40px)",
    transform: "translateX(-45)",
    border: "none",
    borderRadius: "5px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  navbar_search_panel_item: {
    padding: "10px",
    borderBottom: "1px solid #9C9AA7",
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    "&:hover": {
      background: "#fbc108",
    },
  },
  navbar_search_panel_last_item: {
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
  },
  item: {
    padding: "5px",
  },
  item_span: {
    padding: "5px",
    color: "#fb4e68",
  },
}));

export default SearchBarStyle
