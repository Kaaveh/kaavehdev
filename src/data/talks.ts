import type { Course, Mentoring, Talk } from './types';

/** Three technical talks at the LogCat conference. */
export const talks: Talk[] = [
  // TODO(Kaaveh): titles, years, and links for the three LogCat talks.
  { event: 'LogCat conference' },
  { event: 'LogCat conference' },
  { event: 'LogCat conference' },
];

export const course: Course = {
  format: 'master course',
  topic: 'SqlDelight',
  publisher: 'Droidcon',
  publisherNote:
    'droidcon Academy — the global Android developer conference organization ' +
    'partnered with Google, Meta, and Amazon',
  instructorUrl: 'https://academy.droidcon.com/kaaveh-mohamedi',
  // TODO(Kaaveh): exact course title and URL.
};

export const mentoring: Mentoring = {
  stat: '20+',
  text: 'Mentored 20+ software engineers.',
};

/**
 * Also recorded as the education note in `education.ts` — specs 008/010 must
 * render it exactly once site-wide.
 */
export const teaching =
  'Taught Android development in collaboration with the IEEE student branch.';
