import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, useTexture, Center, Text3D, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap";

import fontUrl from '@/assets/fonts/Audiowide_Regular.json';
import ThreeText3D from './ThreeText3D';


// LAEDX
// ###################################################
// start
const ladexStartPos = [
	{x: -4.0,  y: -2.0, z: 2}, // L
	{x: -4.5,  y: -2.0, z: -1}, // A
	{x: 0.0,  y: -1.9, z: -3}, // E
	{x: 1.2,  y: -1.7, z: 2}, // D
	{x: 4.0,  y: -1.8, z: 0}, // X
]

const ladexStartRot = [
	{x: -(Math.PI / 2),  y: 0.0, z: 0.0}, // A
	{x: -(Math.PI / 2),  y: 0.0, z: 0.0}, // L
	{x: -(Math.PI / 2),  y: 0.0, z: 0.0}, // E
	{x: -(Math.PI / 2),  y: 0.0, z: 0.0}, // D
	{x: -(Math.PI / 2),  y: 0.1, z: 0.0}, // X
]

// end
const ladexEndPos = [
	{x: -0.8,  y: 0.0, z: 0}, // L
	{x: -0.4,  y: 0.0, z: 0}, // A
	{x: 0.0,  y: 0.0, z: 0}, // E
	{x: 0.4,  y: 0.0, z: 0}, // D
	{x: 0.8,  y: 0.0, z: 0}, // X
]

const ladexEndRot = [
	{x: 0.0,  y: 0.0, z: 0}, // L
	{x: 0.0,  y: 0.0, z: 0}, // A
	{x: 0.0,  y: 0.0, z: 0}, // E
	{x: 0.0,  y: 0.0, z: 0}, // D
	{x: 0.0,  y: 0.0, z: 0}, // X
]
// ###################################################


// DIGITAL STUDIO
// ###################################################
//start
const digitalStartPos = [
  { x: -3.2, y: -1.7, z: 0 },   // D
  { x: -2.7, y: -1.7, z: 0 },   // I
  { x: -2.2, y: -1.7, z: 0 },   // G
  { x: -1.7, y: -1.7, z: 0 },   // I
  { x: -1.2, y: -1.7, z: 0 },   // T
  { x:  -0.7, y: -1.7, z: 0 },   // A
  { x:  -0.2, y: -1.7, z: 0 },   // L

  { x:  0.8, y: -1.7, z: 0 },   // S
  { x:  1.3, y: -1.7, z: 0 },   // T
  { x:  1.8, y: -1.7, z: 0 },   // U
  { x:  2.3, y: -1.7, z: 0 },   // D
  { x:  2.8, y: -1.7, z: 0 },   // I
  { x:  3.3, y: -1.7, z: 0 },   // O
];
const digitalStartRot = [
	{x: Math.PI / 2,  y: 0.0, z: 0}, // D
	{x: Math.PI / 2,  y: 0.0, z: 0}, // I
	{x: Math.PI / 2,  y: 0.0, z: 0}, // G
	{x: Math.PI / 2,  y: 0.0, z: 0}, // I
	{x: Math.PI / 2,  y: 0.0, z: 0}, // T
	{x: Math.PI / 2,  y: 0.0, z: 0}, // A
	{x: Math.PI / 2,  y: 0.0, z: 0}, // L

	{x: Math.PI / 2,  y: 0.0, z: 0}, // S
	{x: Math.PI / 2,  y: 0.0, z: 0}, // T
	{x: Math.PI / 2,  y: 0.0, z: 0}, // U
	{x: Math.PI / 2,  y: 0.0, z: 0}, // D
	{x: Math.PI / 2,  y: 0.0, z: 0}, // I
	{x: Math.PI / 2,  y: 0.0, z: 0}, // O
]


const pace = 0.14;

// end
const digitalEndPos = [
  { x: -0.90 , y: -1, z: 0 },  // D
  { x: -0.76 , y: -1, z: 0 },  // I
  { x: -0.62 , y: -1, z: 0 },  // G
  { x: -0.48 , y: -1, z: 0 },  // I
  { x: -0.34 , y: -1, z: 0 },  // T
  { x: -0.20 , y: -1, z: 0 },  // A
  { x: -0.06 , y: -1, z: 0 },  // L

  { x:  0.20 , y: -1, z: 0 },  // S
  { x:  0.34 , y: -1, z: 0 },  // T
  { x:  0.48 , y: -1, z: 0 },  // U
  { x:  0.62 , y: -1, z: 0 },  // D
  { x:  0.76 , y: -1, z: 0 },  // I
  { x:  0.90, y: -1, z: 0 },  // O
];
const digitalEndRot = [
	{x: 0.0,  y: 0.0, z: 0}, // D
	{x: 0.0,  y: 0.0, z: 0}, // I
	{x: 0.0,  y: 0.0, z: 0}, // G
	{x: 0.0,  y: 0.0, z: 0}, // I
	{x: 0.0,  y: 0.0, z: 0}, // T
	{x: 0.0,  y: 0.0, z: 0}, // A
	{x: 0.0,  y: 0.0, z: 0}, // L

	{x: 0.0,  y: 0.0, z: 0}, // S
	{x: 0.0,  y: 0.0, z: 0}, // T
	{x: 0.0,  y: 0.0, z: 0}, // U
	{x: 0.0,  y: 0.0, z: 0}, // D
	{x: 0.0,  y: 0.0, z: 0}, // I
	{x: 0.0,  y: 0.0, z: 0}, // O
]
// ###################################################



const Title = () => {

	// const { scene } = useGLTF("/models/OpX.glb");
	const titleRef = useRef();

	// useEffect(() => {
	// 	console.log(scene)
	// 	scene.traverse((child) => {
	// 		if(child.isMesh && child.name !== "Orange_part"){
				
	// 			console.log({child})
	// 			child.material.visible = false;
	// 		}
	// 		else
	// 		{
	// 			child.material = new THREE.MeshStandardMaterial({color : "#ff5500", emissive : "#ff5500", side : THREE.FrontSide, transparent : true, opacity: 0.9})
	// 		}
	// 	})
	// }, [scene])



	return (
		<group position={[0, 0, 0]} rotation={[0, 0, 0]} ref={titleRef}>

			<ThreeText3D
				text="LAEDX"
				fontUrl={fontUrl}

				position={[0, -0.8, 0]}

				size={.3}

				startPos={ladexStartPos}
				startRot={ladexStartRot}
				endPos={ladexEndPos}
				endRot={ladexEndRot}
				duration={6}
				stagger={0.4}
			/>

			<ThreeText3D
				text="DIGITALSTUDIO"
				fontUrl="/fonts/Open_Sans_Light_Regular.json"

				position={[0, -0.1, 0]}

				size={0.13}

				startPos={digitalStartPos}
				startRot={digitalStartRot}
				endPos={digitalEndPos}
				endRot={digitalEndRot}
				duration={6}
				stagger={0.4}
			/>
		</group>
	)
}



export default function MovingSphere() {
	const meshRef = useRef()
	const tProgress = useRef({ value: 0 });
	const { scene } = useGLTF('/models/ball.glb');


	// ✅ Memoize curve so it's not recreated every render
	const curve = useMemo(
		() =>
			new THREE.CatmullRomCurve3([
				new THREE.Vector3(0.0, 4.0,  0.0),
				new THREE.Vector3(0.0, 4.0,  0.0),
				new THREE.Vector3(0.0, 4.0,  0.0),
				new THREE.Vector3(0.0, 4.0,  0.0),
				new THREE.Vector3(0.0, 4.0,  0.0),
				new THREE.Vector3(0.0, 4.0,  0.0),
				new THREE.Vector3(0.0, 4.0,  0.0),
				new THREE.Vector3(0.0, 4.0,  0.0),
				new THREE.Vector3(0.0, 4.0,  0.0),
				new THREE.Vector3(0.0, 4.0,  0.0),
				new THREE.Vector3(0.0, 4.0,  0.0),
				new THREE.Vector3(0.0, 5.0,  0.0),
				new THREE.Vector3(0.0, 30.0, 0.0),
				new THREE.Vector3(0.0, 30.0, 0.0),
				new THREE.Vector3(0.0, 30.0, 0.0),
				new THREE.Vector3(0.0, 30.0, 0.0),
				new THREE.Vector3(0.0, 30.0, 0.0),
			]),
		[]
	)

	useEffect(() => {
		gsap.to(tProgress.current, {
			value: 1,
			duration: 15,
			ease: "power2.inOut",
		});
	}, [])

	useFrame(() => {
		const t = tProgress.current.value;
		
		if (!meshRef.current) return;

		const pos = curve.getPoint(t)
		meshRef.current.position.lerp(pos, 0.1);
	})

	return (
		<group ref={meshRef} position={[0.0, 2.0, 0.0]}>
			{/* <Center> */}

			{/* ✅ Lower poly sphere: 16x16 is enough */}
			{/* <Sphere args={[0.5, 32, 32]} >
				<meshStandardMaterial
					// emissive={"#FF5500"}
					// emissiveIntensity={5}
					roughness={1}
					metalness={0}
					color={"#ffffff"}
				/>
			</Sphere> */}
			<primitive object={scene} scale={[1.1, 1.1, 1.1]} />

			<Title />

			{/* ✅ Disable shadows unless critical */}
			{/* <pointLight
				position={[0, 0, 0]}
				intensity={15}
				color={"#FF5500"}
			/> */}
			{/* </Center> */}
		</group>
	)
}
