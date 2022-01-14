import { CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { getMovieInfo, getCast } from '../axios/TmdbRequest';
import { getRapidMovieInfo} from '../axios/RapidImdbRequest';
import React, { useEffect, useState } from 'react'
import Style from '../styles/Style'
import avatar from '../images/avatar.png'
import imdb from '../images/imdb.png'
import metacritic from '../images/metacritic.png'
import Rotten_Tomatoes1 from '../images/Rotten_Tomatoes1.png'
import Rotten_Tomatoes2 from '../images/Rotten_Tomatoes2.png'
import Rotten_Tomatoes3 from '../images/Rotten_Tomatoes3.png'
import { Box } from '@mui/system'
import Award from "../components/Award"
import NavBar from "../components/NavBar/NavBar"
import { useParams } from "react-router";
import { useHistory } from "react-router";
function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', backgroundColor: "#363761", borderRadius: "100%", padding: "5px" }}>
        <CircularProgress style={{'color': '#4CCDEB'}} size={48} variant="determinate" color="primary" value={props.value * 10} />
        <Box
          sx={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: "#ffffff"
          }}
        >
          <Stack color="#ffffff">
            {`${props.value}`}
          </Stack>
        </Box>
      </Box>
    );
  }

function MovieInfoPage() {
    const history = useHistory();
    const params = useParams()
    const style = Style()
    const [tmdbMovieInfo, setTmdbMovieInfo] = useState([]);
    const [rapidMovieInfo, setRapidMovieInfo] = useState([]);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imdb_id, setImdb_id] = useState(null);
    const [runtime, setRuntime] = useState([]);
    const calRuntime = (total) => {
        var hours = (total / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return `${rhours}h ${rminutes}m`
    }
    useEffect(() => {
        Promise.all([
            getMovieInfo("movie", params.id),
            getCast(params.id)
        ]).then(([urlOneData, urlTwoData]) => {
            setTmdbMovieInfo(urlOneData)
            setRuntime(calRuntime(urlOneData.runtime))
            setImdb_id(urlOneData.imdb_id)
            setCast(urlTwoData.cast)
        }).catch((e) => { console.log(e) })
    }, [])

    // useEffect(() => {
    //     getMovieInfo("movie", params.id).then((data) => {
    //         setTmdbMovieInfo(data)
    //         setRuntime(calRuntime(data.runtime))
    //         setImdb_id(data.imdb_id)
    //         getCast(params.id).then((data) => {
    //             setCast(data.cast)
                
    //         }).catch((e) => { console.log(e) })
    //     }).catch((e) => { console.log(e) })
    // }, [])
    useEffect(() => {
        if(imdb_id === null) return
        getRapidMovieInfo(imdb_id).then((data) => {
            setRapidMovieInfo(data)
            setLoading(true)
        }).catch((e) => { console.log(e) })
    }, [imdb_id])

    return (
        <>
           <NavBar></NavBar>
            <Stack paddingTop="200px" position="relative" >
                {!loading ? (
                    <Stack>Loading..</Stack>
                ) : (
                    <>
                        <Stack className={style.backdrop_container} >
                            <Stack className={style.backdrop_blur1}></Stack>
                            <Stack className={style.backdrop_blur2}></Stack>
                            <Stack className={style.backdrop_blur3}></Stack>
                            <Stack className={style.backdrop_blur4}></Stack>
                            <img className={style.backdrop} src={`http://image.tmdb.org/t/p/original/${tmdbMovieInfo.backdrop_path}`}/>
                        </Stack>
                        <Grid container style={{zIndex: "1"}}>
                            <Grid item xs={3}>
                                <img className={style.poster} src={`http://image.tmdb.org/t/p/original/${tmdbMovieInfo.poster_path}`}/>
                            </Grid>
                            <Grid item xs={6} className={style.root} >
                                <Stack spacing={2}>
                                    <Stack direction="row" alignItems="center" spacing={3}>
                                        <Stack className={style.name}>{tmdbMovieInfo.original_title}</Stack>
                                        <Stack className={style.year}>{rapidMovieInfo.Year}</Stack>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <Stack className={style.trailer_button}>Watch Trailer</Stack>
                                        <Stack direction="row"  spacing={2} py={1}>
                                            {tmdbMovieInfo.genres.map((genre, key) => (
                                                <Stack key={key} className={style.category_button}>{genre.name}</Stack>
                                            ))}
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <Stack>
                                            <Stack className={style.title}>STATUS</Stack>
                                            <Stack className={style.content}>{tmdbMovieInfo.status}</Stack>
                                        </Stack>
                                        <Stack>
                                            <Stack className={style.title}>COUNTRY</Stack>
                                            <Stack className={style.content}>{tmdbMovieInfo.production_countries[0]?.name}</Stack>
                                        </Stack>
                                        <Stack>
                                            <Stack className={style.title}>RUNTIME</Stack>
                                            <Stack className={style.content}>{runtime}</Stack>
                                        </Stack>
                                        <Stack>
                                            <Stack className={style.title}>DIRECTOR</Stack>
                                            <Stack className={style.content}>{rapidMovieInfo.Director}</Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack textAlign="left">
                                        <Stack className={style.title}>STORYLINE</Stack>
                                        <Stack className={style.content}>{tmdbMovieInfo.overview}</Stack>
                                    </Stack>
                                    <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center" >
                                        <Stack direction="row" justifyContent="flex-start" alignItems="center"  spacing={2}>
                                            <CircularProgressWithLabel value={tmdbMovieInfo.vote_average} />
                                            <Stack>{`${tmdbMovieInfo.vote_count} Ratings`}</Stack>
                                        </Stack>
                                        {rapidMovieInfo?.Ratings[0] && <Stack spacing={0.5} direction="row" py={0.5} px={1} backgroundColor="#F6C700" justifyContent="center" alignItems="center" borderRadius="10px">
                                            <img style={{width: "60px", height: "25px"}} src={imdb}/>
                                            <Stack pb={0.25} color="#000000" fontWeight="800" fontSize="1.5rem">{rapidMovieInfo?.Ratings[0].Value.slice(0,-3)}</Stack>
                                        </Stack>}
                                        {rapidMovieInfo?.Ratings[1] && <Stack spacing={0.5} direction="row" p={0.5} px={1} backgroundColor="#FFFFFF" justifyContent="center" alignItems="center" borderRadius="10px">
                                            <img style={{width: "30px", height: "30px"}} src={Rotten_Tomatoes2}/>
                                            <Stack pb={0.25} color="#000000" fontWeight="800" fontSize="1.5rem">{rapidMovieInfo?.Ratings[1].Value}</Stack>
                                        </Stack>}
                                        {rapidMovieInfo?.Ratings[2] && <Stack spacing={1.5} direction="row" p={0.5} px={1} backgroundColor="#66CC33" justifyContent="center" alignItems="center" borderRadius="10px">
                                            <img style={{width: "30px", height: "30px"}} src={metacritic}/>
                                            <Stack pb={0.25} color="#ffffff" fontWeight="800" fontSize="1.5rem">{rapidMovieInfo?.Ratings[2].Value.slice(0,-4)}</Stack>
                                        </Stack>}
                                    </Stack>
                                    <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
                                        <Stack>
                                            <Stack className={style.title}>BUDGET</Stack>
                                            <Stack className={style.content}>{`$${tmdbMovieInfo.budget.toLocaleString('en-US')}`}</Stack>
                                        </Stack>
                                        <Stack>
                                            <Stack className={style.title}>REVENUE</Stack>
                                            <Stack className={style.content}>{`$${tmdbMovieInfo.revenue.toLocaleString('en-US')}`}</Stack>
                                        </Stack>
                                        <Stack spacing={0.5} direction="row" p={0.5}  backgroundColor="#FFFFFF" justifyContent="center" alignItems="center" borderRadius="10px">
                                            {tmdbMovieInfo.production_companies.map((company, key) => {
                                                    if(company.logo_path === null) return
                                                    return <img key={key} style={{height: "35px", padding: "0 0.5rem"}} src={`http://image.tmdb.org/t/p/original/${company.logo_path}`}/>
                                            })}
                                            
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack backgroundColor="#16214A" p={2} m={2} borderRadius="10px" spacing={2}>
                                    <Stack color="#ffffff" fontWeight="800" fontSize="1.5rem" textAlign="start">Cast</Stack>
                                    <Stack spacing={2}>
                                        {cast.slice(0, 4).map((person, key) => (
                                                <Stack direction="row" key={key}>
                                                    {!person.profile_path ? (
                                                       <img className={style.cast_image} src={avatar} />
                                                    ) : (
                                                        <img className={style.cast_image}  style={{cursor: "pointer"}} src={`http://image.tmdb.org/t/p/w500/${person.profile_path}`}  onClick={() => history.push(`/person/${person.id}`)}/>
                                                    )}
                                                    <Stack pl={2} textAlign="start">
                                                        <Stack className={style.title}>{person.original_name}</Stack>
                                                        <Stack className={style.content}>{person.character}</Stack>
                                                    </Stack>
                                                </Stack>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Award ImdbID={imdb_id}/>
                    </>
                )}
            </Stack>
        </>
    )
}

export default MovieInfoPage
