import { writable } from 'svelte/store';

export const currentAddress = writable({ "": String });