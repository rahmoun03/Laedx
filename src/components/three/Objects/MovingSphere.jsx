import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, useScroll } from "@react-three/drei"
import * as THREE from "three"

export default function MovingSphere() {
	const meshRef = useRef()
	const scroll = useScroll()

	// ✅ Memoize curve so it's not recreated every render
	const curve = useMemo(
		() =>
			new THREE.CatmullRomCurve3([
				new THREE.Vector3(10, 45, 85), // start
				new THREE.Vector3(12, 30, 80),
				new THREE.Vector3(8, 10, 75),
				new THREE.Vector3(5, 3, 70), //nove
				new THREE.Vector3(-5, 4, 65),
				new THREE.Vector3(-5, 3, 60), // hive
				new THREE.Vector3(-5, 3, 40),
				new THREE.Vector3(-8, 2, 20),
				new THREE.Vector3(-4, 3, 15),
				new THREE.Vector3(-2, 2, 10),
				new THREE.Vector3(-1, 5, 3),
				new THREE.Vector3(0, 5, -2),
				new THREE.Vector3(0, 20, -2), // end
			]),
		[]
	)

	useFrame(() => {
		const t = scroll.offset // 0 → 1
		if (!meshRef.current ) return
		const pos = curve.getPoint(t)
		meshRef.current.position.lerp(pos, 0.08)
		// console.log('pos : ', meshRef.current.position);
	})

	return (
		<group ref={meshRef} position={[10, 45, 85]}>
			{/* ✅ Lower poly sphere: 16x16 is enough */}
			<Sphere args={[0.3, 32, 32]}>
				<meshStandardMaterial
					emissive={"#FF5500"}
					emissiveIntensity={5}
					roughness={1}
					metalness={0}
					color={"#ffffff"}
				/>
			</Sphere>

			{/* ✅ Disable shadows unless critical */}
			<pointLight
				position={[0, 0, 0]}
				intensity={15}
				color={"#FF5500"}
			/>
		</group>
	)
}
