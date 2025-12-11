import { Canvas } from "@react-three/fiber";
import { useProgress, Preload, useGLTF, OrbitControls, Stats, SoftShadows} from "@react-three/drei";
import { useEffect, Suspense, useState, useRef } from "react";

import { useFrame } from "@react-three/fiber";


import SwipeController from "./controllers/SwipeController";
import { useLoadingStore } from "@/hooks/useLoadingStore";
import LoadingPage from "./ui/Loading";
import Scene   from "./three/Scene";

// Set decoder path globally
useGLTF.setDecoderPath("/draco/");

// Preload optimized models
useGLTF.preload("/models/astronaut/source/OpAstronaut.glb");
useGLTF.preload("/models/OpMountain.glb");
useGLTF.preload("/models/OpFlagV2.glb");
useGLTF.preload("/models/OpGlisa.glb");
useGLTF.preload("/models/Opsmall_rock.glb");

export function LoaderBridge() {
    const { progress } = useProgress();
    const setProgress = useLoadingStore((state) => state.setProgress);

    useEffect(() => {
        setProgress(progress);
    }, [progress, setProgress]);

    return null;
}


function App() {

    const [started, setStarted] = useState(false);
    const scrollRef = useRef();

    return (
        <section className="h-svh md:h-screen w-full bg-black text-white no-scrollbar pointer-events-none">
            {/* {!started && <LoadingPage onStart={() => setStarted(true)} />} */}
            {/* <SwipeController /> */}
            <Canvas
                camera={{ position: [0, 2, 7] }}                                                                                                                                                                                                                                                                      
                gl={{ antialias: true, alpha: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0)
                }}
                className="absolute inset-0 w-full h-full no-scrollbar"
                shadows
            >
                <Suspense fallback={null}>
                    <Preload all={true} />
                    <LoaderBridge />
			        <SoftShadows size={25} samples={10} focus={0} />
                    <Scene />
                    <Stats />
                    <OrbitControls />
                </Suspense>
            </Canvas>
        </section>
    );
}


export default App
