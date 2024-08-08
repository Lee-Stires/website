<script lang="ts">
	import { Navigation, Footer } from '$lib/components';
</script>

<Navigation />

<img src="https://placehold.it/1440x750" alt="Cool" />

<div class="container">
	<h1>General Engineering Contractor</h1>

	<div class="license">
		<p>CA LICENSE #288402</p>
		<p>DIR #1000007695</p>
	</div>
</div>

<Footer />

<style lang="postcss">
	img {
		@apply h-[750px] w-full object-cover;
	}

	.container {
		@apply mt-20 text-center;
	}

	h1 {
		@apply text-5xl;
	}

	.license {
		@apply mt-10 flex justify-center gap-20 text-2xl;
	}
</style>
