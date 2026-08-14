import type { Profile, Stat } from './types';

export const profile: Profile = {
  name: 'Edward Oliva',
  fullName: 'Edward Javier Oliva Lluen',
  role: 'Software Developer · Cloud & DevOps',
  location: 'Lima, Perú',
  availability: 'Disponible para prácticas y nuevos retos',
  email: 'edwardoliva2002@gmail.com',
  birthday: '2002-01-25',
  intro:
    'Construyo soluciones backend, automatizaciones y servicios cloud orientados a reducir trabajo manual y mejorar el acceso a los datos.',
  about:
    'Estudiante de octavo ciclo de Ingeniería de Sistemas con experiencia en automatización de procesos, APIs REST, bases de datos y soporte de infraestructura en AWS y Microsoft Azure.',
  focus:
    'Actualmente continúo fortaleciendo mis conocimientos en cloud computing, infraestructura como código, DevOps, seguridad cloud y automatización.',
  specialties: ['Software Development', 'Cloud', 'DevOps', 'Automatización'],
};

export const stats: Stat[] = [
  { value: '03', label: 'Proyectos cloud' },
  { value: '03', label: 'Proyectos TI coordinados' },
  { value: '05', label: 'Capacitaciones' },
  { value: 'B2', label: 'Inglés' },
];
