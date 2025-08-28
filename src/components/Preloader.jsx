"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import "./Preloader.css";

/*
  Counts 1 → 100
  - 1..9: shows only ones column (optionally space holder for tens)
  - 10..99: shows tens + ones
  - 100: shows hundreds + tens + ones (100%)
*/

const START_VALUE = 1;
const END_VALUE = 100;
const DURATION_MS = 1800;
const HOLD_MS = 250;
const FADE_MS = 600;
const SHOW_LEADING_ZERO_UNDER_10 = false; // set true for 01..09

function DigitColumn({ place, valueMV, endValue }) {
  const sampleRef = useRef(null);
  const [cellH, setCellH] = useState(0);

  useEffect(() => {
    if (sampleRef.current) {
      setCellH(sampleRef.current.getBoundingClientRect().height);
    }
  }, []);

  const y = useTransform(valueMV, (latest) => {
    if (!cellH) return 0;
    const clamped = Math.min(Math.max(latest, START_VALUE), endValue);
    const whole = Math.floor(clamped);

    const placeDigit = Math.floor(whole / place) % 10;

    // smooth fractional scroll inside this place
    let placeProgress = (clamped % place) / place;

    // At exact end, lock digits (prevents visual overshoot)
    if (clamped >= endValue) placeProgress = 0;

    const travel = placeDigit + placeProgress;
    return -travel * cellH;
  });

  return (
    <div className="digit-col">
      <motion.div className="digit-strip" style={{ y }}>
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} ref={i === 0 ? sampleRef : null} className="digit-cell">
            {i % 10}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Preloader({ onFinish }) {
  const valueMV = useMotionValue(START_VALUE);
  const [done, setDone] = useState(false);
  const [current, setCurrent] = useState(START_VALUE);

  useEffect(() => {
    const controls = animate(valueMV, END_VALUE, {
      duration: DURATION_MS / 1000,
      ease: "linear",
      onUpdate: (v) => setCurrent(Math.floor(v)),
      onComplete: () => {
        setTimeout(() => {
          setDone(true);
          setTimeout(onFinish, FADE_MS);
        }, HOLD_MS);
        window.__preloaderDone = true;
        window.dispatchEvent(new Event("preloader:done"));
      }
    });
    return () => controls.stop();
  }, [valueMV, onFinish]);

  const showTens = SHOW_LEADING_ZERO_UNDER_10 ? true : current >= 10;
  const showHundreds = current >= 100;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader-container"
          exit={{ opacity: 0, transition: { duration: FADE_MS / 700 } }}
        >
          <div className="digits-row">
            {showHundreds && (
              <DigitColumn place={100} valueMV={valueMV} endValue={END_VALUE} />
            )}
            {showTens ? (
              <DigitColumn place={10} valueMV={valueMV} endValue={END_VALUE} />
            ) : (
              <div style={{ width: showHundreds ? "0.7em" : 0 }} />
            )}
            <DigitColumn place={1} valueMV={valueMV} endValue={END_VALUE} />
            <span className="percent-symbol">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}