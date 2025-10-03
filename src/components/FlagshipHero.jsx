"use client";
import React, { useMemo, useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import "./FlagshipHero.css";
import logo from "../assets/logo.webp";

function StatCounter({ value, label, active }) {
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        delay: 1.5, // Start after other animations
        ease: "easeOut",
        onUpdate(latest) {
          ref.current.textContent = Math.round(latest).toLocaleString();
        },
      });
      return () => controls.stop();
    }
  }, [active, value]);

  return (
    <div className="stat-item">
      <p className="stat-number">
        <span ref={ref}>0</span>+
      </p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

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
        <motion.h2
          className="presenter-title"
          initial={{ y: -20, opacity: 0 }}
          animate={active ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        >
          E-CELL VNIT presents      
        </motion.h2>
        <img src={logo} alt="E-Cell Logo" className="hero-logo" />
        <h1 className="flagship-title" aria-label={title + year}>
          <span className="title-content">
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
                            ease: [0.2, 0.8, 0.3, 1],
                          },
                        }
                      : {}
                  }
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </span>
        </h1>

        <div className="hero-details">
          <motion.p
            className="event-info"
            initial={{ y: 20, opacity: 0 }}
            animate={active ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            This year Flagship'25 is happening on the 5th of October. Venue: VNIT Auditorium from 5 pm
          </motion.p>

          <div className="stats-container">
            <StatCounter value={10000} label="Reach" active={active} />
            <StatCounter value={5000} label="Footfall" active={active} />
            <StatCounter value={3} label="Speakers" active={active} />
          </div>
        </div>
      </div>
      {/* Arrow container removed */}
    </div>
  );
}