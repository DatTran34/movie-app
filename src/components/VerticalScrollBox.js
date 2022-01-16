import React from 'react'
import SmallMovieCard from "../components/SmallMovieCard";
import { Grid, Stack } from '@mui/material'
import { makeStyles } from "@mui/styles";
import { useHistory, useLocation } from "react-router";
const VerticalScrollBoxStyle = makeStyles((theme) => ({
    vertical_scroll_box_container : {
      background: "#2D375A",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "20px",
      borderRadius: "10px",
    },
    vertical_scroll_box: {
        width: "100%",
    },
    vertical_scroll_box_overlay_outter:{
        overflow: "auto",
        display: "flex",
        alignItems: "flex-start",
        height: "500px",
    },
    vertical_scroll_box_overlay_inner: {

    },
    vertical_scroll_box_title: {
      color: "#F6C700",
      fontWeight: "700",
      fontSize: "24px",
      paddingBottom: "20px",
    },
  }));
  
  

function VerticalScrollBox({title, data}) {
    const history = useHistory();
    const verticalScrollBoxStyle = VerticalScrollBoxStyle()
    return (
        <div className={verticalScrollBoxStyle.vertical_scroll_box_container}>
                  <div className={verticalScrollBoxStyle.vertical_scroll_box_title}>{title}</div>
                  <div className={verticalScrollBoxStyle.vertical_scroll_box}>
                    <div className={verticalScrollBoxStyle.vertical_scroll_box_overlay_outter}>
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={1}
                        className={verticalScrollBoxStyle.vertical_scroll_box_overlay_inner}
                      >
                        {data?.map((movie, key) => {
                          return (
                            <SmallMovieCard
                              movie={movie}
                              history={history}
                              key={key}
                            ></SmallMovieCard>
                          );
                        })}
                      </Stack>
                    </div>
                  </div>
                </div>
    )
}

export default VerticalScrollBox
