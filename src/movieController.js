import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear
} from "./db";

export const home = async (req, res) => {
  const movieList = await getMovies();
  res.render("movies", { movieList });
};

export const movieDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const movie = await getMovieById(id);
    if (movie) {
      res.render("detail", { movie });
    }
  } catch (error) {
    res.render("404");
  }
};

export const filterMovie = async (req, res) => {
  const {
    query: { rating, year }
  } = req;
  try {
    if (rating) {
      const movieList = await getMovieByMinimumRating(rating);
      if (movieList) {
        res.render("movies", { movieList, searchingBy: `Rating : ${rating}` });
      }
    } else if (year) {
      const movieList = await getMovieByMinimumYear(year);
      if (movieList) {
        res.render("movies", { movieList, searchingBy: `Year : ${year}` });
      }
    } else {
      res.render("404");
    }
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};
