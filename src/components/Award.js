import { Stack } from '@mui/material'
import React from 'react'
import awardImg from '../images/BAFTA.png'
import circle from '../images/circle.png'
import AwardStyle from "../styles/components/AwardStyle";

function Award() {
    const awardStyle = AwardStyle();
    return (
      <Stack className={awardStyle.panel}>
        <Stack className={awardStyle.title}>
          <Stack className={awardStyle.award_name}>Oscars</Stack>
          <Stack className={awardStyle.year}>2019</Stack>
          <Stack className={awardStyle.event_name}>
            Academy of Science Fiction, Fantasy & Horror Films, USA
          </Stack>
          <Stack className={awardStyle.award}>
            Best Comic-to-Film Motion Picture
          </Stack>
        </Stack>
        <Stack className={awardStyle.blur}></Stack>
        <Stack className={awardStyle.hide}></Stack>
        <img className={awardStyle.trophy} src={awardImg} />
        <img className={awardStyle.circle} src={circle} />
      </Stack>
    );
}

export default Award
