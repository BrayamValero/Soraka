const axios = require("axios");
const url = require("url");

module.exports = class Soraka {
  /**
   * [Object Constructor] => Create the Soraka Instance
   * @param {string} secure - http or https.
   * @param {string} host - The current Riot Games API host.
   * @param {string} apiKey - The API given by Riot Games.
   */
  constructor({ secure, host, apiKey }) {
    this.secure = secure;
    this.host = host;
    this.apiKey = apiKey;
    this.regionCodes = {
      euw: "euw1",
      eune: "eun1",
      na: "na1",
      br: "br1",
      oce: "oc1",
      ru: "ru",
      tr: "tr1",
      lan: "la1",
      las: "la2",
      kr: "kr",
      jp: "jp1",
    };
  }

  /**
   * [Method] => Generate a Proper URL Endpoint which is going to be used to fetch the Riot API
   * @param {string} region Regions => [euw, eune, na, br, oce, ru, tr, lan, las, kr, jp]
   * @param {string} path Current Path given by any get method, it can also be manually given by the user
   */
  generateUrl({ region, path } = {}) {
    const result = url.format({
      protocol: this.secure ? "https:" : "http:",
      host: `${this.regionCodes[region]}.${this.host}${path}`,
      query: { api_key: this.apiKey },
    });
    return result;
  }

  /**
   * [Method] => Axios Get Request
   * @param {string} url Url generated by another method, it can also be manually given by the user
   * @param {string} path Current Path given by any get method, it can also be manually given by the user
   */
  async makeRequest(url, response) {
    if (response === undefined) {
      try {
        const { data } = await axios.get(url);
        return data;
      } catch (error) {
        return console.log(error);
      }
    }

    try {
      const { data } = await axios.get(url);
      response(null, data);
      return data;
    } catch (error) {
      return response(error);
    }
  }

  // [Method] => Get Data Dragon Version Based on Region Selected
  getDataDragonVersion(region, callback) {
    const url = `https://ddragon.leagueoflegends.com/realms/${region}.json`;
    return this.makeRequest(url, callback);
  }

  /**
   * Get All Champions
   * @method
   * @param {string} region - The region from which is getting called.
   * @param {callback} callback - The callback function.
   */
  async getChampions(region, callback) {
    // First we get the current DataDragon Version
    const { cdn, l: lang, v: ver } = await this.getDataDragonVersion(region);
    // Then we format the url based on result
    const result = `${cdn}/${ver}/data/${lang}/champion.json`;
    // Finally, we return the result
    return this.makeRequest(result, callback);
  }

  // [Method] => Return the Summoner Information
  getSummonerByName(region, summonerName, callback) {
    const url = this.generateUrl({
      region,
      path: "/lol/summoner/v4/summoners/by-name/" + summonerName,
    });
    return this.makeRequest(url, callback);
  }

  // [Method] => Return All Champion Masteries from the Summoner
  getAllChampionMasteries(region, encryptedSummonerId, callback) {
    const url = this.generateUrl({
      region,
      path:
        "/lol/champion-mastery/v4/champion-masteries/by-summoner/" +
        encryptedSummonerId,
    });
    return this.makeRequest(url, callback);
  }

  // [Method] => Return Weekly Champion Rotation Based on Region
  getChampionRotations(region, callback) {
    const url = this.generateUrl({
      region,
      path: "/lol/platform/v3/champion-rotations",
    });
    return this.makeRequest(url, callback);
  }
};