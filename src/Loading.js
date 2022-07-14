import styled from "styled-components";
import { motion } from "framer-motion";
import { useStore } from "./store";

const Loading = () => {
  const { setLoading } = useStore();
  return (
    <>
      <Wrapper transition={{ duration: 1 }} exit={{ opacity: 0 }}>
        <Svg viewBox="0 0 100 100" initial="hidden" animate="visible">
          <motion.circle
            cx="50"
            cy="50"
            r="49"
            fillOpacity={0}
            stroke="#fff"
            strokeWidth={0.4}
            onAnimationComplete={() => setLoading(false)}
            transition={{ duration: 2 }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            custom={1}
          />
        </Svg>
        <h1>Loading</h1>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2a2a2a;

  z-index: 4;

  h1 {
    z-index: 5;
    color: #fff;
    font-size: 1.5rem;
    font-family: "Harmony";
  }
`;

const Svg = styled(motion.svg)`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Loading;
