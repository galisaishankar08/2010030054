const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 8008;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to Number Management!");
});

app.get("/numbers", async (req, res) => {
  // const urls = req.query.url;
  let urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: "URLs are required." });
  }

  if (!Array.isArray(urls)) {
    urls = [urls];
  }

  // console.log(urls)

  try {
    const requests = urls.map((url) => axios.get(url));

    const responses = await Promise.allSettled(requests);

    const numbers = [];

    responses.forEach((response) => {
      if (response.status === "fulfilled") {
        //   const value = response.value;
        const data = response.value.data;
        console.log(data);

        if (data && Array.isArray(data.numbers)) {
          // numbers.push(data.numbers);
          numbers.push(...data.numbers);
        } else if (Array.isArray(data)) {
          numbers.push(...data);
        }
      }
    });

    const uniqueNumbers = [];
    for (let i = 0; i < numbers.length; i++) {
      if (!uniqueNumbers.includes(numbers[i])) {
        uniqueNumbers.push(numbers[i]);
      }
    }
    uniqueNumbers.sort((a, b) => a - b);
    res.json({ numbers: uniqueNumbers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error." });
  }
});
