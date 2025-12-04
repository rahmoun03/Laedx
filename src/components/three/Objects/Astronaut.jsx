import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useGLTF, useTexture, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function Astronaut({
	url,
	scale = 1,
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	initialAnimation,
	playOnLoad = true,
	...props
	}) {
	const group = useRef();
	const { scene, animations } = useGLTF(url);
	const { actions } = useAnimations(animations, group);


	// Load backpack textures
	const [bag0, bag1, bag2, bag3] = useTexture([
		"/models/astronaut/textures/gltf_embedded_0.png",
		"/models/astronaut/textures/gltf_embedded_1@channels=RGB.png",
		"/models/astronaut/textures/gltf_embedded_2.png",
		"/models/astronaut/textures/gltf_embedded_3.png",
	])

	// Load astronaut textures
	const [man4, man5A, man5RGB, man6, man7] = useTexture([
		"/models/astronaut/textures/gltf_embedded_4.png",
		"/models/astronaut/textures/gltf_embedded_5@channels=A.png",
		"/models/astronaut/textures/gltf_embedded_5@channels=RGB.png",
		"/models/astronaut/textures/gltf_embedded_6.png",
		"/models/astronaut/textures/gltf_embedded_7.png",
	])

	useEffect(() => {
		scene.traverse((child) => {
		if (child.isMesh) {
			if (child.name === "mesh_0") {
				// Backpack material
				child.material = new THREE.MeshStandardMaterial({
					map: bag0,             // main albedo
					metalnessMap: bag1,
					normalMap: bag2,       // example normal
					roughnessMap: bag3,    // roughness
					transparent: true,
					roughness: 1,
					metalness: 1,
					// wireframe: true,
				})
			} else if (child.name === "mesh_1") {
				// Astronaut material
				child.material = new THREE.MeshStandardMaterial({
					color: new THREE.Color('#00FF00'),             // main albedo
					// map: man4,             // main albedo
					normalMap: man6,    // normal
					roughnessMap: man5A,   // roughness
					metalnessMap: man5RGB,    // metalness
					aoMap: man7,           // ambient occlusion
					transparent: true,
					roughness: 1,
					metalness: 1,
				})
			}
			else if (child.name === "mesh_2") {
				// Astronaut material
				child.material = new THREE.MeshStandardMaterial({
					map: man4,             // main albedo
					normalMap: man6,    // normal
					roughnessMap: man5A,   // roughness
					metalnessMap: man5RGB,    // metalness
					// aoMap: man7,           // ambient occlusion
					transparent: true,
					roughness: 1,
					metalness: 1,
					// wireframe: true,
				})
			}
			child.material.needsUpdate = true
		}
		})
	}, [scene, bag0, bag1, bag2, bag3, man4, man5A, man5RGB, man6, man7])


	useEffect(() => {
		if (group.current) {
			actions[initialAnimation].play();
		}
	}, [group, initialAnimation])

	useFrame(({ camera }) => {
		group.current.children.forEach((child) => {
			const dist = camera.position.distanceTo(child.position)
			child.visible = dist < 50 // hide if further than 100 units
		})
	})

	return (
		<group 
			ref={group}
			scale={scale}
			position={position}
			rotation={rotation}
			{...props}
		>
			<primitive object={scene} />
		</group>
	);
}

export default Astronaut;