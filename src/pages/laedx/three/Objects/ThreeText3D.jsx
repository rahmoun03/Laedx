import * as THREE from 'three';
import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { Text3D, useTexture, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';


function ThreeText3D({
	text = 'COMINSOON',
	fontUrl = '/fonts/Inter_Bold.json',
	position = [0, 0, 0],
	size= 0.7,
	startPos = [],
	endPos = [],
	startRot = [],
	endRot = [],
	duration = 3,
	stagger = 0.08
}) {

	
	const groupRef = useRef();

	// // geometry config
	const config = useMemo(() => ({
		size: size,
		height: 0.03,
		curveSegments: 16,
		bevelEnabled: false,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 2,
	}), []);



	useLayoutEffect(() => {
		if (!groupRef.current) return;

		const tl = gsap.timeline({ defaults: { ease: "elastic.out(1, 0.5)" } });

		groupRef.current.children.forEach((charMesh, i) => {
			const sPos = startPos[i] || new THREE.Vector3();
			const ePos = endPos[i] || new THREE.Vector3();

			const sRot = startRot[i] || new THREE.Euler();
			const eRot = endRot[i] || new THREE.Euler();

			// Set initial position & rotation
			charMesh.position.set(sPos.x, sPos.y, sPos.z);
			charMesh.rotation.set(sRot.x, sRot.y, sRot.z);

			// Animate to end position & rotation
			tl.to(
				charMesh.position,
				{
					x: ePos.x,
					y: ePos.y,
					z: ePos.z,
					duration,
				},
				i * stagger
			);

			tl.to(
				charMesh.rotation,
				{
					x: eRot.x,
					y: eRot.y,
					z: eRot.z,
					duration,
				},
				i * stagger
			);
		});
	}, [startPos, endPos, startRot, endRot, duration, stagger]);

	return (
		<group ref={groupRef} position={position}>
			{/* <Center> */}
				{text.split('').map((char, i) => (
					<Center
						position={[startPos[i].x, startPos[i].y, startPos[i].z]}
						rotation={[startRot[i].x, startRot[i].y, startRot[i].z]}
						key={i}
					>
						<Text3D
							font={fontUrl}
							{...config}
						>
							{char}
							<meshPhysicalMaterial color={'white'} metalness={1} roughness={1} />
							{/* <primitive object={myMaterial} attach='material' /> */}
						</Text3D>
					</Center>
				))}
			{/* </Center> */}
		</group>
	);
}

export default ThreeText3D;
