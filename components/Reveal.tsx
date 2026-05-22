"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.06,
    },
  }),
};

export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  );
}
