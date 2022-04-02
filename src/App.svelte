<script>
	import Router from 'svelte-spa-router';
	import routes from './routes';
	import Nav from './components/Nav.svelte';

</script>
<div class='container mx-auto'>
	<nav>
		<Nav/>
	</nav>
	<main class='m-3'>
		<Router { routes }/>
	</main>
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
