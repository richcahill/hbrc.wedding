import { writable } from 'svelte/store';

export const passwords = ['guest', 'friend', 'family'];
export const userPassword = writable(null);
