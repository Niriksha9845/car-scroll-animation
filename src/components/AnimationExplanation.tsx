"use client";

import React, { useState } from "react";

export default function AnimationExplanation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="w-full bg-[#1e1e1e] border-t border-slate-800 text-slate-300 py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            ITZFIZZ Scroll-Driven Animation
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Built with Next.js, React, Tailwind CSS, &amp; GSAP ScrollTrigger
          </p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-5 py-2.5 bg-[#45db7d] text-slate-950 font-semibold rounded-lg hover:bg-[#3bc46f] transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>{isOpen ? "Hide Architecture & Sync Logic" : "How The Animation Works"}</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="max-w-4xl mx-auto mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-slate-900/60 p-5 rounded-lg border border-slate-800">
            <h3 className="text-base font-semibold text-[#def54f] mb-2">
              1. Scroll Pinning &amp; Car Drive
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The hero section uses GSAP ScrollTrigger with <code className="bg-slate-800 px-1 py-0.5 rounded text-[#45db7d]">pin: track</code> over a <code className="bg-slate-800 px-1 py-0.5 rounded">200vh</code> section. As the user scrolls, the viewport stays locked while scroll progress (<code className="bg-slate-800 px-1 py-0.5 rounded">scrub: true</code>) directly drives the car&apos;s horizontal translate position from <code className="bg-slate-800 px-1 py-0.5 rounded">x = 0</code> to <code className="bg-slate-800 px-1 py-0.5 rounded">x = endX</code>.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-lg border border-slate-800">
            <h3 className="text-base font-semibold text-[#6ac9ff] mb-2">
              2. Synchronized Green Trail
            </h3>
            <p className="text-slate-300 leading-relaxed">
              On every scroll update event, the car&apos;s center position (<code className="bg-slate-800 px-1 py-0.5 rounded">carCenterX = x + carWidth / 2</code>) is calculated. The green trail layer width is updated to match <code className="bg-slate-800 px-1 py-0.5 rounded">carCenterX</code> in real-time, ensuring its leading edge always stays perfectly attached to the moving car.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-lg border border-slate-800">
            <h3 className="text-base font-semibold text-[#fa7328] mb-2">
              3. Letter-by-Letter Headline Reveal
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Each letter of &ldquo;W E L C O M E I T Z F I Z Z&rdquo; is measured for its horizontal offset. As <code className="bg-slate-800 px-1 py-0.5 rounded">carCenterX</code> crosses the position of each letter, that letter&apos;s opacity transitions from <code className="bg-slate-800 px-1 py-0.5 rounded">0</code> to <code className="bg-slate-800 px-1 py-0.5 rounded">1</code>, creating the signature reveal effect.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-lg border border-slate-800">
            <h3 className="text-base font-semibold text-white mb-2">
              4. Staggered Statistics Cards
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The 4 percentage metric cards use staggered ScrollTrigger scroll thresholds (<code className="bg-slate-800 px-1 py-0.5 rounded">top+=200px</code>, <code className="bg-slate-800 px-1 py-0.5 rounded">top+=400px</code>, etc.). Fading in smoothly as the car reaches their respective scroll points.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
