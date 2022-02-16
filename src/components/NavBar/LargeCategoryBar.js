import { Grid, Stack } from "@mui/material";
import { React, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { getCountries, getGenres } from "../../axios/NavBarRequest";
import { useHistory, useLocation } from "react-router";
import defaultLanguages from "../../data/CountryList";
import classNames from "classname";
import { makeStyles } from "@mui/styles";
const CategoryBarStyle = makeStyles((theme) => ({
  grid: {
    display: "grid",
    gridGap: "0.5rem",
    gridTemplateColumns: "repeat(6,1fr)",
    "& div": {
      textAlign: "center",
    },
    position: "relative",
  },
  col: {
  },
  navbar_button: {
    cursor: "pointer",
    padding: "0.5rem 0 ",
    color: "#888"
  },
  navbar_button_hover:{
    backgroundColor: "transparent",
    color: "#fff"
},
  navbar_panel_item: {
    color: "#888",
    cursor: "pointer",
    padding: "0.5rem",
    "&:hover": {
      background: "transparent",
      color: "#fff",
    },
  },
  navbar_panel: {
    position: "absolute",
    top: "2.3rem",
    background: "#172a46",
    transform: "translateX(-45)",
    border: "none",
    boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "200px",
  },
  row:{
    width:"400px",
},
input_language: {
  fontWeight: "500",
  background:"transparent",
  color:"#CCD2E3",
  border:"none",
  outline:"none",
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
  color: "#CCD2E3"
},
}));

function LargeCategoryBar() {
  const history = useHistory();
  const location = useLocation();
  const categoryBarStyle = CategoryBarStyle();
  const [isMoviesShown, setIsMoviesShown] = useState(false);
  const [isTVShowsShown, setTVShowsShown] = useState(false);
  const [isGenresShown, setIsGenresShown] = useState(false);
  const [isYearShown, setIsYearShown] = useState(false);
  const [isCountryShown, setIsCountryShown] = useState(false);
  const [isPopularPeopleShown, setIsPopularPeopleShown] = useState(false);
  const [isSearchLanguageShown, setIsSearchLanguageShown] = useState(false);
  const navbarMoviesButtonStyle = classNames({
    [categoryBarStyle.navbar_button_hover]: isMoviesShown,
    [categoryBarStyle.navbar_button]: true
});
const navbarTVShowsButtonStyle = classNames({
    [categoryBarStyle.navbar_button_hover]: isTVShowsShown,
    [categoryBarStyle.navbar_button]: true
});
const navbarGenresButtonStyle = classNames({
    [categoryBarStyle.navbar_button_hover]: isGenresShown,
    [categoryBarStyle.navbar_button]: true
});
const navbarYearsButtonStyle = classNames({
    [categoryBarStyle.navbar_button_hover]: isYearShown,
    [categoryBarStyle.navbar_button]: true
});
const navbarPopularPeopleButtonStyle = classNames({
    [categoryBarStyle.navbar_button_hover]: isPopularPeopleShown,
    [categoryBarStyle.navbar_button]: true
});
const navbarCountryButtonStyle = classNames({
  [categoryBarStyle.navbar_button_hover]: isCountryShown,
  [categoryBarStyle.navbar_button]: true
});
  //=====================GET Genre List=================//
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  useEffect(() => {
    let searchParams = new URLSearchParams(location.search);
    let mediaType = " ";
    if (searchParams.get("media_type") === null || searchParams.get("media_type") === "person") {
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
      year_array_.push(current_year);
      current_year = current_year - 1;
    }
    setYearArray(year_array_);
  };
  //*****************function to handle Query Params*********************/
  const addQuery = (key, value) => {
    let pathname = location.pathname;
    // returns path: '/app/books'
    let searchParams = new URLSearchParams(location.search);
    if (!searchParams.has("media_type") || searchParams.get("media_type") === "person") {
      searchParams.set("media_type", "movie");
    } 
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
    searchParams.delete("language");
    searchParams.delete("page");
    searchParams.delete("query");
    searchParams.set("media_type", media_type);
    searchParams.set("category", value);
    history.push({
      pathname: "/filter",
      search: searchParams.toString(),
    });
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
    <div className={categoryBarStyle.grid}>
       <div
                  onMouseEnter={() => setIsMoviesShown(true)}
                  onMouseLeave={() => setIsMoviesShown(false)}
                >
                  <div className={navbarMoviesButtonStyle}>Movies</div>
                  {isMoviesShown && (
                    <div
                      className={classNames({
                        [categoryBarStyle.navbar_panel]: true,
                        [categoryBarStyle.column]: true,
                      })}
                    >
                      <div
                        className={categoryBarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "Popular");
                        }}
                      >
                        Popular
                      </div>
                      <div
                        className={categoryBarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "Now Playing");
                        }}
                      >
                        Now Playing
                      </div>
                      <div
                        className={categoryBarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "Up Coming");
                        }}
                      >
                        Up Coming
                      </div>
                      <div
                        className={categoryBarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "Top Rated");
                        }}
                      >
                        Top Rated
                      </div>
                    </div>
                  )}
                </div>
                <div
                  onMouseEnter={() => setTVShowsShown(true)}
                  onMouseLeave={() => setTVShowsShown(false)}
                >
                  <div className={navbarTVShowsButtonStyle}>Tv Shows</div>
                  {isTVShowsShown && (
                    <div
                      className={classNames({
                        [categoryBarStyle.navbar_panel]: true,
                        [categoryBarStyle.column]: true,
                      })}
                    >
                      <div
                        className={categoryBarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("tv", "Popular");
                        }}
                      >
                        Popular
                      </div>
                      <div
                        className={categoryBarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("tv", "Airing Today");
                        }}
                      >
                        Airing Today
                      </div>
                      <div
                        className={categoryBarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("tv", "On The Air");
                        }}
                      >
                        On The Air
                      </div>
                      <div
                        className={categoryBarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("tv", "Top Rated");
                        }}
                      >
                        Top Rated
                      </div>
                    </div>
                  )}
                </div>
                <div
                  onMouseEnter={() => setIsGenresShown(true)}
                  onMouseLeave={() => setIsGenresShown(false)}
                >
                  <div className={navbarGenresButtonStyle}>Genres</div>
                  {isGenresShown && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      className={classNames({
                        [categoryBarStyle.navbar_panel]: true,
                        [categoryBarStyle.row]: true,
                      })}
                    >
                      {genres.map((genre, key) => {
                        return (
                          <Grid
                            className={categoryBarStyle.navbar_panel_item}
                            item
                            xs={4}
                            key={key}
                            onClick={() => {
                              addQuery("genre", `${genre.id}`);
                            }}
                          >
                            {genre.name}
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </div>
                <div
                  onMouseEnter={() => setIsYearShown(true)}
                  onMouseLeave={() => setIsYearShown(false)}
                >
                  <div className={navbarYearsButtonStyle}>Year</div>
                  {isYearShown && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      className={classNames({
                        [categoryBarStyle.navbar_panel]: true,
                        [categoryBarStyle.row]: true,
                      })}
                    >
                      {yearArray.map((year, key) => {
                        return (
                          <Grid
                            className={categoryBarStyle.navbar_panel_item}
                            item
                            xs={4}
                            key={key}
                            onClick={() => {
                              addQuery("year", `${year}`);
                            }}
                          >
                            {year}
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </div>
                <div
                  onMouseEnter={() => setIsCountryShown(true)}
                  onMouseLeave={() => setIsCountryShown(false)}
                >
                  <div className={navbarCountryButtonStyle}>Languages</div>
                  <div
                    className={classNames({
                      [categoryBarStyle.navbar_panel]: true,
                      [categoryBarStyle.column]: true,
                    })}
                  >
                    {isCountryShown && (
                      <Stack>
                        <Stack className={categoryBarStyle.search_language_box}>
                          <Stack direction="row" style={{ width: "80%" }}>
                            <SearchIcon></SearchIcon>
                            <input
                              style={{ width: "100%" }}
                              onChange={(e) => {handleSearchLanguage(e.target.value)}}
                              className={categoryBarStyle.input_language}
                              type="text"
                              placeholder="Search..."
                            />
                          </Stack>
                        </Stack>
                        <>
                          {isSearchLanguageShown ? (
                            <>
                              {filteredLanguages.slice(0,5).map((country, key) => {
                                return (
                                  <Stack
                                    className={categoryBarStyle.navbar_panel_item}
                                    item
                                    xs={4}
                                    key={key}
                                    onClick={() => {
                                      addQuery(
                                        "language",
                                        `${country.iso_639_1}-${country.english_name}`
                                      );
                                    }}
                                  >
                                    {country.english_name}
                                  </Stack>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              {defaultLanguages.map((country, key) => {
                                return (
                                  <Stack
                                    className={categoryBarStyle.navbar_panel_item}
                                    item
                                    xs={4}
                                    key={key}
                                    onClick={() => {
                                      addQuery(
                                        "language",
                                        `${country.iso_639_1}-${country.english_name}`
                                      );
                                    }}
                                  >
                                    <div>{country.english_name}</div>
                                  </Stack>
                                );
                              })}
                            </>
                          )}
                        </>
                      </Stack>
                    )}
                  </div>
                </div>
                <div
                  onMouseEnter={() => setIsPopularPeopleShown(true)}
                  onMouseLeave={() => setIsPopularPeopleShown(false)}
                >
                  <div className={navbarPopularPeopleButtonStyle}>People</div>
                  {isPopularPeopleShown && (
                    <div
                      className={classNames({
                        [categoryBarStyle.navbar_panel]: true,
                        [categoryBarStyle.column]: true,
                      })}
                    >
                      <div
                        className={categoryBarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("person", "popular");
                        }}
                      >
                        Popular People
                      </div>
                    </div>
                  )}
                </div>
    </div>
  );
}

export default LargeCategoryBar;
