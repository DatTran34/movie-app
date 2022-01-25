import { Stack } from '@mui/material';
import React from 'react'
import poster from "../images/poster.jpg";
import SmallMovieCardStyle from "../styles/components/SmallMovieCardStyle"
function SmallMovieCard({isMovie, movie, history}) {
    const smallMovieCardStyle =  SmallMovieCardStyle();
    return (
        <Stack direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
            style={{cursor:"pointer"}}
            onClick={() => history.push(`/movie/${movie.id}`)}>
            <img className={smallMovieCardStyle.img} src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
            <Stack direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                style={{textAlign:"left"}}
                spacing={1}>
                    {isMovie ? (
                        <div  className={smallMovieCardStyle.title}>{movie.title}</div>
                    ) : (
                        <div  className={smallMovieCardStyle.title}>{movie.name}</div>
                    )}
                    <div className={smallMovieCardStyle.year}>01/26/2022</div>
            </Stack>
        </Stack>
    )
}

export default SmallMovieCard
