import { Stack } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import poster from "../images/poster.jpg";
import {
    getMovieInfo
  } from "../axios/TmdbRequest";
import SmallMovieCardStyle from "../styles/components/SmallMovieCardStyle"
function SmallMovieCard({media_type, movie, history}) {
    const smallMovieCardStyle =  SmallMovieCardStyle();
    const [runtime, setRuntime] = useState([]);
    const calRuntime = (total) => {
        var hours = total / 60;
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return `${rhours}h${rminutes}m`;
      };
      useEffect(() => {
        if (movie.id === null) return;
        getMovieInfo("movie", movie.id)
          .then((data) => {
            setRuntime(calRuntime(data.runtime));
          })
          .catch((e) => {
            console.log(e);
          });
      }, [movie.id]);

    const redirect = () => {
        if(media_type === "movie")
            {
                history.push(`/movie/${movie.id}`)
            }
        else 
            {
                history.push(`/tv/${movie.id}`)
            }
    }
    return (
        <Stack direction="row"
            justifyContent="flex-start"
            alignItems="center"
            style={{cursor:"pointer"}}
            onClick={redirect}
            className={smallMovieCardStyle.root}>
            <img className={smallMovieCardStyle.img} src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
            <Stack direction="column"
                pl={1.5}
                justifyContent="center"
                alignItems="flex-start"
                style={{textAlign:"left", height: "100%"}}
                spacing={0.5}>
                    {media_type === "movie" ? (
                        <>
                            <div  className={smallMovieCardStyle.title}>{movie.title}</div>
                            <div className={smallMovieCardStyle.time}>{runtime}</div>
                        </>
                    ) : (
                        <div  className={smallMovieCardStyle.title}>{movie.name}</div>
                    )}
                    
                    <div className={smallMovieCardStyle.year}>{movie.release_date}</div>
            </Stack>
        </Stack>
    )
}

export default SmallMovieCard
