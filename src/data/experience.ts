import type { Experience } from './types';

export const experience: Experience[] = [
  {
    period: 'Set. 2025 — Ago. 2026',
    role: 'Practicante de Backend',
    company: 'YSB Analytics',
    location: 'Lima, Perú',
    summary:
      'Desarrollé automatizaciones y servicios backend para procesar, almacenar y exponer información utilizada por aplicaciones internas.',
    achievements: [
      'Desarrollé bots en Python para automatizar flujos de extracción, transformación y procesamiento de datos.',
      'Diseñé APIs REST para servir de forma eficiente la información obtenida mediante web scraping.',
      'Implementé procesos de almacenamiento y actualización en bases de datos relacionales.',
    ],
    stack: ['Python', 'REST APIs', 'Web Scraping', 'SQL'],
  },
  {
    period: 'Jun. 2024 — Actualidad',
    role: 'Squad Cloud Security Member',
    company: 'CiberSecUNI',
    location: 'Lima, Perú',
    summary:
      'Participo en el squad de seguridad cloud, aplicando buenas prácticas de seguridad e infraestructura en actividades y proyectos multidisciplinarios.',
    achievements: [
      'Participé en dos talleres y actividades técnicas sobre seguridad e infraestructura cloud.',
      'Apliqué los conocimientos adquiridos en tres proyectos junto a equipos multidisciplinarios.',
    ],
    stack: ['Cloud Security', 'AWS', 'Microsoft Azure'],
  },
  {
    period: 'Mar. 2024 — Feb. 2025',
    role: 'Director del área de TI',
    company: 'Centro Cultural Avanzada Tecnológica',
    location: 'Lima, Perú',
    summary:
      'Coordiné proyectos internos, seguimiento de tareas, análisis de información y comunicación entre equipos para fortalecer la operación del área de TI.',
    achievements: [
      'Coordiné tres proyectos tecnológicos y mejoré en 40% la entrega de tareas a tiempo.',
      'Elaboré reportes para dar visibilidad a los procesos de un equipo de 12 personas.',
      'Coordiné cinco capacitaciones y canales de comunicación entre equipos.',
    ],
    stack: ['IT Management', 'Reporting', 'Team Coordination'],
  },
];
