import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { LayerMaterial, Depth, Noise } from "lamina";
import * as THREE from "three";
import { useControls } from "leva";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

import Model from "./Model";
import Bubbles from "./Bubbles";

export default function Three() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
      <Suspense fallback={null}>
        <EnvironmentMap />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
          <Model scale={0.6} />
        </Float>
        <Bubbles />
      </Suspense>
      {/* <Effects /> */}
    </Canvas>
  );
}

const Effects = () => {
  return (
    <EffectComposer multisampling={0} disableNormalPass={true}>
      <DepthOfField
        focusDistance={0}
        focalLength={0.08}
        bokehScale={4}
        height={480}
      />
    </EffectComposer>
  );
};

const EnvironmentMap = () => {
  const { colorA, colorB } = useControls({ colorA: "#fff", colorB: "#2a2a2a" });

  return (
    <Environment resolution={64}>
      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[10, 5, 0]}
        scale={[10, 10, 1]}
      />
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Depth
            colorA={colorA}
            colorB={colorB}
            alpha={1}
            mode="normal"
            near={0}
            far={200}
            origin={[100, 100, 100]}
          />
          <Noise mapping="local" type="curl" scale={0.5} mode="softlight" />
        </LayerMaterial>
      </mesh>
    </Environment>
  );
};
