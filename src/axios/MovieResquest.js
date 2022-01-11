import axios from "axios";
import React from "react";

export const getTrendingMovies = async (page) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getUpComingMovies = async (page) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getImageMovie = async (image) => {
  try {
    const response = await axios.get(`http://image.tmdb.org/t/p/w500/${image}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}