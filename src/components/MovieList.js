import { Grid, Stack } from '@mui/material'
import { React, useEffect, useState } from 'react'
import { getTrendingMovies, getUpComingMovies } from '../axios/MovieResquest'
import MovieStyle from '../styles/MovieStyle'
import MovieCard from './MovieCard'
import SmallMovieCard from './SmallMovieCard'

function MoviePage({history}) {
    const movieStyle = MovieStyle()
    const [movieList, setMovieList] = useState([])
    const [upcomingList, setUpComingList] = useState([])

    const [page, setPage] = useState(1)
    useEffect(() => {
        getTrendingMovies(page).then((data) => {
            setMovieList(data.results)
        }).catch((e) => {
            console.error(e)
        })
    }, [page])

    useEffect(() => {
        getUpComingMovies().then((data) => {
            setUpComingList(data.results)
        }).catch((e) => {
            console.error(e)
        })
    }, [])

    console.log(upcomingList)
    const handlePrevPage = () => {
        setPage(page - 1)
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }
    return (
        <div className={movieStyle.container}>
            <div className={movieStyle.header}>Popular TV Shows</div>
            <div className={movieStyle.description}>The top trending movies which have high ratings</div>
            <div>
                <Grid container direction="row"
                    justifyContent="space-between"
                    style={{ margin: "10px 0"}}>
                    <Grid style={{ maxWidth: "750px", }}  item xs={12} md={8.5} >
                        <Grid container direction="row"
                            justifyContent="space-between" className={movieStyle.left_box}>
                            {movieList?.map((movie, key) => {
                                return (<Grid item xs={4} md={3} style={{ padding: "10px" }} key={key}>
                                    <MovieCard movie={movie} history={history}></MovieCard>
                                </Grid>)
                            })}
                        </Grid>
                        <Stack direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                            className={movieStyle.pageButton}>
                            <div onClick={handlePrevPage}>Previous</div>
                            <div>Page {page}</div>
                            <div onClick={handleNextPage}>Next</div>
                        </Stack>

                    </Grid>
                    <Grid  item xs={12} md={3.5}>
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
                                        return (<SmallMovieCard movie={movie} key={key}></SmallMovieCard>)
                                    })}
                                </Stack>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default MoviePage
