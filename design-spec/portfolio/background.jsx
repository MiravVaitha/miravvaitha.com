// Background — Paper Shaders Warp running fixed behind everything.
// Original prompt from 21st.dev/community.

const { useEffect, useState } = React;

function BackgroundShader() {
  const [ready, setReady] = useState(!!window.Warp);

  useEffect(() => {
    if (ready) {
      document.documentElement.classList.add("has-shader");
      return;
    }
    const onReady = () => setReady(true);
    window.addEventListener("shaders-ready", onReady);
    return () => window.removeEventListener("shaders-ready", onReady);
  }, [ready]);

  if (!ready) return null;
  const Warp = window.Warp;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

Object.assign(window, { BackgroundShader });
