import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";


function Mountain({
    url,
    scale = 1,
    position = [0, -2, 0],
    rotation = [0, 0, 0],
    ...props
}) {
    const group = useRef()
    const gltf = useGLTF(url)

    const clonedScene = useMemo(() => clone(gltf.scene), [gltf.scene])

    gltf.scene.traverse((obj, index) => {
        if (obj.isMesh) {
            console.log('moutain ' + index, obj);
            // obj.castShadow = true
            obj.receiveShadow = true
        }
    })

    useFrame(({ camera }) => {
        group.current.children.forEach((child) => {
            const dist = camera.position.distanceTo(child.position)
            child.visible = dist < 100 // hide if further than 100 units
        })
    })

    return (
        <group
            ref={group}
            scale={scale}
            position={position}
            rotation={rotation}
            {...props}
            receiveShadow
        >
            <primitive object={clonedScene} receiveShadow />
        </group>
    )
}

export default Mountain;