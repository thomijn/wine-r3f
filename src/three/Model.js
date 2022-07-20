import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDrag } from "react-use-gesture";
import { useSpring } from "framer-motion";
import { useFrame } from "@react-three/fiber";
gsap.registerPlugin(ScrollTrigger);

export default function Model({ ...props }) {
  const group = useRef();
  const wine = useRef();
  const glass = useRef();
  const { nodes, materials } = useGLTF("/wine-demo.glb");
  const rotationX = useSpring(1.7, { stiffness: 200, damping: 10 });
  const [hovered, setHovered] = useState(false);
  const [done, setDone] = useState(false);
  useCursor(hovered, "grab");

  useFrame(() => {
    if (!done && wine.current.position.z === 0) {
      setDone(true);
    } else if (done && wine.current.position.z !== 0) {
      setDone(false);
      rotationX.set(1.7);
    }
  });

  let anim = gsap.timeline();
  useEffect(() => {
    anim.fromTo(
      wine.current.rotation,
      { y: -4 },
      {
        y: 1.7,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".section-one",
          scrub: true,
          start: "top top",
          end: "top top",
          endTrigger: ".section-two",
        },
      }
    );

    anim.to(wine.current.position, {
      z: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".section-one",
        scrub: 1,
        start: "center center",
        end: "top top",
        endTrigger: ".section-two",
      },
    });

    anim.to(glass.current.position, {
      z: -10.2,
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

  const bind = useDrag(({ movement: [x], down }) => {
    if (done) {
      if (!down) {
        rotationX.set(1.7);
      } else {
        rotationX.set(-x / 100 + 1.7);
      }
    }
  });

  return (
    <group
      ref={group}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI * 0.5, 0]}
      {...props}
      dispose={null}
    >
      <motion.group
        ref={glass}
        initial={{ y: -6, rotateY: -4 }}
        animate={{ y: 0, rotateY: 0 }}
        transition={{ delay: 4, duration: 2.5, ease: "easeInOut" }}
      >
        <mesh
          castShadow
          geometry={nodes.NurbsPath.geometry}
          material={materials["clear glass"]}
          position={[0, 2.58, window.innerWidth < 600 ? -0.5 : 0.8]}
          rotation={[Math.PI / 0.2, Math.PI / 0.35, 0.9]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NurbsPath001.geometry}
          material={materials["clear glass"]}
          position={[0, 2.58, window.innerWidth < 600 ? -0.5 : 0.8]}
          rotation={[Math.PI / 0.2, Math.PI / 0.35, 0.9]}
        >
          <meshStandardMaterial color="#58181F" />
        </mesh>
      </motion.group>
      <motion.group
        onPointerOver={() => done && setHovered(true)}
        onPointerOut={() => done && setHovered(false)}
        ref={wine}
        {...bind()}
        transition={{ delay: 4, duration: 2.5, ease: "easeInOut" }}
        position={[0, 0, window.innerWidth < 600 ? 1 : 2.5]}
        rotation={[Math.PI, rotationX, 0]}
      >
        <mesh castShadow geometry={nodes.Circle_1.geometry}>
          <meshPhysicalMaterial roughness={0} color="black" />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle_2.geometry}
          material={materials.red}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle_3.geometry}
          material={materials["Material.001"]}
        />
      </motion.group>
    </group>
  );
}

useGLTF.preload("/wine-demo.glb");
