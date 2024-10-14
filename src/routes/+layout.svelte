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
			if (!password) {
				goto('/login'); // Redirect to login if not authenticated
			}
		});

		return () => unsubscribe();
	});
</script>

<Toaster />
<slot />
