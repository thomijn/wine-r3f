import { useRef, useEffect } from "react";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrame } from "@react-three/fiber";
import lerp from "lerp";
gsap.registerPlugin(ScrollTrigger);

const BigBubble = () => {
  const ref = useRef();

  useFrame(({ mouse }) => {
    ref.current.position.x = lerp(ref.current.position.x, mouse.x / 2, 0.05);
    ref.current.position.y = lerp(ref.current.position.y, mouse.y / 2, 0.05);
    // ref.current.position.y = mouse.y / 5;
    // ref.current.position.x = mouse.x / 5;
  });

  useEffect(() => {
    gsap.to(ref.current.scale, {
      x: 2,
      y: 2,
      z: 0.4,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".section-one",
        start: "200",
        scrub: true,
        end: "end end",
        endTrigger: ".section-two",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.to(ref.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".section-three",
        start: "0",
        scrub: true,
        end: "end end",
        endTrigger: ".section-four",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <Icosahedron ref={ref} args={[1, 16]} scale={0} position={[0, 0, -5]}>
      <MeshDistortMaterial
        color={"#6c2d2d"}
        roughness={0.3}
        metalness={0}
        radius={1}
        speed={1}
        distort={0.8}
      />
    </Icosahedron>
  );
};

export default BigBubble;
