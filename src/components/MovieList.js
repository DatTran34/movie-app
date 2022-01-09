import { Grid } from '@mui/material'
import React from 'react'
import MovieStyle from '../styles/MovieStyle'
import MovieCard from './MovieCard'

function MoviePage() {
    const movieStyle = MovieStyle()
    return (
        <div className={movieStyle.container}>
            <div className={movieStyle.header}>Popular TV Shows</div>
            <div className={movieStyle.description}>The top trending movies which have high ratings</div>
            <Grid container direction="row"
                justifyContent="space-between" >
                <Grid item xs={8} >
                    <Grid container direction="row"
                        justifyContent="space-between" className={movieStyle.right_box}>
                        <Grid item xs={4} md={2}>
                            <MovieCard></MovieCard>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <MovieCard></MovieCard>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <MovieCard></MovieCard>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <MovieCard></MovieCard>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <MovieCard></MovieCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} >
                    <div className={movieStyle.left_box}>sss</div>
                </Grid>
            </Grid>
        </div>
    )
}

export default MoviePage
