import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap'
import { mainTimeline } from '@/hooks/animationTimeline';



function Lights() {
	const spotOneRef = useRef();
	const spotTwoRef = useRef();
	const PointRef = useRef();
	const target = useRef()

	useEffect(() => {
		if(spotOneRef.current && spotTwoRef.current) {
			// spotOneRef.current?.target.position.set(0, 30, 0);
			// spotOneRef.current?.target.updateMatrixWorld();
			// spotTwoRef.current?.target.position.set(0, 30, 0);
			// spotTwoRef.current?.target.updateMatrixWorld();
			mainTimeline.to(spotOneRef.current?.target.position , {
				x :  0,
				y :  30,
				z :  0,
				duration: 3,
				ease: "power4.inOut",
				onUpdate : () => {
					spotOneRef.current?.target.updateMatrixWorld();
				},
				onComplete : () => {
					spotOneRef.current?.target.updateMatrixWorld();
				}
			}, "intro+=6.5")
			
			mainTimeline.to(spotTwoRef.current?.target.position , {
				x :  0,
				y :  30,
				z :  0,
				duration: 3,
				ease: "power4.inOut",
				onUpdate : () => {
					spotTwoRef.current?.target.updateMatrixWorld();
				},
				onComplete : () => {
					spotTwoRef.current?.target.updateMatrixWorld();
				}
			}, "intro+=6.5")
		}
		// if(PointRef.current){
		// 	mainTimeline.to(PointRef.current.position , {
		// 		x :  -5,
		// 		y :  35,
		// 		z :  3,
		// 		duration: 3,
		// 		ease: "power4.inOut",
		// 	}, "intro+=6.5")
		// }
	}, [spotOneRef, spotTwoRef]);

	return (
		<>
			{/* Directional Light */}
			{/* <directionalLight
				// color='green'
				position={[0, 500, 500]}
				intensity={0.05}
				castShadow	
			/> */}

			{/* Point Light */}
			<pointLight ref={PointRef} position={[0, 10, 3]} intensity={10} castShadow />

			{/* Spot Light 1 */}
			<spotLight
				ref={spotOneRef}
				position={[8, 30, 5]}
				intensity={80}
				angle={0.25}
				penumbra={1}
				castShadow
			/>

			{/* Spot Light 2 */}
			<spotLight
				ref={spotTwoRef}
				// color='blue'
				position={[-8, 30, 5]}
				intensity={25}
				angle={0.25}
				penumbra={1}
				castShadow
			/>


			{/* <object3D ref={target} position={[0, 0, 0]} /> */}
			{/* <object3D ref={target2} position={[0, 0, 0]} /> */}
		</>
	);
}

export default Lights;
