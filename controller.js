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

  /** [DataDragon] Get Data Dragon Version Based on Region Selected */
  getDataDragonVersion(region, callback) {
    const url = `https://ddragon.leagueoflegends.com/realms/${region}.json`;
    return this.makeRequest(url, callback);
  }

  /** [Champions] Get All Champions */
  async getChampions(region, callback) {
    const { cdn, l: lang, v: ver } = await this.getDataDragonVersion(region);
    const result = `${cdn}/${ver}/data/${lang}/champion.json`;
    return this.makeRequest(result, callback);
  }

  /** [Champions] Get (1) Champion By Name */
  async getChampionByName(region, name, callback) {
    const { cdn, l: lang, v: ver } = await this.getDataDragonVersion(region);
    const result = `${cdn}/${ver}/data/${lang}/champion/${name}.json`;
    return this.makeRequest(result, callback);
  }

  /** [Third Party] Get a summoner by account ID */
  getThirdPartyCode(region, encryptedSummonerId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/platform/v4/third-party-code/by-summoner/${encryptedSummonerId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Summoner] Get a summoner by account ID */
  getSummonerByAccountId(region, encryptedAccountId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/summoner/v4/summoners/by-account/${encryptedAccountId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Summoner] Get a summoner by summoner name */
  getSummonerByName(region, summonerName, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/summoner/v4/summoners/by-name/${encodeURI("Möönlight")}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Summoner] Get a summoner by PUUID */
  getSummonerByPUUID(region, encryptedPUUID, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/summoner/v4/summoners/by-puuid/${encryptedPUUID}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Summoner] Get a summoner by summoner ID */
  getSummonerByPUUID(region, encryptedSummonerId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/summoner/v4/summoners/${encryptedSummonerId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Summoner] Get league entries in all queues for a given summoner ID */
  getSummonerLeagues(region, encryptedSummonerId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/league/v4/entries/by-summoner/${encryptedSummonerId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Mastery] Get all champion mastery entries sorted by number of champion points descending */
  getAllChampionMasteries(region, encryptedSummonerId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Mastery] Get a champion mastery by player ID and champion ID */
  getChampionMastery(region, encryptedSummonerId, championId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}/by-champion/${championId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Mastery] Get a player's total champion mastery score, which is the sum of individual champion mastery levels */
  getAllChampionMasteriesScore(region, encryptedSummonerId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/champion-mastery/v4/scores/by-summoner/${encryptedSummonerId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Rotations] Returns champion rotations, including free-to-play and low-level free-to-play rotations */
  getChampionRotations(region, callback) {
    const url = this.generateUrl({
      region,
      path: "/lol/platform/v3/champion-rotations",
    });
    return this.makeRequest(url, callback);
  }

  /** [Clash] Get players by summoner ID */
  getClashPlayer(region, summonerId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/clash/v1/players/by-summoner/${summonerId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Clash] Get players by summoner ID */
  getClashTeam(region, teamId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/clash/v1/teams/${teamId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Clash] Get all active or upcoming tournaments */
  getClashTournaments(region, callback) {
    const url = this.generateUrl({
      region,
      path: "/lol/clash/v1/tournaments",
    });
    return this.makeRequest(url, callback);
  }

  /** [Clash] Get tournament by Team ID */
  getClashTournamentTeamId(region, teamId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/clash/v1/tournaments/by-team/${teamId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Clash] Get tournament by Tournament ID */
  getClashTournamentId(region, tournamentId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/clash/v1/tournaments/${tournamentId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Queue] Get the challenger league for given queue */
  getChallengerLeagues(region, queue, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/league/v4/challengerleagues/by-queue/${queue}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Queue] Get all the league entries */
  getAllLeagues(region, queue, tier, division, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/league/v4/entries/${queue}/${tier}/${division}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Queue] Get the grandmaster league of a specific queue */
  getGrandMasterLeagues(region, queue, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/league/v4/grandmasterleagues/by-queue/${queue}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Queue] Get league with given ID, including inactive entries */
  getLeagueId(region, leagueId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/league/v4/leagues/${leagueId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Queue] Get the master league for given queue */
  getMasterLeagues(region, queue, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/league/v4/masterleagues/by-queue/${queue}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Match] Get match by match id */
  getMatchByMatchId(region, matchId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/match/v4/matches/${matchId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Match] Get matchlist for games played on given account ID and platform ID and filtered using given filter parameters, if any */
  getMatchListByAccountId(region, encryptedAccountId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/match/v4/matchlists/by-account/${encryptedAccountId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Match] Get match timeline by match ID */
  getMatchTimelineByMatchId(region, matchId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/match/v4/timelines/by-match/${matchId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Match] Get match IDs by tournament code */
  getMatchIdsByTournamentCode(region, tournamentCode, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/match/v4/matches/by-tournament-code/${tournamentCode}/ids`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Match] Get match by match ID and tournament code */
  getMatchByMatchIdAndTournamentCode(
    region,
    matchId,
    tournamentCode,
    callback
  ) {
    const url = this.generateUrl({
      region,
      path: `/lol/match/v4/matches/${matchId}/by-tournament-code/${tournamentCode}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Spectator] Get current game information for the given summoner ID */
  getActiveSummonerGame(region, encryptedSummonerId, callback) {
    const url = this.generateUrl({
      region,
      path: `/lol/spectator/v4/active-games/by-summoner/${encryptedSummonerId}`,
    });
    return this.makeRequest(url, callback);
  }

  /** [Spectator] Get list of featured games */
  getFeaturedGames(region, callback) {
    const url = this.generateUrl({
      region,
      path: "/lol/spectator/v4/featured-games",
    });
    return this.makeRequest(url, callback);
  }
};
