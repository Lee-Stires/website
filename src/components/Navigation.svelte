<script lang="ts">
  import { Container } from '@/components';
  import { slide } from 'svelte/transition';

  interface Props {
    path: string;
  }

  const { path }: Props = $props();

  const navList = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
  ];

  let mobileMenuIsOpen = $state(false);
</script>

<div class="pt-10">
  <Container class="@container">
    <p
      class="text-primary font-brand text-center text-4xl uppercase text-shadow-[5px_10px_10px_#000] @lg:text-6xl @3xl:text-8xl @4xl:text-9xl"
    >
      Lee & stires, Inc.
    </p>

    <button
      onclick={() => (mobileMenuIsOpen = !mobileMenuIsOpen)}
      class="bg-secondary mt-8 w-full py-4 text-white @md:hidden"
    >
      Menu
    </button>
    {#if mobileMenuIsOpen}
      <div
        transition:slide
        class="bg-secondary/80 flex w-full flex-col text-center"
      >
        {#each navList as item}
          <a href={item.href} class="border-b border-b-white py-4 text-white"
            >{item.label}</a
          >
        {/each}
      </div>
    {/if}
    <nav>
      <ul class="mt-20 mb-10 flex justify-center gap-14">
        {#each navList as item}
          <li
            class="hover:text-secondary/80 text-3xl {path === item.href &&
              'text-secondary'}"
          >
            <a href={item.href}>{item.label}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </Container>
</div>
