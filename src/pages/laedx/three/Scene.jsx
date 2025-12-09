import { Html, Stars } from "@react-three/drei"
import * as THREE from 'three';

import Lights from "./Lights";
// import Effects from "./Effects";
import Camera from "./Camera";
import Mountain from "./Objects/Mountain";
import MovingSphere from "./Objects/MovingSphere";
import BackgroundAudio from "@/components/three/BackgroundAudio";
import Astronaut from "./Objects/Astronaut";
import Flag from './Objects/Flag';
import ThreeText3D from './Objects/ThreeText3D';
import RockPlanet from './Objects/RockPlanet';
// import RockPath from './Objects/RockPath';
import Glisa from './Objects/Glisa';
// import NoveSphere from './Objects/NoveSphere';
// import HiveSphere from './Objects/HiveSphere';




function Scene() {

	const mountainProps = [
		// { position: [0, -1.4, 0], scale: 0.05, rotation: [0, 0, 0] },
		// { position: [80, -1.4, 0], scale: 0.05, rotation: [0, 0, 0] },
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

			<Astronaut
				url={'/models/astronaut/source/OpAstronaut.glb'}
				initialAnimation="wave"
				position={[2, 0, -1]}
				rotation={[0, -0.2, 0]}
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
			{/* <RockPlanet /> */}
			<Glisa position={[1, -10, -1]} rotation={[0, -0.3, 0.08]} />
			<Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
		</>
	)
}

export default Scene;




// const endtPos = [
// 	{x: -9,  y: -0.5, z: 0}, // C
// 	{x: -6.9,  y: -0.8, z: 0}, // O
// 	{x: -5.1,  y: -0.55, z: 0}, // M
// 	{x: -2.4,  y: -0.52, z: 0}, // I
// 	{x: -1.7,  y: -0.45, z: 0}, // N
// 	{x: 0.3,  y: -0.45, z: 0}, // G

// 	{x: 3.0,  y: -0.10, z: 0}, // S
// 	{x: 4.5,  y: 0.2, z: 0}, // O
// 	{x: 6.5,  y: -0.15, z: 0}, // O
// 	{x: 8.5,  y: -0.2, z: 0}, // N
// ];

// const endRot = [
// 	{x: 0,  y: 0, z: 0}, // C
// 	{x: 0,  y: 0, z: 0.2}, // O
// 	{x: 0,  y: 0, z: 0.05}, // M
// 	{x: 0,  y: 0, z: 0.3}, // I
// 	{x: 0,  y: 0, z: 0.1}, // N
// 	{x: 0,  y: 0, z: 0.3}, // G
// 	{x: 0,  y: 0, z: 0}, // S
// 	{x: Math.PI / 2,  y: 0, z: 0}, // O
// 	{x: 0,  y: 0, z: -0.1}, // O
// 	{x: 0,  y: 0, z: 0}, // N
// ];


// const startPos = [
// 	{x: -3,  y: -0.5, z: 0}, // C
// 	{x: -2.9,  y: -0.8, z: 0}, // O
// 	{x: -1.1,  y: -0.55, z: 0}, // M
// 	{x: -4.4,  y: -0.52, z: 0}, // I
// 	{x: 1.7,  y: -0.45, z: 0}, // N
// 	{x: 5.3,  y: -0.45, z: 0}, // G

// 	{x: 3.0,  y: -3.10, z: 0}, // S
// 	{x: 4.5,  y: 2.2, z: 0}, // O
// 	{x: 2.5,  y: -0.15, z: 0}, // O
// 	{x: 9.5,  y: -0.2, z: 0}, // N
// ];

// const startRot = [
// 	{x: 0,  y: 0, z: 0}, // C
// 	{x: .1,  y: 0, z: 0.1}, // O
// 	{x: 0,  y: 0, z: 0.4}, // M
// 	{x: 0,  y: 0, z: 0.1}, // I
// 	{x: 0,  y: 0, z: 0.1}, // N
// 	{x: 1,  y: 0, z: 0.3}, // G
// 	{x: 0,  y: 0, z: 0}, // S
// 	{x: Math.PI / 2,  y: 0, z: 0}, // O
// 	{x: .2,  y: 0, z: -0.1}, // O
// 	{x: 0,  y: 0, z: 0}, // N
// ];
