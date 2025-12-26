import { Html, Stars } from "@react-three/drei"
import * as THREE from 'three';
import { useEffect  } from 'react';
import { Physics } from '@react-three/rapier';





import Lights from "./Lights";
import Effects from "./Effects";
// import DynamicDOF from "./DynamicDOF";
import CameraController from "./Camera";
import Mountain from "./Objects/Mountain";
import MovingSphere from "./Objects/MovingSphere";
import BackgroundAudio from "@/components/three/BackgroundAudio";
import Astronaut from "./Objects/Astronaut";
import Flag from './Objects/Flag';
// import ThreeText3D from './Objects/ThreeText3D';
// import RockPlanet from './Objects/RockPlanet';
// import RockPath from './Objects/RockPath';
import Glisa from './Objects/Glisa';
import { mainTimeline } from "../../../hooks/animationTimeline";
import Bees from "./Objects/Bee";
// import NoveSphere from './Objects/NoveSphere';
// import HiveSphere from './Objects/HiveSphere';



const PlaneG = () => {

	return(
		<mesh position={[0, -0.4, 0]} rotation={[-(Math.PI / 2) , 0, 0]} receiveShadow >
			<planeGeometry args={[50, 50]} />
			<meshStandardMaterial color={"white"}  /> 
		</mesh>
	)
}


function Scene() {

	const mountainProps = [
		// { position: [0, -1.4, 0], scale: 0.05, rotation: [0, 0, 0] },
		// { position: [80, -1.4, 0], scale: 0.05, rotation: [0, 0, 0] },
		{ position: [0, -1.4, -80], scale: 0.05, rotation: [0, 0, 0]} ,
		{ position: [80, -1.4, -80], scale: 0.05	, rotation: [0, 0, 0]},
	]

	const textOptions = {
		fontSize: 3,
		fontColor: 'white',
		fillMaterial: 'meshNormalMaterial',
		bevelEnabled: true,
		bevelThickness: 0.1,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 1,
	}

	useEffect(() => {
		mainTimeline.play();
	}, []);

	return (
		<>
			<Physics gravity={[0, 0, 0]}>
				<CameraController />
				<Lights />
				<Effects />
				{/* <DynamicDOF /> */}
				<Flag 
					position={[-1, 0, -6]}
					scale={[2.5, 2.5, 2.5]}
					rotation={[0, Math.PI, 0]}
				/>

				<Astronaut
					url={'/models/astronaut/source/OpAstronaut.glb'}
					initialAnimation="idle"
					position={[2, 0, -1]}
					rotation={[0, -0.2, 0]}
				/>
				<BackgroundAudio 
					url="/audio/Laedx_Jingle_v1.mp3" 
					play={false} 
				/>
				{mountainProps.map((props, index) => (
					<Mountain
						key={index}
						url={'/models/OpMountain.glb'}
						{...props}
					/>
				))}

				<Bees />

				<MovingSphere />
				{/* <RockPlanet /> */}
				<Glisa position={[1, -10, -1]} rotation={[0, -0.3, 0.08]} />
				<Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade />
			</Physics>
		</>
	)
}

export default Scene;