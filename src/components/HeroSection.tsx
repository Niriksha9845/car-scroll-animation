"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HEADLINE_LETTERS = [
  "W", "E", "L", "C", "O", "M", "E", " ", "I", "T", "Z", "F", "I", "Z", "Z"
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const valueAddRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const carImageSrc = `${basePath}/McLaren 720S 2022 top view.png`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const car = carRef.current;
      const trail = trailRef.current;
      const valueAdd = valueAddRef.current;

      if (!section || !track || !car || !trail || !valueAdd) return;

      const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];

      const getMeasurements = () => {
        const valueRect = valueAdd.getBoundingClientRect();
        const letterOffsets = letters.map((letter) => letter.offsetLeft);
        const roadWidth = window.innerWidth;
        const carWidth = car.offsetWidth || 150;
        const endX = roadWidth - carWidth;

        return { valueRect, letterOffsets, carWidth, endX };
      };

      let bounds = getMeasurements();

      const handleResize = () => {
        bounds = getMeasurements();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      // Main car drive timeline pinned to scroll
      gsap.to(car, {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: track,
          anticipatePin: 1,
        },
        x: () => bounds.endX,
        ease: "none",
        onUpdate: function () {
          const currentX = gsap.getProperty(car, "x") as number;
          const carX = currentX + bounds.carWidth / 2;

          letters.forEach((letter, i) => {
            const letterX = bounds.valueRect.left + bounds.letterOffsets[i];
            if (carX >= letterX) {
              letter.style.opacity = "1";
            } else {
              letter.style.opacity = "0";
            }
          });

          gsap.set(trail, { width: carX });
        },
      });

      // Box 1 ScrollTrigger
      gsap.to("#box1", {
        scrollTrigger: {
          trigger: section,
          start: "top+=15% top",
          end: "top+=35% top",
          scrub: true,
        },
        opacity: 1,
      });

      // Box 2 ScrollTrigger
      gsap.to("#box2", {
        scrollTrigger: {
          trigger: section,
          start: "top+=35% top",
          end: "top+=55% top",
          scrub: true,
        },
        opacity: 1,
      });

      // Box 3 ScrollTrigger
      gsap.to("#box3", {
        scrollTrigger: {
          trigger: section,
          start: "top+=50% top",
          end: "top+=70% top",
          scrub: true,
        },
        opacity: 1,
      });

      // Box 4 ScrollTrigger
      gsap.to("#box4", {
        scrollTrigger: {
          trigger: section,
          start: "top+=70% top",
          end: "top+=90% top",
          scrub: true,
        },
        opacity: 1,
      });

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#121212]">
      <section ref={sectionRef} className="section relative h-[250vh] w-full bg-[#121212]">
        <div ref={trackRef} className="track sticky top-0 h-screen w-full flex items-center justify-center bg-[#d1d1d1] overflow-hidden">
          {/* Horizontal Road */}
          <div className="road relative w-full h-[220px] bg-[#1e1e1e] overflow-hidden select-none" id="road">
            {/* Top View McLaren Car */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={carRef}
              src={carImageSrc}
              alt="car"
              className="car"
              id="car"
              style={{
                height: "220px",
                width: "auto",
                maxWidth: "none",
                maxHeight: "220px",
                objectFit: "contain",
              }}
            />

            {/* Green Progress Trail */}
            <div ref={trailRef} className="trail absolute top-0 left-0 h-[220px] bg-[#45db7d] z-[1] w-0" id="trail" />

            {/* Headline Text WELCOME ITZFIZZ */}
            <div ref={valueAddRef} className="value-add" id="valueText">
              {HEADLINE_LETTERS.map((char, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    letterRefs.current[index] = el;
                  }}
                  className="value-letter"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>

          {/* Stat Box 1 */}
          <div id="box1" className="text-box">
            <span className="num-box">58%</span>
            <span>Increase in pick up point use</span>
          </div>

          {/* Stat Box 2 */}
          <div id="box2" className="text-box">
            <span className="num-box">23%</span>
            <span>Decreased in customer phone calls</span>
          </div>

          {/* Stat Box 3 */}
          <div id="box3" className="text-box">
            <span className="num-box">27%</span>
            <span>Increase in pick up point use</span>
          </div>

          {/* Stat Box 4 */}
          <div id="box4" className="text-box">
            <span className="num-box">40%</span>
            <span>Decreased in customer phone calls</span>
          </div>
        </div>
      </section>
    </div>
  );
}
