"use client";

import { useEffect } from "react";
import { Warp } from "@paper-design/shaders-react";

// Paper Shaders Warp running fixed behind everything. The .has-shader class
// on <html> drops the body bg so the shader is visible.

export function BackgroundShader() {
  useEffect(() => {
    document.documentElement.classList.add("has-shader");
    return () => {
      document.documentElement.classList.remove("has-shader");
    };
  }, []);

  return (
    <>
      <div className="bg-shader" aria-hidden>
        <Warp
          style={{ width: "100%", height: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={[
            "hsl(203, 100%, 62%)",
            "hsl(255, 100%, 72%)",
            "hsl(158, 99%, 59%)",
            "hsl(264, 100%, 61%)",
          ]}
        />
      </div>
      <div className="bg-shader-overlay" aria-hidden />
    </>
  );
}
