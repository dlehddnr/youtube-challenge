import express from "express";
import {
  home,
  error,
  detail,
  search,
  create,
  postCreate,
  deleting,
  getEdit,
  postEdit
} from "./movieController";

const movieRouter = express.Router();

// Add your magic here!
movieRouter.get("/", home);
movieRouter.get("/search", search);
movieRouter.get("/error", error);

movieRouter.get("/create", create);
movieRouter.post("/create", postCreate);

movieRouter.get("/:id/edit", getEdit);
movieRouter.post("/:id/edit", postEdit);

movieRouter.get("/:id/delete", deleting);
movieRouter.get("/:id", detail);

export default movieRouter;
