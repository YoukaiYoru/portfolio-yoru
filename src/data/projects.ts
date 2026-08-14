import type { Project } from './types';

export const projects: Project[] = [
  {
    number: '01',
    icon: 'database',
    materia: ['green', 'blue', 'yellow'],
    title: 'Moodiary',
    type: 'Full-stack emotional tracking app',
    description:
      'Aplicación para registrar y dar seguimiento al estado emocional. Diseñé el modelo de datos con PostgreSQL y Sequelize, y construí una API REST con autenticación mediante Clerk.',
    result: '-30% despliegue manual',
    status: 'Completed',
    featured: true,
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    href: 'https://github.com/YoukaiYoru/moodiary',
  },
    {
    number: '02',
    icon: 'database',
    materia: ['green', 'blue', 'yellow'],
    title: 'Moodiary',
    type: 'Full-stack emotional tracking app',
    description:
      'Aplicación para registrar y dar seguimiento al estado emocional. Diseñé el modelo de datos con PostgreSQL y Sequelize, y construí una API REST con autenticación mediante Clerk.',
    result: '-30% despliegue manual',
    status: 'Completed',
    featured: true,
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    href: 'https://github.com/YoukaiYoru/moodiary',
  },
];
