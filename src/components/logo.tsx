import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <motion.svg
      className={cn("size-8 justify-self-center", className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.rect
        width="100"
        height="100"
        rx="10"
        fill="hsl(var(--background))"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.rect
        x="10"
        y="10"
        width="80"
        height="15"
        rx="2"
        fill="hsl(var(--primary))"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      />
      <motion.rect
        x="10"
        y="30"
        width="60"
        height="10"
        rx="2"
        fill="hsl(var(--chart-1))"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
      />
      <motion.rect
        x="10"
        y="45"
        width="70"
        height="10"
        rx="2"
        fill="hsl(var(--chart-2))"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
      />
      <motion.rect
        x="10"
        y="60"
        width="50"
        height="10"
        rx="2"
        fill="hsl(var(--chart-3))"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.85, duration: 0.5, ease: "easeOut" }}
      />
      <motion.rect
        x="10"
        y="75"
        width="65"
        height="10"
        rx="2"
        fill="hsl(var(--chart-4))"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      />
    </motion.svg>
  );
};

export default Logo;
