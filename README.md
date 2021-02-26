# Soraka - Node.js Wrapper

Soraka is a Node.js Wrapper inspired by [Irelia](https://github.com/perezpaya/irelia), it basically allows you to fetch data easily from the oficial [League of Legends API](http://developer.riotgames.com)

In order to get your Riot API Key, you need create an account at [http://developer.riotgames.com](http://developer.riotgames.com)

### Initialization

```javascript
const Soraka = require("./controller");

const soraka = new Soraka({
  secure: true,
  host: "api.riotgames.com",
  apiKey: "Your API Key",
});
```

### Basic Usage => Fetching a single element

```javascript
soraka.getChampionByName("lan", "Soraka", (err, res) => console.log(res));
```

### Advanced Usage => Fetching Multiple Elemens using Callbacks

```javascript
// First, you have to request the summoner id with the getSummonerByName Method.
soraka.getSummonerByName("lan", "Sünlight", (err, res) => {
  console.log(err, res);

  // Then, use the summoner[id] inside the getAllChampionMasteries method.
  soraka.getAllChampionMasteries("lan", res["id"], (err, res) => {
    console.log(err, res);
  });
});
```

### Advanced Usage => Fetching Multiple Elemens using Async / Await

```javascript
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

// Calling Method
getSummonerInfo("lan", "Möönlight");
```

### Extra Information

To be Defined :)
