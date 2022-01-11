import { Stack } from '@mui/material';
import { React, useEffect, useState } from 'react'
import { getImageMovie } from '../axios/MovieResquest';
import MovieCardStyle from '../styles/components/MovieCardStyle';
function MovieCard({ movie }) {
    const movieCardStyle = MovieCardStyle()
    // if(movie.title === undefined)
    // {
    //     console.log(movie)
    //     console.log(movie.title)
    // }
    // else{
    //     console.log(movie.name)
    // }

    return (
        <div className={movieCardStyle.box}>
            <div className={movieCardStyle.imdb_rating_box}>IMBD 8.9</div>
            <img className={movieCardStyle.img} src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <div className={movieCardStyle.content}>
                <Stack direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    style={{minHeight:"110px",}}
                    spacing={1}>
                    <div>rating</div>
                    {movie.media_type === "movie" ?
                        (<><div className={movieCardStyle.title}>{movie.title}</div>
                            <div className={movieCardStyle.year}>{movie.release_date}</div>
                        </>) :
                        (<><div className={movieCardStyle.title}>{movie.name}</div>
                        <div className={movieCardStyle.year}>{movie.first_air_date}</div>
                        </>)}
                    
                </Stack>
            </div>
        </div>
    )
}

export default MovieCard
