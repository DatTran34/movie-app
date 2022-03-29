import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import awardImg from "../images/BAFTA.png";
import circle from "../images/circle.png";
import AwardStyle from "../styles/components/AwardStyle";
import { getMovieAwards } from "../axios/ImdbRequest";
import noAwardCollection from "../images/no_award.png";
function Award({ ImdbID }) {
  const awardStyle = AwardStyle();
  const [awardList, setAwardList] = useState([]);
  useEffect(() => {
    getMovieAwards(ImdbID)
      .then(
        (result) => {
          setAwardList(result.results.filter((award) => award.type === "Winner"));
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
        <div style={{height: "21rem",display: "flex", justifyContent: 'center', alignItems: "center"}}>
          {awardList.length === 0 ? (
            <Stack spacing={2} style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
              <img style={{ width: "10rem" }} src={noAwardCollection} />
              <div style={{color: "#f6c700"}}>No Award Collection</div>
            </Stack>
          ) : (
            <>
              {awardList.map((award) => {
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Award;

