import type { Experience } from './types';

export const experience: Experience[] = [
  {
    period: 'Set. 2025 — Ago. 2026',
    role: 'Practicante de Backend',
    company: 'YSB Analytics',
    location: 'Lima, Peru',
    summary:
      'Desarrolle automatizaciones y servicios backend para procesar, almacenar y exponer informacion utilizada por aplicaciones internas.',
    achievements: [
      'Desarrolle bots en Python para automatizar flujos de extraccion, transformacion y procesamiento de datos.',
      'Disene APIs REST para servir de forma eficiente la informacion obtenida mediante web scraping.',
      'Implemente procesos de almacenamiento y actualizacion en bases de datos relacionales.',
    ],
    stack: ['Python', 'REST APIs', 'Web Scraping', 'SQL'],
  },
  {
    period: 'Jun. 2024 — Actualidad',
    role: 'Squad Cloud Security Member',
    company: 'CiberSecUNI',
    location: 'Lima, Peru',
    summary:
      'Participo en el squad de seguridad cloud, aplicando buenas practicas de seguridad e infraestructura en actividades y proyectos multidisciplinarios.',
    achievements: [
      'Participe en dos talleres y actividades tecnicas sobre seguridad e infraestructura cloud.',
      'Aplique los conocimientos adquiridos en tres proyectos junto a equipos multidisciplinarios.',
    ],
    stack: ['Cloud Security', 'AWS', 'Microsoft Azure'],
  },
  {
    period: 'Mar. 2024 — Feb. 2025',
    role: 'Director del area de TI',
    company: 'Centro Cultural Avanzada Tecnologica',
    location: 'Lima, Peru',
    summary:
      'Coordine proyectos internos, seguimiento de tareas, analisis de informacion y comunicacion entre equipos para fortalecer la operacion del area de TI.',
    achievements: [
      'Coordine tres proyectos tecnologicos y mejore en 40% la entrega de tareas a tiempo.',
      'Elabore reportes para dar visibilidad a los procesos de un equipo de 12 personas.',
      'Coordine cinco capacitaciones y canales de comunicacion entre equipos.',
    ],
    stack: ['IT Management', 'Reporting', 'Team Coordination'],
  },
];
