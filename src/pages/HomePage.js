import { Grid, List, ListItem, Stack } from '@mui/material'
import React from 'react'
import HorizontalScroll from '../components/HorizontalScroll';
import HomeStyle from '../styles/HomeStyle'
import NavBar from '../components/NavBar/NavBar';
import MovieList from '../components/MovieList';

function HomePage({history}) {

    const homeStyle = HomeStyle();
    return (
        <div>
            <NavBar></NavBar>
            <Stack paddingTop="200px" position="relative" >
            <MovieList history={history}></MovieList>
            </Stack>
        </div>
    )
}

export default HomePage
