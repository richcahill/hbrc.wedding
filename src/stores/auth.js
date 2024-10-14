import { writable } from 'svelte/store';

// Check if localStorage is available
const isLocalStorageAvailable = typeof localStorage !== 'undefined';

// Retrieve the password from localStorage if it exists
const storedPassword = isLocalStorageAvailable ? localStorage.getItem('userPassword') : null;

export const passwords = ['guest', 'friend', 'family'];
export const userPassword = writable(storedPassword);

// Subscribe to changes in the userPassword store and update localStorage
userPassword.subscribe((value) => {
	if (isLocalStorageAvailable) {
		if (value !== null) {
			localStorage.setItem('userPassword', value);
		} else {
			localStorage.removeItem('userPassword');
		}
	}
});

// Logout function to clear the user password
export function logout() {
	userPassword.set(null);
}
