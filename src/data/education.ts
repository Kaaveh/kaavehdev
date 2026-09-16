import type { CertificateEntry, EducationEntry, LanguageSkill } from './types';

export const education: EducationEntry[] = [
  {
    degree: 'Master of Science in Software Engineering',
    institution: 'Tarbiat Modares University',
    // The IEEE Android-teaching note was dropped from the resume PDF
    // (2026-08-11) and so is no longer rendered anywhere on the site.
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
