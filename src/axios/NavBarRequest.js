import axios from "axios";
import React from "react";

export const getGenres = async (media_type) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/${media_type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const searchData = async (query) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}