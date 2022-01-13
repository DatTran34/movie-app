import axios from "axios";
import React from "react";

export const getTrendingMovies = async (page) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getFilteredMovies = async (searchParams, page) => {
  try {
    if (searchParams.get("category") === null) {
      let params = ""
      for (var pair of searchParams.entries()) {
        if (pair[0] === "genre") {
          params = params.concat('&with_genres=', pair[1])
        } else if (pair[0] === "year") {
          params = params.concat('&year=', pair[1])
        } else if (pair[0] === "country") {
          params = params.concat('&with_original_language=', pair[1])
        }
        
      }
      console.log(params)
      const response = await axios.get(`https://api.themoviedb.org/3/discover/${searchParams.get("media_type")}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}${params}`);
      return response.data;
    }
    else{
      let param = ""
      if (searchParams.get("category") === "Now Playing") {
        param = "now_playing"
      } else if (searchParams.get("category") === "Up Coming") {
        param = "upcoming"
      } else if (searchParams.get("category") === "Popular") {
        param = "popular"
      } else if (searchParams.get("category") === "Top Rated") {
        param = "top_rated"
      } else if (searchParams.get("category") === "Airing Today") {
        param = "airing_today"
      } else if (searchParams.get("category") === "On The Air") {
        param = "on_the_air"
      }
      const response = await axios.get(`https://api.themoviedb.org/3/${searchParams.get("media_type")}/${param}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
      return response.data;
    }

  } catch (error) {
    console.error(error);
  }
}

export const getMovies = async (kindOfSearch, page) => {
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
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  else if (kindOfSearch.title == "year") {
    //https://api.themoviedb.org/3/discover/movie?api_key=50fd585da26983bd2038f6d06652bd16&language=en-US&page=1&with_genres=53&primary_release_year=2010
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&primary_release_year=${kindOfSearch.content}&page=${page}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  } else if (kindOfSearch.title == "person") {
    //https://api.themoviedb.org/3/person/popular?api_key=50fd585da26983bd2038f6d06652bd16&language=en-US&page=1
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const getUpComingMovies = async (page) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
