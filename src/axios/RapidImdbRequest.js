import axios from "axios";


export const getRapidMovieInfo = async (ImdbID) => {
    try {
        console.log(ImdbID)
        const response = await axios.get(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${ImdbID}&r=json`, {headers: {
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
            "x-rapidapi-key": `${process.env.REACT_APP_API_RAPID_IMDB_KEY}`,
        }});
        console.log(response)
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