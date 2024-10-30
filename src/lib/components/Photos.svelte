<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Import your photos
	import photo1 from '$lib/media/1.jpeg';
	import photo2 from '$lib/media/2.jpeg';
	import photo3 from '$lib/media/3.jpeg';
	import photo4 from '$lib/media/4.jpeg';
	import photo5 from '$lib/media/5.jpeg';
	import photo6 from '$lib/media/6.jpeg';
	import photo7 from '$lib/media/7.jpeg';
	import photo8 from '$lib/media/8.jpeg';
	import photo9 from '$lib/media/9.jpg';
	import photo10 from '$lib/media/10.jpg';
	import photo11 from '$lib/media/11.jpg';
	import photo12 from '$lib/media/12.jpg';
	import photo13 from '$lib/media/13.jpg';
	import photo14 from '$lib/media/14.jpg';
	import photo15 from '$lib/media/15.jpg';
	import photo16 from '$lib/media/16.jpg';
	import photo17 from '$lib/media/17.jpg';
	import photo18 from '$lib/media/18.jpg';
	import photo19 from '$lib/media/19.jpg';
	import photo20 from '$lib/media/20.jpg';
	import photo21 from '$lib/media/21.jpg';
	import photo22 from '$lib/media/22.jpg';
	import photo23 from '$lib/media/23.png';
	import photo24 from '$lib/media/24.png';
	import photo25 from '$lib/media/25.png';
	// Add more photos as needed

	// Create an array of photos
	let photos = [
		photo1,
		photo2,
		photo3,
		photo4,
		photo5,
		photo6,
		photo7,
		photo8,
		photo9,
		photo10,
		photo11,
		photo12,
		photo13,
		photo14,
		photo15,
		photo16,
		photo17,
		photo18,
		photo19,
		photo20,
		photo21,
		photo22,
		photo23,
		photo24,
		photo25
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

	// Preload images by creating hidden image elements
	let preloadedImages = photos.map((photo) => ({
		src: photo,
		id: Math.random().toString(36).substr(2, 9)
	}));

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
			alt=""
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

<!-- Hidden container for preloading images -->
<div style="display: none;">
	{#each preloadedImages as image (image.id)}
		<img src={image.src} alt="" />
	{/each}
</div>

<style>
</style>
