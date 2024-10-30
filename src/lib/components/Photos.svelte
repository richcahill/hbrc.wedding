<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { optimize } from '$lib/image';

	// Create an array of photos
	let photos = [
		'/images/1.jpeg',
		'/images/2.jpeg',
		'/images/3.jpeg',
		'/images/4.jpeg',
		'/images/5.jpeg',
		'/images/6.jpeg',
		'/images/7.jpeg',
		'/images/8.jpeg',
		'/images/9.jpg',
		'/images/10.jpg',
		'/images/11.jpg',
		'/images/12.jpg',
		'/images/13.jpg',
		'/images/14.jpg',
		'/images/15.jpg',
		'/images/16.jpg',
		'/images/17.jpg',
		'/images/18.jpg',
		'/images/19.jpg',
		'/images/20.jpg',
		'/images/21.jpg',
		'/images/22.jpg',
		'/images/23.png',
		'/images/24.png',
		'/images/25.png'
	];

	// Function to shuffle an array
	function shuffleArray(array) {
		let shuffledArray = array.slice();
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
		}
		return shuffledArray;
	}

	// Shuffle the photos array
	let shuffledPhotos = shuffleArray(photos);

	// Keep track of used photos to avoid repeats
	let usedPhotos = [];

	// Array to hold displayed images
	let displayedImages = [];

	// Variables to track mouse movement
	let lastMouseX = null;
	let lastMouseY = null;
	let cumulativeDistance = 0;
	const thresholdDistance = 128; // Distance in pixels

	// Reference to the container div
	let container;

	// Function to handle mouse movement
	function handleMouseMove(event) {
		const x = event.clientX;
		const y = event.clientY;

		if (lastMouseX === null || lastMouseY === null) {
			// First movement
			lastMouseX = x;
			lastMouseY = y;
			return;
		}

		// Calculate distance moved since last event
		const dx = x - lastMouseX;
		const dy = y - lastMouseY;
		const distance = Math.sqrt(dx * dx + dy * dy);
		cumulativeDistance += distance;

		lastMouseX = x;
		lastMouseY = y;

		if (cumulativeDistance >= thresholdDistance) {
			// Reset cumulative distance and add a random photo
			cumulativeDistance = 0;
			addRandomPhoto();
		}
	}

	function handleMouseLeave() {
		// Reset tracking when the mouse leaves the element
		lastMouseX = null;
		lastMouseY = null;
		cumulativeDistance = 0;
	}

	// Function to add a random photo
	function addRandomPhoto() {
		if (shuffledPhotos.length === 0) {
			// Re-shuffle the used photos and reset
			shuffledPhotos = shuffleArray(usedPhotos);
			usedPhotos = [];
		}

		// Get a photo from the shuffled array
		const photo = shuffledPhotos.pop();
		usedPhotos.push(photo);

		// Generate a random rotation angle between -45 and 45 degrees
		const rotation = Math.floor(Math.random() * 90) - 45;

		// Get cursor position relative to the container
		const rect = container.getBoundingClientRect();
		const left = ((lastMouseX - rect.left) / rect.width) * 100;
		const top = ((lastMouseY - rect.top) / rect.height) * 100;

		// Create an image object with a unique ID
		const image = {
			src: photo,
			rotation,
			left,
			top,
			id: Math.random().toString(36).substr(2, 9)
		};

		// Add the image to the displayed images array
		displayedImages = [...displayedImages, image];

		// Optional: Limit the number of displayed images
		const maxImages = 8;
		if (displayedImages.length > maxImages) {
			displayedImages = displayedImages.slice(-maxImages);
		}
	}
	function handleClick(event) {
		const x = event.clientX;
		const y = event.clientY;

		lastMouseX = x;
		lastMouseY = y;

		addRandomPhoto();
	}

	function handleKeyDown(event) {
		if (event.key === ' ') {
			addRandomPhoto();
		}
	}
</script>

<div
	class="w-screen h-screen bg-zinc-950 relative overflow-hidden cursor-crosshair"
	bind:this={container}
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
	on:click={handleClick}
	role="button"
	tabindex="-1"
	on:keydown={handleKeyDown}
>
	{#each displayedImages as image (image.id)}
		<img
			src={image.src}
			alt="hbrc"
			srcset={optimize(image.src)}
			style="
				left: {image.left}%;
				top: {image.top}%;
				transform: translate(-50%, -50%) rotate({image.rotation}deg);
			"
			class="absolute w-32 h-auto rounded-sm filter contrast-120"
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 1000 }}
		/>
	{/each}
</div>

<style>
</style>
