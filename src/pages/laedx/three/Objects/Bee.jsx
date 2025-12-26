
import * as THREE from "three";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import { RigidBody } from '@react-three/rapier'
import { SkeletonUtils } from "three-stdlib";

import { useProgressStore } from "@/hooks/useProgressStore";


export function Bee({curve, scale, position, delay = 0, speed = 1}) {
	console.log("Bee mounted once");

	const { scene, animations} = useGLTF("/models/OpBeeV3.glb");
	const { camera } = useThree();
	const { progressRightRef } = useProgressStore();
	
	const sound = useRef();
	const beeRef = useRef();
	const startTime = useRef(null);

	const { actions } = useAnimations(animations, beeRef);
	const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
	clonedScene.traverse((child) => {
		if (child.isMesh) {
			child.castShadow = true;
			// child.receiveShadow = true;
		}
	});
	
	//audio
	const beelistener = useMemo(() => new THREE.AudioListener(), []);
	const buffer = useLoader(THREE.AudioLoader, '/sounds/bee-flying.mp3');
	
	

	useEffect(() => {
		if (actions && animations.length > 1) {
			const anim = actions[animations[0].name];
			anim?.reset().fadeIn(0.5).play();
		}
	}, [actions, animations]);

	
	useEffect(() => {
		const audio = new THREE.PositionalAudio(beelistener);
		sound.current = audio;
		audio.setBuffer(buffer);
		audio.setLoop(true);
		audio.setRefDistance(1);
		audio.setVolume(0.0);
		camera.add(beelistener);
		try {
			audio.play();
		} catch (e) {
			console.warn("Audio play blocked until user interaction");
		}

		return () => {
			try {
				audio.stop();
				audio.disconnect();
			} catch {}
			camera.remove(beelistener);
		};
	}, [buffer, camera, beelistener]);


	useFrame((state, delta) => {
		const bee = beeRef.current;
		if (!bee) return;

		// store when bee "starts"
		if (startTime.current === null && progressRightRef.current > 0) {
			startTime.current = progressRightRef.current;
		}

		// progress with delay & speed
		const rawProgress =	(progressRightRef.current - delay * 100) / 100;


		const t = THREE.MathUtils.clamp(rawProgress * speed, 0, 1);

		const target = curve.getPoint(t);
		bee.position.lerp(target, 0.15);

		// subtle floating
		bee.position.y += Math.sin(state.clock.elapsedTime * 4 + delay * 10) * 0.005;

		// visibility + sound
		bee.visible = t > 0.02;
		if (sound.current) {
			sound.current.setVolume(t);
			sound.current.setRefDistance(0.5 + t);
		}
	});


	return (
		// <RigidBody
		// 	colliders="hull"
		// 	type="dynamic" // allow physics interaction
		// 	restitution={0.9}
		// 	friction={0.4}
		// 	mass={3}
		// >
			<group ref={beeRef} scale={scale} position={position}>
				<primitive object={clonedScene} />
			</group>
		// </RigidBody>
	);
}

export default function Bees({ count = 10 }) {
	const SPHERE_CENTER = new THREE.Vector3(0, 29.8, 0);
	const SPHERE_RADIUS = 1.2;
	const SAFE_RADIUS = 1.2;

	// base path: Z only
	const basePoints = useMemo(() => [
		new THREE.Vector3(0, 29.8, -1.5),
		new THREE.Vector3(0, 29.8, -1.4),
		new THREE.Vector3(0, 29.8, -1.3),
		new THREE.Vector3(0, 29.8, -1.2),
		new THREE.Vector3(0, 29.8, -1.1),
		new THREE.Vector3(0, 29.8, -1.0),
		new THREE.Vector3(0, 29.8, -0.9),
		new THREE.Vector3(0, 29.8, -0.8),
		new THREE.Vector3(0, 29.8, -0.7),
		new THREE.Vector3(0, 29.8, -0.6),
		new THREE.Vector3(0, 29.8, -0.5),
		new THREE.Vector3(0, 29.8, -0.4),
		new THREE.Vector3(0, 29.8, -0.3),
		new THREE.Vector3(0, 29.8, -0.2),
		new THREE.Vector3(0, 29.8, -0.1),
		new THREE.Vector3(0, 29.8, -0.0),
		new THREE.Vector3(0, 29.8,  0.1),
		new THREE.Vector3(0, 29.8,  0.2),
		new THREE.Vector3(0, 29.8,  0.3),
		new THREE.Vector3(0, 29.8,  0.4),
		new THREE.Vector3(0, 29.8,  0.5),
		new THREE.Vector3(0, 29.8,  0.6),
		new THREE.Vector3(0, 29.8,  0.7),
		new THREE.Vector3(0, 29.8,  0.8),
		new THREE.Vector3(0, 29.8,  0.9),
		new THREE.Vector3(0, 29.8,  1.0),
		new THREE.Vector3(0, 29.8,  1.1),
		new THREE.Vector3(0, 29.8,  1.2),
		new THREE.Vector3(0, 29.8,  1.3),
		new THREE.Vector3(0, 29.8,  1.4),
		new THREE.Vector3(0, 29.8,  1.5),
		new THREE.Vector3(0, 29.8,  2.0),
		new THREE.Vector3(0, 29.8,  2.5),
		new THREE.Vector3(0, 29.8,  3.3),
		new THREE.Vector3(0, 29.8,  4.3),
	], []);

	const beeConfigs = useMemo(() => {
		return Array.from({ length: count }, () => ({
			delay: Math.random() * 0.3, // start delay (seconds)
			speed: 0.6 + Math.random() * 0.5, // movement speed
			offset: new THREE.Vector2(
				THREE.MathUtils.randFloat(-1, 1),
				THREE.MathUtils.randFloat(-1, 1)
			),
		}));
	}, [count]);


	const curves = useMemo(() => {
		return Array.from({ length: count }, (_, i) => {
			const angle = (i / count) * Math.PI * 2;
			const dir = new THREE.Vector2(Math.cos(angle), Math.sin(angle)).normalize();

			const { offset } = beeConfigs[i];
			// console.log("Bee delay", beeConfigs[i].delay);
			// console.log("Bee speed", beeConfigs[i].speed);
			console.table("bee Config : ",beeConfigs);

			const points = basePoints.map((p) => {
				const zDist = Math.abs(p.z - SPHERE_CENTER.z);

				const influence = THREE.MathUtils.clamp(
					1 - zDist / SPHERE_RADIUS,
					0,
					1
				);

				// smooth curve effect
				const smooth = influence;

				const x =
					SPHERE_CENTER.x +
					dir.x * SAFE_RADIUS * smooth +
					offset.x * smooth;

				const y =
					SPHERE_CENTER.y +
					dir.y * SAFE_RADIUS * smooth +
					offset.y * smooth;

				return new THREE.Vector3(x, y, p.z);
			});

			return new THREE.CatmullRomCurve3(points);
		});
	}, [basePoints, count, beeConfigs]);


	return (
		<>
			{curves.map((curve, i) => (
				<Bee
					key={i}
					curve={curve}
					delay={beeConfigs[i].delay}
					speed={beeConfigs[i].speed}
					scale={[0.02, 0.02, 0.02]}
					position={[0, 29.8, -2]}
				/>
			))}
		</>
	);
}