import { useRef, useEffect } from "react"
import { useFrame, useThree} from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap";

import fontUrl from '@/assets/fonts/Audiowide_Regular.json';
import ThreeText3D from './ThreeText3D';
import { mainTimeline } from "@/hooks/animationTimeline";


// LAEDX
// ###################################################
// start
const ladexStartPos = [
    new THREE.Vector3(-4.0, -1.47, 2), // L
    new THREE.Vector3(-4.5, -1.6, -1), // A
    new THREE.Vector3(0.0, -1.47, -3), // E
    new THREE.Vector3(1.2, -1.25, 2), // D
    new THREE.Vector3(4.0, -1.4, 0), // X
]

const ladexStartRot = [
    new THREE.Vector3( -(Math.PI / 2), -0.1, 0.08), // L
    new THREE.Vector3( -(Math.PI / 2), -0.1, 0.08), // A
    new THREE.Vector3( -(Math.PI / 2), 0.0, 0.0), // E
    new THREE.Vector3( -(Math.PI / 2), 0.0, 0.0), // D
    new THREE.Vector3( -(Math.PI / 2), 0.2, 0.0), // X
]

// end
const ladexEndPos = [
    new THREE.Vector3( -0.8, 0.0, 0), // L
    new THREE.Vector3( -0.4, 0.0, 0), // A
    new THREE.Vector3( 0.0, 0.0, 0), // E
    new THREE.Vector3( 0.4, 0.0, 0), // D
    new THREE.Vector3( 0.8, 0.0, 0), // X
]

const ladexEndRot = [
    new THREE.Vector3(0.0, 0.0, 0), // L
    new THREE.Vector3(0.0, 0.0, 0), // A
    new THREE.Vector3(0.0, 0.0, 0), // E
    new THREE.Vector3(0.0, 0.0, 0), // D
    new THREE.Vector3(0.0, 0.0, 0), // X
]
// ###################################################


// DIGITAL STUDIO
// ###################################################
//start
const digitalStartPos = [
  new THREE.Vector3( -3.2, -2.1, -10 ),   // D
  new THREE.Vector3( -2.7, -2.1, -6 ),   // I
  new THREE.Vector3( -2.2, -2.1, 4 ),   // G
  new THREE.Vector3( -2.1, -2.1, 3 ),   // I
  new THREE.Vector3( -1.2, -2.1, -4 ),   // T
  new THREE.Vector3(  -0.7, -2.1, -2 ),   // A
  new THREE.Vector3(  -0.2, -2.1, -8 ),   // L

  new THREE.Vector3(  0.8, -2.1, -8 ),   // S
  new THREE.Vector3(  1.3, -2.1, 3 ),   // T
  new THREE.Vector3(  1.8, -2.1, 9 ),   // U
  new THREE.Vector3(  2.3, -2.1, 3 ),   // D
  new THREE.Vector3(  2.8, -2.1, 2 ),   // I
  new THREE.Vector3(  3.3, -2.1, 1 ),   // O
];
const digitalStartRot = [
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // D
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // I
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // G
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // I
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // T
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // A
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // L

    new THREE.Vector3( Math.PI / 2,  0.0, 0), // S
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // T
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // U
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // D
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // I
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // O
]


// end
const digitalEndPos = [
  new THREE.Vector3( -0.90 , -1, 0 ),  // D
  new THREE.Vector3( -0.76 , -1, 0 ),  // I
  new THREE.Vector3( -0.62 , -1, 0 ),  // G
  new THREE.Vector3( -0.48 , -1, 0 ),  // I
  new THREE.Vector3( -0.34 , -1, 0 ),  // T
  new THREE.Vector3( -0.20 , -1, 0 ),  // A
  new THREE.Vector3( -0.06 , -1, 0 ),  // L

  new THREE.Vector3(  0.20 , -1, 0 ),  // S
  new THREE.Vector3(  0.34 , -1, 0 ),  // T
  new THREE.Vector3(  0.48 , -1, 0 ),  // U
  new THREE.Vector3(  0.62 , -1, 0 ),  // D
  new THREE.Vector3(  0.76 , -1, 0 ),  // I
  new THREE.Vector3(  0.90, -1, 0 ),  // O
];

const digitalEndRot = [
    new THREE.Vector3( 0.0,  0.0, 0), // D
    new THREE.Vector3( 0.0,  0.0, 0), // I
    new THREE.Vector3( 0.0,  0.0, 0), // G
    new THREE.Vector3( 0.0,  0.0, 0), // I
    new THREE.Vector3( 0.0,  0.0, 0), // T
    new THREE.Vector3( 0.0,  0.0, 0), // A
    new THREE.Vector3( 0.0,  0.0, 0), // L

    new THREE.Vector3( 0.0,  0.0, 0), // S
    new THREE.Vector3( 0.0,  0.0, 0), // T
    new THREE.Vector3( 0.0,  0.0, 0), // U
    new THREE.Vector3( 0.0,  0.0, 0), // D
    new THREE.Vector3( 0.0,  0.0, 0), // I
    new THREE.Vector3( 0.0,  0.0, 0), // O
]
// ###################################################



// LEAD TOGETHER
// ###################################################
//start
const togetherStartPos = [
  new THREE.Vector3( -3.2, 2.1, 6 ),   // L
  new THREE.Vector3( -2.7, 2.1, 9 ),   // E
  new THREE.Vector3( -2.2, 2.1, 2 ),   // A
  new THREE.Vector3( 2.1, 2.1, -4 ),   // D

  new THREE.Vector3( -1.2, 2.1, -1 ),   // T
  new THREE.Vector3(  -0.7, 2.1, -8 ),   // O
  new THREE.Vector3(  -0.2, 2.1, 9 ),   // G
  new THREE.Vector3(  0.8, 2.1, 6 ),   // E
  new THREE.Vector3(  6.3, 2.1, -5 ),   // T
  new THREE.Vector3(  1.8, 2.1, 4 ),   // H
  new THREE.Vector3(  -2.3, 2.1, 2 ),   // E
  new THREE.Vector3(  5.8, 2.1, 1)   // R
];

const togetherStartRot = [
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // L
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // E
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // A
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // D

    new THREE.Vector3( Math.PI / 2,  0.0, 0), // T
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // O
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // G
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // E
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // T
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // H
    new THREE.Vector3( Math.PI / 2,  0.0, 0), // E
    new THREE.Vector3( Math.PI / 2,  0.0, 0) // R
    
]


// end
const togetherEndPos = [
  new THREE.Vector3( -0.50 , -2, 0 ),  // L
  new THREE.Vector3( -0.415 , -2, 0 ),  // E
  new THREE.Vector3( -0.330 , -2, 0 ),  // A
  new THREE.Vector3( -0.245 , -2, 0 ),  // D
  // space
  new THREE.Vector3( -0.095 , -2, 0 ),  // T
  new THREE.Vector3( -0.001 , -2, 0 ),  // O
  new THREE.Vector3(  0.075 , -2, 0 ),  // G
  new THREE.Vector3(  0.160 , -2, 0 ),  // E
  new THREE.Vector3(  0.245 , -2, 0 ),  // T
  new THREE.Vector3(  0.330 , -2, 0 ),  // H
  new THREE.Vector3(  0.415 , -2, 0 ),  // E
  new THREE.Vector3(  0.50 , -2, 0 ),  // R
];

const togetherEndRot = [
    new THREE.Vector3( 0.0,  0.0, 0), // L
    new THREE.Vector3( 0.0,  0.0, 0), // E
    new THREE.Vector3( 0.0,  0.0, 0), // A
    new THREE.Vector3( 0.0,  0.0, 0), // D

    new THREE.Vector3( 0.0,  0.0, 0), // T
    new THREE.Vector3( 0.0,  0.0, 0), // O
    new THREE.Vector3( 0.0,  0.0, 0), // G
    new THREE.Vector3( 0.0,  0.0, 0), // E
    new THREE.Vector3( 0.0,  0.0, 0), // T
    new THREE.Vector3( 0.0,  0.0, 0), // H
    new THREE.Vector3( 0.0,  0.0, 0), // E
    new THREE.Vector3( 0.0,  0.0, 0) // R
]
// ###################################################



export default function Title() {

    console.log('title called !')

    const { scene } = useGLTF("/models/OpX.glb");
    const titleRef = useRef();
    const { camera } = useThree();
    const shakeTlRef = useRef();



    useEffect(() => {
    	console.log(scene)
    	scene.traverse((child) => {
    		if(child.isMesh && child.name !== "Orange_part"){
                
    			console.log({child})
    			child.material.visible = false;
    		}
    		else
    		{
    			child.material = new THREE.MeshStandardMaterial({color : "#ff5500", emissive : "#ff5500", side : THREE.FrontSide, transparent : true, opacity: 0})
    		}
    	})
    }, [scene])


    const shakeCamera = () => {
        if (shakeTlRef.current) shakeTlRef.current.kill();
        const strength = 0.1;
        const startPos = camera.position.clone();

        shakeTlRef.current = gsap.timeline({
            onComplete: () => camera.position.copy(startPos),
        });

        shakeTlRef.current
            .to(camera.position, {
                x: startPos.x + (Math.random() - 0.5) * strength,
                y: startPos.y + (Math.random() - 0.5) * strength,
                duration: 0.08,
                repeat: 4,
                yoyo: true,
                ease: "power2.inOut",
            })
            .to(camera.position, { x: startPos.x, y: startPos.y, duration: 0.12, ease: "power3.out" });

        gsap.fromTo(camera.rotation, { z: 0 }, { z: 0.02, duration: 0.06, yoyo: true, repeat: 3, ease: "power2.inOut" });
    };

    useEffect(() => {
        if (!titleRef.current) return;

        mainTimeline.call(() => {
            shakeCamera();

            const tl = gsap.timeline({
                onComplete: () => {
                    console.log('enable physics')
                    // remove text completely
                    if (titleRef.current?.parent) {
                        titleRef.current.parent.remove(titleRef.current);
                    }
                },
            });

            titleRef.current.traverse((mesh) => {
                if (!mesh.isMesh || !mesh.material?.color ) return;


                if (mesh.name === "Orange_part" ){

                    tl.to(
                        mesh.material,
                        {
                            opacity: 1,
                            duration: 0.35,
                            ease: "power2.inOut",
                        },
                        0
                    );
                    
                    // // SCALE pulse
                    // tl.fromTo(mesh.scale,
                    //     { x: 1, y: 1, z: 1 },
                    //     {
                    //         x: 1.05,
                    //         y: 1.05,
                    //         z: 1.05,
                    //         duration: 0.25,
                    //         yoyo: true,
                    //         repeat: 1,
                    //         ease: "power2.inOut"
                    //     },
                    //     0
                    // );

                    tl.to(
                        mesh.material,
                        {
                            opacity: 0,
                            duration: 2.0,
                            ease: "power2.inOut",
                        },
                        ">+=0.5" // after pulse
                    );
                    return;   
                }
                const pulseColor = new THREE.Color(0.3, 0.3, 1.3);

                // COLOR pulse
                tl.to(mesh.material.color,
                    {
                        r: pulseColor.r,
                        g: pulseColor.g,
                        b: pulseColor.b,
                        duration: 0.35,
                        yoyo: true,
                        ease: "power2.inOut"
                    },
                    0
                );

                // SCALE pulse
                tl.fromTo(mesh.scale,
                    { x: 1, y: 1, z: 1 },
                    {
                        x: 1.02,
                        y: 1.02,
                        z: 1.02,
                        duration: 0.25,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.inOut"
                    },
                    0
                );

                tl.to(
                    mesh.material,
                    {
                        opacity: 0,
                        duration: 2.0,
                        ease: "power2.inOut",
                    },
                    ">+=0.5" // after pulse
                );
            });
        }, null, "textEnd");
    }, []);


    return (
        <group ref={titleRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <ThreeText3D
                text="LAEDX"
                fontUrl={fontUrl}
                position={[0, -0.8, 0]}
                size={0.3}
                startPos={ladexStartPos}
                startRot={ladexStartRot}
                endPos={ladexEndPos}
                endRot={ladexEndRot}
                duration={9}
                stagger={0.05}
            />

            <primitive object={scene} scale={[0.27, 0.27, 0.5]} position={[0.789, -0.948, 0.01]} />

            <ThreeText3D
                text="DIGITALSTUDIO"
                fontUrl="/fonts/Open_Sans_Light_Regular.json"
                position={[0, -0.1, 0]}
                size={0.13}
                startPos={digitalStartPos}
                startRot={digitalStartRot}
                endPos={digitalEndPos}
                endRot={digitalEndRot}
                duration={9}
                stagger={0.05}
            />

            <ThreeText3D
                text="LEADTOGETHER"
                fontUrl="/fonts/Open_Sans_Light_Regular.json"
                position={[0, 0.7, 0]}
                size={0.06}
                startPos={togetherStartPos}
                startRot={togetherStartRot}
                endPos={togetherEndPos}
                endRot={togetherEndRot}
                duration={8}
                stagger={0.05}
            />
        </group>
    );
};

