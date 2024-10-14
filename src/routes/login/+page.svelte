<script>
	import { passwords, userPassword } from '../../stores/auth';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';

	let inputPassword = '';

	function login() {
		if (passwords.includes(inputPassword)) {
			userPassword.set(inputPassword);
			goto('/2024'); // Redirect to the protected route
		} else {
			toast.error('Invalid password');
		}
	}
</script>

<div class="w-screen h-screen bg-zinc-950 flex items-center justify-center">
	<div class="flex flex-col gap-2">
		<Input
			type="password"
			bind:value={inputPassword}
			class="text-center"
			placeholder="Enter password"
		/>
		<Button on:click={login}>Login</Button>
	</div>
</div>
