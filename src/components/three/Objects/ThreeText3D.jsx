import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { Text3D, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function ThreeText3D({
  text = 'COMINSOON',
  fontUrl = '/fonts/Inter_Bold.json',
  position = [0, 0, -3],
  letterSpacing = 0.1,
}) {

  // const [ normal, roughness, metallic, height, ao] = useTexture([
  //   '/textures/metal/Metal_Plate_047_basecolor.jpg',
  //   '/textures/metal/Metal_Plate_047_roughness.jpg',
  //   '/textures/metal/Metal_Plate_047_metallic.jpg',
  //   '/textures/metal/Metal_Plate_047_height.png',
  //   '/textures/metal/Metal_Plate_047_ambientOcclusion.jpg',
  // ]);

  const pos = [
    {x: -9,  y: -0.5, z: 0}, // C
    {x: -6.9,  y: -0.8, z: 0}, // O
    {x: -5.1,  y: -0.55, z: 0}, // M
    {x: -2.4,  y: -0.52, z: 0}, // I
    {x: -1.7,  y: -0.45, z: 0}, // N
    {x: 0.3,  y: -0.45, z: 0}, // G

    {x: 3.0,  y: -0.10, z: 0}, // S
    {x: 4.5,  y: 0.2, z: 0}, // O
    {x: 6.5,  y: -0.15, z: 0}, // O
    {x: 8.5,  y: -0.2, z: 0}, // N
  ];

  const rot = [
    {x: 0,  y: 0, z: 0}, // C
    {x: 0,  y: 0, z: 0.2}, // O
    {x: 0,  y: 0, z: 0.05}, // M
    {x: 0,  y: 0, z: 0.3}, // I
    {x: 0,  y: 0, z: 0.1}, // N
    {x: 0,  y: 0, z: 0.3}, // G
    {x: 0,  y: 0, z: 0}, // S
    {x: Math.PI / 2,  y: 0, z: 0}, // O
    {x: 0,  y: 0, z: -0.1}, // O
    {x: 0,  y: 0, z: 0}, // N
  ];
  
  const groupRef = useRef();

  // geometry config
  const config = useMemo(() => ({
    size: 2.0,
    height: 0.35,
    curveSegments: 60,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  }), []);


  useFrame(({ camera }) => {
    groupRef.current.children.forEach((child) => {
      const dist = camera.position.distanceTo(child.position)
      child.visible = dist < 50;
    })
  })

  return (
    <group ref={groupRef} position={position}>
      {text.split('').map((char, i) => (
        <Text3D
          key={i}
          font={fontUrl}
          {...config}
          position={[pos[i].x, pos[i].y, pos[i].z]}
          rotation={[rot[i].x, rot[i].y, rot[i].z]}
        >
          {char}
          <meshPhysicalMaterial color={'white'} metalness={1} roughness={1} />
          {/* <primitive object={myMaterial} attach='material' /> */}
        </Text3D>
      ))}
    </group>
  );
}

export default ThreeText3D;
