<script lang="ts">
  import type { GallerySeries } from '@/lib/data/gallery';

  interface Props {
    series: GallerySeries;
    currentIndex: number;
    onPrev: () => void;
    onNext: () => void;
    onClose: () => void;
  }

  const { series, currentIndex, onPrev, onNext, onClose }: Props = $props();

  const photo = $derived(series.photos[currentIndex]);
  const total = $derived(series.photos.length);
  const hasPrev = $derived(currentIndex > 0);
  const hasNext = $derived(currentIndex < total - 1);

  let isLoading = $state(true);

  $effect(() => {
    photo.src;
    currentIndex;
    isLoading = true;
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
  role="dialog"
  aria-modal="true"
  aria-label="Gallery lightbox"
>
  <button
    type="button"
    onclick={onClose}
    aria-label="Close"
    class="focus:ring-secondary absolute top-4 right-4 z-10 cursor-pointer rounded p-2 text-white transition hover:bg-white/20 focus:ring-2 focus:outline-none"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  </button>

  {#if hasPrev}
    <button
      type="button"
      onclick={onPrev}
      aria-label="Previous image"
      class="focus:ring-secondary absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded p-2 text-white transition hover:bg-white/20 focus:ring-2 focus:outline-none md:left-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  {/if}

  <div
    role="none"
    class="relative flex min-h-[50vh] max-h-[90vh] max-w-[90vw] flex-col items-center gap-4"
    onclick={(e) => e.stopPropagation()}
  >
    <div class="relative flex min-h-[40vh] items-center justify-center">
      {#if isLoading}
        <div
          class="absolute inset-0 z-10 flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            class="h-12 w-12 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="3"
              stroke-dasharray="30 50"
              stroke-linecap="round"
            />
          </svg>
        </div>
      {/if}
      <img
        src={photo.src}
        alt={photo.alt}
        class="max-h-[80vh] w-auto object-contain transition-opacity duration-200 {isLoading
          ? 'opacity-0'
          : 'opacity-100'}"
        onload={() => (isLoading = false)}
      />
    </div>
    <p class="text-white">
      {currentIndex + 1} / {total}
    </p>
  </div>

  {#if hasNext}
    <button
      type="button"
      onclick={onNext}
      aria-label="Next image"
      class="focus:ring-secondary absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded p-2 text-white transition hover:bg-white/20 focus:ring-2 focus:outline-none md:right-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  {/if}

  <button
    type="button"
    aria-label="Close backdrop"
    class="absolute inset-0 -z-10"
    onclick={onClose}
  >
  </button>
</div>
