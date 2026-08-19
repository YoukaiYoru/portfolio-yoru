import { profile } from './profile';
import type { ContactLink } from './types';

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    code: 'EM',
  },
  {
    label: 'LinkedIn',
    value: '/in/edward-oliva',
    href: 'https://www.linkedin.com/in/edward-oliva/',
    code: 'IN',
    external: true,
  },
  {
    label: 'GitHub',
    value: '@YoukaiYoru',
    href: 'https://github.com/YoukaiYoru',
    code: 'GH',
    external: true,
  },
  {
    label: 'Curriculum Vitae',
    value: 'Descargar PDF',
    href: '/documents/Edward-Oliva-CV.pdf',
    code: 'CV',
    external: true,
    i18nLabel: 'contact.cvlabel',
    i18nValue: 'contact.cvvalue',
  },
];
