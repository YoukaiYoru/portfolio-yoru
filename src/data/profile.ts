import type { Profile, Stat } from './types';

export const profile: Profile = {
  name: 'Edward Oliva',
  fullName: 'Edward Javier Oliva Lluen',
  role: 'Software Developer · Cloud & DevOps',
  location: 'Lima, Peru',
  availability: 'Disponible para practicas y nuevos retos',
  email: 'edwardoliva2002@gmail.com',
  birthday: '2002-01-25',
  intro:
    'Construyo soluciones backend, automatizaciones y servicios cloud orientados a reducir trabajo manual y mejorar el acceso a los datos.',
  about:
    'Estudiante de octavo ciclo de Ingenieria de Sistemas con experiencia en automatizacion de procesos, APIs REST, bases de datos y soporte de infraestructura en AWS y Microsoft Azure.',
  focus:
    'Actualmente continuo fortaleciendo mis conocimientos en cloud computing, infraestructura como codigo, DevOps, seguridad cloud y automatizacion.',
  specialties: ['Software Development', 'Cloud', 'DevOps', 'Automatizacion'],
};

export const stats: Stat[] = [
  { value: '03', label: 'Proyectos cloud', i18nKey: 'stats.cloud' },
  { value: '03', label: 'Proyectos TI coordinados', i18nKey: 'stats.it' },
  { value: '05', label: 'Capacitaciones', i18nKey: 'stats.trainings' },
  { value: 'B2', label: 'Ingles', i18nKey: 'stats.english' },
];
