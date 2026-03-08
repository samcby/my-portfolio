import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const UsagiModel = () => {
  const { scene } = useGLTF("/oiiaioooooiai_cat.glb");
  const modelRef = useRef();
  const mouse = useRef([0, 0]);
  const baseRotationY = Math.PI * 0.25;

  useEffect(() => {
    const updateMouse = (event) => {
      mouse.current = [
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  useFrame((state, delta) => {
    if (!modelRef.current) return;

    const targetX = -mouse.current[1] * 0.2;

    let rotationOffset;
    let zOffset;
    if (mouse.current[0] < 0) {
      rotationOffset = Math.abs(mouse.current[0]) * -0.8;
      zOffset = Math.abs(mouse.current[0]) * 0.3;
    } else {
      rotationOffset = mouse.current[0] * 0.4;
      zOffset = mouse.current[0] * 0.3;
    }

    const targetY = baseRotationY + rotationOffset;

    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetX,
      delta * 2
    );
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetY,
      delta * 2
    );
    modelRef.current.position.z = THREE.MathUtils.lerp(
      modelRef.current.position.z,
      zOffset,
      delta * 2
    );
  });

  return <primitive ref={modelRef} object={scene} scale={5} position={[-2, -0.5, 0]} />;
};

useGLTF.preload("/oiiaioooooiai_cat.glb");
