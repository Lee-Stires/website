<script lang="ts">
	import { slide } from 'svelte/transition';
	import { browser } from '$app/environment';
	let menuIsOpen = false;

	const toggleMenu = () => {
		menuIsOpen = !menuIsOpen;
	};

	if (browser) {
		menuIsOpen = window.innerWidth > 1024 && true;
		window.addEventListener('resize', () => {
			menuIsOpen = window.innerWidth > 1024 && true;
		});
	}
</script>

<header class="container">
	<div class="logo">Lee & Stires, Inc.</div>

	<div class="mobile-nav">
		<button on:click={toggleMenu}>Menu</button>
	</div>
	{#if menuIsOpen}
		<nav transition:slide>
			<ul>
				<li class="active">Home</li>
				<li>About</li>
				<li>Services</li>
				<li>Gallery</li>
				<li>Contact</li>
				<li>Careers</li>
			</ul>
		</nav>
	{/if}
</header>

<style lang="postcss">
	.logo {
		@apply mt-10 text-center text-5xl font-bold uppercase text-primary drop-shadow-[5px_10px_10px_#000];

		@screen md {
			@apply text-9xl;
		}
	}

	nav ul {
		@apply text-center text-2xl;

		@screen md {
			@apply mt-20 flex justify-center gap-20 text-3xl;
		}
	}

	li.active {
		@apply text-secondary;
	}

	.container {
		@apply mb-20;
	}

	.mobile-nav button {
		@apply mt-10 w-full rounded-md bg-secondary p-4 text-white;

		@screen md {
			@apply hidden;
		}
	}
</style>
