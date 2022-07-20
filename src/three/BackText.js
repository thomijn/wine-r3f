import { Text } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BackText = () => {
  const ref = useRef();

  useEffect(() => {
    gsap.to(ref.current.position, {
      x: -25,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".section-two",
        start: "-300",
        scrub: true,
        end: "end end",
        endTrigger: ".section-four",
      },
    });

    gsap.to(ref.current, {
      strokeOpacity: 0.1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".section-two",
        start: "-200",
        toggleActions: "play reverse play reverse",
        end: "-200",
        endTrigger: ".section-four",
      },
    });

    console.log(ref.current.strokeOpacity);
  }, []);

  return (
    <Text
      ref={ref}
      position={[15, 0, -10]}
      font="/Flaviotte.ttf"
      fontSize={8}
      strokeColor={"#fff"}
      fillOpacity={0}
      strokeOpacity={0}
      strokeWidth={0.05}
      anchorX="center"
      anchorY="middle"
    >
      Great Wines
    </Text>
  );
};

export default BackText;
