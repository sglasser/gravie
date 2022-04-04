<script>
  import { HttpService } from "../services/HttpService";
  import { GameSearchResultsStore } from "../store";
  import { SearchTerm, IsLoading } from "../store";
  import GameCard from "./GameCard.svelte";


  let searchString = "";
  let searchDirty = false;
  let isSearching = false;
  let timer;

  // TODO add pagination or infinite scroll to results
  
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


{#if $IsLoading}
  <div class="mt-3">
    <img src='images/spinner.gif' alt='loading results'/>
  </div>  
{:else if $GameSearchResultsStore.length}
  <div class="mt-3 flex flex-wrap">
    {#each $GameSearchResultsStore as game}
      <GameCard game={game}></GameCard>
    {/each}
  </div>
{:else if searchDirty }
  <div class="mt-3">
    <h3>No results found</h3>
  </div>   
{/if}


