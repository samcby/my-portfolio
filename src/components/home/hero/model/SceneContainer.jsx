import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useTheme } from "@/context/ThemeContext";
import { CameraSetup } from "./CameraSetup";
import { LightSetup } from "./LightSetup";
import { UsagiModel } from "./UsagiModel";

export const SceneContainer = () => {
  const { isDarkMode } = useTheme();

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      performance={{ min: 0.6 }}
    >
      <color attach="background" args={[isDarkMode ? "#101828" : "#faf8f2"]} />
      <Suspense fallback={null}>
        <CameraSetup />
        <LightSetup />
        <UsagiModel />
      </Suspense>
    </Canvas>
  );
};
