import { Grid, Stack } from '@mui/material';
import React from 'react'
import PersonCardStyle from '../styles/components/PersonCardStyle';
function PersonCard({ person }) {
    const personCardStyle = PersonCardStyle()
    console.log(person)
    return (
        <Grid container className={personCardStyle.box}>
            <Grid item xs={5}>
                <div className={personCardStyle.yellowColumn}>w</div>
                <img
                    className={personCardStyle.img}
                    src={`http://image.tmdb.org/t/p/w500/${person.profile_path}`}
                /></Grid>
            <Grid item xs={7}>  <div
                className={personCardStyle.info}
                spacing={0.5}>
                <div className={personCardStyle.header}>{person.name}</div>
                {person.known_for.map((movie, key) => {
                    return (<>
                        {movie.media_type === "movie" ? (
                            <>
                                <div className={personCardStyle.content}>{movie.title}</div>
                            </>
                        ) : (
                            <>
                                <div className={personCardStyle.content}>{movie.name}</div>
                            </>
                        )}
                    </>)
                })}
            </div></Grid>


        </Grid>
    )
}

export default PersonCard
