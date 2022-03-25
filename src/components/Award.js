import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import awardImg from "../images/BAFTA.png";
import circle from "../images/circle.png";
import AwardStyle from "../styles/components/AwardStyle";
import { getMovieAwards } from "../axios/ImdbRequest";
function Award({ ImdbID }) {
  const awardStyle = AwardStyle();
  const [awardList, setAwardList] = useState([]);
  useEffect(() => {
    getMovieAwards(ImdbID)
      .then(
        (result) => {
          setAwardList(result.results);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log(awardList);
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridGap: "1rem",
          background: "#162945",
          padding: "1rem",
          
        }}
      >
        <div style={{ color: "#F6C700", fontWeight: "700", fontSize: "24px" }}>
          Awards and Nominations
        </div>
        <div
          className={awardStyle.container}
        >
          {awardList
            .filter((award) => award.type === "Winner")
            .map((award) => {
              return (
                <Stack className={awardStyle.card}>
                  <Stack className={awardStyle.content}>
                    <Stack className={awardStyle.award_name}>
                      {award.award_name}
                    </Stack>
                    <Stack className={awardStyle.year}>{award.year}</Stack>
                    <Stack className={awardStyle.event_name}>
                      {award.event_name}
                    </Stack>
                    <Stack className={awardStyle.award}>{award.award}</Stack>
                  </Stack>
                  <Stack className={awardStyle.blur}></Stack>
                  <Stack className={awardStyle.hide}></Stack>
                  <img className={awardStyle.trophy} src={awardImg} />
                  <img className={awardStyle.circle} src={circle} />
                </Stack>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Award;

{
  /* <Grid container spacing={2} className={awardStyle.panel}>
{awardList.filter(award => award.type === "Winner").map(award => (
  <Grid item xs={2}>
    <Stack className={awardStyle.card}>
      <Stack className={awardStyle.content}>
        <Stack className={awardStyle.award_name}>{award.award_name}</Stack>
        <Stack className={awardStyle.year}>{award.year}</Stack>
        <Stack className={awardStyle.event_name}>
          {award.event_name}
        </Stack>
        <Stack className={awardStyle.award}>
          {award.award}
        </Stack>
      </Stack>
      <Stack className={awardStyle.blur}></Stack>
      <Stack className={awardStyle.hide}></Stack>
      <img className={awardStyle.trophy} src={awardImg} />
      <img className={awardStyle.circle} src={circle} />
    </Stack>
  </Grid>
))}
</Grid> */
}
