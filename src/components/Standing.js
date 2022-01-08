import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StandingStyle from "../styles/StandingStyle";
function Standing() {
  const standingStyle = StandingStyle();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    fetch("https://v3.football.api-sports.io/standings?league=39&season=2021", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "b7011f47222a96055f42bafc01826218",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result.response[0].league.standings[0][1]);
          setTeams(result.response[0].league.standings[0]);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Stack>
        <Stack>Standing</Stack>
        <Grid container>
          <Grid item xs={4} md={4}>
            <Stack>Team</Stack>
          </Grid>
          <Grid item xs={1} md={1}>
            <Stack>P</Stack>
          </Grid>
          <Grid item xs={1} md={1}>
            <Stack>W</Stack>
          </Grid>
          <Grid item xs={1} md={1}>
            <Stack>D</Stack>
          </Grid>
          <Grid item xs={1} md={1}>
            <Stack>L</Stack>
          </Grid>
          <Grid item xs={1} md={1}>
            <Stack>GD</Stack>
          </Grid>
          <Grid item xs={1} md={1}>
            <Stack>Pts</Stack>
          </Grid>
          <Grid item xs={2} md={2}>
            <Stack>Last 5</Stack>
          </Grid>
        </Grid>
        <Stack>
          {teams.map((team) => (
            <Grid container>
              <Grid item xs={4} md={4}>
                <Stack direction="row">
                  <Stack>{team.rank}</Stack>
                  <img style={{ width: "30px" }} src={team.team.logo} />
                  <Stack>{team.team.name}</Stack>
                </Stack>
              </Grid>
              <Grid item xs={1} md={1}>
                <Stack>{team.all.played}</Stack>
              </Grid>
              <Grid item xs={1} md={1}>
                <Stack>{team.all.win}</Stack>
              </Grid>
              <Grid item xs={1} md={1}>
                <Stack>{team.all.draw}</Stack>
              </Grid>
              <Grid item xs={1} md={1}>
                <Stack>{team.all.lose}</Stack>
              </Grid>
              <Grid item xs={1} md={1}>
                <Stack>
                  {`${team.all.goals.for} - ${team.all.goals.against}`}
                </Stack>
              </Grid>
              <Grid item xs={1} md={1}>
                <Stack>{team.points}</Stack>
              </Grid>
              <Grid item xs={2} md={2}>
                <Stack>{team.form}</Stack>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Stack>
    );
  }
}

export default Standing;
