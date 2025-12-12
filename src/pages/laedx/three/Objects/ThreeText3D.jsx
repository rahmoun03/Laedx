import * as THREE from 'three';
import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { Text3D, useTexture, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';


function ThreeText3D({
	text = 'COMINSOON',
	fontUrl = '/fonts/Inter_Bold.json',
	position = [0, 0, 0],
	size= 0.7,
	startPos = [],
	endPos = [],
	startRot = [],
	endRot = [],
	duration = 3,
	stagger = 0.08,
	curveIntensity = 1.5 // Controls curve smoothness

}) {
	const groupRef = useRef();
	const curvesRef = useRef([]);


	// geometry config
	const config = useMemo(() => ({
		size: size,
		height: 0.03,
		curveSegments: 16,
		bevelEnabled: false,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 2,
	}), []);

	// const [
	// 	baseColor,
	// 	aoMap,
	// 	normalMap,
	// 	roughnessMap,
	// 	metalnessMap,
	// 	heightMap
	// ] = useTexture([
	// 	"/textures/metal_scrached/Metal_scratched_009_basecolor.jpg",
	// 	"/textures/metal_scrached/Metal_scratched_009_ambientOcclusion.jpg",
	// 	"/textures/metal_scrached/Metal_scratched_009_normal.jpg",
	// 	"/textures/metal_scrached/Metal_scratched_009_roughness.jpg",
	// 	"/textures/metal_scrached/Metal_scratched_009_metallic.jpg",
	// 	"/textures/metal_scrached/Metal_scratched_009_height.png",
	// ]);

	const [
		baseColor,
		aoMap,
		normalMap,
		roughnessMap,
		metalnessMap,
		heightMap,
		specularMap
	] = useTexture([
		"/textures/Rock_Ore/Rock_Ore_001_COLOR.jpg",
		"/textures/Rock_Ore/Rock_Ore_001_OCC.jpg",
		"/textures/Rock_Ore/Rock_Ore_001_NORM.jpg",
		"/textures/Rock_Ore/Rock_Ore_001_ROUGH.jpg",
		"/textures/Rock_Ore/Rock_Ore_001_METAL.jpg",
		"/textures/Rock_Ore/Rock_Ore_001_DISP.png",
		"/textures/Rock_Ore/Rock_Ore_001_SPEC.jpg",
	]);



	// Required for aoMap & heightMap
	baseColor.wrapS = baseColor.wrapT = THREE.RepeatWrapping;
	aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping;
	heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping;




    // Generate CatmullRomCurve3 for each character
    useLayoutEffect(() => {
        if (!groupRef.current) return;

        curvesRef.current = groupRef.current.children.map((charMesh, i) => {
            const sPos = startPos[i] || new THREE.Vector3();
            const ePos = endPos[i] || new THREE.Vector3();

            // Create control points for the curve
            const direction = new THREE.Vector3().subVectors(ePos, sPos);
            const distance = direction.length();

            // Create perpendicular offset for larger arc
            const perpendicular = new THREE.Vector3(-direction.z, direction.y * curveIntensity, direction.x);
            perpendicular.normalize().multiplyScalar(distance * 0.5); // Increased multiplier from 0.3

            // Create multiple midpoints for a longer, more pronounced curve
            const midPoint1 = new THREE.Vector3().addVectors(sPos, ePos).multiplyScalar(0.5);
            midPoint1.add(perpendicular.clone().multiplyScalar(0.7));

            const midPoint2 = new THREE.Vector3().addVectors(sPos, ePos).multiplyScalar(0.5);
            midPoint2.add(perpendicular.clone().multiplyScalar(-0.5));

            // Create the curve with more control points for longer path
            const curve = new THREE.CatmullRomCurve3([
                sPos.clone(),
                sPos.clone().add(direction.clone().multiplyScalar(0.15)),
                midPoint1,
                midPoint2,
                ePos.clone().sub(direction.clone().multiplyScalar(0.15)),
                ePos.clone(),
            ]);

            return curve;
        });

        // Animate using curves
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        groupRef.current.children.forEach((charMesh, i) => {
            const sRot = startRot[i] || new THREE.Euler();
            const eRot = endRot[i] || new THREE.Euler();
            const curve = curvesRef.current[i];

            // Set initial position & rotation
            charMesh.position.copy(startPos[i] || new THREE.Vector3());
            charMesh.rotation.set(sRot.x, sRot.y, sRot.z);

            const staggerDelay = i * stagger;

            // Animate along curve using GSAP
            const progressObj = { t: 0 };
            tl.to(
                progressObj,
                {
                    t: 1,
                    duration,
                    ease: "expo.inOut",
                    onUpdate() {
                        // Get point on curve based on progress
                        const point = curve.getPoint(progressObj.t);
                        charMesh.position.copy(point);
                    }
                },
                staggerDelay
            );

            // Animate rotation
            tl.to(
                charMesh.rotation,
                {
                    x: eRot.x,
                    y: eRot.y,
                    z: eRot.z,
                    duration,
                    ease: "expo.inOut"
                },
                staggerDelay
            );
        });
    }, [startPos, endPos, startRot, endRot, duration, stagger, curveIntensity]);

	return (
		<group ref={groupRef} position={position}>
			{text.split('').map((char, i) => (
				<Center
					position={[startPos[i].x, startPos[i].y, startPos[i].z]}
					rotation={[startRot[i].x, startRot[i].y, startRot[i].z]}
					key={i}
				>
					<Text3D
						font={fontUrl}
						{...config}
						castShadow
					>
						{char}
						<meshPhysicalMaterial color={'white'} metalness={0.5} roughness={0.4} />
						{/* <meshPhongMaterial
							map={baseColor}
							aoMap={aoMap}
							normalMap={normalMap}
							roughnessMap={roughnessMap}
							metalnessMap={metalnessMap}
							displacementMap={heightMap}
							specularMap={specularMap}
							displacementScale={0.05}
						/> */}
					</Text3D>
				</Center>
			))}
		</group>
	);
}

export default ThreeText3D;
