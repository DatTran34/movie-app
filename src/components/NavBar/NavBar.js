import { React, useState, useEffect } from "react";
import logo from "../../images/logo.png";
import SearchBar from "./SearchBar";
import LargeCategoryBar from "./LargeCategoryBar";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";

import { makeStyles } from "@mui/styles";
import SmallCategoryBar from "./SmallCategoryBar";
import { useMediaQuery } from "./useMediaQuery";
const NavBarStyle = makeStyles((theme) => ({
  container: {
    padding: "1rem 1.5rem",
    background: " #0a192f",
    color: "#CCD2E3",
    borderBottom: "1px solid rgb(204, 210, 227, 0.5)"
    // boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  gridLarge: {
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "1fr 5fr 2fr",
  },
  gridMedium:{
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "1fr 5fr",
  },
  gridSmall: {
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "1fr 1fr",
  },
  col: {
    //background: "pink",
    width: "100%",
    alignContent: "center",
    display: "grid",
    "& img": {
      width: "100%",
      height: "100%",
    },
  },
}));

function NavBar() {
  const navbarStyle = NavBarStyle();
  const [matches, setMatches] = useState(true);
  const [isSmallCategoryBarShown, setIsSmallCategoryBarShown] = useState(false);

  let isPageWide = useMediaQuery("(min-width: 960px)");
  let isPageMedium = useMediaQuery("(min-width: 540px)");



  // useEffect(() => {
  //   const media = window.matchMedia("(min-width: 960px)");
  //   if (media.matches !== matches) {
  //     setMatches(media.matches);
  //   }
  //   const listener = () => {
  //     setMatches(media.matches);
  //   };
  //   media.addListener(listener);
  //   return () => media.removeListener(listener);
  // }, [matches]);

  // const handleSmallCategoryBar = () => {
  //   setIsSmallCategoryBarShown(true);
  // };


  return (
    <div style={{ width: "100%", position: "fixed", zIndex: "50" }}>
      {isPageWide ? (
        <div >
          <div className={`${navbarStyle.container}`}>
            <div className={`${navbarStyle.gridLarge}`}>
              <div className={navbarStyle.col}>
                <img style={{ width: "8rem" }} src={logo} />
              </div>
              <div className={navbarStyle.col}>
                <LargeCategoryBar />
              </div>
              <div className={navbarStyle.col}>
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isPageMedium ? (
            <div>
              <div className={`${navbarStyle.container}`}>
                <div className={`${navbarStyle.gridMedium}`}>
                  <div className={navbarStyle.col}>
                    <img style={{ width: "10rem" }} src={logo} />
                  </div>
                  <div className={navbarStyle.col}>
                    <SearchBar />
                  </div>
                </div>
                <div
                  className={`${navbarStyle.col} ${navbarStyle.gridMedium_category_bar}`}
                  style={{paddingTop:"1rem"}}
                >
                  <LargeCategoryBar />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className={`${navbarStyle.container}`}>
                <div className={`${navbarStyle.gridSmall}`}>
                  <div on className={navbarStyle.col}>
                    <img style={{ width: "10rem" }} src={logo} />
                  </div>
                  <div className={navbarStyle.col} style={{ justifyContent:"right"}}>
                    <MenuSharpIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setIsSmallCategoryBarShown(!isSmallCategoryBarShown);
                      }}
                      onBlur={() => {
                        console.log("ss");
                      }}
                    />{" "}
                    {isSmallCategoryBarShown && <SmallCategoryBar />}
                  </div>
                  
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NavBar;
