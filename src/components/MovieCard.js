import { Stack } from '@mui/material';
import React from 'react'
import poster from "../images/poster.jpg";
import MovieCardStyle from '../styles/components/MovieCardStyle';
function MovieCard() {
    const movieCardStyle = MovieCardStyle()
    return (
        <div className={movieCardStyle.box}>
            <div className={movieCardStyle.imdb_rating_box}>IMBD 8.9</div>
            <img  className={movieCardStyle.img} src={poster} />
            <div className={movieCardStyle.content}>
                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}>
                    <div>rating</div>
                    <div className={movieCardStyle.title}>Spider-Man: No Way Home</div>
                    <Stack direction="row"
                        justifyContent="space-between"
                        >
                            <div  className={movieCardStyle.year}>2021</div>
                            <div  className={movieCardStyle.time}>2h28m</div>
                    </Stack>
                </Stack>
            </div>
        </div>
    )
}

export default MovieCard
