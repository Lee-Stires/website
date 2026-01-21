<script lang="ts">
  import { Container } from '@/components';
  import { slide } from 'svelte/transition';

  interface Props {
    path: string;
  }

  const { path }: Props = $props();

  const navList = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
    { label: 'Services', href: '/services/' },
    { label: 'Gallery', href: '/gallery/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Careers', href: '/careers/' },
  ];

  let mobileMenuIsOpen = $state(false);

  // function to close menu when a link is clicked
  function handleLinkClick() {
    mobileMenuIsOpen = false;
  }
</script>

<div class="relative z-50 pt-10">
  <Container>
    <a href="/" class="group block">
      <p
        class="text-primary font-brand text-center text-4xl uppercase
        transition-transform duration-300 text-shadow-[5px_10px_10px_#000] group-hover:scale-[1.01] sm:text-5xl md:text-6xl
        lg:text-7xl xl:text-8xl 2xl:text-9xl"
      >
        Lee & stires, Inc.
      </p>
    </a>

    <!-- Mobile Menu Button -->
    <div class="mt-8 lg:hidden">
      <button
        onclick={() => (mobileMenuIsOpen = !mobileMenuIsOpen)}
        aria-label="Toggle Navigation"
        aria-expanded={mobileMenuIsOpen}
        class="bg-secondary hover:bg-secondary/90 flex w-full items-center justify-center gap-2 px-6 py-3 font-bold tracking-wider text-neutral-900 uppercase transition-colors"
      >
        {#if mobileMenuIsOpen}
          <!-- SVG Close Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
          >
          <span>Close</span>
        {:else}
          <!-- Simple SVG Menu Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><line x1="4" x2="20" y1="12" y2="12" /><line
              x1="4"
              x2="20"
              y1="6"
              y2="6"
            /><line x1="4" x2="20" y1="18" y2="18" /></svg
          >
          <span>Menu</span>
        {/if}
      </button>

      <!-- Mobile Dropdown -->
      {#if mobileMenuIsOpen}
        <div
          transition:slide={{ duration: 300 }}
          class="border-secondary flex flex-col border-t-2 bg-neutral-900/95 text-center shadow-xl backdrop-blur-sm"
        >
          {#each navList as item}
            <a
              href={item.href}
              onclick={handleLinkClick}
              class="hover:text-secondary border-b border-white/10 py-5 text-lg font-medium text-white transition-colors hover:bg-white/5
              {path === item.href ? 'text-secondary font-bold' : ''}"
            >
              {item.label}
            </a>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden lg:block">
      <ul class="mt-20 mb-10 flex flex-wrap justify-center gap-x-14 gap-y-4">
        {#each navList as item}
          {@const isActive = path === item.href}
          <li>
            <a
              href={item.href}
              class="border-b-4 text-3xl transition-all duration-200
              {isActive
                ? 'text-primary border-secondary font-bold'
                : 'hover:text-primary hover:border-secondary/30 border-transparent text-neutral-500'}"
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </Container>
</div>
