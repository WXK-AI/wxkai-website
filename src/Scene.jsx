import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function Orb() {
  const mesh = useRef()

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.08
    mesh.current.rotation.y += delta * 0.12
    mesh.current.position.x = state.pointer.x * 0.35
    mesh.current.position.y = state.pointer.y * 0.25
  })

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.45}>
      <mesh ref={mesh} scale={2.25}>
        <icosahedronGeometry args={[1, 48]} />
        <MeshDistortMaterial
          color="#d8ff3e"
          roughness={0.18}
          metalness={0.05}
          distort={0.38}
          speed={1.7}
        />
      </mesh>
    </Float>
  )
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.6], fov: 42 }} dpr={[1, 1.5]}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 5]} intensity={2.5} />
      <pointLight position={[-4, -2, 2]} color="#7169ff" intensity={18} />
      <Orb />
    </Canvas>
  )
}
