import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { useRef } from "react";


export default function RockPlanet({ rockCount = 15, radius = 10 }) {
	const { scene } = useGLTF("/models/Opsmall_rock.glb")
	const groupRef = useRef();

	// Generate rock positions once
	const rocks = useMemo(() => {
		const arr = []
		for (let i = 0; i < rockCount; i++) {
		// Pick random spherical coordinates
		const theta = Math.random() * Math.PI * 2 // around y axis
		const phi = Math.acos(2 * Math.random() - 1) // latitude

		const x = radius * Math.sin(phi) * Math.cos(theta)
		const y = radius * Math.sin(phi) * Math.sin(theta)
		const z = radius * Math.cos(phi)

		if (y < 1) continue;

		arr.push({
			position: [x, y, z],
			rotation: [
			Math.random() * Math.PI,
			Math.random() * Math.PI,
			Math.random() * Math.PI,
			],
			scale: 0.3 + Math.random() * 0.7,
		})
		}
		return arr
	}, [rockCount, radius])

	useFrame(({ camera }) => {
		groupRef.current.children.forEach((rock) => {
			const dist = camera.position.distanceTo(rock.position)
			rock.children[0].visible = dist < 50 
		})
	})

	return (
		<group ref={groupRef}>
			{rocks.map((rock, i) => (
				<primitive
				key={i}
				object={scene.clone()}
				position={rock.position}
				rotation={rock.rotation}
				scale={rock.scale}
				/>
			))}
		</group>
	)
}
