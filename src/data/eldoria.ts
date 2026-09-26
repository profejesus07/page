import { Moon, Sparkles, Compass, Swords, Gem, Castle, Crown } from 'lucide-react'
import type { StoryPhase } from '../types/content'

/**
 * CHRONICLES OF ELDORIA — narrativa de la plataforma de inglés gamificada
 * "The Sparkless Apprentice", contada aquí como historia para conocer el proyecto.
 * Basada en el guion original de la aventura (src/features/hero/story.ts del proyecto).
 */
export const ELDORIA = {
  name: 'Chronicles of Eldoria',
  subtitle: 'The Sparkless Apprentice',
  motto: 'CADA PALABRA RECUPERADA ENCIENDE TU CHISPA',
  antagonist: 'Mutis, el Ladrón de Palabras',
  intro:
    'Una noche sin luna, Mutis escondió todas las palabras del reino de Eldoria. Los libros quedaron en blanco y en la escuela nadie se atrevía a hablar inglés. Entre los aprendices hay uno sin chispa todavía: cada misión superada, cada guardián vencido y cada palabra recuperada lo acerca a convertirse en Archmage of Eldoria.',
  disclaimer:
    'Chronicles of Eldoria es la aventura educativa de inglés para 3.º, 4.º y 5.º de primaria: un mapa con una región por periodo, misiones con lecciones y práctica, batallas contra guardianes, XP, rangos y una tienda de recompensas.',
} as const

/** Líneas que "escribe" el grimorio de Eldoria al abrir la crónica. */
export const GRIMOIRE_SCRIPT: string[] = [
  '> grimorio-eldoria --abrir',
  '[ok] invocando el reino de Eldoria…',
  '[ok] aprendiz detectado: sin chispa',
  '[!!] amenaza identificada: MUTIS // LADRÓN DE PALABRAS',
  '[..] las palabras del reino han desaparecido',
  '[ok] misión asignada: recuperar las palabras',
  '> comenzar la crónica',
  '[ok] región 01 — periodo 1',
  '[ok] región 02 — periodo 2',
  '[ok] región 03 — periodo 3',
  '[ok] región 04 — periodo 4',
  '[ok] rango actual: SPARKLESS NOVICE',
  '> estado: LISTO PARA LA AVENTURA_',
]

export const STORY_PHASES: StoryPhase[] = [
  {
    id: 'amenaza',
    index: '01',
    title: `${ELDORIA.antagonist} roba las palabras`,
    subtitle: 'La noche sin palabras',
    description:
      'Una noche sin luna, Mutis escondió todas las palabras de Eldoria. Los libros quedaron en blanco, las canciones se apagaron y en la escuela nadie se atrevía a hablar inglés.',
    icon: Moon,
    mutis: {
      status: 'MUTIS · SILENCIO TOTAL',
      stolen: 100,
      lines: ['Las palabras de Eldoria desaparecieron', 'Los libros están en blanco', 'Los aprendices perdieron su voz'],
    },
  },
  {
    id: 'chispa',
    index: '02',
    title: 'El aprendiz sin chispa',
    subtitle: 'La chispa elegida',
    description:
      'Entre los aprendices hay uno que todavía no tiene chispa. La magia de Eldoria lo elige: cada palabra que recupere encenderá su chispa y lo hará más fuerte. Empieza como Sparkless Novice; su meta es llegar a Archmage of Eldoria.',
    icon: Sparkles,
    mutis: {
      status: 'MUTIS · ANOMALÍA DETECTADA',
      stolen: 96,
      lines: ['Aprendiz sin chispa detectado', 'Héroe registrado en el grimorio', 'Mutis aún no lo sabe'],
    },
  },
  {
    id: 'mapa',
    index: '03',
    title: 'El mapa de Eldoria',
    subtitle: 'Ejes temáticos del inglés',
    description:
      'El reino se extiende en cuatro regiones, una por periodo. En cada misión se abre el Scroll of Knowledge para aprender palabras nuevas y se practican con las runas (Rune Practice). Cada eje temático del plan de inglés es un camino del mapa.',
    icon: Compass,
    mutis: {
      status: 'MUTIS · LAS RUNAS RESPONDEN',
      stolen: 84,
      lines: ['Cuatro regiones por recorrer', 'Cada misión devuelve palabras', 'El mapa se ilumina'],
    },
  },
  {
    id: 'guardianes',
    index: '04',
    title: 'Los guardianes de Mutis',
    subtitle: 'Retos contra el tiempo',
    description:
      'Mutis dejó guardianes que custodian las palabras. Para vencerlos se responden preguntas en inglés antes de que se agote el Temporizador Mágico: cada acierto les quita vida y el puntaje se convierte en una nota de 0.0 a 10.0.',
    icon: Swords,
    mutis: {
      status: 'MUTIS · GUARDIANES EN ALERTA',
      stolen: 66,
      lines: ['Cada acierto hiere al guardián', 'El Temporizador Mágico corre', 'Mutis envía a sus mejores'],
    },
  },
  {
    id: 'poder',
    index: '05',
    title: 'El poder crece',
    subtitle: 'XP · rangos · tesoros',
    description:
      'Cada victoria entrega XP y cristales de maná. Subir de nivel asciende de rango, gana insignias y permite gastar cristales en poderes, mascotas y cosméticos de la tienda.',
    icon: Gem,
    mutis: {
      status: 'MUTIS · MAGIA EN AUMENTO',
      stolen: 48,
      lines: ['XP y niveles en ascenso', 'Cristales de maná al alza', 'Poderes listos en la tienda'],
    },
  },
  {
    id: 'ciudadela',
    index: '06',
    title: 'La Ciudadela Arcana',
    subtitle: 'El desafío final',
    description:
      'Tras las cuatro regiones se alza la Ciudadela Arcana, la fortaleza de Mutis. Allí el aprendiz enfrenta el último desafío con todo lo aprendido: solo quien domina las palabras puede cruzar sus puertas.',
    icon: Castle,
    mutis: {
      status: 'MUTIS · NÚCLEO EN PELIGRO',
      stolen: 25,
      lines: ['Sus guardianes ceden', 'El núcleo de Mutis late', 'Solo falta el último hechizo'],
    },
  },
  {
    id: 'liberacion',
    index: '07',
    title: 'Las palabras vuelven a casa',
    subtitle: 'El reino habla',
    description:
      'Cuando la última palabra regresa, Mutis se desvanece. Los libros se llenan de historias, la escuela vuelve a cantar en inglés y la chispa del aprendiz se convierte en una llama: Archmage of Eldoria. La aventura continúa, porque siempre habrá nuevas palabras por descubrir.',
    icon: Crown,
    mutis: {
      status: 'MUTIS · DESVANECIDO',
      stolen: 0,
      lines: ['Todas las palabras volvieron', 'Mutis se desvanece', 'Eldoria canta en inglés'],
    },
  },
]
