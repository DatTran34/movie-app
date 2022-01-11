import { Grid, Stack } from '@mui/material'
import { React, useEffect, useState } from 'react'
import { getMovies, getTrendingMovies, getUpComingMovies } from '../axios/MovieResquest'
import MovieStyle from '../styles/MovieStyle'
import MovieCard from './MovieCard'

function MovieList({ kindOfSearch }) {
    const movieStyle = MovieStyle()
    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    useEffect(() => {
        getMovies(kindOfSearch,page).then((data) => {
            if(data.results[0].media_type === undefined)
            {
                //console.log(kindOfSearch.title)
                if(kindOfSearch.title === "genre" || kindOfSearch.title === "year"){
                    console.log(kindOfSearch.title)
                    setMovieList(data.results.map((movie) => { return { media_type: "movie", ...movie } }))
                }
                else{
                    setMovieList(data.results.map((movie) => { return { media_type: kindOfSearch.title, ...movie } }))
                }
              
            }
            else{
                setMovieList(data.results)
            }
            setIsLoading(false)
        }).catch((e) => {
            console.error(e)
        })
    }, [kindOfSearch,page])

    const handlePrevPage = () => {
        setPage(page - 1)
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }
    return (
        <> {isLoading === true ? (<>Loading</>) : (<>
            <div className={movieStyle.header}>{kindOfSearch.title} {kindOfSearch.content}</div>
            <div className={movieStyle.description}>The top trending movies which have high ratings</div>

            <Grid container direction="row"
                justifyContent="space-between" className={movieStyle.left_box}>
                {movieList?.map((movie, key) => {
                    return (<Grid item xs={4} md={3} style={{ padding: "10px" }} key={key}>
                        <MovieCard movie={movie}></MovieCard>
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

        </>)}</>
    )
}

export default MovieList
