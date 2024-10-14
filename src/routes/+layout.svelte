<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';

	onMount(() => {
		inject({ mode: dev ? 'development' : 'production' });
	});
</script>

<slot />
