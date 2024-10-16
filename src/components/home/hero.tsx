"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { GITHUB_REPO_URL } from "@/constants/site";

const Hero = () => {
  return (
    <section className="grid gap-8 max-w-3xl mx-auto text-center">
      <motion.svg
        className="w-24 h-24 justify-self-center"
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
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
        Craft your perfect syntax
      </h1>
      <p className="text-lg font-medium text-muted-foreground">
        Powerful editor for TextMate themes. Easily customize colors, preview in
        real-time, and export your perfect syntax highlighting theme.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={"/editor"}
          className={buttonVariants({
            size: "lg",
          })}
        >
          Create Theme
        </Link>
        <Link
          href={GITHUB_REPO_URL}
          target={"_blank"}
          className={buttonVariants({
            size: "lg",
            variant: "outline",
          })}
        >
          <GitHubLogoIcon className="mr-2 h-5 w-5" />
          Star on Github
        </Link>
      </div>
    </section>
  );
};

export default Hero;
