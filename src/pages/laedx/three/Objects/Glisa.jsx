import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ChartCandlestickIcon } from "lucide-react";

export default function Glisa({...props }) {

    const { scene } = useGLTF("/models/OpGlisa.glb");

    scene.traverse((child) => {
        if(child.isMesh)
        {
            child.receiveShadow = true;
        }
    })

    const groupRef = useRef();

    useFrame(({ camera }) => {
        groupRef.current.children.forEach((child) => {
            const dist = camera.position.distanceTo(child.position)
            child.visible = dist < 50 // hide if further than 100 units
        })
    }) 

    return (
    <group ref={groupRef} {...props}>
        <primitive object={scene} />
    </group>
    )
}