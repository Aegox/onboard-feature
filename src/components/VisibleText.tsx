import { useEffect, useState } from "react";

interface VisibleTextProps {
  text: string;
  isVisible: boolean;
  className?: string;
}

export default function VisibleText({
  text,
  isVisible,
  className = "",
}: VisibleTextProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldAnimate(true);
      const timer = setTimeout(() => setShouldAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <span
      className={`text-[1.2rem] leading-6 overflow-hidden whitespace-nowrap transition-all duration-300 ${
        shouldAnimate ? "animate-typing" : ""
      } ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {text}
    </span>
  );
}

