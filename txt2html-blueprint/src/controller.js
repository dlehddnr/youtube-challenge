import fs from "fs";

export const home = (req, res) => {
  res.render("home");
};

export const upload = async (req, res) => {
  const {
    file: { path }
  } = req;
  const message = await fs.readFileSync(path, "utf8", function(err, data) {
    if (err) throw err;
    return data;
  });
  if (message) {
    res.render("text", { message });
  }
};
