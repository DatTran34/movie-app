import React from 'react'
import SmallMovieCard from "../components/SmallMovieCard";
import { Grid, Stack } from '@mui/material'
import { makeStyles } from "@mui/styles";
import { useHistory, useLocation } from "react-router";
const VerticalScrollBoxStyle = makeStyles((theme) => ({
    vertical_scroll_box_container : {
      background: "#172a46",
      display: "grid",
      height: "40rem"
    },
    vertical_scroll_box: {
        width: "100%",
    },
    vertical_scroll_box_overlay_outter:{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    vertical_scroll_box_overlay_inner: {
      width: "100%"
    },
    vertical_scroll_box_title: {
      color: "#bb86fc",
      fontWeight: "700",
      fontSize: "1.5rem",
      padding: "1rem",
    },
  }));
  
  

function VerticalScrollBox({isMovie, title, data}) {
    const history = useHistory();
    const verticalScrollBoxStyle = VerticalScrollBoxStyle()
    return (
        <div className={verticalScrollBoxStyle.vertical_scroll_box_container}>
                  <div className={verticalScrollBoxStyle.vertical_scroll_box_title}>{title}</div>
                    <div className={verticalScrollBoxStyle.vertical_scroll_box_overlay_outter}>
                        {data?.map((movie, key) => {
                          return (
                            <SmallMovieCard
                              media_type={movie.media_type}
                              movie={movie}
                              history={history}
                              key={key}
                            ></SmallMovieCard>
                          );
                        })}
                      
                    </div>
                </div>
    )
}

export default VerticalScrollBox
