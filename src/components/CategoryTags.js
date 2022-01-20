import React, { useEffect, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AddIcon from '@mui/icons-material/Add';
import { Stack } from "@mui/material";
import CategoryList from "../data/CategoryList";
import { useHistory, useLocation } from "react-router";
import classNames from "classname";
import { makeStyles } from "@mui/styles";
const CategoryTagsStyle = makeStyles((theme) => ({
  box: {
    position: "relative",
    // borderRadius="20px"
    border: "2px solid #4CCDEB",
    color: "#4CCDEB",
    padding: "0.25rem 0.25rem 0.2rem 0.5rem",
    fontWeight: "600",
  },
  movie_color_box: {
    border: "2px solid #29bdae",
    color: "#29bdae",
  },
  icon: {
    color: "#0a192f",
    zIndex: "2",
    transform: "rotate(45deg)",
    cursor: "pointer",
  },
  box_right: {
    position: "absolute", top: "0", right: "0", backgroundColor: "#4CCDEB", width: "2rem", height: "2rem"
  }
}));

function CategoryTags({isMovie}) {
  console.log(isMovie)
  const categoryTagsStyle = CategoryTagsStyle();
  const history = useHistory();
  const location = useLocation();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    let category_list = [];
    let searchParams = new URLSearchParams(location.search);
    for (var pair of searchParams.entries()) {
      if (pair[0] !== "media_type") {
        const key = pair[0];
        const value = pair[1];
        category_list.push({ key, value });
      }
    }
    setCategoryList(category_list);
  }, [location]);
  //*****************function to handle Query Params*********************/
  const removeQuery = (key) => {
    let searchParams = new URLSearchParams(location.search);
    searchParams.delete(key);
    console.log("1")
    history.push({
      pathname: "filter",
      search: searchParams.toString(),
    });
  };
  return (
    <Stack direction="row" spacing={1}>
      {categoryList.map((category, index) => {
        if (category.key === "genre") {
          let catgry = CategoryList.find(({ id }) => category.value === id);
          return (
            <Stack
              direction="row"
              spacing={1.5}
              key={index}
              className={classNames({[categoryTagsStyle.movie_color_box]: isMovie, [categoryTagsStyle.box]: true})}
            >
              <Stack>{catgry.name}</Stack>
              <AddIcon
                className={categoryTagsStyle.icon}
                onClick={() => {
                  removeQuery(category.key);
                }}
              />
              <div className={categoryTagsStyle.box_right}></div>
            </Stack>
          );
        } else if (category.key === "language") {
          let catgry = category.value.slice(3, category.value.length);
          console.log(catgry)
          return (
            <Stack
            direction="row"
            spacing={1.5}
            key={index}
            className={classNames({[categoryTagsStyle.movie_color_box]: isMovie, [categoryTagsStyle.box]: true})}
            >
              <Stack>{catgry}</Stack>
              <AddIcon
                className={categoryTagsStyle.icon}
                onClick={() => {
                    removeQuery(category.key);
                  }}
              />
              <div className={categoryTagsStyle.box_right}></div>
            </Stack>
          );
        } else {
          return (
            <Stack
            direction="row"
            spacing={1.5}
            key={index}
            className={classNames({[categoryTagsStyle.movie_color_box]: isMovie, [categoryTagsStyle.box]: true})}
            >
              <Stack>{category.value}</Stack>
              <AddIcon
                className={categoryTagsStyle.icon}
                onClick={() => {
                  removeQuery(category.key);
                }}
              />
              <div className={categoryTagsStyle.box_right}></div>
            </Stack>
          );
        }
      })}
    </Stack>
  );
}

export default CategoryTags;
