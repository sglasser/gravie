import { GameSearchResultsStore } from '../store';
import { IsLoading } from '../store';

export const HttpService = {

    getMovies: async (searchString) => {
      try {
        if (!searchString.trim()) {
          IsLoading.set(false);
          GameSearchResultsStore.set([]);
          return;
        }

        IsLoading.set(true);

        // TODo handle pagination...right now returns 100 results
        // TODO move url to config
        const url = `https://us-central1-gravie.cloudfunctions.net/search?search=${searchString}`;

        const result = await fetch(url, {method: "GET", headers: {
          "Content-Type": "application/json"
        }});
        const data = await result.json();
        GameSearchResultsStore.set(data.results);
      } catch (err) {
        // TODO need to handle error and response code
      } finally {
        IsLoading.set(false);
      }
    }
}