"use client";
import { Heart } from "lucide-react";
import { useReducer } from "react";

export default function LoveButton() {
  const [isToggled, toggle] = useReducer((value) => !value, false);

  return (
    <Heart
      className="cursor-pointer"
      onClick={toggle}
      size={22}
      fill={isToggled ? "var(--brand)" : "transparent"}
      strokeWidth={2}
    />
  );
}
