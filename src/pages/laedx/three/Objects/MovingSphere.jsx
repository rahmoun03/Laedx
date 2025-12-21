import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap";

import Title from './Title';
import { mainTimeline } from "@/hooks/animationTimeline";
import { randInt } from "three/src/math/MathUtils.js";

export default function MovingSphere({...props}) {
	const meshRef = useRef();
	const gltfRef = useRef();
	const tProgress = useRef({ value: 0 });
	const { scene } = useGLTF('/models/destroyeds2_original.glb');
	const originalMaterials = useRef(new Map())
	const explosionData = useRef([])


	const isDraggable = useRef(false)
	const isDragging = useRef(false)
	const activePointerId = useRef(null)


	const origin = useRef(new THREE.Vector3(0, 30, 0))
	const dragOffset = useRef(new THREE.Vector3())
	const plane = useRef(new THREE.Plane())
	const raycaster = new THREE.Raycaster()
	const mouse = new THREE.Vector2()



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


	const repeatX = 2;
	const repeatY = 2;

	[
		baseColor,
		aoMap,
		normalMap,
		roughnessMap,
		metalnessMap,
		heightMap,
		// specularMap
	].forEach(tex => {
		tex.wrapS = THREE.RepeatWrapping;
		tex.wrapT = THREE.RepeatWrapping;
		tex.repeat.set(repeatX, repeatY);
	});

	const metalMaterial = useMemo( () => {
		return new THREE.MeshPhysicalMaterial({
			map : baseColor,
			aoMap : aoMap,
			normalMap : normalMap,
			roughnessMap : roughnessMap,
			metalnessMap : metalnessMap,
			displacementMap : heightMap,
			displacementScale : 0.05
		})},
		[]
	)

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
				// new THREE.Vector3(0.0, 30.0, 0.0),
				// new THREE.Vector3(0.0, 30.0, 0.0),
				// new THREE.Vector3(0.0, 30.0, 0.0),
				// new THREE.Vector3(0.0, 30.0, 0.0),
			]),
		[]
	)

	useEffect(() => {
		if (!scene) return
		console.log('BALL SCENE : ', scene)

		const center = new THREE.Vector3(0, 0, 0) // scene center
		explosionData.current = []

		scene.traverse((child) => {
			
			// if(child.name === "Icosphere001") 
			// 	child.visible = false;

			if (child.isMesh) {

				// Handle multi-material meshes safely
				if (Array.isArray(child.material)) {
					originalMaterials.current.set(
						child.uuid,
						child.material.map((m) => m.clone())
					)
				} else {
					originalMaterials.current.set(child.uuid, child.material.clone())
				}

				// child.material = metalMaterial;
				child.castShadow = true
			}
			const origin = child.position.clone()

			// 🔥 Radial direction (away from center)
			const direction = origin.clone().sub(center).normalize()

			explosionData.current.push({
				mesh: child,
				origin,
				direction
			})
		})
	}, [scene])

	// useEffect(() => {
	// 	if (!scene) return

	// 	explosionData.current = []

	// 	scene.traverse((child) => {
	// 		if (!child.isMesh) return

	// 		const originPos = child.position.clone()

	// 		// Normal direction (local → world safe)
	// 		const normal = new THREE.Vector3()
	// 		child.getWorldDirection(normal)
	// 		normal.normalize()

	// 		explosionData.current.push({
	// 			mesh: child,
	// 			origin: originPos,
	// 			normal
	// 		})
	// 	})
	// }, [scene])


	useEffect(() => {
		mainTimeline.to(tProgress.current, {
			value: 1,
			duration: 12,
			ease: "power3.inOut",
		}, "intro");

		mainTimeline.call(() => {
			isDraggable.current = true
		}, null, "textEnd+=0.3")
	}, [])

	useFrame(() => {
		const t = tProgress.current.value;
		
		if (!meshRef.current || t >= 1) return;

		const pos = curve.getPoint(t)
		meshRef.current.position.lerp(pos, 0.1);
	})


	const onPointerDown = (e) => {
		if (!isDraggable.current) return
		if (activePointerId.current !== null) return // block multitouch


		e.stopPropagation()
		e.target.setPointerCapture(e.pointerId)
	
	
		activePointerId.current = e.pointerId
		isDragging.current = true

		// Lock plane facing camera
		plane.current.setFromNormalAndCoplanarPoint(
			e.camera.getWorldDirection(new THREE.Vector3()),
			meshRef.current.position
		)

		// Compute offset
		raycaster.setFromCamera(e.pointer, e.camera)
		const hit = new THREE.Vector3()
		raycaster.ray.intersectPlane(plane.current, hit)
		dragOffset.current.copy(hit).sub(meshRef.current.position)
	}

	const onPointerMove = (e) => {
		if (!isDragging.current) return
		if (e.pointerId !== activePointerId.current) return

		raycaster.setFromCamera(e.pointer, e.camera)
		const hit = new THREE.Vector3()
		raycaster.ray.intersectPlane(plane.current, hit)

		meshRef.current.position.lerp(
			hit.sub(dragOffset.current),
			0.25 // smoothness
		)
	}

	const releaseDrag = () => {
		if (!isDragging.current) return
		isDragging.current = false;
		activePointerId.current = null


		// Bounce back
		gsap.to(meshRef.current.position, {
			x: origin.current.x,
			y: origin.current.y,
			z: origin.current.z,
			duration: 1,
			ease: "elastic.out(1, 0.40)"
		})
	}

	const onPointerUp = (e) => {
		if (e.pointerId !== activePointerId.current) return
		e.target.releasePointerCapture(e.pointerId)
		releaseDrag()
	}


	const onPointerCancel = releaseDrag
	const onPointerLeave = releaseDrag

	useEffect(() => {
		if (!isDragging.current) return
		document.body.style.cursor = "grabbing"
		return () => (document.body.style.cursor = "grab")
	}, [])

	const implode = () => {
		explosionData.current.forEach(({ mesh, origin }) => {
			gsap.to(mesh.position, {
				x: origin.x,
				y: origin.y,
				z: origin.z,
				duration: 4.5,
				ease: "elastic.out(1, 0.35)"
			})
		})
	}



	const explode = () => {
		const strength = THREE.MathUtils.randFloat(3.5, 5.5)

		explosionData.current.forEach(({ mesh, origin, direction }) => {
			gsap.to(mesh.position, {
				x: origin.x + direction.x * strength,
				y: origin.y + direction.y * strength,
				z: origin.z + direction.z * strength,
				duration: 8.2,
				ease: "power3.inOut",
				delay: Math.random() * 0.2,
				// onComplete: () => {
				// 	implode();
				// }
			})
		})
	}



	// pulse effect with changing animation
	useEffect(() => {
		if (!scene) return;

		mainTimeline.call(
			() => {

				const tl = gsap.timeline({
					onStart: () => {
						// RESTORE ORIGINAL MATERIALS WHEN PULSE STARTS
						scene.traverse((child) => {
							if (!child.isMesh) return

							const original = originalMaterials.current.get(child.uuid)
							if (!original) return

							child.material = Array.isArray(original)
								? original.map((m) => m.clone())
								: original.clone()

							child.material.needsUpdate = true
						})
					},
					onComplete: () => {
						explode();
					}
				});
				console.log("TEXT END PULSE TRIGGERED");
				tl.fromTo(
					gltfRef.current.scale,
					{ x: 1.3, y: 1.3, z: 1.3 },
					{
						x: 1.2,
						y: 1.2,
						z: 1.2,
						duration: 0.25,
						yoyo: true,
						ease: "power2.inOut",
					},
					0
				);

				tl.to(
					gltfRef.current.scale,
					{
						x: 1.5,
						y: 1.5,
						z: 1.5,
						duration: 2.0,
						ease: "power2.inOut"
					},
					">+=0.5"
				);
			},
			null,
			"textEnd"
		);
	}, []);

	return (
		<group
			ref={meshRef}
			position={[0.0, 2.0, 0.0]}
			{...props}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
			onPointerCancel={onPointerCancel}
			onPointerLeave={onPointerLeave}
		>
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
			<primitive ref={gltfRef} object={scene} scale={[1.2, 1.2, 1.2]} rotation={[0.2, -1, 0]} castShadow receiveShadow />
			<Title />
		</group>
	)
}
