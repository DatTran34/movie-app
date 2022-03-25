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
export const getMultiSearch = async (media_type, query, page) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/${media_type}?api_key=50fd585da26983bd2038f6d06652bd16&language=en-US&page=1&query=${query}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getFiltered = async (searchParams, page) => {
  try {
    if(searchParams.get("media_type") === "person") {

      const response = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${searchParams.get("page")}`);
      return response.data;
    } else {
      if (searchParams.get("category") === null) {
        let params = ""
        for (var pair of searchParams.entries()) {
          if (pair[0] === "genre") {
            params = params.concat('&with_genres=', pair[1])
          } else if (pair[0] === "year") {
            params = params.concat('&year=', pair[1])
          } else if (pair[0] === "language") {
            params = params.concat('&with_original_language=', pair[1].slice(0,2))
          }
          
        }
        console.log(searchParams.get("page"))
        const response = await axios.get(`https://api.themoviedb.org/3/discover/${searchParams.get("media_type")}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=external_ids&language=en-US&page=${searchParams.get("page")}${params}`);
        return response.data;
      }
      else{
        let param = ""
        if (searchParams.get("category") === "Now Playing") {
          param = "now_playing"
        } else if (searchParams.get("category") === "Up Coming") {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=external_ids&page=${searchParams.get("page")}&region=US`);
          return response.data;
        } else if (searchParams.get("category") === "Popular") {
          param = "popular"
        } else if (searchParams.get("category") === "Top Rated") {
          param = "top_rated"
        } else if (searchParams.get("category") === "Airing Today") {
          param = "airing_today"
        } else if (searchParams.get("category") === "On The Air") {
          param = "on_the_air"
        }
        const response = await axios.get(`https://api.themoviedb.org/3/${searchParams.get("media_type")}/${param}?api_key=${process.env.REACT_APP_API_KEY}&page=${searchParams.get("page")}&append_to_response=external_ids`);
        return response.data;
      }
    }

  } catch (error) {
    console.error(error);
  }
}

export const getUpComingMovies = async (page) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&region=US&with_release_type=2|3`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
