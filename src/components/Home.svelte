<script>
  import { HttpService } from "../services/HttpService";
  import { GameSearchResultsStore } from "../store";
  import { SearchTerm, IsLoading } from "../store";
  import GameCard from "./GameCard.svelte";


  let searchString = "";
  let searchDirty = false;
  let isSearching = false;
  let timer;

  const debounce = (text) => {
    clearTimeout(timer);
    searchDirty = true;
    timer = setTimeout(() => {
      searchString = text;
      SearchTerm.set(searchString);
      HttpService.getMovies(searchString);
    }, 500);
  };
</script>

<h1>Game Search</h1>
<div class="form-control w-full max-w-xs">
  <input
    type="text"
    placeholder="Enter a game title"
    class="input input-bordered w-full max-w-xs"
    bind:value={$SearchTerm}
    on:keyup={({ target: { value } }) => debounce(value)}
  />
</div>

<div class="flex flex-wrap">
  {#if $IsLoading}
    <img src='images/spinner.gif' alt='loading results'/>
  {:else if $GameSearchResultsStore.length}
    {#each $GameSearchResultsStore as game}
      <GameCard game={game}></GameCard>
    {/each}
  {:else if searchDirty }
    <div class="mt-3">
      <h3>No results found</h3>
    </div>   
  {/if}
</div>

