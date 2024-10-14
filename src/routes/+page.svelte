<script>
	import { onMount } from 'svelte';
	import { userPassword } from '../stores/auth';
	import { goto } from '$app/navigation';

	let password;

	onMount(() => {
		const unsubscribe = userPassword.subscribe((value) => {
			password = value;
			if (password) {
				goto('/2024'); // Redirect to the protected route if authenticated
			} else {
				goto('/login'); // Redirect to the login page if not authenticated
			}
		});

		return () => unsubscribe();
	});
</script>

<!-- Optionally, you can keep the Logo component for a brief loading state -->
<div class="w-screen h-screen bg-zinc-950 flex items-center justify-center"></div>
