<script lang="ts">
	const services = [
		{
			name: 'Site Clearing & Demolition',
			image: 'https://place-hold.it/359x194',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id metus odio. Duis eget mi eget ex porttitor euismod eget ac arcu. Nulla finibus vestibulum molestie. '
		},
		{
			name: 'Earthwork',
			image: 'https://place-hold.it/359x194',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id metus odio. Duis eget mi eget ex porttitor euismod eget ac arcu. Nulla finibus vestibulum molestie. '
		},
		{
			name: 'Asphalt Paving',
			image: 'https://place-hold.it/359x194',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id metus odio. Duis eget mi eget ex porttitor euismod eget ac arcu. Nulla finibus vestibulum molestie. '
		}
	];
	
	const additionalServices = [
		'Site Concrete',
		'Wet Utilities - Sewer, Water & Storm Drain',
		'Seal Coat / Slurry Seal',
		'Dry Utilities',
		'Striping & Signage',
		'More...'
	]
</script>

<div class="container">
	<div class="services">
		{#each services as service}
			<div class="item">
				<h2>{service.name}</h2>
				<img src={service.image} alt="">
				<p>{service.description}</p>
			</div>
		{/each}
	</div>
	
	<div class="separator"></div>
	<h4>Additional Services</h4>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis tempus varius. Aliquam erat volutpat. Vestibulum lacus turpis, egestas ut arcu quis, convallis sollicitudin massa. Praesent lacinia at sapien eget rhoncus. Nam vestibulum iaculis sem, quis vehicula est maximus et. Curabitur vitae massa vitae sem bibendum viverra a a tortor. Integer pulvinar, lectus nec posuere interdum, neque diam suscipit sem, nec aliquam enim elit sed lacus. Etiam cursus non felis vitae porta. Donec porttitor libero et imperdiet lobortis. Duis semper enim a viverra bibendum. Donec congue libero justo, id tincidunt nunc imperdiet id. Nulla facilisi. Pellentesque venenatis pellentesque egestas. Quisque eros purus, finibus sed bibendum eu, semper et lorem. Nulla facilisi. Nunc vel tristique nisl, at ultrices massa.</p>
	
	<ul>
		{#each additionalServices as item}
			<li>- {item}</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.services {
		@apply flex gap-4;
	}
	
	.item {
		@apply flex flex-col items-center text-center;
	}
	
	h2 {
		@apply text-2xl text-center mb-4 font-bold;
	}
	
	img {
		@apply mb-4;
	}
	
	.separator {
		@apply my-10 border-t-4 border-grey-200
	}
	
	h4 {
		@apply text-3xl font-bold text-center mb-5;
	}
	
	p {
		@apply text-center;
	}
	
	ul {
		@apply grid grid-cols-2 justify-items-center my-4 font-bold;
	}
</style>
