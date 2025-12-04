import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"
import LiquidSphere from '@/components/three/Objects/lequidSphere'

export default function HiveSphere() {
    const meshRef = useRef()
    const { set, size } = useThree()
    const scroll = useScroll()
    const isMobile = size.width < 768 // breakpoint for mobile


    // ✅ Memoize curve so it's not recreated every render
    const curve = useMemo(
        () =>
            new THREE.CatmullRomCurve3(
            isMobile ?
            [
                new THREE.Vector3(10, 45, 85), // start
                new THREE.Vector3(12, 30, 80),
                new THREE.Vector3(8, 10, 75),
                new THREE.Vector3(5, 3, 70),
                new THREE.Vector3(-5, 4, 65),
                new THREE.Vector3(-5, 5, 60), //start
                new THREE.Vector3(-4.5, 5, 45),
                new THREE.Vector3(-6, 2, 27),
                new THREE.Vector3(-3, 3, 22),
                new THREE.Vector3(-1, 2, 17),
                new THREE.Vector3(1, 2, 4),
                new THREE.Vector3(2, 5, 2),
                new THREE.Vector3(3, 2, -5), // end
            ] : 
            [
                new THREE.Vector3(10, 45, 85), // start
                new THREE.Vector3(12, 30, 80),
                new THREE.Vector3(8, 10, 75),
                new THREE.Vector3(5, 3, 70),
                new THREE.Vector3(-5, 4, 65),
                new THREE.Vector3(-7, 3, 60), //start
                new THREE.Vector3(-4.5, 3, 45),
                new THREE.Vector3(-6, 2, 27),
                new THREE.Vector3(-3, 3, 22),
                new THREE.Vector3(-1, 2, 17),
                new THREE.Vector3(1, 2, 4),
                new THREE.Vector3(2, 5, 2),
                new THREE.Vector3(3, 2, -5), // end
        ]),
        []
    )

    useFrame(() => {
        const t = scroll.offset // 0 → 1
        if (!meshRef.current || t <= 0.40) return

        const pos = curve.getPoint(t)
        meshRef.current.position.lerp(pos, 0.08)
    })

    useFrame(({ camera }) => {
        if (!meshRef.current) return
        const dist = camera.position.distanceTo(meshRef.current.position)
        meshRef.current.visible = dist < 50 
    })

    return (
        <group ref={meshRef} position={isMobile ?  [-5, 5, 60] : [-7, 3, 60]}>
            <LiquidSphere 
                position={[0, 0, 0]} 
                name="hiveBall" 
                color3="#F4CA79" 
                color1="#EBBC4E" 
                color2="#FFEBFF"
            />
            <pointLight
                position={[0, 0, 0]}
                intensity={15}
                color={"#EBBC4E"}
            />


        </group>
    )
}
