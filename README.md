# ITZFIZZ Scroll-Driven Car Animation Recreation

An exact, high-fidelity recreation of the **ITZFIZZ** hero section scroll-driven car animation inspired by the live reference: [https://paraschaturvedi.github.io/car-scroll-animation/](https://paraschaturvedi.github.io/car-scroll-animation/).

Built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, and **GSAP 3 with ScrollTrigger**.

---

## 🚗 Live Features & Animation Mechanics

1. **Pinned Hero Track**:
   - The hero section spans a `200vh` height container with a sticky `100vh` viewport track pinned during scrolling.
2. **Scroll-Driven Car Drive**:
   - The top-view McLaren car translates horizontally across the road in direct proportion to scroll progress (`scrub: true`).
3. **Dynamic Green Trail Alignment**:
   - The green background trail grows in real time behind the car, keeping its leading edge perfectly synchronized with the car's center position.
4. **Headline Letter Reveals (`W E L C O M E   I T Z F I Z Z`)**:
   - Headline letters fade from `opacity: 0` to `opacity: 1` letter-by-letter as the car's center position passes each letter's horizontal coordinate.
5. **Staggered Statistics Cards**:
   - 4 percentage-based metric cards (`58%`, `23%`, `27%`, `40%`) fade in smoothly at configured scroll progress thresholds.
6. **Responsive & Resize Resilient**:
   - Recalculates letter offsets, car widths, and viewport bounds dynamically on window resize without breaking scroll alignment.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Static Export)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation Engine**: [GSAP 3](https://gsap.com/) & [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js `20.x` or higher
- npm `10.x` or higher

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Niriksha9845/car-scroll-animation.git
   cd car-scroll-animation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Export

To test the static export build locally:

```bash
npm run build
```

This generates an optimized static export bundle in the `out/` directory.

---

## 🌐 Deploying to GitHub Pages

This repository includes an automated GitHub Actions deployment workflow (`.github/workflows/deploy.yml`).

### Setup Steps:
1. Push your repository to GitHub (`main` branch).
2. Go to your repository **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Push to `main` to trigger the automated build and deployment.
5. If your repository name is `car-scroll-animation`, set the `NEXT_PUBLIC_BASE_PATH` secret or repository variable to `/car-scroll-animation` if deploying under a subpath.

---

## 🎓 Beginners' Animation Synchronization Explanation

### How Car Movement, Green Trail, Headline, and Statistics Stay in Sync

1. **One Master Timeline / Scroll Trigger**:
   - GSAP's `ScrollTrigger` attaches to the main `.section` element. As the user scrolls through the 200vh distance, `ScrollTrigger` reports a normalized scroll progress value from `0.0` (top) to `1.0` (bottom).

2. **Car Position**:
   - The total travel distance is calculated as `endX = roadWidth - carWidth`.
   - At scroll progress `progress`, the car's current position is `currentX = progress * endX`.

3. **Green Trail Width**:
   - The car's front/center coordinate is `carCenterX = currentX + carWidth / 2`.
   - On every scroll tick (`onUpdate`), we set `trail.style.width = carCenterX + 'px'`. Because both the car translate transform and the trail width update inside the same tick handler, they can never drift apart.

4. **Headline Letter Reveal**:
   - Before scrolling begins, we measure each letter's exact horizontal position relative to the left edge of the page (`letterX`).
   - On every scroll update, we check if `carCenterX >= letterX`. If true, we set that letter's opacity to `1`; otherwise `0`.

5. **Statistics Cards**:
   - Each statistic card (`58%`, `23%`, `27%`, `40%`) has its own ScrollTrigger trigger threshold (e.g. `top+=200px` to `top+=400px`). As scroll progress enters these windows, GSAP interpolates card opacities smoothly.
