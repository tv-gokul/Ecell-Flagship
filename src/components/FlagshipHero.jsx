"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import "./FlagshipHero.css";

export default function FlagshipHero({ active = false }) {
  const title = "FLAGSHIP";
  const year = "’25"; // curly apostrophe for style

  const delays = useMemo(() => {
    const base = 0.12;
    const n = title.length - 1;
    return title.split("").map((_, i) => {
      const t = i / n;
      const shaped = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      return shaped * base;
    });
  }, [title]);

  const lastDelay = delays[delays.length - 1] || 0;

  return (
    <div className="flagship-hero-shell">
      <div className="flagship-bg-layers">
        <div className="titanium-base"></div>
        <div className="hero-bg-layer" aria-hidden="true">
          <div className="radial-glow" />
          <motion.div
            className="hero-sheen"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <motion.div
            className="hero-pass"
            animate={active ? { x: ["-40%", "140%"] } : { x: "-40%" }}
            transition={{ duration: 5.2, repeat: active ? Infinity : 0, ease: "linear", delay: 0.6 }}
          />
        </div>
      </div>
      <div className="flagship-inner">
        <h1 className="flagship-title" aria-label={title + year}>
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              className="letter-wrap"
              initial={{
                y: "120%",
                opacity: 0,
                scaleY: 1.25,
                rotateX: 35,
                filter: "blur(14px)",
                skewY: "-4deg"
              }}
              animate={
                active
                  ? {
                      y: "0%",
                      opacity: 1,
                      scaleY: 1,
                      rotateX: 0,
                      skewY: "0deg",
                      filter: "blur(0px)",
                      transition: {
                        delay: 0.18 + delays[i],
                        duration: 0.9,
                        ease: [0.16, 0.84, 0.38, 1]
                      }
                    }
                  : {}
              }
            >
              <motion.span
                className="letter-core"
                initial={{ scale: 1.12 }}
                animate={
                  active
                    ? {
                        scale: 1,
                        transition: {
                          delay: 0.18 + delays[i] + 0.55,
                          duration: 0.55,
                          ease: [0.34, 1.56, 0.44, 1]
                        }
                      }
                    : { scale: 1.12 }
                }
              >
                {char}
              </motion.span>
            </motion.span>
          ))}

          <span className="year-wrap">
            {year.split("").map((c, i) => (
              <motion.span
                key={c + i}
                className="year-char"
                initial={{ y: "140%", opacity: 0, filter: "blur(10px)" }}
                animate={
                  active
                    ? {
                        y: "0%",
                        opacity: 1,
                        filter: "blur(0px)",
                        transition: {
                          delay: 0.18 + lastDelay + 0.35 + i * 0.08,
                          duration: 0.8,
                          ease: [0.2, 0.8, 0.3, 1]
                        }
                      }
                    : {}
                }
              >
                {c}
              </motion.span>
            ))}
          </span>
        </h1>
      </div>
      {/* Replace the old scroll indicator with the new multi-arrow version */}
      <a href="#about" className="arrow-container" aria-label="Scroll down">
        <div className="arrow"></div>
        <div className="arrow"></div>
        <div className="arrow"></div>
      </a>
    </div>
  );
}