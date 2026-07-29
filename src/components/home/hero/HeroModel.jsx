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
  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldRenderScene, setShouldRenderScene] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateViewport = () => {
      setIsDesktop(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setShouldRenderScene(false);
      }
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  return (
    <div className="col-span-1 flex min-h-[300px] w-full items-center justify-center sm:col-span-6 sm:min-h-0 lg:col-span-5">
      <div
        className={`relative h-[250px] w-[250px] rounded-full sm:h-[250px] sm:w-[250px] lg:h-[400px] lg:w-[400px] ${
          isDarkMode ? "bg-[#073642]" : "bg-white border border-[#d8e2eb]"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {shouldRenderScene && isDesktop ? (
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
              <p className="text-sm font-medium">Interactive 3D model</p>
              <p className="mt-2 text-xs leading-5">
                {isDesktop
                  ? "Load it on demand to keep the portfolio fast."
                  : "Available on larger screens to keep mobile browsing fast."}
              </p>
              {isDesktop ? (
                <button
                  type="button"
                  onClick={() => setShouldRenderScene(true)}
                  className="mt-4 rounded-full bg-[#268bd2] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2aa198] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2"
                >
                  Load 3D model
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroModel;
