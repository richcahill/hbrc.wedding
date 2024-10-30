<script>
	import { Button } from '$lib/components/ui/button';

	import Logo from '$lib/components/Logo.svelte';
	import Photos from '$lib/components/Photos.svelte';
	let serverResponse = null;
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';

	let rsvpData = {
		names: [''],
		response: 'Yes',
		notes: '',
		dietary: ''
	};

	async function sendRsvp() {
		try {
			const response = await fetch('/api/rsvp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ data: rsvpData })
			});
			if (response.ok) {
				serverResponse = { type: 'success', message: 'Thanks for your RSVP! ❤️' };
			} else {
				serverResponse = {
					type: 'error',
					message: 'There was an issue sending your RSVP. Send us a WhatsApp/iMessage ❤️'
				};
			}
		} catch (error) {
			serverResponse = {
				type: 'error',
				message: 'There was an issue sending your RSVP. Send us a WhatsApp/iMessage ❤️'
			};
		}
	}

	function addName() {
		console.log('Add Name button clicked');
		rsvpData.names = [...rsvpData.names, ''];
	}

	function removeName(index) {
		rsvpData.names = rsvpData.names.filter((_, i) => i !== index);
	}

	function updateName(index, value) {
		rsvpData.names[index] = value;
	}
</script>

<div class="w-screen h-screen bg-zinc-950 flex items-center justify-center">
	<div class="absolute inset-0">
		<Photos />
	</div>
	<div class="flex flex-col gap-2 items-center w-full max-w-sm z-20 bg-zinc-950 p-4 rounded-md">
		<Logo size={128} />

		{#if serverResponse}
			<div class="flex flex-col gap-2 w-full">
				<p class="text-white mt-2 text-center">{serverResponse.message}</p>
			</div>
		{:else}
			<div class="flex flex-col gap-2 w-full">
				<div class="flex flex-col gap-2 w-full mb-6">
					{#each rsvpData.names as name, index}
						<div class="w-full flex gap-2">
							<Input
								bind:value={rsvpData.names[index]}
								on:input={(e) => updateName(index, e.target.value)}
								placeholder="Name"
							/>
							{#if rsvpData.names.length > 1}
								<Button on:click={() => removeName(index)}>-</Button>
							{/if}
						</div>
					{/each}
					<Button on:click={addName}>Add Name</Button>
				</div>
				<Select.Root bind:value={rsvpData.response}>
					<Select.Trigger>
						<Select.Value placeholder="Response" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="Yes">Yes</Select.Item>
						<Select.Item value="No">No</Select.Item>
					</Select.Content>
				</Select.Root>
				<Input class="mt-4" bind:value={rsvpData.dietary} placeholder="Any dietary requirements?" />
				<Input
					class="w-full"
					bind:value={rsvpData.song}
					placeholder="Any songs to add to the playlist?"
				/>
				<Textarea class="w-full" bind:value={rsvpData.notes} placeholder="Anything to add?" />

				<Button class="w-full mt-4" on:click={sendRsvp}>Send RSVP</Button>
			</div>
		{/if}
	</div>
</div>
