import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { useControls } from "leva";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Bubbles() {
  // we use this array ref to store the spheres after creating them
  const [sphereRefs] = useState(() => []);
  const ref = useRef();
  // we use this array to initialize the background spheres
  const initialPositions = [
    [-4, 20, -12],
    [-10, 12, -4],
    [-11, -12, -23],
    [-16, -6, -10],
    [12, -2, -3],
    [13, 4, -12],
    [14, -2, -23],
    [8, 10, -20],
  ];
  // smaller spheres movement
  useFrame(() => {
    // animate each sphere in the array
    sphereRefs.forEach((el) => {
      el.position.y += 0.02;
      if (el.position.y > 19) el.position.y = -18;
      el.rotation.x += 0.001;
      el.rotation.y += 0.001;
      el.rotation.z += 0.001;
    });
  });

  useEffect(() => {
    let anim = gsap.timeline();

    anim.to(ref.current.position, {
      y: 32.79,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".section-one",
        scrub: 1,
        start: "center center",
        end: "top top",
        endTrigger: ".section-two",
      },
    });

    return () => {};
  }, []);

  const [material, set] = useState();
  const { splashColor } = useControls({ splashColor: "#6c2d2d" });

  return (
    <group ref={ref} position={[0, 0, -10]}>
      <MeshDistortMaterial
        ref={set}
        color={splashColor}
        roughness={0.1}
        metalness={0}
        transmission={0.1}
        thickness={0.5}
        // bumpScale={0.005}
        radius={1}
        speed={2}
        distort={0.8}
      />
      {initialPositions.map((pos, i) => (
        <Icosahedron
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          material={material}
          scale={0.5}
          key={i}
          ref={(ref) => (sphereRefs[i] = ref)}
        />
      ))}
    </group>
  );
}
