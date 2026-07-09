import type { CertificateEntry, EducationEntry, LanguageSkill } from './types';

export const education: EducationEntry[] = [
  {
    degree: 'Master of Science in Software Engineering',
    institution: 'Tarbiat Modares University',
    // Also exported as `teaching` in talks.ts — specs 008/010 must render it
    // exactly once site-wide.
    note: 'Taught Android development in collaboration with the IEEE student branch.',
  },
];

export const certificates: CertificateEntry[] = [
  {
    issuer: 'Droidcon',
    title: 'Test-Driven Development on Android',
    // TODO(Kaaveh): credential ID/URL
  },
  {
    issuer: 'JetBrains',
    title: 'Kotlin for Java Developers',
    // TODO(Kaaveh): credential ID/URL
  },
];

export const languages: LanguageSkill[] = [
  { language: 'English', level: 'C1' },
  { language: 'Persian', level: 'Native' },
];
