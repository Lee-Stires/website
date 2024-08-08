<script lang="ts">
</script>

<div class="container">
	<header>
		<div class="logo">Lee & Stires, Inc.</div>

		<nav>
			<ul>
				<li class="active">Home</li>
				<li>About</li>
				<li>Services</li>
				<li>Gallery</li>
				<li>Contact</li>
				<li>Careers</li>
			</ul>
		</nav>
	</header>
</div>

<style lang="postcss">
	.logo {
		@apply mt-10 text-center text-9xl font-bold uppercase text-primary drop-shadow-[5px_10px_10px_#000];
	}

	nav ul {
		@apply mt-20 flex justify-center gap-20 text-3xl;
	}

	li.active {
		@apply text-secondary;
	}

	.container {
		@apply mb-20;
	}
</style>
