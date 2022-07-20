import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function RotateRing() {
  const ref = useRef();
  const geometry = useMemo(() => {
    const vertices = [];
    const divisions = 128;

    for (let i = 0; i <= divisions; i++) {
      const v = (i / divisions) * (Math.PI * 2);
      const x = Math.sin(v);
      const y = Math.cos(v);
      vertices.push(x, y, 0);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    return geometry;
  }, []);

  useFrame(() => {
    ref.current.rotation.z += 0.004;
  });

  useEffect(() => {
    gsap.to(ref.current.material, {
      opacity: 1,
      duration: 0.2,
      scrollTrigger: {
        trigger: ".section-two",
        start: "center center+=100",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(ref.current.material, {
      opacity: 0,
      duration: 0.2,
      scrollTrigger: {
        trigger: ".section-four",
        start: "center center",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(".drag", {
      opacity: 1,
      duration: 0.2,
      scrollTrigger: {
        trigger: ".section-two",
        start: "center center+=100",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(".drag", {
      opacity: 0,
      duration: 0.2,
      scrollTrigger: {
        trigger: ".section-four",
        start: "center center",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <group>
      <Html
        position={[0.5, 0.35, 0]}
        wrapperClass="drag"
        style={{ position: "fixed !important" }}
      >
        <DragWrapper>
          <p>
            Drag to <br /> rotate me!
          </p>
        </DragWrapper>
      </Html>
      <line
        ref={ref}
        rotation={[Math.PI * 0.4, 0, 0]}
        position={[0, 0, 0]}
        onUpdate={(line) => line.computeLineDistances()}
        geometry={geometry}
        scale={[0.5, 0.5, 0.5]}
      >
        <lineDashedMaterial
          opacity={0}
          transparent
          lineWidth={2}
          color="white"
          dashSize={0.2}
          gapSize={0.1}
        />
      </line>
    </group>
  );
}

const DragWrapper = styled.div`
  position: fixed;
  width: 300px;
  z-index: 2;

  p {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    font-family: "Harmony";
    /* transform: translate(150px, -20px); */
  }
`;

export default RotateRing;
