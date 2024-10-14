<script>
	import { logout } from '../../stores/auth';
	import { Button } from '$lib/components/ui/button';
	import { LogOut } from 'lucide-svelte';
	import LogoHorizontal from '$lib/components/LogoHorizontal.svelte';
</script>

<div class="w-screen h-screen bg-zinc-950 flex flex-1 flex-col items-center justify-start">
	<div class="container flex-grow flex flex-col">
		<div class="flex flex-col gap-4 items-stretch p-4 flex-grow">
			<div class="bg-white/5 text-white w-full flex items-center justify-between p-1 rounded-lg">
				<div class="flex items-center gap-2 px-2">
					<LogoHorizontal size={32} />
					<div class="flex gap-2 px-4">
						<a href="/2024/plan" class="text-white/50 hover:text-white transition-colors">Plan</a>
						<a href="/2024/venues" class="text-white/50 hover:text-white transition-colors"
							>Venues</a
						>
						<a href="/2024/dress-code" class="text-white/50 hover:text-white transition-colors"
							>Dress Code</a
						>
					</div>
				</div>
				<Button on:click={logout} variant="ghost" size="icon">
					<LogOut size={16} />
				</Button>
			</div>
			<div class="w-full overflow-y-auto flex-grow flex flex-col">
				<slot />
			</div>
		</div>
	</div>
</div>
