import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, Group, Mesh, MeshBasicMaterial } from 'three'
import { getPointTexture } from './pointTexture'

interface CoreProps {
  /** 0–100: nivel de control de NEURON. Determina el color (violeta ↔ cian). */
  control: number
  animate: boolean
  isMobile: boolean
}

/** Generador pseudoaleatorio pequeño y determinista. */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const HOSTILE = new Color('#a855f7')
const FREED = new Color('#10b981')

function Core({ control, animate, isMobile }: CoreProps) {
  const group = useRef<Group>(null)
  const shell = useRef<Mesh>(null)
  const coreMat = useRef<MeshBasicMaterial>(null)
  const shellMat = useRef<MeshBasicMaterial>(null)
  const haloMat = useRef<MeshBasicMaterial>(null)
  const current = useRef(new Color().copy(HOSTILE))
  const texture = useMemo(() => getPointTexture(), [])

  // Nube de partículas orbitando el núcleo (PRNG determinista: misma nube en cada render).
  const particles = useMemo(() => {
    const n = isMobile ? 220 : 520
    const rand = mulberry32(2024)
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 1.7 + rand() * 1.1
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    const g = new BufferGeometry()
    g.setAttribute('position', new Float32BufferAttribute(arr, 3))
    return g
  }, [isMobile])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    // Interpola el color hacia el estado narrativo actual.
    const target = HOSTILE.clone().lerp(FREED, 1 - control / 100)
    current.current.lerp(target, 0.04)
    coreMat.current?.color.copy(current.current)
    shellMat.current?.color.copy(current.current)
    haloMat.current?.color.copy(current.current)

    if (!group.current || !animate) return
    // La inestabilidad crece cuando NEURON pierde control.
    const instability = (1 - control / 100) * 0.6
    group.current.rotation.y += delta * (0.25 + instability * 0.5)
    if (shell.current) {
      shell.current.rotation.x += delta * 0.18
      shell.current.rotation.z -= delta * 0.12
      const pulse = 1 + Math.sin(t * (2 + instability * 6)) * (0.02 + instability * 0.06)
      shell.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={group}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial ref={shellMat} wireframe transparent opacity={0.6} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial ref={coreMat} transparent opacity={0.95} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial ref={haloMat} transparent opacity={0.1} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <points geometry={particles}>
        <pointsMaterial
          size={0.05}
          sizeAttenuation
          color="#c4b5fd"
          map={texture ?? undefined}
          alphaMap={texture ?? undefined}
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.005, 8, 100]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.5, 0]}>
        <torusGeometry args={[1.75, 0.004, 8, 100]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

interface Props {
  control: number
  isMobile: boolean
  reducedMotion: boolean
  active: boolean
}

/** Representación 3D abstracta de NEURON (IA antagonista ficticia). */
export default function NeuronCore({ control, isMobile, reducedMotion, active }: Props) {
  return (
    <Canvas
      dpr={isMobile ? 1 : [1, 1.5]}
      camera={{ position: [0, 0.4, 5.2], fov: 45 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      className="!h-full !w-full"
      style={{ background: 'transparent' }}
      aria-hidden
    >
      <Core control={control} animate={!reducedMotion} isMobile={isMobile} />
    </Canvas>
  )
}
