import Hero from './Hero.astro';
import Text from './Text.astro';
import ImageGroup from './ImageGroup.astro';
import Services from './Services.astro';
import List from './List.astro';
import Gallery from './Gallery.astro';
import Contact from './Contact.astro';
import Careers from './Careers.astro';

/** Maps a block's `_type` to its component. One line per block. */
export const registry = {
  hero: Hero,
  text: Text,
  imageGroup: ImageGroup,
  services: Services,
  list: List,
  gallery: Gallery,
  contact: Contact,
  careers: Careers,
} as const;
