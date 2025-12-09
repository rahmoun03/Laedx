import * as THREE from 'three'
import { useRef, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function AnimatedCharacters({
  items = [],       // [{ startPos, endPos, startRot, endRot }]
  duration = 3,      // main animation duration
  stagger = 0.05,    // delay between each character
  visibleDistance = 60, // hide far objects
  children,
}) {
  const groupRef = useRef()

  console.log('items : ', items);

  // Animate objects from start → end
  useLayoutEffect(() => {
    const tl = gsap.timeline()

    items.forEach((item, i) => {
      const obj = groupRef.current.children[i]

      if (!obj) return

      // start state
      obj.position.fromArray(item.startPos)
      obj.rotation.set(...item.startRot)

      // animation
      tl.to(
        obj.position,
        {
          x: item.endPos[0],
          y: item.endPos[1],
          z: item.endPos[2],
          duration,
          ease: "power3.out",
        },
        i * stagger
      )

      tl.to(
        obj.rotation,
        {
          x: item.endRot[0],
          y: item.endRot[1],
          z: item.endRot[2],
          duration,
          ease: "power2.out",
        },
        i * stagger
      )
    })
  }, [])

  // Optional visibility optimization
  useFrame(({ camera }) => {
    groupRef.current.children.forEach((child) => {
      child.visible = camera.position.distanceTo(child.position) < visibleDistance
    })
  })

  return <group ref={groupRef}>{children}</group>
}
