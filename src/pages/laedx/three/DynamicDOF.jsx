import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';

function DynamicDOF() {
  const targetRef = useRef();
  const dofRef = useRef();
  const { camera } = useThree();

  const focusOnObject = (object) => {
    if (dofRef.current && object) {
      // Calculate distance from camera to object
      const distance = camera.position.distanceTo(object.position);
      dofRef.current.focusDistance = distance;
    }
  };

  return (
    <>
      <mesh 
        ref={targetRef} 
        position={[0, 0, 0]}
        onClick={() => focusOnObject(targetRef.current)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position={[5, 0, 0]} onClick={() => focusOnObject(targetRef.current)}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      <mesh position={[-5, 0, 0]}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Post-processing */}
      <EffectComposer>
        <DepthOfField
          ref={dofRef}
          focusDistance={5}      // Adjust based on your scene
          focalLength={0.025}    // Higher = more blur
          bokehScale={3}         // Blur quality
          width={1024}
          height={1024}
        />
      </EffectComposer>
    </>
  );
}

export default DynamicDOF;
