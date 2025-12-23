import * as THREE from 'three';
import React, {
	useRef,
	useMemo,
	useLayoutEffect,
	useImperativeHandle,
	forwardRef
} from 'react';
import { Text3D, useTexture, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { mainTimeline } from '@/hooks/animationTimeline';
import { RigidBody } from '@react-three/rapier';


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
	curveIntensity = 1.5, // Controls curve smoothness
}) {
	const groupRef = useRef();
	const curvesRef = useRef([]);

	
	
	// const [physicsEnabled, setPhysicsEnabled] = React.useState(false);
	// const charRigidRefs = useRef([]);
	// const floatingEnabledRef = useRef(false)


	// Expose API to parent
	// useImperativeHandle(ref, () => ({
	// 	enableFloating() {
	// 		floatingEnabledRef.current = true

	// 		charRigidRefs.current.forEach(body => {
	// 			if (!body) return
	// 			body.wakeUp()
	// 			body.setEnabledTranslations(true, true)
	// 			body.setEnabledRotations(true, true)
	// 		})
	// 	}
	// }))


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
	}), [size]);

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

		groupRef.current.children.forEach((charMesh, i) => {
			const sRot = startRot[i] || new THREE.Euler();
			const eRot = endRot[i] || new THREE.Euler();
			const curve = curvesRef.current[i];

			charMesh.position.copy(startPos[i]);
			charMesh.rotation.set(sRot.x, sRot.y, sRot.z);

			const staggerDelay = i * stagger;
			const isLastChar = i === groupRef.current.children.length - 1;

			const progressObj = { t: 0 };

			mainTimeline.to(
				progressObj,
				{
					t: 1,
					duration,
					ease: "expo.inOut",
					onUpdate() {
						charMesh.position.copy(curve.getPoint(progressObj.t));
					},
					// onComplete() {
					// 	if (isLastChar) {
					// 		setPhysicsEnabled(true); // 🔥 RELEASE TEXT
					// 	}
					// }
				},
				`intro+=${3 + staggerDelay}`
			);

			mainTimeline.to(
				charMesh.rotation,
				{
					x: eRot.x,
					y: eRot.y,
					z: eRot.z,
					duration,
					ease: "expo.inOut"
				},
				`intro+=${3 + staggerDelay}`
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
					<RigidBody
						colliders="hull"
						restitution={0.8}
						friction={0.6}
						angularDamping={0.8}
						linearDamping={0.8}
						gravityScale={0.2}
					>
						<Text3D	
							font={fontUrl}
							{...config}
							castShadow
							>
							{char}
							<meshPhysicalMaterial color={'white'} metalness={0.1} roughness={0.3} transparent={true} opacity={1}/>
						</Text3D>
					</RigidBody>
				</Center>
			))}
		</group>
	);
}

export default ThreeText3D;
