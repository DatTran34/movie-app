import axios from "axios";

export const getMovieInfo = async (media_type, movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${media_type}/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getCast = async (movieId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }