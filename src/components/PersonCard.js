import { Grid, Stack } from '@mui/material';
import React from 'react'
import PersonCardStyle from '../styles/components/PersonCardStyle';
import { useHistory, useLocation } from "react-router";
function PersonCard({ person }) {
    const personCardStyle = PersonCardStyle()
    const history = useHistory();
    return (
        <Grid container className={personCardStyle.box}  onClick={() => history.push(`/person/${person.id}`)}>
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
                    return (<div key={key}>
                        {movie.media_type === "movie" ? (
                            <>
                                <div className={personCardStyle.content} >{movie.title}</div>
                            </>
                        ) : (
                            <>
                                <div className={personCardStyle.content}>{movie.name}</div>
                            </>
                        )}
                    </div>)
                })}
            </div></Grid>


        </Grid>
    )
}

export default PersonCard
