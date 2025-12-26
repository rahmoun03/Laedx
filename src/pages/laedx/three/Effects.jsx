import { EffectComposer, DepthOfField, Bloom } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing";


export default function Effects(){
	
	return (
		<>
			{/* Bloom */}
			<EffectComposer>
				<Bloom
					// luminanceThreshold={.1}
					// luminanceSmoothing={.1}
					intensity={1.0}
				/>

				{/* <DepthOfField
					focusDistance={3.0}
					focalLength={0.06}
					bokehScale={5}
					height={600}
					blendFunction={BlendFunction.Screen}
					blur={true}
				/> */}
			</EffectComposer>
		</>
	)
}