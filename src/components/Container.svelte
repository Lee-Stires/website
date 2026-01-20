<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
  }

  const { class: className = '', children }: Props = $props();
</script>

<div class="container mx-auto px-4 sm:px-6 lg:px-8 {className}">
  {@render children()}
</div>
