import { React, useState, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classname";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar2 from "./SearchBar2";
import defaultLanguages from "../../data/CountryList";
import { getCountries, getGenres } from "../../axios/NavBarRequest";
import { useHistory, useLocation } from "react-router";
const SmallsmallCategoryStyle = makeStyles((theme) => ({
  "@keyframes myEffect": {
    "0%": {
      height: "0",
    },
    "100%": {
      height: "auto",
    },
  },
  "@keyframes myNavbarEffect": {
    "0%": {
      width: "0vw",
    },
    "100%": {
      width: "80vw",
    },
  },
  container: {
    position: " absolute",
    width: "100%",
    top: "3.5rem",
    right: "0",
    zIndex: "51",
    animation: `$myNavbarEffect 0.4s ease-in-out`,
  },
  box: {
    padding: "1rem 0",
    background: "#0a192f",
  },
  overlay_outter: {
    overflow: "auto",
    display: "flex",
    alignItems: "flex-start",
    height: "100vh",
    scrollbarWidth: "none",
  },
  overlay_inner: {
    display: "grid",
    width: "100%",

    textAlign: "center",
  },
  col: {},
  navbar_button: {
    cursor: "pointer",
    padding: "0.5rem 0 ",
    "&:hover": {
      color: "#29bdae",
    },
  },
  navbar_button_hover: {
    //background: "#29bdae",
    color: "#29bdae",
  },
  panel: {
    display: "grid",
    animation: `$myEffect 0.4s ease-out`,
    background: "#112240",
  },
  panel_column: {
    
    display: "grid",
    gridGap: "0.5rem",
    gridTemplateColumns: "repeat(3,1fr)",
    background: "#112240",
  },
  panel_item: {
    cursor: "pointer",
    padding: "0.5rem 0",
    "&:hover": {
      background: "#28baac",
    },
  },
  input_language: {
    fontWeight: "500",
    background: "transparent",
    color: "#CCD2E3",
    border: "none",
    outline: "none",
  },
  search_language_box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    borderBottom: "1.5px solid #CCD2E3",
    transition: "width 0.5s",
    padding: "0.5rem",
    color: "#CCD2E3",
  },
}));
function SmallCategoryBar({setIsSmallCategoryBarShown}) {
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
      <div>
        <div className={smallCategoryStyle.box}>
          <div className={smallCategoryStyle.overlay_outter}>
            <div className={smallCategoryStyle.overlay_inner}>
              <div style={{ padding: "0.5rem 1rem" }}>
                <SearchBar2 />
              </div>

              <div className={navbarMoviesButtonStyle}>
                <div
                  onClick={() => {
                    setIsMoviesShown(!isMoviesShown);
                    setTVShowsShown(false);
                    setIsCountryShown(false);
                    setIsPopularPeopleShown(false);
                    setIsYearShown(false);
                    setIsGenresShown(false);
                  }}
                >
                  Movie
                </div>
              </div>
              {isMoviesShown && (
                <div className={smallCategoryStyle.panel}>
                  <div
                    className={smallCategoryStyle.panel_item}
                    onClick={() => {
                      setIsSmallCategoryBarShown(false);
                      addQuery_2("movie", "Popular");
                    }}
                  >
                    Popular
                  </div>
                  <div
                    className={smallCategoryStyle.panel_item}
                    onClick={() => {
                      setIsSmallCategoryBarShown(false);
                      addQuery_2("movie", "Now Playing");
                    }}
                  >
                    Now Playing
                  </div>
                  <div
                    className={smallCategoryStyle.panel_item}
                    onClick={() => {
                      setIsSmallCategoryBarShown(false);
                      addQuery_2("movie", "Up Coming");
                    }}
                  >
                    Up Coming
                  </div>
                  <div
                    className={smallCategoryStyle.panel_item}
                    onClick={() => {
                      setIsSmallCategoryBarShown(false);
                      addQuery_2("movie", "Top Rated");
                    }}
                  >
                    Top Rated
                  </div>
                </div>
              )}

              {/* ============= TV Shows =============== */}
              <div className={navbarTVShowsButtonStyle}>
                <div
                  onClick={() => {
                    setTVShowsShown(!isTVShowsShown);
                    setIsMoviesShown(false);
                    setIsCountryShown(false);
                    setIsPopularPeopleShown(false);
                    setIsYearShown(false);
                    setIsGenresShown(false);
                  }}
                >
                  Tv Shows
                </div>
              </div>
              {isTVShowsShown && (
                <div className={smallCategoryStyle.panel}>
                  <div
                    className={smallCategoryStyle.panel_item}
                    onClick={() => {
                      setIsSmallCategoryBarShown(false);
                      addQuery_2("tv", "Popular");
                    }}
                  >
                    Popular
                  </div>
                  <div
                    className={smallCategoryStyle.panel_item}
                    onClick={() => {
                      setIsSmallCategoryBarShown(false);
                      addQuery_2("tv", "Airing Today");
                    }}
                  >
                    Airing Today
                  </div>
                  <div
                    className={smallCategoryStyle.panel_item}
                    onClick={() => {
                      setIsSmallCategoryBarShown(false);
                      addQuery_2("tv", "On The Air");
                    }}
                  >
                    On The Air
                  </div>
                  <div
                    className={smallCategoryStyle.panel_item}
                    onClick={() => {
                      setIsSmallCategoryBarShown(false);
                      addQuery_2("tv", "Top Rated");
                    }}
                  >
                    Top Rated
                  </div>
                </div>
              )}
              {/* ============= Genres =============== */}
              <div className={navbarGenresButtonStyle}>
                <div
                  onClick={() => {
                    setTVShowsShown(false);
                    setIsMoviesShown(false);
                    setIsCountryShown(false);
                    setIsPopularPeopleShown(false);
                    setIsYearShown(false);
                    setIsGenresShown(!isGenresShown);
                  }}
                >
                  Genres
                </div>
              </div>
              {isGenresShown && (
                <div className={smallCategoryStyle.panel_column}>
                  {genres.map((genre, key) => {
                    return (
                      <div
                        className={smallCategoryStyle.panel_item}
                        key={key}
                        onClick={() => {
                          addQuery("genre", `${genre.id}`);
                        }}
                      >
                        {genre.name}
                      </div>
                    );
                  })}
                </div>
              )}
              {/* ============= Year =============== */}
              <div className={navbarYearsButtonStyle}>
                <div
                  onClick={() => {
                    setTVShowsShown(false);
                    setIsMoviesShown(false);
                    setIsCountryShown(false);
                    setIsPopularPeopleShown(false);
                    setIsYearShown(!isYearShown);
                    setIsGenresShown(false);
                  }}
                >
                  Year
                </div>
              </div>
              {isYearShown && (
                <div className={smallCategoryStyle.panel_column}>
                  {yearArray.map((year, key) => {
                    return (
                      <div
                        className={smallCategoryStyle.panel_item}
                        key={key}
                        onClick={() => {
                          addQuery("year", `${year}`);
                        }}
                      >
                        {year}
                      </div>
                    );
                  })}
                </div>
              )}
              {/* ============= Country =============== */}
              <div className={navbarCountryButtonStyle}>
                <div
                  onClick={() => {
                    setTVShowsShown(false);
                    setIsMoviesShown(false);
                    setIsCountryShown(!isCountryShown);
                    setIsPopularPeopleShown(false);
                    setIsYearShown(false);
                    setIsGenresShown(false);
                  }}
                >
                  Languages
                </div>
              </div>
              {isCountryShown && (
                <div style={{padding: "0 2rem"}}>
                  <div className={smallCategoryStyle.search_language_box}>
                    <Stack direction="row" style={{ width: "80%" }}>
                      <SearchIcon></SearchIcon>
                      <input
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          handleSearchLanguage(e.target.value);
                        }}
                        className={smallCategoryStyle.input_language}
                        type="text"
                        placeholder="Search..."
                      />
                    </Stack>
                  </div>
                  {isSearchLanguageShown ? (
                            <div className={smallCategoryStyle.panel_column}>
                              {filteredLanguages.slice(0,5).map((country, key) => {
                                return (
                                  <div
                                    className={smallCategoryStyle.panel_item}
                                    key={key}
                                    onClick={() => {
                                      addQuery(
                                        "language",
                                        `${country.iso_639_1}-${country.english_name}`
                                      );
                                    }}
                                  >
                                    {country.english_name}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className={smallCategoryStyle.panel_column}>
                              {defaultLanguages.map((country, key) => {
                                return (
                                  <div
                                    className={smallCategoryStyle.panel_item}
                                    key={key}
                                    onClick={() => {
                                      addQuery(
                                        "language",
                                        `${country.iso_639_1}-${country.english_name}`
                                      );
                                    }}
                                  >
                                    <div>{country.english_name}</div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallCategoryBar;

{/* <div className={smallCategoryStyle.col}>
                <div className={navbarMoviesButtonStyle}>
                  <div
                    onClick={() => {
                      setIsMoviesShown(!isMoviesShown);
                    }}
                  >
                    Movie
                  </div>
                  
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
              </div> */}








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
