import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap'



function Lights() {
	const spotOneRef = useRef();
	const spotTwoRef = useRef();

	const progress = useRef({value : 0});


	useEffect(() => {
		gsap.to(spotOneRef.current.target.position , {
			x :  0,
			y :  30,
			z :  0,
			duration: 3,
			ease: "power4.inOut",
			onUpdate : () => {
				spotOneRef.current.target.updateMatrixWorld();
			}
		}, 'start-=1')

		gsap.to(spotTwoRef.current.target.position , {
			x :  0,
			y :  30,
			z :  0,
			duration: 3,
			ease: "power4.inOut",
			onUpdate : () => {
				spotTwoRef.current.target.updateMatrixWorld();
			}
		}, 'start-=1')
	})

	// useFrame(() => {
		// // Update target positions
		// if (spotOneRef.current?.target) {
		// 	spotOneRef.current.target.position.set(8, 0, 5);
		// 	spotOneRef.current.target.updateMatrixWorld();
		// }
		// if (spotTwoRef.current?.target) {
		// 	spotTwoRef.current.target.position.set(-8, 0, 5);
		// 	spotTwoRef.current.target.updateMatrixWorld();
		// }

		// console.log('progress : ', progress.current.value);
		
	// });

	return (
		<>
		{/* Directional Light */}
		{/* <directionalLight 
			position={[0, 500, 500]}
			intensity={0.5}
			castShadow	
		/> */}

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
		</>
	);
}

export default Lights;
