<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { optimize } from '$lib/image';

	// Dynamically import all images from the media directory
	const images = import.meta.glob('$lib/media/*.{jpeg,jpg,png}', {
		eager: true,
		query: {
			enhanced: true
		}
	});

	// Create an array of photos from the imported images
	let photos = Object.values(images);

	console.log(photos);

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

	console.log(shuffledPhotos);

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

	// Initial setup for cycling through images
	let currentIndex = 0;

	function addRandomPhoto() {
		if (shuffledPhotos.length === 0) {
			shuffledPhotos = shuffleArray(usedPhotos);
			usedPhotos = [];
		}

		const photo = shuffledPhotos.pop();
		usedPhotos.push(photo);

		const rotation = Math.floor(Math.random() * 90) - 45;
		const rect = container.getBoundingClientRect();
		const left = ((lastMouseX - rect.left) / rect.width) * 100;
		const top = ((lastMouseY - rect.top) / rect.height) * 100;

		const newImage = {
			module: photo,
			info: {
				rotation: rotation,
				left: left,
				top: top,
				id: Math.random().toString(36).substr(2, 9),
				opacity: 0 // Start with 0 opacity for fade-in
			}
		};

		const maxImages = 8;
		if (displayedImages.length >= maxImages) {
			// Trigger fade-out for the oldest image
			displayedImages[0].info.opacity = 0;

			// Delay actual removal to allow fade-out to complete
			setTimeout(() => {
				displayedImages = displayedImages.slice(1);
			}, 200); // Match this delay to the CSS transition duration
		}

		// Add the new image
		displayedImages = [...displayedImages, newImage];

		currentIndex = (currentIndex + 1) % maxImages;

		// Trigger fade-in effect by setting opacity to 1 after a short delay
		setTimeout(() => {
			newImage.info.opacity = 1;
			displayedImages = [...displayedImages];
		}, 10);
	}

	console.log(displayedImages);

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
	{#each displayedImages as { module, info } (info.id)}
		<enhanced:img
			src={module.default}
			alt="hbrc"
			style="
			left: {info.left}%;
			top: {info.top}%;
			transform: translate(-50%, -50%) rotate({info.rotation}deg);
			opacity: {info.opacity};
			transition: opacity 0.2s ease-in-out;
		"
			class="absolute w-32 h-auto rounded-sm filter contrast-120"
		/>
	{/each}
</div>

<style>
</style>
