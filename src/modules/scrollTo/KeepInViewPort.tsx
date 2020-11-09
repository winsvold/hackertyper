import React, { useEffect, useRef } from "react";

function KeepInViewPort() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => ref.current?.scrollIntoView({ behavior: "smooth" }), 200);
    return () => clearInterval(interval);
  }, []);

  return <div ref={ref} />;
}

export default KeepInViewPort;
