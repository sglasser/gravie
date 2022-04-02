import Home from './components/Home.svelte';
import Cart from './components/Cart.svelte';


const routes = {
  '/': Home,
  '/cart': Cart,
  '*': Home
};

export default routes;