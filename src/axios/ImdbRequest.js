import axios from "axios";


export const getMovieAwards = async (ImdbID) => {
    try {
        const response = await axios.get(`https://data-imdb1.p.rapidapi.com/movie/id/${ImdbID}/awards/`, {headers: {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key": `${process.env.REACT_APP_API_DATA_IMDB_KEY}`,
        }});
        return response.data;
      } catch (error) {
        console.error(error);
      }
};
export const getCast = async (movieId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }