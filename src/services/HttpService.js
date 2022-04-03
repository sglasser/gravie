import { GameSearchResultsStore } from '../store';
import data from '../gameData';
import { get } from 'svelte/store';
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