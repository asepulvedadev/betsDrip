import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface TShirtProps {
  frontTexture?: string | null
  backTexture?: string | null
}

export const TShirt = React.memo(({ frontTexture, backTexture }: TShirtProps) => {
  const { nodes, materials } = useGLTF('/models/t-shirt.glb')

  // Cargar texturas - siempre llamar el hook en el mismo orden
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const frontMap = useTexture(frontTexture || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const backMap = useTexture(backTexture || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')

  // Crear materiales separados con texturas
  const frontMaterial = useMemo(() => {
    const mat = (materials['Material.005'] as THREE.Material).clone()
    if (frontTexture && frontMap) {
      ;(mat as any).map = frontMap
      ;(mat as any).needsUpdate = true
    }
    return mat
  }, [frontTexture, frontMap, materials])

  const backMaterial = useMemo(() => {
    const mat = (materials['Material.005'] as THREE.Material).clone()
    if (backTexture && backMap) {
      ;(mat as any).map = backMap
      ;(mat as any).needsUpdate = true
    }
    return mat
  }, [backTexture, backMap, materials])

  return (
    <group dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={1.0}>
        <group position={[0, 6.245, -0.094]} scale={0.006}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <mesh geometry={(nodes as any).Object_4.geometry} material={frontMaterial} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <mesh geometry={(nodes as any).Object_5.geometry} material={backMaterial} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <mesh geometry={(nodes as any).Object_6.geometry} material={frontMaterial} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <mesh geometry={(nodes as any).Object_7.geometry} material={frontMaterial} />
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/models/t-shirt.glb')

// Componente Wrapper estático
export const TShirtWrapper = React.memo(({ frontTexture, backTexture, ...props }: TShirtProps & any) => {
  return (
    <group {...props}>
      <TShirt frontTexture={frontTexture} backTexture={backTexture} />
    </group>
  )
})

TShirtWrapper.displayName = 'TShirtWrapper'