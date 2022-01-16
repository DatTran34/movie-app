import React, { useState, useEffect } from "react";
import { Grid, Stack } from '@mui/material'
import { getPersonCombinedCredits } from "../axios/TmdbRequest";
import PersonInfoPageStyle from "../styles/pages/PersonInfoPageStyle";
import { makeStyles } from "@mui/styles";

const YearSelectorStyle = makeStyles((theme) => ({
    root:{
        "& select" :{
            backgroundColor:"#2D375A",
            padding: "10px",
            color:"#ffffff",
            border:"none"
        } ,
        "& option":{
           
        }
    },
    customSelect : {
        width:"200px",
        position: "relative",
        fontFamily: "Arial",
        '&:select ': {
            display: "none",   
        }
      },
    selectItems : {
        backgroundColor: "DodgerBlue",
    }

}));


function YearSelector({credits,setYearSelector}) {
    const yearSelectorStyle = YearSelectorStyle()
    const handleYear = (e) => {
        setYearSelector(e.target.value)
    }
    console.log(credits)
    if(Object.entries(credits).length === 0)
    {
        console.log("2")
        return null
    }
    else{
        return (
            <div className={yearSelectorStyle.root} >
                <select onChange={handleYear}>
                    {Object.keys(credits["Acting"])?.map((year,key)=>{
                        return ( <option value={year}>{year}</option>)
                    })}
                </select>
            </div>
        )
    }
   
}

function CreditMovieList({ params }) {
    const personInfoPageStyle = PersonInfoPageStyle()
    const [credits, setCredits] = useState({})
    const [yearSelector,setYearSelector] = useState("2021")
    useEffect(() => {
        Promise.all([getPersonCombinedCredits(params.id)])
            .then(([urlData]) => {
                let acting = {}
                let crew = {}
                let directing = {}
                let production = {}
                urlData.cast.map((movie) => {
                    let a = Object.assign({}, generateYearOfCredits(movie, acting))
                    acting = { ...a, ...acting }
                });

                urlData.crew.map((movie) => {
                    if (movie.department === "Crew") {
                        let a = Object.assign({}, generateYearOfCredits(movie, crew))
                        crew = { ...a, ...crew }
                    }
                    else if (movie.department === "Directing") {
                        let a = Object.assign({}, generateYearOfCredits(movie, directing))
                        directing = { ...a, ...directing }
                    }
                    else if (movie.department === "Production") {
                        let a = Object.assign({}, generateYearOfCredits(movie, production))
                        production = { ...a, ...production }
                    }

                });
                setCredits({ ["Acting"]: acting, ["Production"]: production, ["Crew"]: crew, ["Directing"]: directing, ...credits })
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    //============ GENERATE YEAR OF CREDITS ============
    const generateYearOfCredits = (data, object) => {
        if (data.media_type === "movie") {
            let array = object[new Date(data.release_date).getFullYear()]
            if (array === undefined) {
                array = [data]
            }
            else {
                array.push(data)
            }
            object = { [new Date(data.release_date).getFullYear()]: array, ...object }
        }
        else {
            let array = object[new Date(data.first_air_date).getFullYear()]
            if (array === undefined) {
                array = [data]
            }
            else {
                array.push(data)
            }
            object = { [new Date(data.first_air_date).getFullYear()]: array, ...object }
        }
        return object
    }


    return (
        <div className={personInfoPageStyle.container}>
            <div className={personInfoPageStyle.known_for_title}>Filter Credits By Year</div>
            <YearSelector credits={credits}  setYearSelector={setYearSelector}></YearSelector>
            <div>{Object.entries(credits).map(([k, v], key) => {
                if(Object.entries(v).length === 0)
                {
                    return null
                }
                return (<div key={key}>
                    <div className={personInfoPageStyle.known_for_title}>{k}</div>
                    <div className={personInfoPageStyle.credits_box}>
                        {Object.entries(v).map(([k, v], key) => {
                            if(yearSelector !== k)
                            {
                                return null
                            }
                            return (<div className={personInfoPageStyle.year_box} key={key}>
                                <div className={personInfoPageStyle.year_box_title}>{k}</div>
                                <div className={personInfoPageStyle.year_box_content}>
                                    {v.map((movie, key) => {
                                        if (movie.media_type === "movie") {
                                            return (<Stack direction="row"
                                                justifyContent="flex-start"
                                                spacing={0.5} key={key} >
                                                <div className={personInfoPageStyle.year_box_movie_name}>{movie.title}</div>
                                                <div style={{ color: "#BDBDBD" }}>as</div>
                                                <div>{movie.character}</div>
                                            </Stack>)
                                        }
                                        else {
                                            return (<Stack direction="row"
                                                justifyContent="flex-start"
                                                spacing={0.5} key={key} >
                                                <div className={personInfoPageStyle.year_box_movie_name}>{movie.name} ({movie.episode_count} episodes) </div>
                                                <div style={{ color: "#BDBDBD" }}>as</div>
                                                <div>{movie.character}</div>
                                            </Stack>)
                                        }
                                    })}
                                </div>
                            </div>)
                        })}
                    </div>
                </div>)
            })}</div>

        </div>
    )
}

export default CreditMovieList
