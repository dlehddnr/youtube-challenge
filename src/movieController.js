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
  try {
    const movieList = await getMovieByMinimumRating(8);
    if (movieList) {
      res.render("movies", { movieList });
    }
  } catch (error) {
    res.render("404");
  }
};
