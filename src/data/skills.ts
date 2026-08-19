import type { Skill } from './types';

export const skills: Skill[] = [
  { name: 'Python / Automatizacion', level: 70, category: 'Backend', i18nKey: 'skill.python' },
  { name: 'Node.js / Express', level: 80, category: 'Backend', i18nKey: 'skill.nodejs' },
  { name: 'PostgreSQL / SQL', level: 70, category: 'Data', i18nKey: 'skill.postgres' },
  { name: 'Docker', level: 70, category: 'DevOps', i18nKey: 'skill.docker' },
  { name: 'CI/CD', level: 80, category: 'DevOps', i18nKey: 'skill.cicd' },
  { name: 'AWS', level: 90, category: 'Cloud', i18nKey: 'skill.aws' },
  { name: 'Cloud Security', level: 60, category: 'Security', i18nKey: 'skill.cloudsecurity' },
];
