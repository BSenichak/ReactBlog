import React, { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { TransitionGroup, CSSTransition, SwitchTransition } from "react-transition-group";
import "../assets/styles/transitions.css";

export default function AppRouter() {
  let location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup component={null}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          classNames="page"
          timeout={300}
        >
          <div ref={nodeRef}>
            <Routes location={location}>
              <Route path="/" element={<h1>Hello</h1>} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </TransitionGroup>
  );
}
