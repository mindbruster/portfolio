"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const checkHover = () => {
      const target = document.elementFromPoint(mousePos.x, mousePos.y);
      const isInteractive = target?.matches("a, button, input, textarea, [role='button']");
      setIsHovering(isInteractive || false);
    };

    window.addEventListener("mousemove", updateMousePos);
    window.addEventListener("mousemove", checkHover);

    return () => {
      window.removeEventListener("mousemove", updateMousePos);
      window.removeEventListener("mousemove", checkHover);
    };
  }, [mousePos]);

  return (
    <>
      <div
        className="cursor-glow pointer-events-none"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: isHovering ? "translate(-50%, -50%) scale(1.5)" : "translate(-50%, -50%)",
          opacity: isHovering ? 0.6 : 0.3,
        }}
      />
    </>
  );
}

