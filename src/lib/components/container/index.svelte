<script lang="ts">
	let className: string = '';

	export { className as class };
</script>

<div class="container mx-auto px-2 {className}">
	<slot />
</div>
