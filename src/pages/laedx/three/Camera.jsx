import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

export default function CameraController() {
  const { set, size } = useThree();

  const tProgress = useRef({ value: 0 });
  const activeCam = useRef("A"); // "A" or "B"

  const camA = useRef();
  const camB = useRef();

  // CAMERA PATH
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.0, 2.0, 9.0),
    new THREE.Vector3(0.0, 2.0, 8.8),
    new THREE.Vector3(0.0, 2.0, 8.6),
    new THREE.Vector3(0.0, 2.0, 8.4),
    new THREE.Vector3(0.0, 2.0, 8.2),
    new THREE.Vector3(0.0, 2.0, 8.0),
    new THREE.Vector3(0.0, 2.0, 4.0),
    new THREE.Vector3(0.0, 2.0, 4.0),
    new THREE.Vector3(0.0, 2.0, 4.0),
    new THREE.Vector3(0.0, 2.0, 4.0),
    new THREE.Vector3(0.0, 2.0, 4.0),
    new THREE.Vector3(0.0, 3.0, 4.0),
    new THREE.Vector3(0.0, 30.0, 4.0),
    new THREE.Vector3(0.0, 30.0, 4.0),
    new THREE.Vector3(0.0, 30.0, 4.0),
    new THREE.Vector3(0.0, 30.0, 4.0),
    new THREE.Vector3(0.0, 30.0, 4.0),
  ]);

  // LOOK-AT PATH
  const lookAtCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.0, 2.0, 0.0),
    new THREE.Vector3(0.0, 2.0, 0.0),
    new THREE.Vector3(0.0, 2.0, 0.0),
    new THREE.Vector3(0.0, 2.0, 0.0),
    new THREE.Vector3(0.0, 2.0, 0.0),
    new THREE.Vector3(0.0, 2.0, 0.0),
    new THREE.Vector3(0.0, 2.0, 0.0),
    new THREE.Vector3(0.0, 2.0, 0.0),
    new THREE.Vector3(0.0, 2.0, 0.0),
    new THREE.Vector3(0.0, 2.0, 0.0),
    new THREE.Vector3(0.0, 2.0, 0.0),
    new THREE.Vector3(0.0, 3.0, 0.0),
    new THREE.Vector3(0.0, 30.0, 0.0),
    new THREE.Vector3(0.0, 30.0, 0.0),
    new THREE.Vector3(0.0, 30.0, 0.0),
    new THREE.Vector3(0.0, 30.0, 0.0),
    new THREE.Vector3(0.0, 30.0, 0.0),
  ]);

  const smoothedLook = new THREE.Vector3();

  // INIT CAMERAS
  useEffect(() => {
    // Camera A (animated)
    camA.current = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000
    );
    camA.current.position.copy(curve.getPoint(0));

    // Camera B (fixed top camera)
    camB.current = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000
    );
    camB.current.position.set(0, 20, 3);
    camB.current.lookAt(0, 20, 0);

    // start with camera A
    set({ camera: camA.current });

    gsap.to(tProgress.current, {
      value: 1,
      duration: 15,
      ease: "power2.inOut",
    });
  }, []);

  // HANDLE RESIZE
  useEffect(() => {
    [camA.current, camB.current].forEach((cam) => {
      if (!cam) return;
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    });
  }, [size]);

  // ANIMATE CAMERA A + SWITCH CAMERA B
  useFrame(() => {
    const t = tProgress.current.value;

    // SWITCH CAMERA BETWEEN 70-75% OF THE PATH
    // if (t > 0.72 && activeCam.current !== "B") {
    //   activeCam.current = "B";
    //   set({ camera: camB.current });
    // }

    if (activeCam.current === "A") {
      // Move Camera A
      const camPos = curve.getPoint(t);
      camA.current.position.lerp(camPos, 0.1);

      // Smooth Look At
      const target = lookAtCurve.getPoint(t);
      smoothedLook.lerp(target, 0.1);

      camA.current.lookAt(smoothedLook);
    }
  });

  return null;
}
