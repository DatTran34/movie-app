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
export const getPersonDetails = async (ImdbID) => {
  try {
      const response = await axios.get(`https://data-imdb1.p.rapidapi.com/actor/id/${ImdbID}/`, {headers: {
          "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.REACT_APP_API_DATA_IMDB_KEY}`,
      }});
      return response.data;
    } catch (error) {
      console.error(error);
    }
};
export const getPersonBio = async (ImdbID) => {
  try {
      const response = await axios.get(`https://data-imdb1.p.rapidapi.com/actor/id/${ImdbID}/bio/`, {headers: {
          "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.REACT_APP_API_DATA_IMDB_KEY}`,
      }});
      return response.data;
    } catch (error) {
      console.error(error);
    }
};