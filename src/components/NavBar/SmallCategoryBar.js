import { React, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import classNames from "classname";
const SmallsmallCategoryStyle = makeStyles((theme) => ({
  container: {
    position: " absolute",
    width: "100%",
    top: "5.5rem",
    left: "0",
    zIndex: "51",
  },
  box: {
    padding:"1rem",
    background: "#1f2845",
    borderRadius: "10px",
  },
  overlay_outter: {
    overflow: "auto",
    display: "flex",
    alignItems: "flex-start",
    height: "100vh",
    scrollbarWidth: "none"
  },
  overlay_inner: {
    display: "grid",
    width: "100%",
    gridGap: "0.5rem",

    textAlign: "center",
  },
  col: {
    
  },
  navbar_button: {
    cursor: "pointer",
    padding: "0.5rem 0 ",
    "&:hover": {
      background: "#CCD2E3",
      color: "#1f2845"
    },
  },
  navbar_button_hover:{
    background: "#CCD2E3",
    color: "#1f2845"
},
  panel: {
    display: "grid",
    
    //background: "#fbc108",
  },
  panel_item: {
    cursor: "pointer",
    padding: "0.5rem 0 ",
    background: "#CCD2E3",
    color: "#1f2845",
  },
}));
function SmallCategoryBar() {
  const smallCategoryStyle = SmallsmallCategoryStyle();
  const [isMoviesShown, setIsMoviesShown] = useState(false);
  const [isTVShowsShown, setTVShowsShown] = useState(false);
  const [isGenresShown, setIsGenresShown] = useState(false);
  const [isYearShown, setIsYearShown] = useState(false);
  const [isCountryShown, setIsCountryShown] = useState(false);
  const [isPopularPeopleShown, setIsPopularPeopleShown] = useState(false);
  const [isSearchLanguageShown, setIsSearchLanguageShown] = useState(false);


  const navbarMoviesButtonStyle = classNames({
    [smallCategoryStyle.navbar_button_hover]: isMoviesShown,
    [smallCategoryStyle.navbar_button]: true
});
const navbarTVShowsButtonStyle = classNames({
    [smallCategoryStyle.navbar_button_hover]: isTVShowsShown,
    [smallCategoryStyle.navbar_button]: true
});
const navbarGenresButtonStyle = classNames({
    [smallCategoryStyle.navbar_button_hover]: isGenresShown,
    [smallCategoryStyle.navbar_button]: true
});
const navbarYearsButtonStyle = classNames({
    [smallCategoryStyle.navbar_button_hover]: isYearShown,
    [smallCategoryStyle.navbar_button]: true
});
const navbarPopularPeopleButtonStyle = classNames({
    [smallCategoryStyle.navbar_button_hover]: isPopularPeopleShown,
    [smallCategoryStyle.navbar_button]: true
});
const navbarCountryButtonStyle = classNames({
  [smallCategoryStyle.navbar_button_hover]: isCountryShown,
  [smallCategoryStyle.navbar_button]: true
});

  return (
    <div className={smallCategoryStyle.container}>
      <div style={{ padding: "0 1rem" }}>
         <div className={smallCategoryStyle.box}>
        <div className={smallCategoryStyle.overlay_outter}>
          <div className={smallCategoryStyle.overlay_inner}>
            <div className={smallCategoryStyle.col}>
              <div
                 className={navbarMoviesButtonStyle}
                onClick={() => {
                  setIsMoviesShown(!isMoviesShown);
                }}
              >
                Movie
              </div>
              {isMoviesShown && (
                <div className={smallCategoryStyle.panel}>
                  <div className={smallCategoryStyle.panel_item}>row</div>
                  <div className={smallCategoryStyle.panel_item}>row</div>
                  <div className={smallCategoryStyle.panel_item}>row</div>
                  <div className={smallCategoryStyle.panel_item}>row</div>
                  <div className={smallCategoryStyle.panel_item}>row</div>
                </div>
              )}
            </div>

            <div className={smallCategoryStyle.col}>col</div>
            <div className={smallCategoryStyle.col}>col</div>
            <div className={smallCategoryStyle.col}>col</div>
            <div className={smallCategoryStyle.col}>col</div>
            <div className={smallCategoryStyle.col}>col</div>
            <div className={smallCategoryStyle.col}>col</div>
            <div className={smallCategoryStyle.col}>col</div>
            <div className={smallCategoryStyle.col}>col</div>
            <div className={smallCategoryStyle.col}>col</div>
            <div className={smallCategoryStyle.col}>col</div>
            <div className={smallCategoryStyle.col}>col</div>
            <div className={smallCategoryStyle.col}>col</div>
          </div>
        </div>
      </div>
      </div>
     
    </div>
  );
}

export default SmallCategoryBar;

{
  /* <div className={smallCategoryStyle.col}>
<div
  className={smallCategoryStyle.button}
  onClick={() => {
    setIsMoviesShown(!isMoviesShown);
  }}
>
  Movie
</div>
{isMoviesShown && (
  <div className={smallCategoryStyle.panel}>
    <div className={smallCategoryStyle.panel_item}>col</div>
    <div className={smallCategoryStyle.panel_item}>col</div>
    <div className={smallCategoryStyle.panel_item}>col</div>
    <div className={smallCategoryStyle.panel_item}>col</div>
    <div className={smallCategoryStyle.panel_item}>col</div>
  </div>
)}
</div> */
}
