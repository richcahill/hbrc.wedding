<script>
	import { passwords, userPassword } from '../../stores/auth';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { track } from '@vercel/analytics';
	import Logo from '$lib/components/Logo.svelte';
	import Photos from '$lib/components/Photos.svelte';
	let inputPassword = '';

	function login() {
		if (passwords.includes(inputPassword)) {
			userPassword.set(inputPassword);
			track('login_success', { password: inputPassword });
			goto('/2024'); // Redirect to the protected route
		} else {
			track('login_failed', { password: inputPassword });
			toast.error('Invalid password');
		}
	}
</script>

<div class="w-screen h-screen bg-zinc-950 flex items-center justify-center">
	<div class="absolute inset-0">
		<Photos />
	</div>
	<div class="flex flex-col gap-2 items-center z-20">
		<Logo size={128} />
		<!-- <Input
			type="password"
			bind:value={inputPassword}
			class="text-center"
			placeholder="Enter password"
		/>
		<Button on:click={login} class="w-full">Login</Button> -->
		<a href="/rsvp"><Button class="w-full" variant="secondary">RSVP</Button></a>
	</div>
</div>
