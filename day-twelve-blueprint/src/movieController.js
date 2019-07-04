/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";

// Add your magic here!
export const home = async (req, res) => {
  const movies = await Movie.find({});
  res.render("home", { movies });
};
export const error = (req, res) => {
  res.render("404");
};
export const detail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const movie = await Movie.findById(id);
    res.render("detail", { movie });
  } catch (error) {
    console.log(error);
    res.redirect("404");
  }
};

export const search = async (req, res) => {
  const {
    query: { rating, year }
  } = req;
  const ms = await Movie.find({});
  try {
    if (rating) {
      const movies = await filterRating(ms, rating);
      res.render("search", { movies });
    } else if (year) {
      const movies = await filterYear(ms, year);
      res.render("search", { movies });
    } else {
      res.render("search");
    }
  } catch (error) {
    res.redirect("404");
  }
};

export const deleting = async (req, res) => {
  const {
    params: { id }
  } = req;
  await Movie.findOneAndRemove({ _id: id });
  res.redirect("/");
};
export const create = (req, res) => {
  res.render("create");
};
export const postCreate = async (req, res) => {
  const {
    body: { title, year, rating, synopsis, genres }
  } = req;
  const convertedGenres = genres.split(",");
  await Movie.create({
    title,
    year,
    rating,
    synopsis,
    genres: convertedGenres
  });
  res.redirect("/");
};

export const getEdit = async (req, res) => {
  const {
    params: { id }
  } = req;
  const movie = await Movie.findById(id);
  res.render("edit", { movie });
};
export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, year, rating, synopsis, genres }
  } = req;
  await Movie.findByIdAndUpdate(id, { title, year, rating, synopsis, genres });
  res.redirect("/");
};

const filterYear = (movies, year) => movies.filter(movie => movie.year >= year);
const filterRating = (movies, rating) =>
  movies.filter(movie => movie.rating >= rating);
