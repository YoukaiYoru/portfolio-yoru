export type MateriaColor = 'red' | 'yellow' | 'purple' | 'green' | 'blue';
export type GameIcon = 'sword' | 'database' | 'crystal' | 'shield';

export interface Profile {
  name: string;
  fullName: string;
  role: string;
  location: string;
  availability: string;
  email: string;
  birthday: string;
  intro: string;
  about: string;
  focus: string;
  specialties: string[];
}

export interface Stat {
  value: string;
  label: string;
  i18nKey?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  i18nKey?: string;
}

export interface Project {
  number: string;
  icon: GameIcon;
  materia: MateriaColor[];
  title: string;
  type: string;
  description: string;
  result: string;
  status: string;
  featured: boolean;
  stack: string[];
  href?: string;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  detail: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  status: 'Completed' | 'Pending';
  dateKey?: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  code: string;
  external?: boolean;
  i18nLabel?: string;
  i18nValue?: string;
}
