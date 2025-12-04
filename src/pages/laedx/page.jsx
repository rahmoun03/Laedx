import { Canvas } from "@react-three/fiber";
import { useScroll, ScrollControls, useProgress, Preload, useGLTF} from "@react-three/drei";
import { useEffect, Suspense, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";


import { useScrollStore } from "@/hooks/useScrollStore";
import { useLoadingStore } from "@/hooks/useLoadingStore";
import LoadingPage from "@/components/ui/Loading";
import Scene   from "@/components/three/Scene";


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


export function ScrollBridge() {
    const scroll = useScroll();
    const setScrollOffset = useScrollStore((state) => state.setScrollOffset);

    useFrame(() => {
        setScrollOffset(scroll.offset); // 0 → 1
        // console.log('offset : ', scroll.offset);
    });

  return null;
}


function App() {

    const [started, setStarted] = useState(false);
    const scrollRef = useRef();

    return (
        <section className="h-svh md:h-screen w-full bg-black text-white no-scrollbar pointer-events-none">
            {!started && <LoadingPage onStart={() => setStarted(true)} />}

            <Canvas 
                camera={{ position: [10, 45, 87] }}
                gl={{ antialias: true, alpha: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0)
                }}
                className="absolute inset-0 w-full h-full no-scrollbar"
            >
                <Suspense fallback={null}>
                    <Preload all={true} />
                    <LoaderBridge />
                    <ScrollControls pages={12} damping={0.1} className='no-scrollbar' >
                        <Scene />
                        <ScrollBridge pages={12} scrollRef={scrollRef} />
                    </ScrollControls>
                </Suspense>
            </Canvas>
        </section>
    );
}

export default App
