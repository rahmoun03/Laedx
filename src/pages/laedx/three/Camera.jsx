import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { mainTimeline } from '@/hooks/animationTimeline';

export default function CameraController() {
	const shakeIntensity = 0.005; // max shake
	const shakeFreq = 1; // speed of shake
	const shake = new THREE.Vector3();

	const { set, size, camera } = useThree();

	const tProgress = useRef({ value: 0 });
	const activeCam = useRef("A"); // "A" or "B"

	const cam = useRef();
	// const camB = useRef();

	// CAMERA PATH
	const curve = new THREE.CatmullRomCurve3([
		new THREE.Vector3(0.0, 1.0, 9.0),
		new THREE.Vector3(0.0, 1.0, 8.6),
		new THREE.Vector3(0.0, 1.0, 8.2),
		new THREE.Vector3(0.0, 1.0, 7.8),
		new THREE.Vector3(0.0, 1.0, 7.4),
		new THREE.Vector3(0.0, 1.0, 6.0),
		new THREE.Vector3(0.0, 1.0, 2.0),
		new THREE.Vector3(0.0, 1.0, 2.0),
		new THREE.Vector3(0.0, 1.0, 2.0),
		new THREE.Vector3(0.0, 1.0, 2.0),
		new THREE.Vector3(0.0, 1.0, 2.0),
		new THREE.Vector3(0.0, 3.0, 2.0),
		new THREE.Vector3(0.0, 30.0, 2.0),
		// new THREE.Vector3(0.0, 30.0, 2.0),
		// new THREE.Vector3(0.0, 30.0, 2.0),
		// new THREE.Vector3(0.0, 30.0, 2.0),
		// new THREE.Vector3(0.0, 30.0, 2.0),
	]);

	// LOOK-AT PATH
	const lookAtCurve = new THREE.CatmullRomCurve3([
		new THREE.Vector3(0.0, 2.0, 0.0),
		new THREE.Vector3(0.0, 2.0, 0.0),
		new THREE.Vector3(0.0, 2.0, 0.0),
		new THREE.Vector3(0.0, 2.0, 0.0),
		new THREE.Vector3(0.0, 2.0, 0.0),
		new THREE.Vector3(0.0, 2.0, 0.0),
		new THREE.Vector3(0.0, 2.0, 0.0),
		new THREE.Vector3(0.0, 2.0, 0.0),
		new THREE.Vector3(0.0, 2.0, 0.0),
		new THREE.Vector3(0.0, 2.0, 0.0),
		new THREE.Vector3(0.0, 2.0, 0.0),
		new THREE.Vector3(0.0, 3.0, 0.0),
		new THREE.Vector3(0.0, 30.0, 0.0),
		// new THREE.Vector3(0.0, 30.0, 0.0),
		// new THREE.Vector3(0.0, 30.0, 0.0),
		// new THREE.Vector3(0.0, 30.0, 0.0),
		// new THREE.Vector3(0.0, 30.0, 0.0),
	]);

	const smoothedLook = new THREE.Vector3();

	useEffect(() => {
		camera.fov = size.width > 680 ? 75 : 95;
		camera.near = 0.1;
		camera.far = 1000;
		camera.position.copy(curve.getPoint(0));
		camera.lookAt(lookAtCurve.getPoint(0));
		camera.updateProjectionMatrix();

		mainTimeline.to(tProgress.current, {
			value: 1,
			duration: 12,
			ease: "power3.inOut",
			onComplete: () => {
				console.log('CAMERA : ', camera)
				mainTimeline.addLabel("textEnd");
			}
		}, "intro" );
	}, []);

	useEffect(() => {
		if (!camera) return;
		camera.aspect = size.width / size.height;
		camera.updateProjectionMatrix();
	}, [size]);

	// ANIMATE CAMERA 
	useFrame((state) => {
		const t = tProgress.current.value;
		if(t >= 1) return;

		console.log('hello useFrame');
		// Move Camera
		const camPos = curve.getPoint(t);
		camera.position.lerp(camPos, 0.1);

		// Smooth Look At
		const target = lookAtCurve.getPoint(t);
		smoothedLook.lerp(target, 0.1);


		// ======== CAMERA SHAKE ==========
		const time = state.clock.getElapsedTime();

		// OPTIONAL: fade shake intensity as camera approaches end
		const fade = 1 - t; // full at start, 0 at end

		shake.set(
			(Math.sin(time * shakeFreq) * shakeIntensity) * fade,
			(Math.cos(time * shakeFreq * 0.8) * shakeIntensity) * fade,
			0
		);

		camera.position.add(shake);
		// =================================
		camera.lookAt(smoothedLook);
	});

	return null;
}
