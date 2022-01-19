import { Stack } from "@mui/material";
import { React, useState } from "react";
import classNames from "classname";
import SearchIcon from "@mui/icons-material/Search";
import { searchData } from "../../axios/NavBarRequest";
import PersonIcon from "@mui/icons-material/Person";
import TheatersIcon from "@mui/icons-material/Theaters";
import TvIcon from "@mui/icons-material/Tv";
import { useHistory, useLocation } from "react-router";
import { makeStyles } from "@mui/styles";
import SearchBarStyle from "../../styles/components/SearchBarStyle"

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

function SearchBar2() {
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
      history.push({
        pathname: "/filter",
        search: searchParams.toString(),
      });
    };
    return (
      <div className={searchBarStyle.navbar_search_2}>
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
          <div className={navbarSearchButtonStyle} onClick={() => {addQuery()}}>Search1</div>
        </Stack>
        {isSearchShown && (
          <div className={searchBarStyle.navbar_search_panel}>
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

export default SearchBar2
