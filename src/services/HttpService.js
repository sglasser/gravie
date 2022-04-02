import { GameSearchResultsStore } from '../store';
import data from '../gameData';

export const HttpService = {
    /*
    * return first 50 results in search
    */
    getMovies: async (searchString) => {
      const filteredResults = searchString.trim() ? 
        data.response.results.game
          .filter(g => g.name.__cdata.toLowerCase().includes(searchString.toLowerCase()))
          .slice(0, 50) :
          [];
      GameSearchResultsStore.set(filteredResults)
    },

  //   send: async (url, method, headers, body) => {
  //     const response = await fetch(url, {
  //       method,
  //       headers,
  //       body
  //     });
  //     return await response.json();
  //  }
}