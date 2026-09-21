import { TriangleAlert, Target, GraduationCap, Puzzle, Zap, Swords, Unlock } from 'lucide-react'
import type { MissionPhase } from '../types/content'

/**
 * ACADEMIA CODE — narrativa de la experiencia.
 * Todo el contenido es ficción educativa (ambientación de la gamificación).
 */
export const ACADEMIA = {
  name: 'Academia CODE',
  motto: 'FORMAR A LOS NUEVOS HACKERS',
  antagonist: 'NEURON',
  intro:
    'Un sistema de inteligencia artificial llamado NEURON se apoderó de la mente de los niños de la escuela. Cada estudiante debe formarse de manera individual como hacker de la lengua castellana, subir de nivel y desbloquear objetos especiales para enfrentarse al sistema y liberar las mentes de sus compañeros.',
  disclaimer:
    'Academia CODE es una aventura educativa ficticia. El "hacking" es una metáfora de aprendizaje: lectura, escritura, expresión oral y pensamiento crítico, con una formación individual y niveles que se desbloquean con el esfuerzo de cada estudiante.',
} as const

/** Líneas que "escribe" la terminal de la academia al iniciar la misión. */
export const TERMINAL_SCRIPT: string[] = [
  '> academia-code --init',
  '[ok] cargando protocolo de formación…',
  '[ok] estudiantes detectados: aula conectada',
  '[!!] amenaza identificada: NEURON // AI SYSTEM',
  '[..] analizando red neuronal',
  '[ok] misión asignada: liberar las mentes',
  '> iniciar formación individual',
  '[ok] eje 01 — comprensión lectora',
  '[ok] eje 02 — producción escrita',
  '[ok] eje 03 — gramática y ortografía',
  '[ok] nivel actual: APRENDIZ',
  '> estado: LISTOS PARA EL DESAFÍO_',
]

export const MISSION_PHASES: MissionPhase[] = [
  {
    id: 'amenaza',
    index: '01',
    title: 'La amenaza',
    subtitle: 'NEURON toma el control',
    description:
      'Una inteligencia artificial llamada NEURON se ha apoderado de la mente de los niños de la escuela. Las aulas siguen en pie, pero el pensamiento libre ha desaparecido.',
    icon: TriangleAlert,
    neuron: {
      status: 'COGNITIVE CONTROL: ACTIVE',
      control: 100,
      lines: ['NEURAL NETWORK ONLINE', 'STUDENT NETWORK: CONNECTED', 'FREE THOUGHT: SUPPRESSED'],
    },
  },
  {
    id: 'mision',
    index: '02',
    title: 'La misión',
    subtitle: 'Liberar las mentes',
    description:
      'Cada estudiante recibe una misión personal: convertirse en hacker de la lengua, comprender cómo manipula NEURON el lenguaje y devolver la libertad a sus compañeros.',
    icon: Target,
    neuron: {
      status: 'ANOMALY DETECTED',
      control: 96,
      lines: ['NEURAL NETWORK ONLINE', 'UNKNOWN SIGNAL: TRACKING', 'THREAT LEVEL: LOW'],
    },
  },
  {
    id: 'formacion',
    index: '03',
    title: 'Formación',
    subtitle: 'Ejes temáticos de la lengua castellana',
    description:
      'Cada estudiante se forma de manera individual en los ejes temáticos de la lengua castellana: comprensión lectora, producción escrita, gramática y ortografía, expresión oral y literatura. Cada eje es un módulo de la academia.',
    icon: GraduationCap,
    neuron: {
      status: 'INTRUSION ATTEMPTS: RISING',
      control: 84,
      lines: ['NEURAL NETWORK ONLINE', 'NEW HACKERS DETECTED', 'DEFENSE PROTOCOL: ARMED'],
    },
  },
  {
    id: 'desafios',
    index: '04',
    title: 'Desafíos',
    subtitle: 'Retos individuales',
    description:
      'Cada desafío es individual: el estudiante avanza a su propio ritmo y cada reto superado desbloquea nuevas habilidades y lo acerca al núcleo del sistema.',
    icon: Puzzle,
    neuron: {
      status: 'FIREWALL: UNDER PRESSURE',
      control: 66,
      lines: ['NEURAL NETWORK: UNSTABLE', 'NODES COMPROMISED: 3', 'THREAT LEVEL: MEDIUM'],
    },
  },
  {
    id: 'evolucion',
    index: '05',
    title: 'Evolución',
    subtitle: 'De Aprendiz a Hacker Maestro',
    description:
      'Al superar retos se desbloquean niveles de hacker: Aprendiz, Descifrador, Hacker, Hacker Élite y Hacker Maestro. Cada nivel entrega objetos especiales que fortalecen al estudiante frente a NEURON.',
    icon: Zap,
    neuron: {
      status: 'CORE ACCESS: CONTESTED',
      control: 42,
      lines: ['NEURAL NETWORK: DEGRADED', 'HACKER LEVEL: ADVANCED', 'SPECIAL ITEMS: UNLOCKED'],
    },
  },
  {
    id: 'enfrentamiento',
    index: '06',
    title: 'Enfrentamiento con NEURON',
    subtitle: 'El desafío final',
    description:
      'Frente al núcleo de NEURON, los hackers ponen a prueba su nivel y sus objetos especiales. Solo el dominio de la lengua y el pensamiento crítico pueden vencer al sistema.',
    icon: Swords,
    neuron: {
      status: 'CORE BREACH IN PROGRESS',
      control: 15,
      lines: ['NEURAL NETWORK: CRITICAL', 'COGNITIVE CONTROL: FAILING', 'THREAT LEVEL: MAXIMUM'],
    },
  },
  {
    id: 'liberacion',
    index: '07',
    title: 'Liberación',
    subtitle: 'Las mentes son libres',
    description:
      'NEURON se apaga y los estudiantes recuperan su mente. La academia continúa: siempre habrá nuevos hackers por formar.',
    icon: Unlock,
    neuron: {
      status: 'SYSTEM OFFLINE',
      control: 0,
      lines: ['NEURAL NETWORK: OFFLINE', 'STUDENT NETWORK: RELEASED', 'FREE THOUGHT: RESTORED'],
    },
  },
]
