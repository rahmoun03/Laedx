import { EffectComposer, Bloom } from "@react-three/postprocessing"

export default function Effects(){
	
	return (
		<>
			{/* Bloom */}
			<EffectComposer>
				<Bloom
					luminanceThreshold={0.2}
					luminanceSmoothing={0.9}
					intensity={0.2}
				/>
			</EffectComposer>
		</>
	)
}