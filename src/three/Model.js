import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Model({ ...props }) {
  const group = useRef();
  const wine = useRef();
  const glass = useRef();
  const { nodes, materials } = useGLTF("/wine-demo.glb");

  useEffect(() => {
    let anim = gsap.timeline();

    anim.to(wine.current.rotation, {
      y: 2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".section-one",
        scrub: 1,
        start: "center center",
        end: "top top",
        endTrigger: ".section-two",
      },
    });

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

  console.log(window.innerWidth);

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
        ref={wine}
        initial={{ y: -6, rotateY: -4 }}
        animate={{ y: 0, rotateY: 1.7 }}
        transition={{ delay: 4, duration: 2.5, ease: "easeInOut" }}
        position={[0, 0, window.innerWidth < 600 ? 1 : 2.5]}
        rotation={[-Math.PI, 1.57, 0]}
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
