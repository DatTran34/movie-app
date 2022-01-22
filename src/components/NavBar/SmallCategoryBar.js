import { React, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import classNames from "classname";
import SearchBar2 from "./SearchBar2";
import { getCountries, getGenres } from "../../axios/NavBarRequest";
import { useHistory, useLocation } from "react-router";
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
    borderRadius:"10px",
    "&:hover": {
      background: "#4CCDEB",
      color: "#CCD2E3"
    },
  },
  navbar_button_hover:{
    background: "#4CCDEB",
    color: "#CCD2E3"
},
  panel: {
    display: "grid",
    
    //background: "#fbc108",
  },
  panel_item: {
    cursor: "pointer",
    padding: "0.5rem 0 ",
  },
}));
function SmallCategoryBar() {
  const history = useHistory();
  const location = useLocation();
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
//=====================GET Genre List=================//
const [genres, setGenres] = useState([]);
const [languages, setLanguages] = useState([]);
const [filteredLanguages, setFilteredLanguages] = useState([]);
useEffect(() => {
  let searchParams = new URLSearchParams(location.search);
  let mediaType = " ";
  if (searchParams.get("media_type") === null) {
    mediaType = "movie";
  } else {
    mediaType = searchParams.get("media_type");
  }
  getGenres(mediaType)
    .then((data) => {
      setGenres(data.genres);
    })
    .catch((e) => {
      console.log(e);
    });
  getCountries()
    .then((data) => {
      setLanguages(data);
    })
    .catch((e) => {
      console.log(e);
    });
  handleYearInNavBar();
  handleSearchLanguage("");
}, [location]);

const handleSearchLanguage = (value) => {
  if (value !== "") {
    setIsSearchLanguageShown(true);
    setFilteredLanguages(
      languages.filter((language) => {
        if (language.english_name.search(new RegExp(value, "i")) === -1)
          return 0;
        else return 1;
      })
    );
  } else {
    setIsSearchLanguageShown(false);
  }
};

//============== GENERATE THE YEAR ===============
const [yearArray, setYearArray] = useState([]);
const handleYearInNavBar = () => {
  var THE_NUMBER_OF_YEAR = 18;
  var current_year = new Date().getFullYear();
  var year_array_ = new Array();
  for (var i = 0; i < THE_NUMBER_OF_YEAR; i++) {
    year_array_.push(current_year - 1);
    current_year = current_year - 1;
  }
  setYearArray(year_array_);
};
//*****************function to handle Query Params*********************/
const addQuery = (key, value) => {
  let pathname = location.pathname;
  // returns path: '/app/books'
  let searchParams = new URLSearchParams(location.search);
  checkMediaType(searchParams);
  // returns the existing query string: '?genre=fiction&year=2019'
  searchParams.set(key, value);
  searchParams.delete("category");
  searchParams.delete("page");
  searchParams.delete("query");
  history.push({
    pathname: "/filter",
    search: searchParams.toString(),
  });
};

const addQuery_2 = (media_type, value) => {
  let searchParams = new URLSearchParams(location.search);
  searchParams.delete("genre");
  searchParams.delete("year");
  searchParams.delete("country");
  searchParams.delete("page");
  searchParams.delete("query");
  searchParams.set("media_type", media_type);
  searchParams.set("category", value);
  history.push({
    pathname: "/filter",
    search: searchParams.toString(),
  });
};

const checkMediaType = (searchParams) => {
  if (!searchParams.has("media_type")) {
    searchParams.set("media_type", "movie");
  }
};

const removeQuery = (key) => {
  let pathname = location.pathname;
  // returns path: '/app/books'
  let searchParams = new URLSearchParams(location.search);
  // returns the existing query string: '?type=fiction&author=fahid'
  searchParams.delete(key);
  history.push({
    pathname: "/filter",
    search: searchParams.toString(),
  });
};
  return (
    <div className={smallCategoryStyle.container}>
      <div style={{ padding: "0 1rem" }}>
        <div className={smallCategoryStyle.box}>
          <div className={smallCategoryStyle.overlay_outter}>
            <div className={smallCategoryStyle.overlay_inner}>
              <div className={smallCategoryStyle.col}>
                <SearchBar2 />
              </div>

              <div className={smallCategoryStyle.col}>
                <div className={navbarMoviesButtonStyle}>
                  <div
                    onClick={() => {
                      setIsMoviesShown(!isMoviesShown);
                    }}
                  >
                    Movie
                  </div>
                  {isMoviesShown && (
                    <div className={smallCategoryStyle.panel}>
                      <div
                        className={smallCategoryStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "Popular");
                        }}
                      >
                        Popular
                      </div>
                      <div
                        className={smallCategoryStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "Now Playing");
                        }}
                      >
                        Now Playing
                      </div>
                      <div
                        className={smallCategoryStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "Up Coming");
                        }}
                      >
                        Up Coming
                      </div>
                      <div
                        className={smallCategoryStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "Top Rated");
                        }}
                      >
                        Top Rated
                      </div>
                    </div>
                  )}
                </div>
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
