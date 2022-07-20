import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";
import { useStore } from "./store";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };
gsap.registerPlugin(ScrollTrigger);

const variants = {
  initial: {
    y: 400,
  },
  animate: (custom) => ({
    y: 0,
    transition: {
      duration: 1,
      ...transition,
      delay: custom.delay * 0.05 + custom.extraDelay,
    },
  }),
};

const UI = () => {
  const { loading } = useStore();
  const ref = useRef();
  const animationControls = useAnimationControls(variants);

  useEffect(() => {
    if (!loading) {
      animationControls.start("animate");
    }
  }, [loading]);

  useEffect(() => {
    gsap.to(ref.current, {
      opacity: 0,
      // ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".section-one",
        start: 50,
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <>
      <TopBar>
        <h2>Great wines</h2>
      </TopBar>
      <Wrapper ref={ref}>
        <motion.div>
          <div style={{ overflow: "hidden" }}>
            {"The Great".split("").map((letter, i) =>
              letter === " " ? (
                <span key={i}>&nbsp;</span>
              ) : (
                <motion.span
                  initial={{ y: 200 }}
                  key={i}
                  custom={{ delay: i, extraDelay: 1.5 }}
                  variants={variants}
                  animate={animationControls}
                >
                  {letter}
                </motion.span>
              )
            )}
          </div>
          <div style={{ overflow: "hidden" }}>
            {"Itialian Wines".split("").map((letter, i) =>
              letter === " " ? (
                <span key={i}>&nbsp;</span>
              ) : (
                <motion.span
                  initial={{ y: 200 }}
                  key={i}
                  custom={{ delay: i, extraDelay: 1.7 }}
                  variants={variants}
                  animate={animationControls}
                >
                  {letter}
                </motion.span>
              )
            )}
          </div>
          <div style={{ overflow: "hidden" }}>
            {"With A History".split("").map((letter, i) =>
              letter === " " ? (
                <span key={i}>&nbsp;</span>
              ) : (
                <motion.span
                  initial={{ y: 200 }}
                  key={i}
                  custom={{ delay: i, extraDelay: 1.9 }}
                  variants={variants}
                  animate={animationControls}
                >
                  {letter}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </Wrapper>
    </>
  );
};

const Letter = ({ space, letter }) => {
  return space == true ? (
    <div className="text">&nbsp;</div>
  ) : (
    <div className="text">{letter}</div>
  );
};

const TopBar = styled.div`
  position: absolute;
  top: 3vh;
  left: 10vh;
  z-index: 2;

  @media (max-width: 768px) {
    top: 32px;
    left: 32px;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 10vh;
  left: 10vh;
  z-index: 2;
  overflow-x: hidden;

  span {
    display: inline-block;
    font-size: 5rem;
    font-family: "Harmony";
    color: #fff;
  }

  @media (max-width: 768px) {
    bottom: 32px;
    left: 32px;

    span {
      font-size: 2.5rem;
    }
  }
`;

export default UI;
