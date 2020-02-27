const express = require("express");
const app = express();
const axios = require("axios");
const port = 88;
const path = __dirname + "/";

app.listen(port, function() {
  console.log("Example app listening on port " + port + "!");
});

const router = express.Router();
router.get("/session", function(req, res) {
  axios
    .get("http://127.0.0.1/session")
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(404).json({});
    });
});
router.get("/*", function(req, res) {
  axios
    .get("http://localhost:8080" + req.url)
    .then(response => {
      res.send(response.data);
    })
    .catch(() => {
      res.status(404);
    });
});

app.use("/", router);
