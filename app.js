"use strict";
const Soraka = require("./controller");
require("dotenv").config();

const soraka = new Soraka({
  secure: true,
  host: "api.riotgames.com",
  apiKey: process.env.API_KEY,
});

// [Getting Custom Data with Callback Functions]
// soraka.getSummonerByName("lan", "Sünlight", (err, res) => {
//   console.log(err, res);
//   soraka.getAllChampionMasteries("lan", res["id"], (err, res) => {
//     console.log(err, res);
//   });
// });

// [Getting Custom Data with Async/Await]
const getSummonerInfo = async (region, name) => {
  // First, you have to request the summoner id with the getSummonerByName Method.
  const summonerInfo = await soraka.getSummonerByName(region, name);

  // Then, use the summoner[id] inside the getAllChampionMasteries method.
  const summonerMasteries = await soraka.getAllChampionMasteries(
    region,
    summonerInfo["id"]
  );

  // Extra => You need to request getChampions data in order to display each champion's name.
  const { data: champions } = await soraka.getChampions(region);

  // Now, we display the summoner information obtained.
  console.log("Summoner Info", summonerInfo);

  // Finally, we loop throught each champion's mastery obtained by the summoner in order to get the champion's name.
  summonerMasteries.forEach((mastery) => {
    for (let i in champions) {
      if (champions[i].key == mastery["championId"]) {
        console.log("Custom Data =>", {
          id: champions[i].key,
          name: champions[i].id,
          mastery_lvl: mastery["championLevel"],
          mastery_points: mastery["championPoints"],
        });
      }
    }
  });
};

getSummonerInfo("lan", "Möönlight");
