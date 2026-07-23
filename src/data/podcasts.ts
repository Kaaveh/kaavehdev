import type { Podcast } from './types';

/**
 * Kaaveh's podcasts — all solo creations (he is the sole host). Names, listen
 * links, and platforms confirmed by Kaaveh (2026-07-23). No one-line
 * descriptions supplied yet, so those cards render name + listen link only.
 * TODO(Kaaveh): per-podcast descriptions.
 */
export const podcasts: Podcast[] = [
  {
    name: 'WonderLand',
    url: 'https://anchor.fm/wonderlandpod',
    platform: 'Anchor',
    role: 'host',
  },
  {
    name: 'Journal Club',
    url: 'https://shows.acast.com/journal-club',
    platform: 'Acast',
    role: 'host',
  },
  {
    name: 'The Voice of My Books',
    url: 'https://anchor.fm/the-voice-of-my-books',
    platform: 'Anchor',
    role: 'host',
  },
  {
    name: 'Mushin',
    url: 'https://shows.acast.com/mushin',
    platform: 'Acast',
    role: 'host',
  },
  {
    name: 'Kapsoul',
    url: 'https://anchor.fm/kapsoul',
    platform: 'Anchor',
    role: 'host',
  },
];
