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

export const getMovies = async (kindOfSearch,page) => {
  if (kindOfSearch.title == "movie" || kindOfSearch.title == "tv") {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/${kindOfSearch.title}/${kindOfSearch.content}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  else if (kindOfSearch.title == "genre") {
    //https://api.themoviedb.org/3/discover/movie?api_key=50fd585da26983bd2038f6d06652bd16&language=en-US&page=1&with_genres=Animation
    try {
      var id = kindOfSearch.content.split('_');
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&with_genres=${id}&page=${page}`);
      console.log(response.data.results)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  else if (kindOfSearch.title == "year") {
    //https://api.themoviedb.org/3/discover/movie?api_key=50fd585da26983bd2038f6d06652bd16&language=en-US&page=1&with_genres=53&primary_release_year=2010
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&primary_release_year=${kindOfSearch.content}&page=${page}`);
      console.log(response.data.results)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  } else {

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