import express from "express";
import request from "request";

const app = express();

const getStatus = (statusCode, res) => {
  if (statusCode <= 455) {
    return res.json({ up: true });
  } else {
    return res.json({ up: false });
  }
};

app.get("/check", async (req, res) => {
  // const {
  //   query: { url }
  // } = req;
  let url = await req.query.url;
  console.log(url);
  if (!url.startsWith("http://")) {
    url = "http://" + url;
  }
  request(url, function(error, response, body) {
    console.log(response.statusCode);
    getStatus(response.statusCode, res);
  });
});

// Codesanbox does not need PORT :)
app.listen(4000, () => console.log(`Listening!`));
