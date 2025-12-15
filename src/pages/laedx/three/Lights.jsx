import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap'
import { mainTimeline } from '@/hooks/animationTimeline';



function Lights() {
	const spotOneRef = useRef();
	const spotTwoRef = useRef();

	const target = useRef()






	useEffect(() => {


		mainTimeline.to(spotOneRef.current.target.position , {
			x :  0,
			y :  30,
			z :  0,
			duration: 3,
			ease: "power4.inOut",
			onUpdate : () => {
				spotOneRef.current.target.updateMatrixWorld();
			},
			onComplete : () => {
				spotOneRef.current.target.updateMatrixWorld();
			}
		}, "intro+=7.5")

		mainTimeline.to(spotTwoRef.current.target.position , {
			x :  0,
			y :  30,
			z :  0,
			duration: 3,
			ease: "power4.inOut",
			onUpdate : () => {
				spotTwoRef.current.target.updateMatrixWorld();
			},
			onComplete : () => {
				spotTwoRef.current.target.updateMatrixWorld();
			}
		}, "intro+=7.5")


	}, [])

	return (
		<>
			{/* Directional Light */}
			<directionalLight 
				position={[0, 500, 500]}
				intensity={0.05}
				castShadow	
			/>

			{/* Point Light */}
			<pointLight position={[0, 5, 3]} intensity={3} castShadow />

			{/* Spot Light 1 */}
			<spotLight
				ref={spotOneRef}
				position={[8, 30, 5]}
				intensity={100}
				angle={0.25}
				penumbra={1}
				castShadow
			/>

			{/* Spot Light 2 */}
			<spotLight
				ref={spotTwoRef}
				position={[-8, 30, 5]}
				intensity={100}
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
