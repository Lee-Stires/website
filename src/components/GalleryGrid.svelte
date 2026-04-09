<script lang="ts">
  import type { GallerySeries } from '@/lib/data/gallery';
  import GalleryLightbox from './GalleryLightbox.svelte';

  interface Props {
    series: GallerySeries[];
  }

  const { series }: Props = $props();

  let openSeriesId = $state<string | null>(null);
  let openIndex = $state(0);

  const openSeries = $derived(
    openSeriesId ? (series.find((s) => s.id === openSeriesId) ?? null) : null,
  );

  function openLightbox(id: string) {
    openSeriesId = id;
    openIndex = 0;
  }

  function closeLightbox() {
    openSeriesId = null;
  }

  function goPrev() {
    if (openSeries && openIndex > 0) openIndex -= 1;
  }

  function goNext() {
    if (openSeries && openIndex < openSeries.photos.length - 1) openIndex += 1;
  }
</script>

<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {#each series as s (s.id)}
    <button
      type="button"
      onclick={() => openLightbox(s.id)}
      class="group focus:ring-secondary relative aspect-square w-full cursor-pointer overflow-hidden focus:ring-2 focus:ring-offset-2 focus:outline-none"
    >
      <img
        src={s.photos[0].src}
        alt={s.photos[0].alt}
        class="h-full w-full object-cover transition group-hover:scale-105"
      />
      <div
        class="absolute inset-0 bg-black/40 transition group-hover:bg-black/50"
        aria-hidden="true"
      ></div>
      <span
        class="absolute bottom-0 left-0 p-4 text-left font-bold text-white drop-shadow-lg"
      >
        {s.name}
      </span>
    </button>
  {/each}
</div>

{#if openSeries}
  <GalleryLightbox
    series={openSeries}
    currentIndex={openIndex}
    onPrev={goPrev}
    onNext={goNext}
    onClose={closeLightbox}
  />
{/if}
