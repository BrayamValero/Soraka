# Soraka - Node.js Wrapper

Soraka is a Node.js Wrapper inspired by [Irelia](https://github.com/perezpaya/irelia), it basically allows you to fetch data easilly from the oficial [League of Legends API](http://developer.riotgames.com)

In order to get your Riot API Key, you need create an account at [http://developer.riotgames.com](http://developer.riotgames.com)

### Usage

```javascript
const Soraka = require("./controller");

const soraka = new Soraka({
  secure: true,
  host: "api.riotgames.com",
  apiKey: "Your API Key",
});

// [getChampionByName] => Get Champion Information By Name
soraka.getChampionByName("lan", "Soraka", (err, res) => console.log(res));
```

### Extra Information

To be Defined :)
