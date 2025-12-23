import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap";

import Title from './Title';
import { mainTimeline } from "@/hooks/animationTimeline";
import { useProgressStore } from "@/hooks/useProgressStore";


export default function MovingSphere({...props}) {
	const meshRef = useRef();
	const gltfRef = useRef();
	const tProgress = useRef({ value: 0 });
	const { scene } = useGLTF('/models/done2.glb');
	const originalMaterials = useRef(new Map())
	const { progressLeftRef } = useProgressStore();
	const explosionData = useRef([])
	const cover = useRef();

	const isDraggable = useRef(false)
	const isDragging = useRef(false)
	const activePointerId = useRef(null)

	// const supernovaLight = useRef()



	const origin = useRef(new THREE.Vector3(0, 30, 0))
	const dragOffset = useRef(new THREE.Vector3())
	const plane = useRef(new THREE.Plane())
	const raycaster = useRef(new THREE.Raycaster())
	const mouse = useRef(new THREE.Vector2())

	const metalMaterial = useMemo( () => {
		return new THREE.MeshPhysicalMaterial({
			transparent: true,
			color: 'white',	
			metalness: 0.1,
			roughness: 0.3,
			opacity: 1
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
			
			if(child.name === "Icosphere453") 
			{
				cover.current = child;
			}

			if(child.isMesh) {
			// Store original material(s) ONCE
				if (!originalMaterials.current.has(child.uuid)) {
					originalMaterials.current.set(
						child.uuid,
						Array.isArray(child.material)
						? child.material
						: child.material
					)
				}

				// Apply new material
				child.material = metalMaterial
				child.material.needsUpdate = true
			}

			const origin = child.position.clone()
			// 🔥 Radial direction (away from center)
			const direction = origin.clone().sub(center).normalize()
			explosionData.current.push({
				mesh: child,
				origin,
				direction,
				random: THREE.MathUtils.randFloat(0.6, 1.2),
			})
		})
	}, [scene])


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
		// meshRef.current.position.copy(pos)

	})


	const onPointerDown = (e) => {
		if (!isDraggable.current) return
		if (activePointerId.current !== null) return // block multitouch
		document.body.style.cursor = "grabbing"

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
		raycaster.current.setFromCamera(e.pointer, e.camera)
		const hit = new THREE.Vector3()
		raycaster.current.ray.intersectPlane(plane.current, hit)
		dragOffset.current.copy(hit).sub(meshRef.current.position)
	}

	const onPointerMove = (e) => {
		if (!isDragging.current) return
		if (e.pointerId !== activePointerId.current) return

		raycaster.current.setFromCamera(e.pointer, e.camera)
		const hit = new THREE.Vector3()
		raycaster.current.ray.intersectPlane(plane.current, hit)

		meshRef.current.position.lerp(
			hit.sub(dragOffset.current),
			0.25 // smoothness
		)
	}

	const releaseDrag = () => {
		if (!isDragging.current) return
		isDragging.current = false;
		activePointerId.current = null
  		document.body.style.cursor = "grab"


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

	
	// const updateSupernovaLight = () => {
	// 	if (!supernovaLight.current) return

	// 	const t = getExplosionFactor()

	// 	// ✨ shape the explosion curve
	// 	const intensityCurve = THREE.MathUtils.smootherstep(t, 0, 1)

	// 	// 💥 SUPER BRIGHT at peak
	// 	supernovaLight.current.intensity = intensityCurve * 120

	// 	// 🌊 Shockwave radius expansion
	// 	supernovaLight.current.distance = intensityCurve * 45

	// 	// 🌈 Color shift (white → blue)
	// 	supernovaLight.current.color.lerpColors(
	// 		new THREE.Color("#ffffff"),
	// 		new THREE.Color("#4df3ff"),
	// 		t
	// 	)

	// 	const flashFactor = t > 0.5 ? (1 - t / 0.15) : 0
	// 	supernovaLight.current.intensity += flashFactor * 200
	// }



	// explossion implementation
	const getExplosionFactor = () => {
		const t = THREE.MathUtils.clamp(progressLeftRef.current / 100, 0, 1)
		return THREE.MathUtils.smootherstep(t, 0, 1)
	}
	const updateExplosionFromProgress = () => {
		const t = getExplosionFactor()

		console.log('explossion progress : ', t);
		if(t >= 0.003 && cover.current?.visible)
			cover.current.visible = false
		else if(t < 0.003 && cover.current)
			cover.current.visible = true;
		

		// control max explosion distance
		const maxStrength = 6.0

		explosionData.current.forEach(({ mesh, origin, direction, random }) => {
			mesh.position.set(
				origin.x + direction.x * maxStrength * t * random,
				origin.y + direction.y * maxStrength * t * random,
				origin.z + direction.z * maxStrength * t * random
			)
		})
	}
	useFrame(() => {
		if (!explosionData.current.length) return

		updateExplosionFromProgress()
	
		const t = THREE.MathUtils.clamp(progressLeftRef.current / 100, 0, 1)
	
		const start = 0.8

		const tRemap = THREE.MathUtils.clamp(
			(t - start) / (1 - start),
			0,
			1
		)

		const eased = THREE.MathUtils.smootherstep(tRemap, 0, 1)



		// use eased everywhere
		supernovaMaterial.uniforms.uProgress.value = eased
		meshRef.current.scale.setScalar(1 + eased * 7)

		// color shift white → blue
		supernovaMaterial.uniforms.uColor.value.lerpColors(
			new THREE.Color("#ffffff"),
			new THREE.Color("#4df3ff"),
			tRemap
		)

		flashMaterial.uniforms.uFlash.value = Math.pow(eased, 3) * 6;
	})



	const explode = () => {
		const strength = THREE.MathUtils.randFloat(3.5, 5.5)
		console.log(']====> EXpolosion : ', strength);

		explosionData.current.forEach(({ mesh, origin, direction, random }) => {
			gsap.to(mesh.position, {
				x: origin.x + direction.x * strength * random,
				y: origin.y + direction.y * strength * random,
				z: origin.z + direction.z * strength * random,
				duration: 8.2,
				ease: "power3.inOut",
				delay: Math.random() * 0.2,
			})
		})
	}


	const restoreOriginalMaterials = () => {
		scene.traverse((child) => {
			if (!child.isMesh) return

			const original = originalMaterials.current.get(child.uuid)
			if (!original) return

			child.material = original
			child.material.needsUpdate = true
		})
	}


	// pulse effect with changing animation
	useEffect(() => {
		if (!scene || !gltfRef.current) return;

		mainTimeline.call(
			() => {
				restoreOriginalMaterials();
				const tl = gsap.timeline({
					onComplete: () => {
						console.log("Ready for swipe");
						
						// explode();
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



	const supernovaMaterial = useMemo(() => {
		return new THREE.ShaderMaterial({
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			toneMapped: false,
			uniforms: {
			uProgress: { value: 0 },
			uIntensity: { value: 6 },
			uColor: { value: new THREE.Color("#ffffff") },
			},
			vertexShader: `
			varying vec3 vNormal;
			void main() {
				vNormal = normalize(normalMatrix * normal);
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
			`,
			fragmentShader: `
			varying vec3 vNormal;
			uniform float uProgress;
			uniform float uIntensity;
			uniform vec3 uColor;

			void main() {
				float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
				float flash = smoothstep(0.0, 0.15, uProgress)
							* (1.0 - smoothstep(0.15, 0.4, uProgress));

				float energy = (fresnel + flash * 3.0) * uIntensity;
				gl_FragColor = vec4(uColor * energy, energy);
			}
			`
		})
	}, [])

	const flashMaterial = useMemo(() => {
		return new THREE.ShaderMaterial({
			transparent: true,
			depthWrite: false,
			depthTest: false,
			blending: THREE.AdditiveBlending,
			toneMapped: false,
			uniforms: {
			uFlash: { value: 0 },
			},
			vertexShader: `
			void main() {
				gl_Position = vec4(position.xy, 0.0, 1.0);
			}
			`,
			fragmentShader: `
			uniform float uFlash;
			void main() {
				gl_FragColor = vec4(vec3(1.0), uFlash);
			}
			`,
		})
	}, [])



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
				<sphereGeometry args={[0.1, 32, 32]} />
				<meshPhysicalMaterial
					color='white'
					emissive={new THREE.Color('#00e5ff')}
					emissiveIntensity={10.0}
					toneMapped={false}
				/>
			</mesh> */}
			<mesh scale={1}>
				<sphereGeometry args={[0.1, 64, 64]} />
				<primitive object={supernovaMaterial} />
			</mesh>

			<mesh renderOrder={9999}>
				<planeGeometry args={[2, 2]} />
				<primitive object={flashMaterial} />
			</mesh>

			{/* <pointLight
				ref={supernovaLight}
				position={[0, 0, 0]}
				intensity={0}
				distance={0}
				decay={2}
				color={"#ffffff"}
			/> */}

			<primitive ref={gltfRef} object={scene} scale={[1.2, 1.2, 1.2]} rotation={[0.2, -1, 0]} castShadow receiveShadow />
			<Title />
		</group>
	)
}
