const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 8008;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/", (req, res) => {
  res.send("Welcome to Train API!");
});
const trainLib = require("./database/lib/trainLib");
const companyLib = require("./database/lib/companyLib");

app.post("/train/register", async (req, res) => {
  const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;
  try {
    await trainLib.save(companyName, ownerName, rollNo, ownerEmail, accessCode);
    res.json({ success: true });
  } catch (error) {
    console.log(error)
    res.status(500).send("Failed to save: " + error.message);
  }
});


app.post("/train/save", async (req, res) => {
  const {
    trainName,
    trainNumber,
    departureTime,
    seatsAvailable,
    price,
    delayedBy
  } = req.body;

  try {
    await trainLib.save(
        trainName,
        trainNumber,
        departureTime,
        seatsAvailable,
        price,
        delayedBy
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error)
    res.status(500).send("Failed to save: " + error.message);
  }
});

// Define a route for retrieving all trains
app.get("/train/trains", async (req, res) => {
  try {
    const trains = await trainLib.getAllTrains();
    res.json(trains);
  } catch (error) {
    res.status(500).send("Failed to save: " + error.message);
  }
});

// Define a route for retrieving a specific train by ID
app.get("/train/trains/:id", async (req, res) => {
  const trainid = req.params.id;
  try {
    const train = await trainLib.getbyTrainid(trainid);
    res.json(train);
  } catch {
    res.status(500).send("Failed to save: " + error.message);
  }
});
