<script>
	import Logo from '$lib/components/Logo.svelte';
	import { userPassword } from '../../stores/auth';
	import { onMount } from 'svelte';

	let loggedInAs = '';

	onMount(() => {
		const unsubscribe = userPassword.subscribe((value) => {
			loggedInAs = value;
		});

		return () => unsubscribe();
	});
</script>

<svelte:head>
	<title>HBRC — Wedding</title>
	<link
		rel="icon"
		href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💍</text></svg>"
	/>
</svelte:head>
<div class="flex flex-col gap-4 text-white items-center justify-center flex-grow">
	logged in as {loggedInAs}
</div>
