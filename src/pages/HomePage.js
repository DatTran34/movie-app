import { Grid, List, ListItem, Stack } from '@mui/material'
import React from 'react'
import HorizontalScroll from '../components/HorizontalScroll';
import Standing from '../components/Standing';
import HomeStyle from '../styles/HomeStyle'
import logo from '../logo.svg';
import NavBar from '../components/NavBar/NavBar';
import MoviePage from './MoviePage';

function HomePage() {

    const homeStyle = HomeStyle();
    return (
        <div>
            <NavBar></NavBar>
           <MoviePage></MoviePage>
        </div>
    )
}

export default HomePage
