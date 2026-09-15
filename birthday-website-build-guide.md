# Romantic Birthday Website — Module-by-Module Build Guide

A complete, detailed build plan for a frontend-only **Next.js (JavaScript, App Router)** romantic birthday website. Follow the modules in order — each one is a working checkpoint before you move to the next.

**Stack:** Next.js (JS, App Router) · Tailwind CSS · Framer Motion · lucide-react · canvas-confetti

---

## Module 0 — Project Setup

**Goal:** A running Next.js project with all dependencies installed.

### Steps
1. Scaffold the project:
   ```bash
   npx create-next-app@latest birthday-website
   ```
   When prompted:
   - TypeScript → **No**
   - App Router → **Yes**
   - Tailwind CSS → **Yes**
   - `src/` directory → your choice (guide assumes **no** `src/`, i.e. `app/` at root)

2. Install dependencies:
   ```bash
   cd birthday-website
   npm install framer-motion canvas-confetti lucide-react
   ```

3. Clean up boilerplate:
   - Empty out `app/page.jsx` (keep a bare `export default function Home() { return <main></main>; }`)
   - Delete unused boilerplate CSS in `app/globals.css`, keep the three `@tailwind` directives at the top.

4. Create your folder structure:
   ```
   app/
     layout.jsx
     page.jsx
     globals.css
   components/
     LockScreen.jsx
     HeroSection.jsx
     FloatingHearts.jsx
     MusicPlayer.jsx
     Timeline.jsx
     MemoryCard.jsx
     LoveReasons.jsx
     LoveCoupons.jsx
     FinalWish.jsx
   data/
     memories.js
     loveReasons.js
     coupons.js
   public/
     audio/
       romantic.mp3
     images/
       (your photos)
   ```

5. Verify it runs:
   ```bash
   npm run dev
   ```

**Checkpoint:** Blank page loads at `localhost:3000` with no console errors.

---

## Module 1 — Global Layout & Theme

**Goal:** Set the visual foundation (fonts, colors, gradients) used by every other module.

### 1.1 Fonts
In `app/layout.jsx`, import a romantic font pairing from `next/font/google` — e.g. a serif display font for headings and a clean sans for body text:

```jsx
import { Playfair_Display, Poppins } from "next/font/google";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const body = Poppins({ subsets: ["latin"], weight: ["300","400","600"], variable: "--font-body" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
```

### 1.2 Tailwind theme tokens
In `tailwind.config.js`, extend the theme with your palette so every component pulls from the same source instead of hardcoded hex values:

```js
theme: {
  extend: {
    colors: {
      blush: "#ff7eb3",
      rose: "#ff4d6d",
      lilac: "#c084fc",
      midnight: "#2b0a3d",
    },
    fontFamily: {
      display: ["var(--font-display)"],
      sans: ["var(--font-body)"],
    },
  },
}
```

### 1.3 Global background
In `app/globals.css`, add a reusable gradient background class:

```css
.romantic-bg {
  background: linear-gradient(135deg, #2b0a3d, #7a1e4f, #3b0a5c);
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Checkpoint:** Fonts and colors are centralized — no component should hardcode a hex color or font family after this point.

---

## Module 2 — FloatingHearts (Reusable Background Component)

**Goal:** An ambient, animated background layer used behind the lock screen and main content.

### `components/FloatingHearts.jsx`

Approach:
- Generate an array of N hearts (say 15–25) with randomized `left`, `size`, `delay`, and `duration` on mount (`useState` + `useEffect`, since `Math.random()` must not run during SSR).
- Render each as an absolutely-positioned `<Heart />` icon (from `lucide-react`) or a CSS `::before` shape.
- Animate with Framer Motion: `animate={{ y: [-20, -800], opacity: [0, 1, 0] }}` looped with `repeat: Infinity`, each heart offset by its own `delay`.
- Wrap the whole thing in a `fixed inset-0 pointer-events-none overflow-hidden -z-10` container so it never blocks clicks and never causes scroll issues.

```jsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts({ count = 20 }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 20,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 8,
      }))
    );
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.8, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", left: `${h.left}%` }}
        >
          <Heart size={h.size} className="text-pink-400/40" fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
```

**Checkpoint:** Import `<FloatingHearts />` into `app/page.jsx` temporarily and confirm hearts drift upward continuously without layout shift or scrollbars appearing.

---

## Module 3 — LockScreen

**Goal:** Password gate with error shake, hint, and success confetti — the entry point of the experience.

### State needed
- `password` (input value)
- `error` (boolean, triggers shake + message)
- `isAuthenticated` (lifted to parent `page.jsx`, not stored in this component)

### Behavior spec
1. On submit, normalize input: `.trim().toLowerCase()`.
2. Compare against a secret constant (store this in `data/` or an env var, **never** as a real secret since this is frontend-only and inspectable — it's a fun gate, not real security).
3. On match: call `onUnlock()` prop passed from parent, fire `canvas-confetti`.
4. On mismatch: set `error = true` for 500ms (drives the shake animation via Framer Motion `animate={{ x: [-10,10,-10,10,0] }}`), show a hint line below the input.
5. Optional nice touch: after 2–3 failed attempts, reveal a progressively more obvious hint (e.g. "Think about where we had our first date").

### Component skeleton

```jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Lock } from "lucide-react";

const SECRET_PASSWORD = "yourdatehere";

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === SECRET_PASSWORD) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      onUnlock();
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <main className="min-h-screen romantic-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full text-center text-white"
      >
        <div className="flex justify-center mb-4 text-pink-400">
          <Lock size={48} />
        </div>
        <h1 className="font-display text-2xl font-bold mb-2">For My Special Person ❤️</h1>
        <p className="text-sm text-pink-200 mb-6">Enter the secret password to open your surprise!</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            type="password"
            placeholder="Enter secret word..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-pink-500/30 text-white placeholder-pink-300/50 focus:outline-none focus:border-pink-500 text-center"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl font-semibold shadow-lg hover:opacity-90 transition duration-300"
          >
            Open Surprise ✨
          </button>
        </form>

        {error && (
          <p className="text-red-300 text-xs mt-3">
            Oops! Try again{attempts >= 2 ? " — hint: our special place" : ""}
          </p>
        )}
      </motion.div>
    </main>
  );
}
```

**Checkpoint:** Wrong password shakes and shows error; correct password fires confetti and calls `onUnlock`.

---

## Module 4 — Page Orchestration (`app/page.jsx`)

**Goal:** Wire the lock screen to the main experience with a smooth transition.

```jsx
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import LoveReasons from "@/components/LoveReasons";
import LoveCoupons from "@/components/LoveCoupons";
import FinalWish from "@/components/FinalWish";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div key="lock" exit={{ opacity: 0, scale: 1.05 }}>
          <LockScreen onUnlock={() => setUnlocked(true)} />
        </motion.div>
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen romantic-bg text-white"
        >
          <FloatingHearts />
          <MusicPlayer src="/audio/romantic.mp3" />
          <HeroSection />
          <Timeline />
          <LoveReasons />
          <LoveCoupons />
          <FinalWish />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
```

**Checkpoint:** Unlocking smoothly fades from lock screen into the scrollable main experience — no flash of unstyled content.

---

## Module 5 — HeroSection

**Goal:** The first thing she sees after unlocking — big emotional impact.

### Features
- Gradient/glowing headline: `"Happy Birthday, My Love! 🎉"`
- Optional **typewriter effect** for a sub-message (build this as a tiny custom hook: reveal one character every ~40ms using `useEffect` + `setInterval`, cleared on unmount).
- Bouncing heart icon.
- A subtle "scroll down" indicator (animated chevron) to guide her to the Timeline.

```jsx
"use client";
import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function useTypewriter(text, speed = 40) {
  const [output, setOutput] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setOutput(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return output;
}

export default function HeroSection() {
  const message = useTypewriter("Welcome to a tiny corner of the internet built just for you...");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl">
        <div className="flex justify-center text-pink-400 animate-bounce">
          <Heart size={64} fill="currentColor" />
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
          Happy Birthday, My Love!
        </h1>
        <p className="text-lg text-pink-100/80 min-h-[3rem]">{message}</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-10 text-pink-300"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
```

**Checkpoint:** Headline glows, sub-message types itself out once, scroll indicator bounces.

---

## Module 6 — MusicPlayer

**Goal:** Discreet floating button to toggle background music, autoplay-safe.

### Key detail
Browsers block autoplay with sound. Do **not** try to autoplay on mount — instead show a floating play button that starts on the *first user click* (this also doubles as a nice "tap to add music" moment).

```jsx
"use client";
import { useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

export default function MusicPlayer({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition"
        aria-label="Toggle music"
      >
        {playing ? <Pause size={20} /> : <Music size={20} />}
      </button>
    </>
  );
}
```

**Checkpoint:** Music starts/stops on click, loops, doesn't autoplay on load (avoids browser console warnings/errors).

---

## Module 7 — Timeline / MemoryCard

**Goal:** Scroll-triggered milestone cards showing your journey together.

### Data shape (`data/memories.js`)
```js
export const memories = [
  { date: "March 2022", title: "The Day We Met", text: "...", image: "/images/memory1.jpg" },
  { date: "June 2022", title: "First Trip Together", text: "...", image: "/images/memory2.jpg" },
  // add as many as you want
];
```

### `MemoryCard.jsx`
- Accepts one memory object as props.
- Uses `whileInView` (Framer Motion) instead of scroll listeners — simpler and performant:
  ```jsx
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
  ```
- Alternates layout left/right on desktop using the card's index (`index % 2 === 0`).
- Image + date badge + title + short text.

### `Timeline.jsx`
- Maps over `memories` and renders a vertical connecting line (a single `absolute` positioned div with a gradient) behind the cards for a "path" visual.
- Renders one `<MemoryCard />` per entry.

**Checkpoint:** Scrolling down reveals each memory card animating in one at a time, never all at once.

---

## Module 8 — LoveReasons

**Goal:** A grid/bubble layout of clickable reasons that reveal a message.

### Data shape (`data/loveReasons.js`)
```js
export const reasons = [
  "Your laugh is my favorite sound",
  "You make ordinary days feel special",
  // ...
];
```

### Interaction pattern
- Render each reason as a card in a `grid grid-cols-2 md:grid-cols-3 gap-4`.
- Each card starts **face-down** (shows just a heart/number) and flips or fades to reveal the text `onClick`, using local state per card (`useState` holding an array/set of "revealed" indices, or simplest: a `flipped` boolean per card via `useState(false)` inside a small `ReasonCard` subcomponent so each card manages its own state independently).
- Framer Motion flip: animate `rotateY` between `0` and `180`, with the card using `transformStyle: "preserve-3d"` and two absolutely-stacked faces (front/back), back rotated 180deg by default.

**Checkpoint:** Clicking a card flips it to reveal a reason; clicking again flips it back.

---

## Module 9 — LoveCoupons

**Goal:** A "coupon book" of redeemable favors, delivered as flip/scratch cards.

### Data shape (`data/coupons.js`)
```js
export const coupons = [
  { title: "1 Romantic Dinner", desc: "Redeemable anytime, my treat." },
  { title: "1 Back Massage", desc: "No expiry date." },
  { title: "Get Out of an Argument Free", desc: "Use wisely 😏" },
];
```

### Simplest reliable approach: **flip cards** (scratch-off is possible but needs canvas + mouse/touch tracking — only add it if you want the extra complexity; flip is far more reliable across devices)
- Same flip mechanic as Module 8's `ReasonCard`, styled like a physical coupon (dashed border, "CUT HERE" scissors icon, coupon-serif font).
- Optional: a "Redeemed ✅" state that persists in local component state after she clicks a "Redeem" button on the back face (frontend-only, so this won't persist across reloads — that's fine for a gift).

**Checkpoint:** Each coupon flips to show the favor and a redeem button; redeeming shows a confirmation state.

---

## Module 10 — FinalWish (Closing Screen)

**Goal:** Big emotional closer with confetti/balloons and a full letter.

### Features
- Full-height section, most dramatic gradient background of the whole site.
- A heartfelt closing letter (your own words — keep this as a prop or a `data/letter.js` string so it's easy to edit last-minute).
- A "Make a Wish" button that:
  - Triggers a bigger `canvas-confetti` burst (multiple bursts with `setTimeout` staggering looks better than one big call).
  - Optionally reveals a final hidden message after clicking (nice "one more surprise" beat).
- Floating balloon SVGs or emoji rising with Framer Motion (reuse the `FloatingHearts` pattern but swap the icon and slow the animation down for a calmer close).

```jsx
"use client";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useState } from "react";

const fireBigConfetti = () => {
  const end = Date.now() + 1000;
  (function frame() {
    confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
};

export default function FinalWish() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 space-y-6">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-xl text-pink-100/90 leading-relaxed whitespace-pre-line"
      >
        {/* your closing letter text here */}
      </motion.p>

      <button
        onClick={() => { fireBigConfetti(); setRevealed(true); }}
        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-semibold shadow-lg hover:opacity-90 transition"
      >
        Make a Wish 🎂
      </button>

      {revealed && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pink-200 italic">
          I love you, today and always. 💖
        </motion.p>
      )}
    </section>
  );
}
```

**Checkpoint:** Reading the full site top to bottom feels like a complete story, ending on the highest emotional note.

---

## Module 11 — Polish Pass

Go through the whole site once more and check:

- **Responsiveness:** every section works at 375px width (iPhone SE) up to desktop. Test with browser devtools device toolbar.
- **Performance:** compress all images (WebP, under ~300KB each) before dropping into `public/images`.
- **Accessibility basics:** `alt` text on images, `aria-label`s on icon-only buttons, sufficient color contrast for body text over the gradient.
- **Favicon & metadata:** set a cute favicon and a fun `<title>` / `metadata` object in `app/layout.jsx` (e.g. `title: "For My Love ❤️"`).
- **No dead ends:** every section flows to the next without abrupt cuts — add generous vertical padding (`py-24` or more) between sections.

---

## Module 12 — Deployment

**Goal:** A live, shareable link.

1. Push the project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), import the repo.
3. Leave build settings as default (Next.js is auto-detected).
4. Deploy — you'll get a `.vercel.app` URL you can share directly, or attach a custom domain if you own one.
5. **Before sharing:** open the deployed link yourself in an incognito window and go through the entire flow once, lock screen to final wish, to catch anything that only breaks in production (missing env vars, case-sensitive file paths on Linux servers vs. your local OS, etc.).

**Checkpoint:** You have a real URL you can text her.

---

## Suggested Build Order Recap

1. Setup → 2. Layout/Theme → 3. FloatingHearts → 4. LockScreen → 5. Page wiring →
6. HeroSection → 7. MusicPlayer → 8. Timeline → 9. LoveReasons → 10. LoveCoupons →
11. FinalWish → 12. Polish → 13. Deploy

Build and visually check off each module before moving to the next — this keeps debugging isolated to one component at a time instead of untangling several new features at once.
