
import * as THREE from "three";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import { RigidBody } from '@react-three/rapier'
import { SkeletonUtils } from "three-stdlib";

import { useProgressStore } from "@/hooks/useProgressStore";


export function Bee({curve, scale, position}) {
	console.log("Bee mounted once");

	const { scene, animations} = useGLTF("/models/OpBeeV3.glb");
	const { camera } = useThree();
	const { progressRightRef } = useProgressStore();
	const sound = useRef();
	const beelistener = useMemo(() => new THREE.AudioListener(), []);
	const buffer = useLoader(THREE.AudioLoader, '/sounds/bee-flying.mp3');
	const beeRef = useRef();
	const { actions } = useAnimations(animations, beeRef);

	const clonedScene = useMemo(
		() => SkeletonUtils.clone(scene),
		[scene]
	);

	useEffect(() => {
		// scene.traverse((child) => {
		// 	if (child.isMesh && child.material.isMeshStandardMaterial) {
		// 		console.log({child})
		// 		child.material.metalness = 0.6;
		// 		child.material.roughness = 0.6;
		// 	}
		// })
		if (actions && animations.length > 1) {
			const anim = actions[animations[0].name];
			anim?.reset().fadeIn(0.5).play();
		}
	}, [actions, animations]);

	
	useEffect(() => {
		const audio = new THREE.PositionalAudio(beelistener);
		sound.current = audio;
		audio.setBuffer(buffer);
		audio.setRefDistance(1);
		audio.setLoop(true);
		audio.setVolume(0.5);
		try {
			audio.play();
		} catch (e) {
			console.warn("Audio play blocked until user interaction");
		}

		camera.add(beelistener);
		return () => {
			try {
				audio.stop();
				audio.disconnect();
			} catch {}
			camera.remove(beelistener);
		};
	}, [buffer, camera, beelistener]);


	useFrame((state) => {
		const bee = beeRef.current;
		if (!bee) return;

		const t = Math.min(progressRightRef.current / 100, 1);
		const target = curve.getPoint(t);

		bee.position.lerp(target, 0.12);
		// bee.position.y += Math.sin(state.clock.elapsedTime * 3) * 0.01;
		bee.visible = t >= .06;
		sound.current?.setVolume(progressRightRef.current / 100);
		sound.current?.setRefDistance(progressRightRef.current / 100);
	});


	return (
		<RigidBody
			colliders="hull"
			type="dynamic" // allow physics interaction
			restitution={0.9}
			friction={0.4}
			mass={3}
		>
			<group ref={beeRef} scale={scale} position={position} visible={progressRightRef.current >= 1}>
				<primitive object={clonedScene} />
			</group>
		</RigidBody>
	);
}

export default function Bees({ count = 5 }) {
	const SPHERE_CENTER = new THREE.Vector3(0, 30, 0);
	const SPHERE_RADIUS = 1.2;
	const SAFE_RADIUS = 1.3;

	// base path: Z only
	const basePoints = useMemo(() => [
		new THREE.Vector3(0, 30, -1.5),
		new THREE.Vector3(0, 30, -1),
		new THREE.Vector3(0, 30, -0.5),
		new THREE.Vector3(0, 30,  0),
		new THREE.Vector3(0, 30,  0.5),
		new THREE.Vector3(0, 30,  1),
		new THREE.Vector3(0, 30,  1.5),
		new THREE.Vector3(0, 30,  2),
		new THREE.Vector3(0, 30,  3),
		new THREE.Vector3(0, 30,  3.3),
	], []);

	const curves = useMemo(() => {
		return Array.from({ length: count }, (_, i) => {
			// evenly distribute bees around sphere
			const angle = (i / count) * Math.PI * 2;
			const dir = new THREE.Vector2(
				Math.cos(angle),
				Math.sin(angle)
			).normalize();

			const points = basePoints.map((p, index) => {
				const zDist = Math.abs(p.z - SPHERE_CENTER.z - 0.2);
				console.log('point '+ index +' z : ', zDist)
				// influence zone around sphere
				const influence = THREE.MathUtils.clamp(
					1 - zDist / (SPHERE_RADIUS + 0.2),
					0,
					1
				);

				// smooth falloff
				const smooth = influence * influence;

				const x =
					SPHERE_CENTER.x +
					dir.x * SAFE_RADIUS * smooth;

				const y =
					SPHERE_CENTER.y +
					dir.y * SAFE_RADIUS * smooth;

				return new THREE.Vector3(
					x,
					y,
					p.z
				);
			});

			return new THREE.CatmullRomCurve3(points);
		});
	}, [basePoints, count]);

	return (
		<>
			{curves.map((curve, i) => (
				<Bee
					key={i}
					curve={curve}
					scale={[0.02, 0.02, 0.02]}
					position={[0, 30, -2]}
				/>
			))}
		</>
	);
}