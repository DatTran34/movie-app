import { CircularProgress, Stack } from '@mui/material'
import React from 'react'
import logo from "../images/logo.png"
function LoadingProcess() {
  return (
    <Stack direction="column" spacing="2rem" justifyContent="center" alignItems="center" style={{padding: "5rem 0"}}>
        <CircularProgress/>
        <img style={{width:"10rem"}} src={logo}/>
    </Stack>
  )
}

export default LoadingProcess