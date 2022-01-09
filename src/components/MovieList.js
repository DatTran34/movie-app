import { Grid } from '@mui/material'
import React from 'react'
import MovieStyle from '../styles/MovieStyle'

function MoviePage() {
    const movieStyle = MovieStyle()
    return (
        <div className={movieStyle.container}>
            <div className={movieStyle.header}>Popular TV Shows</div>
            <div className={movieStyle.description}>The top trending movies which have high ratings</div>
            <Grid container  direction="row"
  justifyContent="space-between" >
                <Grid item xs={8} >
                    <div className={movieStyle.right_box}>sss</div>
                </Grid>
                <Grid item xs={4} >
                    <div className={movieStyle.left_box}>sss</div>
                </Grid>
            </Grid>
        </div>
    )
}

export default MoviePage
