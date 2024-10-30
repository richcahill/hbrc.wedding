<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';
	import { userPassword } from '../stores/auth';
	import { goto } from '$app/navigation';
	import { Toaster } from '$lib/components/ui/sonner';

	let password;

	onMount(() => {
		inject({ mode: dev ? 'development' : 'production' });

		const unsubscribe = userPassword.subscribe((value) => {
			password = value;
			const currentPath = window.location.pathname;

			// TEMP: Comment out redirection for testing
			// if (!password && currentPath !== '/rsvp') {
			//	goto('/login');
			// }
		});

		return () => unsubscribe();
	});
</script>

<Toaster />
<slot />
