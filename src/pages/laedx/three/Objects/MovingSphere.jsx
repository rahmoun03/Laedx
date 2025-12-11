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
	new THREE.Vector3(-4.0, -2.0, 2), // L
	new THREE.Vector3(-4.5, -2.0, -1), // A
	new THREE.Vector3(0.0, -1.9, -3), // E
	new THREE.Vector3(1.2, -1.7, 2), // D
	new THREE.Vector3(4.0, -1.8, 0), // X
]

const ladexStartRot = [
	new THREE.Vector3( -(Math.PI / 2), 0.0, 0.0), // A
	new THREE.Vector3( -(Math.PI / 2), 0.0, 0.0), // L
	new THREE.Vector3( -(Math.PI / 2), 0.0, 0.0), // E
	new THREE.Vector3( -(Math.PI / 2), 0.0, 0.0), // D
	new THREE.Vector3( -(Math.PI / 2), 0.1, 0.0), // X
]

// end
const ladexEndPos = [
	new THREE.Vector3( -0.8, 0.0, 0), // L
	new THREE.Vector3( -0.4, 0.0, 0), // A
	new THREE.Vector3( 0.0, 0.0, 0), // E
	new THREE.Vector3( 0.4, 0.0, 0), // D
	new THREE.Vector3( 0.8, 0.0, 0), // X
]

const ladexEndRot = [
	new THREE.Vector3(0.0, 0.0, 0), // L
	new THREE.Vector3(0.0, 0.0, 0), // A
	new THREE.Vector3(0.0, 0.0, 0), // E
	new THREE.Vector3(0.0, 0.0, 0), // D
	new THREE.Vector3(0.0, 0.0, 0), // X
]
// ###################################################


// DIGITAL STUDIO
// ###################################################
//start
const digitalStartPos = [
  new THREE.Vector3( -3.2, -1.7, 0 ),   // D
  new THREE.Vector3( -2.7, -1.7, 0 ),   // I
  new THREE.Vector3( -2.2, -1.7, 0 ),   // G
  new THREE.Vector3( -1.7, -1.7, 0 ),   // I
  new THREE.Vector3( -1.2, -1.7, 0 ),   // T
  new THREE.Vector3(  -0.7, -1.7, 0 ),   // A
  new THREE.Vector3(  -0.2, -1.7, 0 ),   // L

  new THREE.Vector3(  0.8, -1.7, 0 ),   // S
  new THREE.Vector3(  1.3, -1.7, 0 ),   // T
  new THREE.Vector3(  1.8, -1.7, 0 ),   // U
  new THREE.Vector3(  2.3, -1.7, 0 ),   // D
  new THREE.Vector3(  2.8, -1.7, 0 ),   // I
  new THREE.Vector3(  3.3, -1.7, 0 ),   // O
];
const digitalStartRot = [
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // D
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // I
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // G
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // I
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // T
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // A
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // L

	new THREE.Vector3( Math.PI / 2,  0.0, 0), // S
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // T
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // U
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // D
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // I
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // O
]


const pace = 0.14;

// end
const digitalEndPos = [
  new THREE.Vector3( -0.90 , -1, 0 ),  // D
  new THREE.Vector3( -0.76 , -1, 0 ),  // I
  new THREE.Vector3( -0.62 , -1, 0 ),  // G
  new THREE.Vector3( -0.48 , -1, 0 ),  // I
  new THREE.Vector3( -0.34 , -1, 0 ),  // T
  new THREE.Vector3( -0.20 , -1, 0 ),  // A
  new THREE.Vector3( -0.06 , -1, 0 ),  // L

  new THREE.Vector3(  0.20 , -1, 0 ),  // S
  new THREE.Vector3(  0.34 , -1, 0 ),  // T
  new THREE.Vector3(  0.48 , -1, 0 ),  // U
  new THREE.Vector3(  0.62 , -1, 0 ),  // D
  new THREE.Vector3(  0.76 , -1, 0 ),  // I
  new THREE.Vector3(  0.90, -1, 0 ),  // O
];

const digitalEndRot = [
	new THREE.Vector3( 0.0,  0.0, 0), // D
	new THREE.Vector3( 0.0,  0.0, 0), // I
	new THREE.Vector3( 0.0,  0.0, 0), // G
	new THREE.Vector3( 0.0,  0.0, 0), // I
	new THREE.Vector3( 0.0,  0.0, 0), // T
	new THREE.Vector3( 0.0,  0.0, 0), // A
	new THREE.Vector3( 0.0,  0.0, 0), // L

	new THREE.Vector3( 0.0,  0.0, 0), // S
	new THREE.Vector3( 0.0,  0.0, 0), // T
	new THREE.Vector3( 0.0,  0.0, 0), // U
	new THREE.Vector3( 0.0,  0.0, 0), // D
	new THREE.Vector3( 0.0,  0.0, 0), // I
	new THREE.Vector3( 0.0,  0.0, 0), // O
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
				duration={8}
				stagger={0.1}
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
				duration={8}
				stagger={0.1}
			/>
		</group>
	)
}



export default function MovingSphere({...props}) {
	const meshRef = useRef()
	const tProgress = useRef({ value: 0 });
	const { scene } = useGLTF('/models/ball.glb');


	const [
		baseColor,
		aoMap,
		normalMap,
		roughnessMap,
		metalnessMap,
		heightMap
	] = useTexture([
		"/textures/metal_scrached/Metal_scratched_009_basecolor.jpg",
		"/textures/metal_scrached/Metal_scratched_009_ambientOcclusion.jpg",
		"/textures/metal_scrached/Metal_scratched_009_normal.jpg",
		"/textures/metal_scrached/Metal_scratched_009_roughness.jpg",
		"/textures/metal_scrached/Metal_scratched_009_metallic.jpg",
		"/textures/metal_scrached/Metal_scratched_009_height.png",
	]);

	// Required for aoMap & heightMap
	baseColor.wrapS = baseColor.wrapT = THREE.RepeatWrapping;
	aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping;
	heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping;



	// ✅ Memoize curve so it's not recreated every render
	const curve = useMemo(
		() =>
			new THREE.CatmullRomCurve3([
				new THREE.Vector3(0.0, 2.0,  0.0),
				new THREE.Vector3(0.0, 2.0,  0.0),
				new THREE.Vector3(0.0, 2.0,  0.0),
				new THREE.Vector3(0.0, 2.0,  0.0),
				new THREE.Vector3(0.0, 2.0,  0.0),
				new THREE.Vector3(0.0, 2.0,  0.0),
				new THREE.Vector3(0.0, 2.0,  0.0),
				new THREE.Vector3(0.0, 2.0,  0.0),
				new THREE.Vector3(0.0, 2.0,  0.0),
				new THREE.Vector3(0.0, 2.0,  0.0),
				new THREE.Vector3(0.0, 2.0,  0.0),
				new THREE.Vector3(0.0, 3.0,  0.0),
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
		<group ref={meshRef} position={[0.0, 2.0, 0.0]} {...props} >

			<mesh>
				<sphereGeometry args={[0.5, 64, 64]} />
				<meshStandardMaterial
					map={baseColor}
					aoMap={aoMap}
					normalMap={normalMap}
					roughnessMap={roughnessMap}
					metalnessMap={metalnessMap}
					displacementMap={heightMap} 
					displacementScale={0.1}
				/>
			</mesh>
			{/* <primitive object={scene} scale={[1.2, 1.2, 1.2]} castShadow receiveShadow /> */}
			<Title />
		</group>
	)
}
