import type { Channel } from './types';

/**
 * YouTube channels: the featured one gets the home-page section (009), the
 * rest live on /beyond (011). Taglines come from Kaaveh's GitHub profile
 * README; he may reword them when asked for the missing URLs.
 */
export const channels: Channel[] = [
  {
    name: 'Code With Kaaveh',
    tagline: 'Android engineering',
    url: 'https://www.youtube.com/@CodeWithKaaveh',
    channelId: 'UC_PSOgZBu28krqe0L93OKgg',
    featured: true,
  },
  {
    name: 'With Kaaveh',
    tagline: 'life, mindset, conversations',
    url: 'https://www.youtube.com/@withKaaveh',
  },
  {
    name: 'Cycling with Kaaveh',
    tagline: 'cycling',
    // TODO(Kaaveh): url
  },
  {
    name: 'RunningWithKaaveh',
    tagline: 'running',
    // TODO(Kaaveh): url
  },
  {
    name: 'MyImmigration',
    tagline: 'immigration journey',
    // TODO(Kaaveh): url
  },
  {
    name: 'Übermensch',
    tagline: 'longevity and health',
    // TODO(Kaaveh): url
  },
];
