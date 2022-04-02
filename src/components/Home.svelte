<script>
  import { HttpService } from "../services/HttpService";
  import { GameSearchResultsStore } from "../store";
  import GameCard from "./GameCard.svelte";


  let searchString = "";
  let timer;

  const debounce = (text) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchString = text;
      HttpService.getMovies(searchString);
    }, 1000);
  };
</script>
<h1>Game Search</h1>
<div class="form-control w-full max-w-xs">
  <input
    type="text"
    placeholder="Enter a game title"
    class="input input-bordered w-full max-w-xs"
    on:keyup={({ target: { value } }) => debounce(value)}
  />
</div>

<div class="flex flex-wrap">
  {#each $GameSearchResultsStore as game}
    <GameCard game={game}></GameCard>
  {/each}
</div>

