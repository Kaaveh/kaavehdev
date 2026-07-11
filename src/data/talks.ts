import type { Course, Mentoring, Talk } from './types';

/**
 * Three technical talks at the LogCat conference. Titles/years confirmed by
 * Kaaveh (2026-07-11); no public recording URLs provided, so they render as
 * plain text (title + event + year), not links.
 */
export const talks: Talk[] = [
  {
    event: 'LogCat conference',
    title: 'A Refactoring Odyssey: An Introduction to SQLDelight',
    year: '2025',
  },
  {
    event: 'LogCat conference',
    title: 'Mindful Developer',
    year: '2025',
  },
  {
    event: 'LogCat conference',
    title: 'Cognitive Debt: Staying Sharp When AI Writes Most of Your Code',
    year: '2026',
  },
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
