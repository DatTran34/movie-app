import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/material";

const SeasonSelectorStyle = makeStyles((theme) => ({
  root: {
    padding: "1rem",
    color: "#CCD2E3",
    backgroundColor: "#162945",
    "& select": {
      backgroundColor: "#2D375A",
      padding: "10px",
      color: "#CCD2E3",
      border: "none",
      alignItems: "left",
      fontWeight: "600",
      fontSize: "1rem",
    },
    alignItems: "left",
  },
  option: {
    "&:hover" : {
      backgroundColor: "DodgerBlue",
    }
  },
  season_container:{
    display: "grid",
    gridGap: "1rem",
    marginTop: "1rem",
    ["@media (min-width:720px)"]: {
      gridTemplateColumns: "1fr 8fr",
    },
  },
  img: {
    width: "10rem"
  },
  title: {
    fontSize: "3rem",
  },
}));

function SeasonSelector({ seasons }) {
  const seasonSelectorStyle = SeasonSelectorStyle();
  const [selectedSeason, setSelectedSeason] = useState(1);

  const handleSelectedSeason = (e) => {
    setSelectedSeason(e.target.value);
  };
  console.log(seasons);
  return (
    <div className={seasonSelectorStyle.root}>
      <div>
        <select onChange={handleSelectedSeason}>
          {seasons?.map((season, key) => {
            return (
              <option className={seasonSelectorStyle.option} value={season.name} key={key}>
                {season.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        {seasons?.map((season, key) => {
          if (season.name === selectedSeason) {
            return (
              <div className={seasonSelectorStyle.season_container}>
                <img className={seasonSelectorStyle.img} src={`http://image.tmdb.org/t/p/original/${season.poster_path}`}/>
                <Stack>
                  <div className={seasonSelectorStyle.title} >{season.name}</div>
                  <div style={{color: "#4ccdeb"}}>{`${season.episode_count} episodes`}</div>
                  <div>{season.overview}</div>
                </Stack>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default SeasonSelector;
