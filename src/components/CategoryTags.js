import React, { useEffect, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Stack } from "@mui/material";
import CategoryList from "../data/CategoryList";
import { useHistory, useLocation } from "react-router";
function CategoryTags() {
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
              borderRadius="20px"
              border="2px solid #4CCDEB"
              color="#4CCDEB"
              px={1}
              py={0.5}
              spacing={0.5}
              fontWeight="600"
              key={index}
              backgroundColor="rgba(76, 205, 235, 0.1)"
            >
              <Stack>{catgry.name}</Stack>
              <CancelRoundedIcon
                cursor="pointer"
                onClick={() => {
                    removeQuery(category.key);
                  }}
              />
            </Stack>
          );
        } else if (category.key === "language") {
          let catgry = category.value.slice(3, category.value.length);
          console.log(catgry)
          return (
            <Stack
              direction="row"
              borderRadius="20px"
              border="2px solid #4CCDEB"
              color="#4CCDEB"
              px={1}
              py={0.5}
              spacing={0.5}
              fontWeight="600"
              key={index}
              backgroundColor="rgba(76, 205, 235, 0.1)"
            >
              <Stack>{catgry}</Stack>
              <CancelRoundedIcon
                cursor="pointer"
                onClick={() => {
                    removeQuery(category.key);
                  }}
              />
            </Stack>
          );
        } else {
          return (
            <Stack
              direction="row"
              borderRadius="20px"
              border="2px solid #4CCDEB"
              color="#4CCDEB"
              px={1}
              py={0.5}
              spacing={0.5}
              fontWeight="600"
              backgroundColor="rgba(76, 205, 235, 0.1)"
              key={index}
            >
              <Stack>{category.value}</Stack>
              <CancelRoundedIcon
                cursor="pointer"
                onClick={() => {
                  removeQuery(category.key);
                }}
              />
            </Stack>
          );
        }
      })}
    </Stack>
  );
}

export default CategoryTags;
