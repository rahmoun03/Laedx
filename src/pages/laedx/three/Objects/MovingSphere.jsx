import { useRef, useMemo, useEffect, useLayoutEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, useTexture, Center, Text3D, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap";

import fontUrl from '@/assets/fonts/Audiowide_Regular.json';
import ThreeText3D from './ThreeText3D';
import { mainTimeline } from "@/hooks/animationTimeline";


// LAEDX
// ###################################################
// start
const ladexStartPos = [
	new THREE.Vector3(-4.0, -1.47, 2), // L
	new THREE.Vector3(-4.5, -1.6, -1), // A
	new THREE.Vector3(0.0, -1.47, -3), // E
	new THREE.Vector3(1.2, -1.25, 2), // D
	new THREE.Vector3(4.0, -1.4, 0), // X
]

const ladexStartRot = [
	new THREE.Vector3( -(Math.PI / 2), -0.1, 0.08), // L
	new THREE.Vector3( -(Math.PI / 2), -0.1, 0.08), // A
	new THREE.Vector3( -(Math.PI / 2), 0.0, 0.0), // E
	new THREE.Vector3( -(Math.PI / 2), 0.0, 0.0), // D
	new THREE.Vector3( -(Math.PI / 2), 0.2, 0.0), // X
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
  new THREE.Vector3( -3.2, -2.1, -10 ),   // D
  new THREE.Vector3( -2.7, -2.1, -6 ),   // I
  new THREE.Vector3( -2.2, -2.1, 4 ),   // G
  new THREE.Vector3( -2.1, -2.1, 3 ),   // I
  new THREE.Vector3( -1.2, -2.1, -4 ),   // T
  new THREE.Vector3(  -0.7, -2.1, -2 ),   // A
  new THREE.Vector3(  -0.2, -2.1, -8 ),   // L

  new THREE.Vector3(  0.8, -2.1, -8 ),   // S
  new THREE.Vector3(  1.3, -2.1, 3 ),   // T
  new THREE.Vector3(  1.8, -2.1, 9 ),   // U
  new THREE.Vector3(  2.3, -2.1, 3 ),   // D
  new THREE.Vector3(  2.8, -2.1, 2 ),   // I
  new THREE.Vector3(  3.3, -2.1, 1 ),   // O
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



// LEAD TOGETHER
// ###################################################
//start
const togetherStartPos = [
  new THREE.Vector3( -3.2, 2.1, 6 ),   // L
  new THREE.Vector3( -2.7, 2.1, 9 ),   // E
  new THREE.Vector3( -2.2, 2.1, 2 ),   // A
  new THREE.Vector3( 2.1, 2.1, -4 ),   // D

  new THREE.Vector3( -1.2, 2.1, -1 ),   // T
  new THREE.Vector3(  -0.7, 2.1, -8 ),   // O
  new THREE.Vector3(  -0.2, 2.1, 9 ),   // G
  new THREE.Vector3(  0.8, 2.1, 6 ),   // E
  new THREE.Vector3(  6.3, 2.1, -5 ),   // T
  new THREE.Vector3(  1.8, 2.1, 4 ),   // H
  new THREE.Vector3(  -2.3, 2.1, 2 ),   // E
  new THREE.Vector3(  5.8, 2.1, 1)   // R
];

const togetherStartRot = [
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // L
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // E
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // A
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // D

	new THREE.Vector3( Math.PI / 2,  0.0, 0), // T
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // O
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // G
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // E
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // T
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // H
	new THREE.Vector3( Math.PI / 2,  0.0, 0), // E
	new THREE.Vector3( Math.PI / 2,  0.0, 0) // R
	
]


// end
const togetherEndPos = [
  new THREE.Vector3( -0.50 , -2, 0 ),  // L
  new THREE.Vector3( -0.415 , -2, 0 ),  // E
  new THREE.Vector3( -0.330 , -2, 0 ),  // A
  new THREE.Vector3( -0.245 , -2, 0 ),  // D
  // space
  new THREE.Vector3( -0.095 , -2, 0 ),  // T
  new THREE.Vector3( -0.001 , -2, 0 ),  // O
  new THREE.Vector3(  0.075 , -2, 0 ),  // G
  new THREE.Vector3(  0.160 , -2, 0 ),  // E
  new THREE.Vector3(  0.245 , -2, 0 ),  // T
  new THREE.Vector3(  0.330 , -2, 0 ),  // H
  new THREE.Vector3(  0.415 , -2, 0 ),  // E
  new THREE.Vector3(  0.50 , -2, 0 ),  // R
];

const togetherEndRot = [
	new THREE.Vector3( 0.0,  0.0, 0), // L
	new THREE.Vector3( 0.0,  0.0, 0), // E
	new THREE.Vector3( 0.0,  0.0, 0), // A
	new THREE.Vector3( 0.0,  0.0, 0), // D

	new THREE.Vector3( 0.0,  0.0, 0), // T
	new THREE.Vector3( 0.0,  0.0, 0), // O
	new THREE.Vector3( 0.0,  0.0, 0), // G
	new THREE.Vector3( 0.0,  0.0, 0), // E
	new THREE.Vector3( 0.0,  0.0, 0), // T
	new THREE.Vector3( 0.0,  0.0, 0), // H
	new THREE.Vector3( 0.0,  0.0, 0), // E
	new THREE.Vector3( 0.0,  0.0, 0) // R
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



		// pulse effect with changing animation
	useEffect(() => {
		if (!titleRef.current) return;

		mainTimeline.call(
			() => {
				console.log("TEXT END PULSE TRIGGERED");

				titleRef.current.traverse((mesh) => {
					if (!mesh.isMesh) return;

					const mat = mesh.material;
					if (!mat || !mat.color) return;

					mat.needsUpdate = true;

					const baseColor = mat.color.clone();

					const pulseColor = new THREE.Color(0.3, 0.3, 1.3);

					// Color pulse
					gsap.to(mat.color, {
						r: pulseColor.r,
						g: pulseColor.g,
						b: pulseColor.b,
						duration: 0.5,
						yoyo: true,
						// repeat: 1,
						ease: "power2.inOut",
						// onComplete: () => mat.color.copy(baseColor),
					});

					// // Roughness flash
					// gsap.to(
					// 	mesh.rotation, {
					// 		// x: 0.05,
					// 		y: Math.PI * 2,
					// 		// z: true,
					// 		// yoyoEase: true,
					// 		// repeat: 1,
					// 		ease: "power2.out",
					// 	}
					// );

					// Scale pulse
					gsap.fromTo(
						mesh.scale,
						{ x: 1.1, y: 1.1, z: 1.1 },
						{
							x: 1,
							y: 1,
							z: 1,
							duration: 0.35,
							yoyo: true,
							ease: "power2.inOut",
						}
					);
				});
			},
			null,
			"textEnd"
		);
	}, []);

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
				duration={9}
				stagger={0.05}
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
				duration={9}
				stagger={0.05}
			/>
			
			<ThreeText3D
				text="LEADTOGETHER"
				fontUrl="/fonts/Open_Sans_Light_Regular.json"

				position={[0, 0.7, 0]}

				size={0.06}

				startPos={togetherStartPos}
				startRot={togetherStartRot}
				endPos={togetherEndPos}
				endRot={togetherEndRot}
				duration={8}
				stagger={0.05}
			/>
		</group>
	)
}



export default function MovingSphere({...props}) {
	const meshRef = useRef()
	const tProgress = useRef({ value: 0 });
	const { scene } = useGLTF('/models/earth.glb');


	scene.traverse((child) => {
		if(child.isMesh)
		{
			child.castShadow = true;
			// child.receiveShadow = true;
		}
	})


	// const [
	// 	baseColor,
	// 	aoMap,
	// 	normalMap,
	// 	roughnessMap,
	// 	metalnessMap,
	// 	heightMap
	// ] = useTexture([
	// 	"/textures/metal_scrached/Metal_scratched_009_basecolor.jpg",
	// 	"/textures/metal_scrached/Metal_scratched_009_ambientOcclusion.jpg",
	// 	"/textures/metal_scrached/Metal_scratched_009_normal.jpg",
	// 	"/textures/metal_scrached/Metal_scratched_009_roughness.jpg",
	// 	"/textures/metal_scrached/Metal_scratched_009_metallic.jpg",
	// 	"/textures/metal_scrached/Metal_scratched_009_height.png",
	// ]);


	const [
		baseColor,
		aoMap,
		normalMap,
		roughnessMap,
		metalnessMap,
		heightMap,
		specularMap
	] = useTexture([
		"/textures/Rock_Ore/Rock_Ore_001_COLOR.jpg",
		"/textures/Rock_Ore/Rock_Ore_001_OCC.jpg",
		"/textures/Rock_Ore/Rock_Ore_001_NORM.jpg",
		"/textures/Rock_Ore/Rock_Ore_001_ROUGH.jpg",
		"/textures/Rock_Ore/Rock_Ore_001_METAL.jpg",
		"/textures/Rock_Ore/Rock_Ore_001_DISP.png",
		"/textures/Rock_Ore/Rock_Ore_001_SPEC.jpg",
	]);


	const repeatX = 2;
	const repeatY = 2;

	[
		baseColor,
		aoMap,
		normalMap,
		roughnessMap,
		metalnessMap,
		heightMap,
		specularMap
	].forEach(tex => {
		tex.wrapS = THREE.RepeatWrapping;
		tex.wrapT = THREE.RepeatWrapping;
		tex.repeat.set(repeatX, repeatY);
	});

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
		mainTimeline.to(tProgress.current, {
			value: 1,
			duration: 15,
			ease: "power2.inOut",
		}, "intro");
	}, [])

	useFrame(() => {
		const t = tProgress.current.value;
		
		if (!meshRef.current) return;

		const pos = curve.getPoint(t)
		meshRef.current.position.lerp(pos, 0.1);
	})

	return (
		<group ref={meshRef} position={[0.0, 2.0, 0.0]} {...props} >

			{/* <mesh>
				<sphereGeometry args={[0.5, 128, 128]} />
				<meshPhongMaterial
					map={baseColor}
					aoMap={aoMap}
					normalMap={normalMap}
					roughnessMap={roughnessMap}
					metalnessMap={metalnessMap}
					displacementMap={heightMap}
					specularMap={specularMap}
					displacementScale={0.05}
				/>
			</mesh> */}
			<primitive object={scene} scale={[1.2, 1.2, 1.2]} castShadow receiveShadow />
			<Title />
		</group>
	)
}
