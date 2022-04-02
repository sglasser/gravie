<script>
  import { CartStore } from "../store";

</script>

<h1>Cart</h1>

<div class="overflow-x-auto">
  <table class="table w-full">
    <thead>
      <tr>
        <th>Qty</th>
        <th>Item</th>
        <th>Unit Price</th>
        <th>Total</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      {#if $CartStore.length}
        {#each $CartStore as item}
          <tr>
            <td>1</td>
            <td>{item.name?.__cdata}</td>
            <td>$10.00</td>
            <td>$10.00</td>
            <td>
              <button class="btn btn-square btn-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </td>
          </tr>
        {/each}
      {:else}
        <tr>
          <td colspan="5">
            No items in cart
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>

