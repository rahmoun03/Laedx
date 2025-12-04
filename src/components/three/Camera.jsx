import { useRef, useEffect } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"



export default function Camera() {
	const cameraRef = useRef()
	const { set, size } = useThree()
	const scroll = useScroll()
	const isMobile = size.width < 768 // breakpoint for mobile


	const curve = new THREE.CatmullRomCurve3([
		new THREE.Vector3(10, 45, 86.5), //start
		new THREE.Vector3(10, 40, 86.5),
		new THREE.Vector3(10, 30, 80),
		new THREE.Vector3(8, 10, 75),
		new THREE.Vector3(5, 5, 70), // hive
		new THREE.Vector3(-5, 3, 65),
		new THREE.Vector3(-5, 3, 45),
		new THREE.Vector3(-8, 2, 25),
		new THREE.Vector3(-4, 3, 20),
		new THREE.Vector3(-2, 2, 15),
		new THREE.Vector3(-1, 5, 10),
		new THREE.Vector3(0, 5, 8), // end
		new THREE.Vector3(0, 5, 8), // end
	])


	const lookAtCurve = new THREE.CatmullRomCurve3([
		new THREE.Vector3(10, 45, 86), //START
		new THREE.Vector3(8, 30, 80),
		new THREE.Vector3(8, 10, 75),
		new THREE.Vector3(5, 4, 70),
		new THREE.Vector3(-5, 5, 65), // hive
		new THREE.Vector3(-5, 3, 60),
		new THREE.Vector3(-5, 3, 40),
		new THREE.Vector3(-8, 2, 20),
		new THREE.Vector3(0, 3, 15),
		new THREE.Vector3(0, 2, 10),
		new THREE.Vector3(0, 3, 3),
		new THREE.Vector3(0, 2, -2), // end
		new THREE.Vector3(0, 2, -2), // end
	])

	const smoothedLook = new THREE.Vector3();

	useEffect(() => {
		const cam = new THREE.PerspectiveCamera(
      		isMobile ? 120 : 60, // ✅ wider FOV for mobile
			size.width / size.height,
			0.1,
			1000
		)
		cam.position.copy(curve.getPoint(0)) // start position
		cameraRef.current = cam;
		set({ camera: cam })
	}, [set, size, isMobile])

	useEffect(() => {
		if (cameraRef.current) {
			cameraRef.current.aspect = size.width / size.height
			cameraRef.current.updateProjectionMatrix()
		}
	}, [size])

	useFrame(() => {
		if (!cameraRef.current) return;

		const t = scroll.offset;
		const targetPos = curve.getPoint(t);

		// console.log('target : ', targetPos);

		cameraRef.current.position.lerp(targetPos, 0.08);
		const targetLookAt = lookAtCurve.getPoint(t);
		cameraRef.current.lookAt(smoothedLook.lerp(targetLookAt, 0.08));
		// cameraRef.current.lookAt.lerp(targetLookAt, 0.08);
	})

	return null
}
