import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function RockPath({ rockCount = 200, spread = 8 }) {
	const { scene } = useGLTF("/models/Opsmall_rock.glb")
	const instancedRef = useRef()

	// ✅ Extract geometry & material only once
	const rockGeometry = useMemo(() => {
		let mesh
		scene.traverse((child) => {
			if (child.isMesh && !mesh) mesh = child
		})
		return mesh.geometry.clone()
	}, [scene])

	const rockMaterial = useMemo(() => {
		let mat
		scene.traverse((child) => {
			if (child.isMesh && !mat) mat = child
		})
		return mat.material.clone()
	}, [scene])

	// Define your path
	const curve = useMemo(
		() =>
		new THREE.CatmullRomCurve3([
			new THREE.Vector3(10, 45, 82),
			new THREE.Vector3(12, 30, 80),
			new THREE.Vector3(8, 10, 75),
			new THREE.Vector3(5, 3, 70),
			new THREE.Vector3(-5, 4, 65),
			new THREE.Vector3(-5, 3, 60),
			new THREE.Vector3(-5, 3, 40),
			new THREE.Vector3(-8, 2, 20),
			new THREE.Vector3(-4, 3, 15),
			new THREE.Vector3(-2, 2, 10),
			new THREE.Vector3(-1, 5, 5),
			new THREE.Vector3(0, 5, 4),
		]),
		[]
	)

	// Generate rock transforms
	const rocks = useMemo(() => {
		const arr = []
		for (let i = 0; i < rockCount; i++) {
		const t = Math.random()
		const point = curve.getPointAt(t)
	
		// random offset
		const offset = new THREE.Vector3(
			(Math.random() - 0.5) * 2 * spread,
			(Math.random() - 0.5) * 2 * spread,
			(Math.random() - 0.5) * 2 * spread
		)
	
		// ✅ push rocks away from path center
		const away = offset.clone().normalize().multiplyScalar(1) // 2 = push strength
		const pos = point.clone().add(offset).add(away)
	
		if (pos.y < 1) continue
	
		arr.push({
			position: pos,
			rotation: new THREE.Euler(
				Math.random() * Math.PI,
				Math.random() * Math.PI,
				Math.random() * Math.PI
			),
			scale: 0.3 + Math.random() * 0.7,
			float: pos.y > 2.5,
			speed: 0.2 + Math.random() * 1.5,
			phase: Math.random() * Math.PI * 2,
		})
		}
		return arr
	}, [rockCount, spread, curve])

	const dummy = useMemo(() => new THREE.Object3D(), [])

	// Floating + rotation animation
	useFrame(({ camera, clock }) => {
	const time = clock.getElapsedTime();

	rocks.forEach((rock, i) => {
		const dist = camera.position.distanceTo(rock.position);

		const dummyRot = new THREE.Euler(
			rock.rotation.x,
			rock.rotation.y,
			rock.rotation.z
		);

		let y = rock.position.y;

		if (rock.float) {
			y = rock.position.y + Math.sin(time * rock.speed + rock.phase) * 0.2;
		}

		dummy.position.set(rock.position.x, y, rock.position.z);
		dummy.rotation.copy(dummyRot);

		// hide rocks far away by scaling
		const scale = dist > 50 ? 0 : rock.scale;
		dummy.scale.set(scale, scale, scale);

		dummy.updateMatrix();
		instancedRef.current.setMatrixAt(i, dummy.matrix);
	});

	instancedRef.current.instanceMatrix.needsUpdate = true;
	});


	return (
		<instancedMesh
			frustumCulled={false}
			ref={instancedRef}
			args={[rockGeometry, rockMaterial, rocks.length]}
		/>
	)
}
