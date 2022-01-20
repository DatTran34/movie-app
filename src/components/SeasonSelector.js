
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

const SeasonSelectorStyle = makeStyles((theme) => ({
  root: {
    color: "#CCD2E3",
    "& select": {
      backgroundColor: "#2D375A",
      padding: "10px",
      color: "#CCD2E3",
      border: "none",
      alignItems: "left",
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
    },
    alignItems: "left",
  },
  selectItems: {
    backgroundColor: "DodgerBlue",
  },
}));

function SeasonSelector({movie}) {
    const seasonSelectorStyle = SeasonSelectorStyle()
  const [selectedSeason, setSelectedSeason] = useState(1);

  const handleSelectedSeason = (e) => {
    setSelectedSeason(e.target.value);
  };
  console.log(selectedSeason)
  return (
    <div className={seasonSelectorStyle.root}>
      <div>Select Seasons</div>
      <div>
        <select onChange={handleSelectedSeason}>
          {movie.seasons?.map((season, key) => {
            return (
              <option value={season.name} key={key}>
                {season.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>{selectedSeason} Info</div>
      <div>{movie.seasons?.map((season,key)=>{
          if (season.name === selectedSeason){
              return (<div>{season.overview}</div>)
          }
      })}</div>
    </div>
  );
}

export default SeasonSelector;
