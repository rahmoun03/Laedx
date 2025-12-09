import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Sphere, useScroll } from "@react-three/drei"
import * as THREE from "three"
import LiquidSphere from '@/components/three/Objects/lequidSphere'


export default function NoveSphere() {
    const meshRef = useRef()
    const scroll = useScroll()
    const { set, size } = useThree()
    const isMobile = size.width < 768 // breakpoint for mobile


    // ✅ Memoize curve so it's not recreated every render
    const curve = useMemo(
        () =>
            new THREE.CatmullRomCurve3(
                isMobile
                ? [
                    new THREE.Vector3(10, 45, 85), // start
                    new THREE.Vector3(12, 30, 80),
                    new THREE.Vector3(8, 10, 75),
                    new THREE.Vector3(5, 9, 70), // start
                    new THREE.Vector3(3, 8, 70),
                    new THREE.Vector3(0, 3, 65), 
                    new THREE.Vector3(-2, 3, 55),
                    new THREE.Vector3(-10, 2, 27),
                    new THREE.Vector3(-6, 3, 22),
                    new THREE.Vector3(-4, 2, 17),
                    new THREE.Vector3(-2, 2, 4),
                    new THREE.Vector3(-3, 5, 2),
                    new THREE.Vector3(-5, 2, -5), // end
                ] :
                [
                    new THREE.Vector3(10, 45, 85), // start
                    new THREE.Vector3(12, 30, 80),
                    new THREE.Vector3(8, 10, 75),
                    new THREE.Vector3(3, 5, 72), // start
                    new THREE.Vector3(0, 6, 71),
                    new THREE.Vector3(0, 3, 65), 
                    new THREE.Vector3(-2, 3, 55),
                    new THREE.Vector3(-10, 2, 27),
                    new THREE.Vector3(-6, 3, 22),
                    new THREE.Vector3(-4, 2, 17),
                    new THREE.Vector3(-2, 2, 4),
                    new THREE.Vector3(-3, 5, 2),
                    new THREE.Vector3(-5, 2, -5), // end
                ]
            ),
        []
    )

    useFrame(() => {
        const t = scroll.offset // 0 → 1
        if (!meshRef.current || t <= 0.25) return
        const pos = curve.getPoint(t)
        meshRef.current.position.lerp(pos, 0.08)
    })


    useFrame(({ camera }) => {
		const dist = camera.position.distanceTo(meshRef.current.position)
		meshRef.current.visible = dist < 50 
	})



    return (
        <group ref={meshRef} position={isMobile ? [5, 9, 70] : [3, 5, 72]}>

            <LiquidSphere position={[0, 0, 0]} name="noveBall" color3="#2211FC" color1="#F7EFC5" color2="#0011CF"/>

            <pointLight
                position={[0, 0, 0]}
                intensity={15}
                color={"#F7EFC5"}
            />
        </group>
    )
}
