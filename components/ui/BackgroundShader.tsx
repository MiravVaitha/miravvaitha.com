"use client";

import { useEffect, useState } from "react";
import { Warp } from "@paper-design/shaders-react";

// Paper Shaders Warp running fixed behind everything. The .has-shader class
// on <html> drops the body bg so the shader is visible.

export function BackgroundShader() {
  // Phones get a tighter pixel cap: mobile GPUs rendering the 10-iteration
  // swirl at 1.6MP compete with scroll compositing. The warp is soft, so the
  // lower resolution is invisible. Read once — matchMedia is unavailable
  // during SSR, and the canvas only sizes itself client-side anyway.
  const [maxPixels] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
      ? 900_000
      : 1_600_000,
  );

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
          // Cap the WebGL canvas regardless of devicePixelRatio. The warp is
          // soft, so rendering at display DPR (2-4x the pixels on scaled
          // Windows/retina screens) burns GPU for no visible gain and
          // competes with scroll compositing.
          maxPixelCount={maxPixels}
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
