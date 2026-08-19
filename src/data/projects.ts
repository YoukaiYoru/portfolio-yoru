import type { Project } from './types';

export const projects: Project[] = [
  {
    number: '01',
    icon: 'database',
    materia: ['green', 'blue', 'yellow'],
    title: 'Moodiary',
    type: 'Full-stack emotional tracking app',
    description:
      'Aplicacion para registrar y dar seguimiento al estado emocional. Disene el modelo de datos con PostgreSQL y Sequelize, y construi una API REST con autenticacion mediante Clerk.',
    result: '-30% despliegue manual',
    status: 'Completed',
    featured: true,
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    href: 'https://github.com/YoukaiYoru/moodiary',
  },
];
