"use strict";
const Soraka = require("./controller");

const soraka = new Soraka({
  secure: true,
  host: "api.riotgames.com",
  apiKey: "RGAPI-ae96042e-67be-4d8b-9bc1-2424f8a4e874",
});

// Test => Getting Champions with CB function
soraka.getChampionRotations("lan", (err, res) => {
  console.log(res);
});

// Getting Summoner Info Based on Custom Async Calls w/o CB Functions
async function getInfo(region, name) {
  const summoner = await soraka.getSummonerByName(region, name);
  const summonerMasteries = await soraka.getAllChampionMasteries(
    region,
    summoner["id"]
  );
  const { data: champions } = await soraka.getChampions(region);

  console.log(summoner);
  // Loop Each Mastery
  summonerMasteries.forEach((mastery) => {
    for (let i in champions) {
      if (champions[i].key == mastery["championId"]) {
        console.log(
          "Nombre: " + champions[i].id,
          "Nivel Campeón: " + mastery["championLevel"],
          "Puntos: " + mastery["championPoints"]
        );
      }
    }
  });
}

getInfo("lan", "Chimoltrufia");
