import { Stack } from '@mui/material';
import { React, useEffect, useState } from 'react'
import { getImageMovie } from '../axios/MovieResquest';
import MovieCardStyle from '../styles/components/MovieCardStyle';
function MovieCard({ movie }) {
    const movieCardStyle = MovieCardStyle()
    
    const handleDate = (date) => {
            //movie.first_air_date
    }

    return (
      <div>
        <div className={movieCardStyle.box}>
          <div className={movieCardStyle.imdb_rating_box}>IMBD 8.9</div>
          <img
            className={movieCardStyle.img}
            src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
          <div className={movieCardStyle.rating}>rating</div>
        </div>
        <Stack
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-start"
          textAlign="start"
          spacing={0.5}
        >
          {movie.media_type === "movie" ? (
            <>
              <div className={movieCardStyle.title}>{movie.title}</div>
              <div className={movieCardStyle.year}>
                {movie.release_date.slice(0, 4)}
              </div>
            </>
          ) : (
            <>
              <div className={movieCardStyle.title}>{movie.name}</div>
              <div className={movieCardStyle.year}>
                {movie.first_air_date.slice(0, 4)}
              </div>
            </>
          )}
        </Stack>
      </div>
    );
}

export default MovieCard
