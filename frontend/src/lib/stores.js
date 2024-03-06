import { writable } from 'svelte/store';

export const addressBookStore = writable({});

export async function updateAddressBook() {
    await fetch("https://ecdsa-node-svelte.onrender.com/balances")
        .then((response) => response.json())
        .then((data) => {
            addressBookStore.set(data);
            console.log("address book updated to", data)
        });
}

export const currentAddress = writable({ "": String });