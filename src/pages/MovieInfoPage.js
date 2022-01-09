import { CircularProgress, Grid, Stack, Typography } from '@mui/material'

import React, { useEffect } from 'react'
import MovieInfoStyle from '../styles/pages/MovieInfoPageStyle'
import poster from '../images/poster.jpg'
import cast_image from '../images/cast_img.jpg'
import imdb from '../images/imdb.png'
import metacritic from '../images/metacritic.png'
import Rotten_Tomatoes1 from '../images/Rotten_Tomatoes1.png'
import Rotten_Tomatoes2 from '../images/Rotten_Tomatoes2.png'
import Rotten_Tomatoes3 from '../images/Rotten_Tomatoes3.png'
import { Box } from '@mui/system'

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
    const movieInfoStyle = MovieInfoStyle()

    return (
        <Stack paddingTop="100px">
            <Grid container>
                <Grid item xs={3}>
                    <img className={movieInfoStyle.poster} src={poster}/>
                </Grid>
                <Grid item xs={6} className={movieInfoStyle.root} >
                    <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Stack className={movieInfoStyle.movie_name}>Spider-Man: No Way Home</Stack>
                            <Stack className={movieInfoStyle.year}>2021</Stack>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Stack className={movieInfoStyle.trailer_button}>Watch Trailer</Stack>
                            <Stack direction="row"  spacing={2} py={1}>
                                <Stack className={movieInfoStyle.category_button}>Action</Stack>
                                <Stack className={movieInfoStyle.category_button}>Adventure</Stack>
                                <Stack className={movieInfoStyle.category_button}>Science Fiction</Stack>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Stack>
                                <Stack className={movieInfoStyle.title}>STATUS</Stack>
                                <Stack className={movieInfoStyle.content}>Released</Stack>
                            </Stack>
                            <Stack>
                                <Stack className={movieInfoStyle.title}>COUNTRY</Stack>
                                <Stack className={movieInfoStyle.content}>America</Stack>
                            </Stack>
                            <Stack>
                                <Stack className={movieInfoStyle.title}>RUNTIME</Stack>
                                <Stack className={movieInfoStyle.content}>2h 28m</Stack>
                            </Stack>
                            <Stack>
                                <Stack className={movieInfoStyle.title}>DIRECTOR</Stack>
                                <Stack className={movieInfoStyle.content}>Jon Watt</Stack>
                            </Stack>
                        </Stack>
                        <Stack textAlign="left">
                            <Stack className={movieInfoStyle.title}>STORYLINE</Stack>
                            <Stack className={movieInfoStyle.content}>Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.</Stack>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center" >
                            <Stack direction="row" justifyContent="flex-start" alignItems="center"  spacing={2}>
                                <CircularProgressWithLabel value={8.4} />
                                <Stack>3,247 Ratings</Stack>
                            </Stack>
                            <Stack spacing={0.5} direction="row" py={0.5} px={1} backgroundColor="#F6C700" justifyContent="center" alignItems="center" borderRadius="10px">
                                <img style={{width: "60px", height: "30px"}} src={imdb}/>
                                <Stack pb={0.25} color="#000000" fontWeight="800" fontSize="1.75rem">8.9</Stack>
                            </Stack>
                            <Stack spacing={0.5} direction="row" p={0.5} px={1} backgroundColor="#FFFFFF" justifyContent="center" alignItems="center" borderRadius="10px">
                                <img style={{width: "30px", height: "30px"}} src={Rotten_Tomatoes2}/>
                                <Stack pb={0.25} color="#000000" fontWeight="800" fontSize="1.75rem">95%</Stack>
                            </Stack>
                            <Stack spacing={1.5} direction="row" p={0.5} px={1} backgroundColor="#66CC33" justifyContent="center" alignItems="center" borderRadius="10px">
                                <img style={{width: "30px", height: "30px"}} src={metacritic}/>
                                <Stack pb={0.25} color="#ffffff" fontWeight="800" fontSize="1.75rem">71</Stack>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
                            <Stack>
                                <Stack className={movieInfoStyle.title}>BUDGET</Stack>
                                <Stack className={movieInfoStyle.content}>$150,000,000</Stack>
                            </Stack>
                            <Stack>
                                <Stack className={movieInfoStyle.title}>REVENUE</Stack>
                                <Stack className={movieInfoStyle.content}>$430,238,384</Stack>
                            </Stack>
                            <Stack spacing={0.5} direction="row" p={0.5} px={1} backgroundColor="#FFFFFF" justifyContent="center" alignItems="center" borderRadius="10px">
                                <img src/>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack backgroundColor="#16214A" p={2} m={2} borderRadius="10px" spacing={2}>
                        <Stack color="#ffffff" fontWeight="800" fontSize="1.5rem" textAlign="start">Cast</Stack>
                        <Stack spacing={2}>
                            <Stack direction="row">
                                <img className={movieInfoStyle.cast_image} src={cast_image}/>
                                <Stack pl={2} textAlign="start">
                                    <Stack className={movieInfoStyle.title}>Tom Holland</Stack>
                                    <Stack className={movieInfoStyle.content}>Peter Parker / Spider-Man</Stack>
                                </Stack>
                            </Stack>
                            <Stack direction="row">
                                <img className={movieInfoStyle.cast_image} src={cast_image}/>
                                <Stack pl={2} textAlign="start">
                                    <Stack className={movieInfoStyle.title}>Tom Holland</Stack>
                                    <Stack className={movieInfoStyle.content}>Peter Parker / Spider-Man</Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default MovieInfoPage
