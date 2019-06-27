export const middlewares = (req, res, next) => {
  res.locals.siteTitle = "Wetube";
  next();
};
