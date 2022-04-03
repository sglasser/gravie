<script>
  import { CartStore } from '../store';
  import { fade, scale } from "svelte/transition";

  export let game;

  const addToCart = () => {
    CartStore.update(cart => [...cart, game]);
  }

</script>

<div class="card w-96 bg-base-100 shadow-xl mt-5 mr-5 pt-3" in:scale out:fade>
  <figure>
    <img src="{game.image?.thumb_url}" alt="{game.name}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">{game.name?.__cdata || ""}</h2>
    <p class="overflow-auto max-h-40">{@html game.description || ""}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-sm btn-primary" on:click|preventDefault={addToCart}>Add to Cart</button>
    </div>
  </div>
</div>