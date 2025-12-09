import { useRef, useMemo, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useTexture, Center, Text3D, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { AdditiveBlending, NormalBlending, SubtractiveBlending, MultiplyBlending } from 'three';


// import fontUrl from '@/assets/fonts/Inter_Bold.json';
import fontUrl from '@/assets/fonts/Audiowide_Regular.json';
// import ttfFont from '@/assets/fonts/Audiowide/Audiowide-Regular.ttf';


const Title = () => {

	const { scene } = useGLTF("/models/OpX.glb");
	const titleRef = useRef();

	useEffect(() => {
		console.log(scene)
		scene.traverse((child) => {
			if(child.isMesh && child.name !== "Orange_part"){
				
				console.log({child})
				child.material.visible = false;
			}
			else
			{
				child.material = new THREE.MeshStandardMaterial({color : "#ff5500", emissive : "#ff5500", side : THREE.FrontSide, transparent : true, opacity: 0.9})
			}
		})
	}, [scene])

	const uniforms = {
		uTime: {value : 0 },
		uColor: {value : new THREE.Color("#51a4de") },
	}

	useFrame((state) => {
		// if (titleRef.current) {
			uniforms.uTime.value = state.clock.elapsedTime;
			// titleRef.current.rotation.y += 0.01;
		// }
	})


	return (
		<group position={[0, -1.5, 0]} rotation={[0, 0, 0]} ref={titleRef}>
			<Center position={[0, 0, 0]}>
				<Text3D font={fontUrl} lineHeight={0.5}  letterSpacing={0.1} size={0.6} height={0.06}>
					LAEDX
					<HolographicMaterial color='#51a4de' />

				</Text3D>
				{/* <primitive object={scene} scale={[.52, .53, .8]} position={[3.352, -0.002, 0.001]} /> */}
				{/* <primitive object={scene} scale={[.52, .53, 1.64]} position={[3.352, -0.002, -0.0001]} /> */}
			</Center>

			<Center  position={[0, -0.5, 0]}>					
				<Text3D font={fontUrl} lineHeight={0.2} letterSpacing={0.1}size={0.17} height={0.06}>
					DIGITAL  STUDIO
					<HolographicMaterial color='#51a4de' />

					{/* <shaderMaterial 
						// ref={sphereMaterialRef1}
						vertexShader={holographicVertexShader}
						fragmentShader={holographicFragmentShader}
						uniforms={uniforms}
						transparent
						side={THREE.DoubleSide}
						depthWrite={false}
						blending={THREE.AdditiveBlending}
					/> */}
				</Text3D>
			</Center>

			<Center position={[0, -.8, 0]}>
				<Text3D font={fontUrl} lineHeight={0.2} letterSpacing={0.05} size={0.09} height={0.06}  >
					LEAD TOGETHER
					<HolographicMaterial color='#51a4de' />

					{/* <shaderMaterial 
						// ref={sphereMaterialRef1}
						vertexShader={holographicVertexShader}
						fragmentShader={holographicFragmentShader}
						uniforms={uniforms}
						transparent
						side={THREE.DoubleSide}
						depthWrite={false}
						blending={THREE.AdditiveBlending}
					/> */}
				</Text3D>
			</Center>
		</group>
	)
}

export default function LdsLogo() {

	const sphereMaterialRef1 = useRef();
	// const sphereMaterialRef2 = useRef();
	const completLogo = useRef();
	const sphereGroup = useRef();
	// const loader = new THREE.FontLoader();
	// loader.load('/public/fonts/Audiowide-Regular.json', function (font) {
	// 	console.log(font);
	// })
	const { scene } = useGLTF("/models/hologram_projector_optimized.glb");
	console.log("projector : ", scene)
	// useEffect(() => {
	// 	scene.traverse((child) => {
	// 		if (child.name === 'Sphere001' || child.name === 'Sphere002' || child.name === 'Cylinder008') {
	// 			console.log("OK OK OK OK OK OK OK OK")
	// 			child.visible = false;
	// 		}
	// 	})
	// }, [])


	const groupRef = useRef();
	const texture = useTexture("/textures/worldmap/alpha.jpg");
	const noise = useTexture("/textures/noise.jpg");
	const sphereRadius = 1;
	const offset = 0.0;
	const cylinderLength = 0.015;


	// Reference direction for the central cylinder
	const direction = useMemo(
		() => new THREE.Vector3(10.0, 2.0, 3.0).normalize(),
		[]
	);


	const position = useMemo(
		() =>
			direction
				.clone()
				.multiplyScalar(sphereRadius + cylinderLength / 2 + offset),
		[direction]
	);

	const quaternion = useMemo(() => {
		const q = new THREE.Quaternion();
		q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
		return q;
	}, [direction]);

	// Ring data
	const rings = [
		{ dir: [8.0, -6.0, 10.0], label: "Brazil" },
		{ dir: [8.0, 6.0, 1.0], label: "Europe" },
		{ dir: [8.0, -8.0, -1.0], label: "South Africa" },
		{ dir: [0.5, 1.3, 1], label: "Canada" },
		{ dir: [8.0, 2.0, -4.0], label: "Palestine" },
	];


	useEffect(() => {
		console.log('LdsLogo call useEffect')
		if(sphereGroup.current)
			console.log("sphere : ", sphereGroup.current);
			
	}, [])

	const uniforms = {
		uTime : {value : 0}
	}

	// Animate uniforms
	useFrame((state) => {
		// if (sphereMaterialRef1.current ) {
			uniforms.uTime.value = state.clock.elapsedTime;
			// sphereMaterialRef2.current.uniforms.uTime.value = state.clock.elapsedTime;
			// console.log("uTime : ", sphereMaterialRef1.current.uniforms.uTime);
			completLogo.current.rotation.y += 0.01;
		// }
	})


	return (
			<group position={[0, 0.5, 0]} rotation={[0, 0, 0]} ref={groupRef}>
				<group position={[0, -3.2, -0.01]}>
					<RigidBody type="fixed" colliders="hull" restitution={0.9} friction={0.4}>
						<primitive object={scene} scale={[0.03, 0.03, 0.03]} />
							<mesh position={[0.01, 0.2, 0.05]}>
								<sphereGeometry args={[0.09, 64, 64]} />
								< meshStandardMaterial
									color={new THREE.Color('#51a4de')}
									emissive="#51a4de"
									emissiveIntensity={1}
									// depthWrite={false}
									blending={THREE.AdditiveBlending}
								/>
							</mesh>
					</RigidBody>
					<ProjectionLight 
						position={[0, 2.2, 0]}
					/>
				</group>
				
				
				<group rotation={[0, 0, 0]} ref={completLogo}>
	



					{/* Sphere */}
					<group rotation={[0, 4.7, 0]} ref={sphereGroup}>
						<mesh>
							<sphereGeometry args={[sphereRadius, 64, 64]} />
							<HolographicMaterial color='#51a4de' useTexture={true} texture={texture}  transparent />
						</mesh>

						<mesh>
							<sphereGeometry args={[sphereRadius, 64, 64]} />
							<HolographicMaterial color='#51a4de' intensity={1} />
						</mesh>

						{/* Global center ring */} 
						<mesh position={position} quaternion={quaternion}>
							<cylinderGeometry args={[0.06, 0.06, cylinderLength, 32]} />
							{/* <HolographicMaterial color="#ff5500" /> */}
							<meshBasicMaterial color="#ff5500" side={2} transparent opacity={0.3} blending={THREE.AdditiveBlending}/>
						</mesh>
						<mesh position={position} quaternion={quaternion}>
							<cylinderGeometry args={[0.03, 0.03, cylinderLength + 0.001, 32]} />
							<meshBasicMaterial color="#bfced9" side={2} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
						</mesh>

						{/* Local rings */}
						{/* {rings.map((ring, i) => (
							<RingCylinder
								key={i}
								label={ring.label}
								direction={ring.dir}
								color1="#d0ad80"
								color2="#bfced9"
							/>
						))} */}

						{/* Animated curved lines */}
						{/* {rings.map((ring, i) => {
							const end = new THREE.Vector3(...ring.dir).normalize().multiplyScalar(1);
							return (
								<AnimatedCurveLine
									key={i}
									start={position}
									end={end}
									color="#d0ad80"
									curvature={0.4}
									thickness={0.01}
									speed={0.5}
								/>
							);
						})} */}
					</group>

					<Title />
				</group>
			</group>
	);
}
