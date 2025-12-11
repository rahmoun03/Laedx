import { EffectComposer, DepthOfField, Bloom } from "@react-three/postprocessing"

export default function Effects(){
	
	return (
		<>
			{/* Bloom */}
			<EffectComposer>
				<Bloom
					luminanceThreshold={0.2}
					luminanceSmoothing={0.9}
					intensity={1.0}
				/>

				{/* <DepthOfField
					focusDistance={1}      // Adjust based on your scene
					focalLength={0.005}    // Higher = more blur
					bokehScale={1}         // Blur quality
					width={480}
					height={480}
				/> */}
			</EffectComposer>
		</>
	)
}