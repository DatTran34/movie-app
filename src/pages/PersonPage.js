import { Grid, List, ListItem, Stack } from '@mui/material'
import { React, useEffect, useState } from 'react'
import HomeStyle from '../styles/HomeStyle'
import NavBar from '../components/NavBar/NavBar';
import MovieList from '../components/MovieList';
import SmallMovieCard from '../components/SmallMovieCard';
import { getTrendingMovies, getUpComingMovies } from '../axios/MovieResquest'
import MovieStyle from '../styles/MovieStyle';
import {useLocation} from "react-router-dom";

function PersonPage({match,history}) {
    const movieStyle = MovieStyle()
    const [upcomingList, setUpComingList] = useState([])
    const [kindOfSearch, setKindOfSearch] = useState({ title: "movie", content: "popular" })

    useEffect(() => {
        getUpComingMovies().then((data) => {
            setUpComingList(data.results)
        }).catch((e) => {
            console.error(e)
        })
        setKindOfSearch({ title: match.params.title, content: match.params.content })
    }, [])

    const search = useLocation().search; 
    const name = new URLSearchParams(search).get('name');
    console.log(name)

    
    const homeStyle = HomeStyle();
    return (
        <div>
        <NavBar setKindOfSearch={setKindOfSearch} history={history}></NavBar>
        <Stack paddingTop="200px" position="relative" >
            <div className={movieStyle.container}>
                <Grid container direction="row"
                    justifyContent="space-between"
                    style={{ margin: "10px 0" }}>
                    <Grid style={{ maxWidth: "750px", }} item xs={12} md={8.5} >
                        
                    </Grid>
                    <Grid item xs={12} md={3.5}>
                        <div className={movieStyle.right_box}>
                            <div className={movieStyle.upcoming_box_title}>Up Coming</div>
                            <div className={movieStyle.upcoming_box}>
                                <Stack direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    spacing={1}
                                    className={movieStyle.overlay_inner}
                                >
                                    {upcomingList?.map((movie, key) => {
                                        return (<SmallMovieCard movie={movie} history={history} key={key}></SmallMovieCard>)
                                    })}
                                </Stack>
                            </div>
                        </div>
                    </Grid>
                </Grid>

            </div>

        </Stack>
    </div>
    )
}

export default PersonPage
