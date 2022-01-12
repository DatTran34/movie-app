import { Grid, Stack } from '@mui/material';
import { React, useState, useEffect, useRef } from 'react'
import NavBarStyle from '../../styles/NavBarStyle'
import classNames from "classname";
import SearchIcon from '@mui/icons-material/Search';
import { getGenres, searchData } from '../../axios/NavBarRequest';
import PersonIcon from '@mui/icons-material/Person';
import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';

function SearchCard({ history, item, className_ }) {
    const navbarStyle = NavBarStyle()
    return <div className={className_} onClick={() => history.push(`/movie-info/${item.id}`)}>
        {item.media_type === "movie" ? (
            <>
                <TheatersIcon className={navbarStyle.item} />
                <div className={navbarStyle.item}>{item.title}</div>
                <div className={navbarStyle.item_span}>Movies</div></>) :
            (<>{item.media_type === "tv" ? (
                <><TvIcon className={navbarStyle.item} />
                    <div className={navbarStyle.item}>{item.name}</div>
                    <div className={navbarStyle.item_span}>TV Shows</div></>) : (
                <><PersonIcon className={navbarStyle.item} />
                    <div className={navbarStyle.item}>{item.name}</div>
                    <div className={navbarStyle.item_span}>Person</div></>
            )}</>)}
    </div>
}


function NavBar({ setKindOfSearch, history }) {

    const MAX_SEARCH_ELEMENTS = 8;
    const navbarStyle = NavBarStyle();
    const [isMoviesShown, setIsMoviesShown] = useState(false);
    const [isTVShowsShown, setTVShowsShown] = useState(false);
    const [isGenresShown, setIsGenresShown] = useState(false);
    const [isYearShown, setIsYearShown] = useState(false);
    const [isPopularPeopleShown, setIsPopularPeopleShown] = useState(false);
    const [isSearchShown, setIsSearchShown] = useState(false);

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

    const [genres, setGenres] = useState([]);
    useEffect(() => {
        getGenres().then((data) => {
            setGenres(data.genres)
        }).catch((e) => { console.log(e) })
        handleYearInNavBar()
    }, [])

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
    const navbarSearchInputStyle = classNames({
        [navbarStyle.navbar_input_searching]: isSearchShown,
        [navbarStyle.navbar_input]: true
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

    // ============== HANDLE SEARCHING TYPE OF MOVIE =============
    const handleSearchMovies = (a, b) => {
        setKindOfSearch({ title: a, content: b })
        history.push(`/${a}/${b}`)
    }

    return (
        <Stack style={{ position: "fixed", zIndex: "50", width: "100%" }}>
            <Grid container
                className={navbarStyle.navbar_container}
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid item md={1}>Logo</Grid>
                <Grid item xs={6}>
                    <Stack direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}>
                        <div onMouseEnter={() => setIsMoviesShown(true)}
                            onMouseLeave={() => setIsMoviesShown(false)}>
                            <div className={navbarMoviesButtonStyle}>Movies</div>
                            {isMoviesShown && (
                                <Stack direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    className={classNames({
                                        [navbarStyle.navbar_panel]: true,
                                        [navbarStyle.column]: true
                                    })}>
                                    <div className={navbarStyle.navbar_panel_item} onClick={() => { handleSearchMovies("movie", "popular") }}>Popular</div>
                                    <div className={navbarStyle.navbar_panel_item} onClick={() => { handleSearchMovies("movie", "now_playing") }}>Now Playing</div>
                                    <div className={navbarStyle.navbar_panel_item} onClick={() => { handleSearchMovies("movie", "upcoming") }}>Up Coming</div>
                                    <div className={navbarStyle.navbar_panel_item} onClick={() => { handleSearchMovies("movie", "top_rated") }}>Top Rated</div>
                                </Stack>
                            )}</div>
                        <div onMouseEnter={() => setTVShowsShown(true)}
                            onMouseLeave={() => setTVShowsShown(false)}>
                            <div className={navbarTVShowsButtonStyle}>Tv Shows</div>
                            {isTVShowsShown && (
                                <Stack direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    className={classNames({
                                        [navbarStyle.navbar_panel]: true,
                                        [navbarStyle.column]: true
                                    })}>
                                    <div className={navbarStyle.navbar_panel_item} onClick={() => { handleSearchMovies("tv", "popular") }}>Popular</div>
                                    <div className={navbarStyle.navbar_panel_item} onClick={() => { handleSearchMovies("tv", "airing_today") }}>Airing Today</div>
                                    <div className={navbarStyle.navbar_panel_item} onClick={() => { handleSearchMovies("tv", "on_the_air") }}>On The Air</div>
                                    <div className={navbarStyle.navbar_panel_item} onClick={() => { handleSearchMovies("tv", "top_rated") }}>Top Rated</div>
                                </Stack>
                            )}</div>
                        <div onMouseEnter={() => setIsGenresShown(true)}
                            onMouseLeave={() => setIsGenresShown(false)}>
                            <div className={navbarGenresButtonStyle}>Genres</div>
                            {isGenresShown && (
                                <Grid container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    className={classNames({
                                        [navbarStyle.navbar_panel]: true,
                                        [navbarStyle.row]: true
                                    })}>
                                    {genres.map((genre, key) => {
                                        return <Grid className={navbarStyle.navbar_panel_item} item xs={4} key={key} onClick={() => { handleSearchMovies("genre", `${genre.id + "_" + genre.name}`) }}>{genre.name}</Grid>
                                    })}

                                </Grid>
                            )}</div>
                        <div onMouseEnter={() => setIsYearShown(true)}
                            onMouseLeave={() => setIsYearShown(false)}>
                            <div className={navbarYearsButtonStyle}>Year</div>
                            {isYearShown && (
                                <Grid container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    className={classNames({
                                        [navbarStyle.navbar_panel]: true,
                                        [navbarStyle.row]: true
                                    })}>
                                    {yearArray.map((year, key) => {
                                        return (<Grid className={navbarStyle.navbar_panel_item} item xs={4} key={key} onClick={() => { handleSearchMovies("year", year) }}>{year}</Grid>)
                                    })}
                                </Grid>
                            )}</div>
                        <div onMouseEnter={() => setIsPopularPeopleShown(true)}
                            onMouseLeave={() => setIsPopularPeopleShown(false)}>
                            <div className={navbarPopularPeopleButtonStyle}>People</div>
                            {isPopularPeopleShown && (
                                <Stack direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    className={classNames({
                                        [navbarStyle.navbar_panel]: true,
                                        [navbarStyle.column]: true
                                    })}>
                                    <div className={navbarStyle.navbar_panel_item} onClick={() => { handleSearchMovies("person", "popular_people") }}>Popular People</div>
                                </Stack>
                            )}</div>
                    </Stack>
                </Grid>
                <Grid item xs={5}>
                    <div className={navbarStyle.navbar_search}>
                        <SearchIcon></SearchIcon>
                        <input onChange={handleSearch} className={navbarSearchInputStyle} type="text" placeholder="Search..."></input>
                        {isSearchShown && (
                            <div className={navbarStyle.navbar_search_panel}>
                                {searchList.length === 0 ?
                                    (<div className={navbarStyle.navbar_search_panel_last_item}>No Result</div>) :
                                    (<>{searchList.slice(0, MAX_SEARCH_ELEMENTS).map((item, key) => {
                                        if (key + 1 === MAX_SEARCH_ELEMENTS) {
                                            return <SearchCard history={history} item={item} key={key} className_={navbarStyle.navbar_search_panel_last_item} />
                                        }
                                        else {
                                            return <SearchCard history={history} item={item} key={key} className_={navbarStyle.navbar_search_panel_item} />
                                        }
                                    })}</>)}
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default NavBar
