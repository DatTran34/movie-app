import { Grid, Stack } from '@mui/material';
import { React, useState, useEffect, useRef } from 'react'
import { styled, alpha } from '@mui/material/styles';
import NavBarStyle from '../../styles/NavBarStyle'
import classNames from "classname";
import SearchIcon from '@mui/icons-material/Search';
import { getCountries, getGenres, searchData } from '../../axios/NavBarRequest';
import PersonIcon from '@mui/icons-material/Person';
import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';
import InputBase from '@mui/material/InputBase';
import { useHistory, useLocation } from "react-router";
import defaultLanguages from "../../data/CountryList"
import ReactCountryFlag from "react-country-flag"
import logo from "../../images/logo.png"
function SearchCard({ history, item, className_ }) {
  const navbarStyle = NavBarStyle();
  return (
    <>
      {item.media_type === "movie" ? (
        <div
          className={className_}
          onClick={() => history.push(`/movie/${item.id}`)}
        >
          <TheatersIcon className={navbarStyle.item} />
          <div className={navbarStyle.item}>{item.title}</div>
          <div className={navbarStyle.item_span}>Movies</div>
        </div>
      ) : (
        <>
          {item.media_type === "tv" ? (
            <div className={className_} onClick={() => history.push(`/tv/${item.id}`)}>
              <TvIcon className={navbarStyle.item} />
              <div className={navbarStyle.item}>{item.name}</div>
              <div className={navbarStyle.item_span}>TV Shows</div>
            </div>
          ) : (
            <div className={className_} onClick={() => history.push(`/person/${item.id}`)}>
              <PersonIcon className={navbarStyle.item} />
              <div className={navbarStyle.item}>{item.name}</div>
              <div className={navbarStyle.item_span}>Person</div>
            </div>
          )}
        </>
      )}
    </>
  );
}

function NavBar() {
    const history = useHistory();
    const location = useLocation();
    const MAX_SEARCH_ELEMENTS = 8;
    const navbarStyle = NavBarStyle();
    const [isMoviesShown, setIsMoviesShown] = useState(false);
    const [isTVShowsShown, setTVShowsShown] = useState(false);
    const [isGenresShown, setIsGenresShown] = useState(false);
    const [isYearShown, setIsYearShown] = useState(false);
    const [isCountryShown, setIsCountryShown] = useState(false);
    const [isPopularPeopleShown, setIsPopularPeopleShown] = useState(false);
    const [isSearchShown, setIsSearchShown] = useState(false);
    const [isSearchLanguageShown, setIsSearchLanguageShown] = useState(false);
    const navbarMoviesButtonStyle = classNames({
        [navbarStyle.navbar_button_hover]: isMoviesShown,
        [navbarStyle.navbar_button]: true
    });
    const navbarTVShowsButtonStyle = classNames({
        [navbarStyle.navbar_button_hover]: isTVShowsShown,
        [navbarStyle.navbar_button]: true
    });
    const navbarGenresButtonStyle = classNames({
        [navbarStyle.navbar_button_hover]: isGenresShown,
        [navbarStyle.navbar_button]: true
    });
    const navbarYearsButtonStyle = classNames({
        [navbarStyle.navbar_button_hover]: isYearShown,
        [navbarStyle.navbar_button]: true
    });
    const navbarPopularPeopleButtonStyle = classNames({
        [navbarStyle.navbar_button_hover]: isPopularPeopleShown,
        [navbarStyle.navbar_button]: true
    });
    const navbarCountryButtonStyle = classNames({
      [navbarStyle.navbar_button_hover]: isCountryShown,
      [navbarStyle.navbar_button]: true
  });
    //=====================GET Genre List=================//
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [filteredLanguages, setFilteredLanguages] = useState([]);
    useEffect(() => {
        let searchParams = new URLSearchParams(location.search);
        let mediaType = " "
        if(searchParams.get("media_type") === null) {
          mediaType = "movie"
        }else {
          mediaType = searchParams.get("media_type")
        }
        getGenres(mediaType).then((data) => {
            setGenres(data.genres)
        }).catch((e) => { console.log(e) })
        getCountries().then((data) => {
          console.log(data)
          setLanguages(data)
      }).catch((e) => { console.log(e) })
      handleYearInNavBar()
      handleSearchLanguage("")
    }, [location])
    // ================== SEARCH ==============
    const [searchList, setSearchList] = useState([]);
    const handleSearch = (e) => {
        if (e.target.value !== "") {
            setIsSearchShown(true)
            searchData(e.target.value).then((data) => {
                setSearchList(data.results)
            }).catch((e) => { console.log(e) })
        }
        else {
            setIsSearchShown(false)
        }
    }
    const handleSearchLanguage = (value) => {
      if (value !== "") {
          setIsSearchLanguageShown(true)
          setFilteredLanguages(languages.filter(language => {
            if(language.english_name.search(new RegExp(value, "i")) === -1) return 0
            else return 1
          }))
      }
      else {
        setIsSearchLanguageShown(false)
      }
  }
    const navbarSearchInputStyle = classNames({
        [navbarStyle.navbar_input_searching]: isSearchShown,
        [navbarStyle.navbar_input]: true
    });
    const navbarSearchButtonStyle = classNames({
      [navbarStyle.navbar_searchButton_searching]: isSearchShown,
      [navbarStyle.navbar_searchButton]: true
  });
  const navbarSearchBoxStyle = classNames({
    [navbarStyle.navbar_searchBox_searching]: isSearchShown,
    [navbarStyle.navbar_searchBox]: true,
  });


    //============== GENERATE THE YEAR ===============
    const [yearArray, setYearArray] = useState([])
    const handleYearInNavBar = () => {
        var THE_NUMBER_OF_YEAR = 18
        var current_year = new Date().getFullYear()
        var year_array_ = new Array();
        for (var i = 0; i < THE_NUMBER_OF_YEAR; i++) {
            year_array_.push(current_year - 1)
            current_year = current_year - 1
        }
        setYearArray(year_array_)
    }
    //*****************function to handle Query Params*********************/
    const addQuery = (key, value) => {
      let pathname = location.pathname; 
     // returns path: '/app/books'
      let searchParams = new URLSearchParams(location.search);
      checkMediaType(searchParams)
     // returns the existing query string: '?genre=fiction&year=2019'
      searchParams.set(key, value);
      searchParams.delete("category");
      searchParams.delete("page");
      history.push({
               pathname: "/filter",
               search: searchParams.toString()
         });
     };

     const addQuery_2 = (media_type, value) => {
      let searchParams = new URLSearchParams(location.search);
      searchParams.delete("genre");
      searchParams.delete("year");
      searchParams.delete("country");
      searchParams.delete("page");
      searchParams.set("media_type", media_type);
      searchParams.set("category", value);
      history.push({
               pathname: "/filter",
               search: searchParams.toString()
         });
     };

     const checkMediaType = (searchParams) => {
      if(!searchParams.has("media_type")){
        searchParams.set("media_type", "movie");
      }
     }

     const removeQuery = (key) => {
      let pathname = location.pathname; 
     // returns path: '/app/books'
      let searchParams = new URLSearchParams(location.search); 
     // returns the existing query string: '?type=fiction&author=fahid'
      searchParams.delete(key);
      history.push({
               pathname: "/filter",
               search: searchParams.toString()
         });
     };

    return (
      <div style={{width: "100%",  position: "fixed", zIndex: "50",}}>
        <Stack sx={{padding: "1rem"}}>
          <Grid
            container
            className={navbarStyle.navbar_container}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item md={1}>
              <Stack pl={10}
                direction="row"
                justifyContent="center"
                alignItems="center">
                <img style={{width: "10rem"}} src={logo}/>
              </Stack>
            </Grid>
            <Grid item xs={8}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={5}
              >
                <div
                  onMouseEnter={() => setIsMoviesShown(true)}
                  onMouseLeave={() => setIsMoviesShown(false)}
                >
                  <div className={navbarMoviesButtonStyle}>Movies</div>
                  {isMoviesShown && (
                    <div
                      className={classNames({
                        [navbarStyle.navbar_panel]: true,
                        [navbarStyle.column]: true,
                      })}
                    >
                      <div
                        className={navbarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "Popular");
                        }}
                      >
                        Popular
                      </div>
                      <div
                        className={navbarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "Now Playing");
                        }}
                      >
                        Now Playing
                      </div>
                      <div
                        className={navbarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "Up Coming");
                        }}
                      >
                        Up Coming
                      </div>
                      <div
                        className={navbarStyle.navbar_panel_item}
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
                        [navbarStyle.navbar_panel]: true,
                        [navbarStyle.column]: true,
                      })}
                    >
                      <div
                        className={navbarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("tv", "Popular");
                        }}
                      >
                        Popular
                      </div>
                      <div
                        className={navbarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("tv", "Airing Today");
                        }}
                      >
                        Airing Today
                      </div>
                      <div
                        className={navbarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("tv", "On The Air");
                        }}
                      >
                        On The Air
                      </div>
                      <div
                        className={navbarStyle.navbar_panel_item}
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
                        [navbarStyle.navbar_panel]: true,
                        [navbarStyle.row]: true,
                      })}
                    >
                      {genres.map((genre, key) => {
                        return (
                          <Grid
                            className={navbarStyle.navbar_panel_item}
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
                        [navbarStyle.navbar_panel]: true,
                        [navbarStyle.row]: true,
                      })}
                    >
                      {yearArray.map((year, key) => {
                        return (
                          <Grid
                            className={navbarStyle.navbar_panel_item}
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
                      [navbarStyle.navbar_panel]: true,
                      [navbarStyle.column]: true,
                    })}
                  >
                    {isCountryShown && (
                      <Stack>
                        <Stack className={navbarStyle.search_language_box}>
                          <Stack direction="row" style={{ width: "80%" }}>
                            <SearchIcon></SearchIcon>
                            <input
                              style={{ width: "100%" }}
                              onChange={(e) => {handleSearchLanguage(e.target.value)}}
                              className={navbarStyle.input_language}
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
                                    className={navbarStyle.navbar_panel_item}
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
                                    className={navbarStyle.navbar_panel_item}
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
                        [navbarStyle.navbar_panel]: true,
                        [navbarStyle.column]: true,
                      })}
                    >
                      <div
                        className={navbarStyle.navbar_panel_item}
                        onClick={() => {
                          addQuery_2("movie", "person");
                        }}
                      >
                        Popular People
                      </div>
                    </div>
                  )}
                </div>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <div className={navbarStyle.navbar_search}>
                <Stack className={navbarSearchBoxStyle}>
                  <Stack direction="row">
                    <SearchIcon></SearchIcon>
                    <input
                      style={{ width: "100%" }}
                      onChange={handleSearch}
                      className={navbarSearchInputStyle}
                      type="text"
                      placeholder="Search..."
                    ></input>
                  </Stack>
                  <div className={navbarSearchButtonStyle}>Search</div>
                </Stack>
                {isSearchShown && (
                  <div className={navbarStyle.navbar_search_panel}>
                    {searchList.length === 0 ? (
                      <div className={navbarStyle.navbar_search_panel_last_item}>
                        No Result
                      </div>
                    ) : (
                      <>
                        {searchList
                          .slice(0, MAX_SEARCH_ELEMENTS)
                          .map((item, key) => {
                            if (key + 1 === MAX_SEARCH_ELEMENTS) {
                              return (
                                <SearchCard
                                  history={history}
                                  item={item}
                                  key={key}
                                  className_={
                                    navbarStyle.navbar_search_panel_last_item
                                  }
                                />
                              );
                            } else {
                              return (
                                <SearchCard
                                  history={history}
                                  item={item}
                                  key={key}
                                  className_={
                                    navbarStyle.navbar_search_panel_item
                                  }
                                />
                              );
                            }
                          })}
                      </>
                    )}
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Stack>
      </div>
    );
}

export default NavBar
