import { AnimatePresence } from "framer-motion";
import { Leva } from "leva";

import Loading from "./Loading";
import { useStore } from "./store";
import Three from "./three/Three";
import UI from "./UI";

function App() {
  const { loading } = useStore();

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          height: "100%",
          width: "100%",
        }}
      >
        <div
          className="section-one"
          style={{
            height: "100vh",
            width: "100%",
            position: "relative",
            zIndex: 0,
            top: 0,
            background: "#161615",
            overflowX: "hidden",
          }}
        />
        <div
          className="section-two"
          style={{
            height: "100vh",
            width: "100%",
            position: "relative",
            zIndex: 0,
            top: 0,
            background: "#161615",
          }}
        />
        <div
          className="section-three"
          style={{
            height: "50vh",
            width: "100%",
            position: "relative",
            zIndex: 0,
            top: 0,
            background: "#161615",
          }}
        />
        <div
          className="section-four"
          style={{
            height: "100vh",
            width: "100%",
            position: "relative",
            zIndex: 0,
            top: 0,
            background: "#161615",
          }}
        />
      </div>
      <AnimatePresence>{loading && <Loading key="loading" />}</AnimatePresence>
      <UI />

      <Three />
      <Leva hidden />
    </>
  );
}

export default App;
