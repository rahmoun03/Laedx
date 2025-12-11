import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

export default function CameraController() {
	const shakeIntensity = 0.015; // max shake
	const shakeFreq = 2; // speed of shake
	const shake = new THREE.Vector3();

	const { set, size } = useThree();

	const tProgress = useRef({ value: 0 });
	const activeCam = useRef("A"); // "A" or "B"

	const cam = useRef();
	// const camB = useRef();

	// CAMERA PATH
	const curve = new THREE.CatmullRomCurve3([
		new THREE.Vector3(0.0, 2.0, 9.0),
		new THREE.Vector3(0.0, 2.0, 8.8),
		new THREE.Vector3(0.0, 2.0, 8.6),
		new THREE.Vector3(0.0, 2.0, 8.4),
		new THREE.Vector3(0.0, 2.0, 8.2),
		new THREE.Vector3(0.0, 2.0, 8.0),
		new THREE.Vector3(0.0, 2.0, 2.0),
		new THREE.Vector3(0.0, 2.0, 2.0),
		new THREE.Vector3(0.0, 2.0, 2.0),
		new THREE.Vector3(0.0, 2.0, 2.0),
		new THREE.Vector3(0.0, 2.0, 2.0),
		new THREE.Vector3(0.0, 3.0, 2.0),
		new THREE.Vector3(0.0, 30.0, 2.0),
		new THREE.Vector3(0.0, 30.0, 2.0),
		new THREE.Vector3(0.0, 30.0, 2.0),
		new THREE.Vector3(0.0, 30.0, 2.0),
		new THREE.Vector3(0.0, 30.0, 2.0),
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
		new THREE.Vector3(0.0, 30.0, 0.0),
		new THREE.Vector3(0.0, 30.0, 0.0),
		new THREE.Vector3(0.0, 30.0, 0.0),
		new THREE.Vector3(0.0, 30.0, 0.0),
	]);

	const smoothedLook = new THREE.Vector3();

	// INIT CAMERAS
	useEffect(() => {
		// Camera A (animated)
		cam.current = new THREE.PerspectiveCamera(
			95,
			size.width / size.height,
			0.1,
			1000
		);
		cam.current.position.copy(curve.getPoint(0));



		// start with camera A
		set({ camera: cam.current });

		gsap.to(tProgress.current, {
			value: 1,
			duration: 15,
			ease: "power2.inOut",
		});
	}, []);

	// HANDLE RESIZE
	useEffect(() => {
		if (!cam.current) return;
		cam.current.aspect = size.width / size.height;
		cam.current.updateProjectionMatrix();
	}, [size]);

	// ANIMATE CAMERA 
	useFrame((state) => {
		const t = tProgress.current.value;


		// Move Camera
		const camPos = curve.getPoint(t);
		cam.current.position.lerp(camPos, 0.1);

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

		cam.current.position.add(shake);
		// =================================

		cam.current.lookAt(smoothedLook);
		
	});

	return null;
}
