import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from 'three';


function Flag({
    position,
    scale,
    rotation
}) {
    const flagRef = useRef();
    const {scene , animations } = useGLTF('/models/OpFlagV2.glb');
    const {mixer, actions} = useAnimations(animations, flagRef);

    useEffect(() => {
        if(animations && animations.length)
        {
            // console.log('animation for flag: ', animations);
            actions[animations[0].name].play()
        }
        // if (scene) {
        //     console.log('scene for flag: ', scene);
        //     console.log('materials for flag: ', materials);
        //     console.log('nodes for flag: ', nodes);
        //     materials['flag'].color = new THREE.Color('#FFF');
        // }
    }, [animations]);

    return (
        <group ref={flagRef} position={position} scale={scale} rotation={rotation} >
            <primitive object={scene} />
        </group>
    );
}

export default Flag;
