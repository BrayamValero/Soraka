"use strict";
const Soraka = require("./controller");
require("dotenv").config();

const soraka = new Soraka({
  secure: true,
  host: "api.riotgames.com",
  apiKey: process.env.API_KEY,
});

soraka.getChampionByName("lan", "Soraka", (err, res) => console.log(err, res));
