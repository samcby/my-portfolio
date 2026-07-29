"use client";

import { memo, useEffect, useRef, useState } from "react";
import "../styles/cursor.css";

const interactiveSelector = 'a, button, [role="button"]';
const textSelector =
  'input, textarea, [contenteditable="true"], p, h1, h2, h3, h4, h5, h6, span';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [cursorType, setCursorType] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateCapability = () => {
      setEnabled(pointerQuery.matches);
      if (!pointerQuery.matches) {
        setVisible(false);
      }
    };

    updateCapability();
    pointerQuery.addEventListener("change", updateCapability);
    return () => pointerQuery.removeEventListener("change", updateCapability);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const handlePointerMove = (event) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      setVisible(true);
      if (target.closest(interactiveSelector)) {
        setCursorType("link");
      } else if (target.closest(textSelector)) {
        setCursorType("text");
      } else if (target.closest(".loading, .processing, .busy-cursor")) {
        setCursorType("busy");
      } else {
        setCursorType("");
      }
    };

    const handlePointerLeave = () => setVisible(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${cursorType} ${visible ? "is-visible" : ""}`}
      aria-hidden="true"
    />
  );
};

export default memo(CustomCursor);
