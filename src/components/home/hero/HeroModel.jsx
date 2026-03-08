"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const SceneContainer = dynamic(
  () => import("./model/SceneContainer").then((mod) => mod.SceneContainer),
  {
    ssr: false,
    loading: () => null,
  }
);

const HeroModel = () => {
  const { isDarkMode } = useTheme();
  const [shouldRenderScene, setShouldRenderScene] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );

    const updateScenePreference = () => {
      setShouldRenderScene(mediaQuery.matches);
    };

    updateScenePreference();
    mediaQuery.addEventListener("change", updateScenePreference);

    return () => mediaQuery.removeEventListener("change", updateScenePreference);
  }, []);

  return (
    <div className="col-span-12 flex min-h-[300px] w-full items-center justify-center sm:col-span-6 sm:min-h-0 lg:col-span-5">
      <div
        className={`relative h-[250px] w-[250px] rounded-full sm:h-[250px] sm:w-[250px] lg:h-[400px] lg:w-[400px] ${
          isDarkMode ? "bg-[#073642]" : "bg-[#fdf6e3]"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {shouldRenderScene ? (
            <SceneContainer />
          ) : (
            <div
              className={`flex h-full w-full flex-col items-center justify-center px-8 text-center ${
                isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"
              }`}
            >
              <div
                className={`mb-4 h-28 w-28 rounded-full bg-gradient-to-br ${
                  isDarkMode
                    ? "from-[#268bd2] via-[#2aa198] to-[#073642]"
                    : "from-[#f59e0b] via-[#2aa198] to-[#268bd2]"
                } opacity-80`}
              />
              <p className="text-sm font-medium">Interactive 3D preview</p>
              <p className="mt-2 text-xs leading-5">
                It loads automatically on large screens when reduced motion is not enabled.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroModel;
