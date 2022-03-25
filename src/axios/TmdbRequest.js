import axios from "axios";

export const getMovieInfo = async (media_type, movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=external_ids,videos,images`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPersonInfo = async (personId) => {
  try {
    const response = await axios.get(
      `http://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=external_ids,images`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPersonMovieCredits = async (personId) => {
  try {
    const response = await axios.get(
      `http://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPersonCombinedCredits = async (personId) => {
  try {
    const response = await axios.get(
      `http://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCast = async (media_type, movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getRecommendedMovie = async (media_type, movieId) => {
  try {
    if (media_type === "movie") {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      return response.data;
    } else {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${movieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
