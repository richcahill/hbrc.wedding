<script>
	import { onMount } from 'svelte';

	export let src;
	export let alt = '';
	export let className = '';

	let canvas;
	let width = 0;
	let height = 0;

	onMount(() => {
		const img = new Image();
		img.crossOrigin = 'Anonymous'; // Handle cross-origin images
		img.src = src;

		img.onload = () => {
			width = img.width;
			height = img.height;

			canvas.width = width;
			canvas.height = height;

			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, width, height);

			const imageData = ctx.getImageData(0, 0, width, height);
			const data = imageData.data;

			// Apply the dithering algorithm
			floydSteinbergDither(data, width, height);

			ctx.putImageData(imageData, 0, 0);
		};
	});

	function floydSteinbergDither(data, width, height) {
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const idx = (y * width + x) * 4;

				// Convert to grayscale
				const oldPixel = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];

				// Inverse dithering
				const newPixel = oldPixel < 128 ? 255 : 0;
				const quantError = oldPixel - newPixel;

				data[idx] = data[idx + 1] = data[idx + 2] = newPixel;

				// Distribute the quantization error
				if (x + 1 < width) {
					data[idx + 4] += (quantError * 7) / 16;
				}
				if (x - 1 >= 0 && y + 1 < height) {
					const idxBL = idx + (width - 1) * 4;
					data[idxBL] += (quantError * 3) / 16;
				}
				if (y + 1 < height) {
					const idxB = idx + width * 4;
					data[idxB] += (quantError * 5) / 16;
				}
				if (x + 1 < width && y + 1 < height) {
					const idxBR = idx + (width + 1) * 4;
					data[idxBR] += (quantError * 1) / 16;
				}
			}
		}
	}
</script>

<canvas bind:this={canvas} class={className} {width} {height} {alt}></canvas>
<div class="text-white">hjello</div>

<style>
	canvas {
		display: block;
	}
</style>
