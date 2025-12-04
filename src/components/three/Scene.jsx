import { Html } from "@react-three/drei"
import * as THREE from 'three';

import Lights from "./Lights";
import Effects from "./Effects";
import Camera from "./Camera";
import Mountain from "./Objects/Mountain";
import MovingSphere from "./Objects/MovingSphere";
import BackgroundAudio from "@/components/three/BackgroundAudio";
import Astronaut from "./Objects/Astronaut";
import Flag from './Objects/Flag';
import ThreeText3D from './Objects/ThreeText3D';
import RockPlanet from './Objects/RockPlanet';
import RockPath from './Objects/RockPath';
import Glisa from './Objects/Glisa';
import NoveSphere from './Objects/NoveSphere';
import HiveSphere from './Objects/HiveSphere';

function Scene() {

	const mountainProps = [
		{ position: [0, -1.4, 0], scale: 0.05, rotation: [0, 0, 0] },
		{ position: [80, -1.4, 0], scale: 0.05, rotation: [0, 0, 0] },
		{ position: [0, -1.4, -80], scale: 0.05, rotation: [0, 0, 0] },
		{ position: [80, -1.4, -80], scale: 0.05	, rotation: [0, 0, 0] },
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

	return (
		<>
			<Lights />
			{/* <Effects /> */}
			<Camera />
			<Flag 
				position={[-1, 0, -6]}
				scale={[2.5, 2.5, 2.5]}
				rotation={[0, Math.PI, 0]}
			/>
			<ThreeText3D
				text="COMINGSOON"
				fontUrl="/fonts/Inter_Bold.json"
			/>
			<Astronaut
				url={'/models/astronaut/source/OpAstronaut.glb'}
				initialAnimation="wave"
				position={[2, 0, -1]}
			/>
			<BackgroundAudio 
				url="/audio/Laedx_Jingle_v1.mp3" 
				play={true} 
			/>
			{mountainProps.map((props, index) => (
				<Mountain
					key={index}
					url={'/models/OpMountain.glb'}
					{...props}
				/>
			))}

			<MovingSphere />
			<NoveSphere />
			<HiveSphere />
			<RockPlanet />
			<RockPath />
			<Glisa position={[1, -10, -1]} rotation={[0, -0.3, 0.08]} />
			<fog attach="fog" args={["#000000", 20, 50]} />

			{/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade /> */}
			{/* <Mountain scale={[200, 200, 200]} position={[0, -2.8, 0]}/> */}
		</>
	)
}

export default Scene;
