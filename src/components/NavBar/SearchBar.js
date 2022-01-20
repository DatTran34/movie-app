import { Stack } from "@mui/material";
import { React, useState } from "react";
import classNames from "classname";
import SearchIcon from "@mui/icons-material/Search";
import { searchData } from "../../axios/NavBarRequest";
import PersonIcon from "@mui/icons-material/Person";
import TheatersIcon from "@mui/icons-material/Theaters";
import TvIcon from "@mui/icons-material/Tv";
import { useHistory, useLocation } from "react-router";
// import SearchBarStyle from "../../styles/components/SearchBarStyle"
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
    fontSize: "0.75rem",
    transition: "all 0.5s ease",
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
    fontWeight: "500",
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
    color: "#CCD2E3",
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

function SearchCard({ history, item, className_ }) {
  const searchBarStyle = SearchBarStyle();
  return (
    <>
      {item.media_type === "movie" ? (
        <div
          className={className_}
          onClick={() => history.push(`/movie/${item.id}`)}
        >
          <TheatersIcon className={searchBarStyle.item} />
          <div className={searchBarStyle.item}>{item.title}</div>
          <div className={searchBarStyle.item_span}>Movies</div>
        </div>
      ) : (
        <>
          {item.media_type === "tv" ? (
            <div
              className={className_}
              onClick={() => history.push(`/tv/${item.id}`)}
            >
              <TvIcon className={searchBarStyle.item} />
              <div className={searchBarStyle.item}>{item.name}</div>
              <div className={searchBarStyle.item_span}>TV Shows</div>
            </div>
          ) : (
            <div
              className={className_}
              onClick={() => history.push(`/person/${item.id}`)}
            >
              <PersonIcon className={searchBarStyle.item} />
              <div className={searchBarStyle.item}>{item.name}</div>
              <div className={searchBarStyle.item_span}>Person</div>
            </div>
          )}
        </>
      )}
    </>
  );
}

function SearchBar() {
    const searchBarStyle = SearchBarStyle();
  const history = useHistory();
  const location = useLocation();
  const MAX_SEARCH_ELEMENTS = 8;
  const [isSearchShown, setIsSearchShown] = useState(false);

  const navbarSearchInputStyle = classNames({
    [searchBarStyle.navbar_input_searching]: isSearchShown,
    [searchBarStyle.navbar_input]: true,
  });

  const navbarSearchButtonStyle = classNames({
    [searchBarStyle.navbar_searchButton_searching]: isSearchShown,
    [searchBarStyle.navbar_searchButton]: true,
  });
  const navbarSearchBoxStyle = classNames({
    [searchBarStyle.navbar_searchBox_searching_scale_width]: isSearchShown,
    [searchBarStyle.navbar_searchBox_searching]: isSearchShown,
    [searchBarStyle.navbar_searchBox]: true,
  });

  // ================== SEARCH ==============
  const [searchList, setSearchList] = useState([]);
  const [query, setQuery] = useState("")
  const handleSearch = (e) => {
    if (e.target.value !== "") {
      setIsSearchShown(true);
      setQuery(e.target.value)
      searchData(e.target.value)
        .then((data) => {
          setSearchList(data.results);
        })
        .catch((e) => {
          console.log(e);
        });
        
    } else {
      setIsSearchShown(false);
    }
  };

  const addQuery = () => {
    console.log("ss")
    let searchParams = new URLSearchParams(location.search);
    searchParams.delete("genre");
    searchParams.delete("year");
    searchParams.delete("country");
    searchParams.delete("page");
    searchParams.delete("category");
    searchParams.set("media_type", "movie");
    searchParams.set("query", query);
    setQuery("")
    setIsSearchShown(false);
    history.push({
      pathname: "/filter",
      search: searchParams.toString(),
    });
  };
  return (
    <div className={searchBarStyle.navbar_search_1}>
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
        <div className={navbarSearchButtonStyle} onClick={() => {addQuery()}}>Search</div>
      </Stack>
      {isSearchShown && (
        <div className={`${searchBarStyle.navbar_search_panel} ${searchBarStyle.navbar_search_panel_absolute}`}>
          {searchList.length === 0 ? (
            <div className={searchBarStyle.navbar_search_panel_last_item}>
              No Result
            </div>
          ) : (
            <>
              {searchList.slice(0, MAX_SEARCH_ELEMENTS).map((item, key) => {
                if (key + 1 === MAX_SEARCH_ELEMENTS) {
                  return (
                    <SearchCard
                      history={history}
                      item={item}
                      key={key}
                      className_={searchBarStyle.navbar_search_panel_last_item}
                    />
                  );
                } else {
                  return (
                    <SearchCard
                      history={history}
                      item={item}
                      key={key}
                      className_={searchBarStyle.navbar_search_panel_item}
                    />
                  );
                }
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
