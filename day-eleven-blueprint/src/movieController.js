import { getMovieById, getMovies, addMovie } from "./db";

export const home = async (req, res) => {
  const movies = await getMovies();
  if (movies) {
    res.render("movies", { movies, pageTitle: "Movies!" });
  }
};
export const movieDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  const movie = await getMovieById(id);
  if (!movie) {
    res.render("404", { pageTitle: "Movie not found" });
  } else {
    return res.render("detail", { movie });
  }
};

export const add = async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    res.render("add", { pageTitle: "Add Page" });
  } else {
    const {
      body: { title, synopsis, genres }
    } = req;
    const convertedGenres = genres.split(",");
    const movie = { title, synopsis, genres: convertedGenres };
    if (movie) {
      console.log(movie);
      addMovie(movie);
    }
    res.redirect("/");
  }
};
/*
Write the controller or controllers you need to render the form
and to handle the submission
*/
