import { writable } from 'svelte/store';

export const GameSearchResultsStore = writable([]);

export const CartStore = writable([]);

export const SearchTerm = writable("");

export const IsLoading = writable(false);