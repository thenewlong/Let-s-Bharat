import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  forwardRef
} from "react";
import * as THREE from "three"; // npm i three

/* ==========================================================================
   NEWLONG DEBBARMA — 3D HARDCOVER FLIPBOOK  ·  MESH PAPER ENGINE
   --------------------------------------------------------------------------
   WHAT IS REAL
   - Every soft page is a Three.js mesh (41 x 55 vertices) deformed on the CPU
     every frame: hinge rotation, arc-length-preserving bending, twist,
     cylinder-wrap corner folds, procedural crumpling.
   - Bend / twist / fold / crumple are driven by damped springs (spring-back).
   - Lighting is computed per-vertex from the real mesh normals, so folds and
     curls get true highlights and shadows.
   - Tearing splits the sheet along a jagged user-drawn path into a base mesh
     and an independent torn piece (alpha-masked, fibre edge, own shadow).
     The clean original page canvases are never modified.

   WHAT IS APPROXIMATED (honest list)
   - It is NOT a full cloth/FEM simulation. Paper is an analytic, springy
     deformation model, not a particle-constraint solver.
   - Cast shadows between pages are analytic gradients (no shadow maps).
   - The animated HTML typography lives in a flat DOM layer that is shown
     while the book is at rest. While a page moves / bends / tears, the
     WebGL layer takes over using canvas-painted copies of the pages. Those
     copies mimic the HTML layout closely but not pixel-perfectly.
   - The hard cover is a rigid slab (it does not bend). One tear per sheet.
   ========================================================================== */

const portfolioPages = [
  {
    type: "cover",
    eyebrow: "A DIGITAL PORTFOLIO · 2026",
    title: "NEWLONG",
    subtitle: "DEBBARMA",
    description: "FOUNDER · DEVELOPER · BUILDER",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85",
    footer: "BUILT FROM NORTHEAST INDIA. BUILT FOR THE WORLD."
  },
  {
    type: "story",
    number: "01",
    label: "THE BEGINNING",
    title: "BIG IDEAS START WITH THE COURAGE TO BUILD.",
    body:
      "I am Newlong Debbarma — a founder and technology builder from Northeast India. My journey is driven by curiosity, experimentation, and the belief that meaningful technology can be built from anywhere.",
    body2:
      "I explore the intersection of technology, education, AI, language, community, and entrepreneurship. My goal is simple: learn continuously, build useful products, and turn ideas into real experiences.",
    quote: "THINK BEYOND BOUNDARIES. BUILD WITH PURPOSE.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85"
  },
  {
    type: "statement",
    number: "02",
    label: "THE PHILOSOPHY",
    title: "TALENT IS EVERYWHERE. VISIBILITY SHOULD BE TOO.",
    body:
      "I believe geography should never decide how far someone's ideas, skills, or ambitions can travel.",
    body2:
      "Technology can connect people to knowledge, opportunities, and communities that were once difficult to reach.",
    quote: "BUILD THINGS THAT MATTER.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=85"
  },
  {
    type: "project",
    number: "03",
    label: "FEATURED PROJECT",
    title: "LETSBHARAT",
    subtitle: "OPPORTUNITIES FOR THE NORTHEAST.",
    body:
      "LetsBharat is a student-first platform designed to make opportunities easier to discover across Northeast India.",
    tags: [
      "HACKATHONS",
      "INTERNSHIPS",
      "JOBS",
      "SCHOLARSHIPS",
      "INSTITUTIONS",
      "LEARNING",
      "RESOURCES"
    ],
    quote: "ONE PLATFORM. MORE POSSIBILITIES.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85",
    link: "https://www.letsbharat.com",
    linkText: "EXPLORE LETSBHARAT ↗"
  },
  {
    type: "project",
    number: "04",
    label: "AI & LANGUAGE TECHNOLOGY",
    title: "BUILDING WITH AI. PRESERVING LANGUAGE.",
    body:
      "Newlong.AI explores accessible AI experiences for students and multilingual users.",
    body2:
      "Bhasha begins with Kokborok, with a larger vision of making Northeast Indian languages more accessible through translation, knowledge retrieval, and conversational AI.",
    quote: "LANGUAGE IS IDENTITY.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1100&q=85",
    tags: ["NEWLONG.AI", "BHASHA", "KOKBOROK", "RAG", "AI"]
  },
  {
    type: "project",
    number: "05",
    label: "EXPERIMENTS & IDEAS",
    title: "NOT EVERY IDEA STARTS AS A PRODUCT.",
    body:
      "Echo One is a hardware and software concept exploring intelligent audio capture and AI-powered analysis.",
    body2:
      "Rent to Home explores a student-focused marketplace connecting people with local services and opportunities.",
    quote: "EXPERIMENT. LEARN. IMPROVE. REPEAT.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1100&q=85",
    tags: ["ECHO ONE", "IOT", "AI", "RENT TO HOME", "PRODUCT IDEAS"]
  },
  {
    type: "vision",
    number: "06",
    label: "THE JOURNEY AHEAD",
    title: "FROM LOCAL IDEAS TO GLOBAL IMPACT.",
    body:
      "My journey is still being written. I am exploring AI, RAG, language technology, product design, web development, IoT, and startup ideas.",
    body2:
      "The bigger vision is to build technology from Northeast India that solves real problems, makes knowledge more accessible, and creates opportunities beyond geographical boundaries.",
    quote: "THE GOAL IS NOT JUST TO BUILD SOFTWARE. THE GOAL IS TO BUILD THINGS THAT MATTER.",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1100&q=85"
  },
  {
    type: "back",
    eyebrow: "THE STORY CONTINUES",
    title: "LET'S BUILD SOMETHING.",
    subtitle: "NEWLONG DEBBARMA",
    description: "FOUNDER · DEVELOPER · BUILDER",
    body: "Built from Northeast India. Built for the world.",
    email: "newlong@letsbharat.com",
    website: "newlongdebbarma.letsbharat.com",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85",
    footer: "THANK YOU FOR TURNING THE PAGES."
  }
];

/* ------------------------------- constants ------------------------------- */

const PAGE_W = 420;
const PAGE_H = 560;
const HARD_W = PAGE_W + 8;
const HARD_H = PAGE_H + 14;
const D2R = Math.PI / 180;
const PI = Math.PI;
const BACK_INDEX = portfolioPages.length - 1;
const SEG_U = 40; // mesh columns per soft page
const SEG_V = 54; // mesh rows per soft page
const ARC_STEPS = 96; // arc-length integration steps per row
const CANVAS_PAD = 90; // WebGL canvas margin around the stage (css px)
const FONT = "Inter, Arial, sans-serif";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// deterministic value-noise helpers (wrinkles + torn edges)
const hash = (x, y) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const vnoise = (x, y) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  return (
    hash(xi, yi) * (1 - u) * (1 - v) +
    hash(xi + 1, yi) * u * (1 - v) +
    hash(xi, yi + 1) * (1 - u) * v +
    hash(xi + 1, yi + 1) * u * v
  );
};
const fbm = (x, y) =>
  vnoise(x, y) * 0.55 + vnoise(x * 2.1 + 7, y * 2.1 + 3) * 0.3 + vnoise(x * 4.3 + 1, y * 4.3 + 9) * 0.15;

// Desktop: real two-sided leaves. Front cover leaf is the hard cover.
const DESKTOP_LEAVES = [
  { f: 0, b: "endpaper", hard: true },
  { f: 1, b: 2 },
  { f: 3, b: 4 },
  { f: 5, b: 6 }
];
// Mobile: one page at a time, every page is its own leaf.
const MOBILE_LEAVES = portfolioPages
  .slice(0, BACK_INDEX)
  .map((_, i) => ({ f: i, b: "blank" }));

/* ------------------------- typography animation -------------------------- */

const d = (ms) => ({ "--d": `${ms}ms` });

// Word-by-word masked reveal (headings)
const Words = ({ text, delay = 0, step = 80 }) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="wd" aria-hidden="true">
            <span className="wd-in" style={d(delay + i * step)}>
              {w}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </>
  );
};

// Line-by-line reveal (paragraphs). Real lines are measured, so every
// rendered line enters together with a tiny left-to-right stagger.
const Flow = ({ text, delay = 0, lineStep = 120, className }) => {
  const ref = useRef(null);
  const words = useMemo(() => text.split(" "), [text]);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let alive = true;

    const measure = () => {
      if (!alive) return;
      let line = -1;
      let top = null;
      let pos = 0;
      el.querySelectorAll(".fw").forEach((n) => {
        const t = n.offsetTop;
        if (top === null || Math.abs(t - top) > 4) {
          line += 1;
          top = t;
          pos = 0;
        }
        n.style.setProperty("--d", `${delay + line * lineStep + pos * 16}ms`);
        pos += 1;
      });
    };

    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    return () => {
      alive = false;
    };
  }, [text, delay, lineStep]);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="fw" style={d(delay)}>
            {w}
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </p>
  );
};

/* --------------------------------- pages --------------------------------- */

const BookPage = forwardRef(({ page, index, play }, ref) => {
  const inside = ["story", "statement", "project", "vision"].includes(page.type);

  // choreography timing for inside pages
  const titleWords = page.title.split(" ").length;
  const titleEnd = 380 + titleWords * 80;
  const copyStart = titleEnd + 150;
  const body2Start = copyStart + 620;
  const tagBase = titleEnd + 1150;
  const quoteAt =
    titleEnd + 1150 + (page.tags ? page.tags.length * 75 : 0) + 200;

  return (
    <div
      className="portfolio-page pg"
      ref={ref}
      data-play={play ? "1" : "0"}
      data-index={index}
      style={{ "--b": page.type === "cover" ? "250ms" : "120ms" }}
    >
      <div className={`page-inner page-${page.type}`}>
        {(page.type === "cover" || page.type === "back") && page.image && (
          <div className="page-image">
            <img
              className="rv rv-img"
              style={d(0)}
              src={page.image}
              alt=""
              decoding="async"
              draggable={false}
            />
          </div>
        )}

        {page.type === "cover" && (
          <div className="cover-content">
            <span className="cover-eyebrow rv rv-up" style={d(0)}>
              {page.eyebrow}
            </span>
            <div className="cover-main">
              <span className="cover-small rv rv-up" style={d(180)}>
                THE PORTFOLIO OF
              </span>
              <h1 aria-label={page.title}>
                <Words text={page.title} delay={320} />
              </h1>
              <h2 aria-label={page.subtitle}>
                <Words text={page.subtitle} delay={650} />
              </h2>
              <div className="cover-line rv rv-rule" style={d(950)} />
              <p className="rv rv-up" style={d(1100)}>
                {page.description}
              </p>
            </div>
            <span className="cover-footer rv rv-fade" style={d(1600)}>
              {page.footer}
            </span>
            <span className="cover-index rv rv-fade" style={d(1800)}>
              01 — 08
            </span>
          </div>
        )}

        {page.type === "back" && (
          <div className="back-content">
            <span className="back-eyebrow rv rv-up" style={d(0)}>
              {page.eyebrow}
            </span>
            <div className="back-main">
              <span className="back-small rv rv-up" style={d(160)}>
                THE NEXT CHAPTER STARTS HERE.
              </span>
              <h2 aria-label={page.title}>
                <Words text={page.title} delay={300} />
              </h2>
              <div className="back-rule rv rv-rule" style={d(950)} />
              <h3 className="rv rv-slide" style={d(1050)}>
                {page.subtitle}
              </h3>
              <p className="back-role rv rv-up" style={d(1150)}>
                {page.description}
              </p>
              <Flow className="back-body" text={page.body} delay={1300} />

              <a
                className="rv rv-up"
                style={d(1750)}
                href="mailto:newlong@letsbharat.com"
              >
                {page.email} ↗
              </a>
              <a
                className="rv rv-up"
                style={d(1900)}
                href="https://newlongdebbarma.letsbharat.com"
                target="_blank"
                rel="noreferrer"
              >
                {page.website} ↗
              </a>
            </div>
            <span className="back-footer rv rv-fade" style={d(2300)}>
              {page.footer}
            </span>
          </div>
        )}

        {inside && (
          <div className="inside-content">
            <div className="inside-top">
              <span className="rv rv-up" style={d(0)}>
                {page.label}
              </span>
              <span className="rv rv-up" style={d(100)}>
                {page.number} / 06
              </span>
            </div>

            {page.image && (
              <div className="inside-image">
                <img
                  className="rv rv-img"
                  style={d(140)}
                  src={page.image}
                  alt=""
                  decoding="async"
                  draggable={false}
                />
              </div>
            )}

            <div className="inside-heading">
              {page.type === "project" && (
                <span className="inside-kicker rv rv-slide" style={d(300)}>
                  SELECTED WORK
                </span>
              )}
              <h2 aria-label={page.title}>
                <Words text={page.title} delay={380} />
              </h2>
              {page.subtitle && (
                <h3 className="rv rv-slide" style={d(titleEnd + 80)}>
                  {page.subtitle}
                </h3>
              )}
            </div>

            <div className="inside-copy">
              <Flow text={page.body} delay={copyStart} />
              {page.body2 && <Flow text={page.body2} delay={body2Start} />}
            </div>

            {page.tags && (
              <div className="inside-tags">
                {page.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className="rv rv-up"
                    style={d(tagBase + i * 75)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <blockquote className="rv rv-quote" style={d(quoteAt)}>
              {page.quote}
            </blockquote>

            {page.link && (
              <a
                className="inside-link rv rv-up"
                style={d(quoteAt + 350)}
                href={page.link}
                target="_blank"
                rel="noreferrer"
              >
                {page.linkText}
              </a>
            )}

            <div className="inside-bottom rv rv-fade" style={d(quoteAt + 600)}>
              <span>NEWLONG DEBBARMA</span>
              <span>LETSBHARAT · PORTFOLIO</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

BookPage.displayName = "BookPage";

// Inside of the hardcover (paste-down endpaper)
const Endpaper = ({ play }) => (
  <div
    className="portfolio-page pg endpaper"
    data-play={play ? "1" : "0"}
    style={{ "--b": "200ms" }}
  >
    <div className="endpaper-in">
      <span className="rv rv-fade" style={d(0)}>
        A DIGITAL PORTFOLIO · 2026
      </span>
      <i className="rv rv-rule" style={d(350)} />
      <strong className="rv rv-up" style={d(550)}>
        NEWLONG DEBBARMA
      </strong>
      <span className="rv rv-fade" style={d(950)}>
        FOUNDER · DEVELOPER · BUILDER
      </span>
    </div>
  </div>
);

/* ==========================================================================
   CANVAS PAGE PAINTER
   Paints a page into a 2D canvas (used as the WebGL texture). The pristine
   page canvases are never edited by tearing — tears bake into copies.
   ========================================================================== */

let noiseTile = null;
const getNoise = () => {
  if (noiseTile) return noiseTile;
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const x = c.getContext("2d");
  const id = x.createImageData(128, 128);
  for (let i = 0; i < 128 * 128; i++) {
    const v = 100 + Math.random() * 120;
    id.data[4 * i] = v * 0.92;
    id.data[4 * i + 1] = v * 0.86;
    id.data[4 * i + 2] = v * 0.7;
    id.data[4 * i + 3] = 255;
  }
  x.putImageData(id, 0, 0);
  noiseTile = c;
  return c;
};

const paintGrain = (ctx, w, h) => {
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = ctx.createPattern(getNoise(), "repeat");
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
};

const setFont = (ctx, o) => {
  ctx.font = `${o.w || 400} ${o.s}px ${FONT}`;
};
const textW = (ctx, s, o) => {
  setFont(ctx, o);
  return ctx.measureText(s).width + (o.ls || 0) * s.length;
};
const drawTxt = (ctx, s, x, y, o) => {
  setFont(ctx, o);
  ctx.fillStyle = o.c;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  const ls = o.ls || 0;
  const w = textW(ctx, s, o);
  let cx = o.align === "right" ? x - w : o.align === "center" ? x - w / 2 : x;
  if (!ls) {
    ctx.fillText(s, cx, y);
    return;
  }
  for (const ch of s) {
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + ls;
  }
};
const wrapText = (ctx, s, maxW, o) => {
  const words = s.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const t = cur ? `${cur} ${w}` : w;
    if (cur && textW(ctx, t, o) > maxW) {
      lines.push(cur);
      cur = w;
    } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
};
const drawCoverImg = (ctx, im, x, y, w, h) => {
  if (!im) return false;
  const r = Math.max(w / im.width, h / im.height);
  const sw = w / r;
  const sh = h / r;
  ctx.drawImage(im, (im.width - sw) / 2, (im.height - sh) / 2, sw, sh, x, y, w, h);
  return true;
};

const paintDarkPage = (ctx, p, imgs, w, h) => {
  if (!drawCoverImg(ctx, imgs[p.image], 0, 0, w, h)) {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#1c2a1f");
    g.addColorStop(1, "#0B0B0C");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  const gr = ctx.createLinearGradient(0, 0, 0, h);
  gr.addColorStop(0, "rgba(8,10,8,.28)");
  gr.addColorStop(1, "rgba(8,10,8,.83)");
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, w, h);
};

const paintCover = (ctx, p, imgs, w, h) => {
  paintDarkPage(ctx, p, imgs, w, h);
  const sg = ctx.createLinearGradient(16, 0, 19, 0);
  sg.addColorStop(0, "rgba(0,0,0,.55)");
  sg.addColorStop(1, "rgba(255,255,255,.14)");
  ctx.fillStyle = sg;
  ctx.fillRect(16, 0, 3, h);
  ctx.strokeStyle = "rgba(255,255,255,.14)";
  ctx.lineWidth = 1;
  ctx.strokeRect(26.5, 14.5, w - 26 - 12 - 1, h - 28 - 1);

  const pale = "#d6dfcf";
  drawTxt(ctx, p.eyebrow, 42, 44, { s: 9, w: 700, c: "#d5dfce", ls: 1.8 });
  const fs = { s: 8, w: 400, c: pale, ls: 1.2 };
  const fl = wrapText(ctx, p.footer, 220, fs);
  const fTop = h - 34 - (fl.length - 1) * 12.8 - 3;
  fl.forEach((l, i) => drawTxt(ctx, l, 42, fTop + i * 12.8, fs));
  drawTxt(ctx, "01 — 08", w - 30, h - 34, { s: 9, c: pale, ls: 0.9, align: "right" });

  const mid = (47 + fTop - 10) / 2;
  const top = mid - 105;
  drawTxt(ctx, "THE PORTFOLIO OF", 42, top + 9, { s: 9, c: pale, ls: 1.8 });
  drawTxt(ctx, p.title, 42, top + 23 + 54, { s: 68, w: 900, c: "#fff", ls: -5.1 });
  drawTxt(ctx, p.subtitle, 42, top + 23 + 61 + 8 + 34, { s: 42, w: 500, c: "#fff", ls: -1.9 });
  const ly = top + 23 + 61 + 8 + 42 + 22;
  ctx.fillStyle = "#91a982";
  ctx.fillRect(42, ly, 48, 3);
  drawTxt(ctx, p.description, 42, ly + 3 + 22 + 18, { s: 9, w: 800, c: "#fff", ls: 1.35 });
};

const paintBack = (ctx, p, imgs, w, h) => {
  paintDarkPage(ctx, p, imgs, w, h);
  const pale = "#d6dfcf";
  drawTxt(ctx, p.eyebrow, 30, 42, { s: 9, w: 700, c: "#d5dfce", ls: 1.8 });
  const fs = { s: 8, c: pale, ls: 1.2 };
  const fl = wrapText(ctx, p.footer, 220, fs);
  const fTop = h - 34 - (fl.length - 1) * 12.8 - 3;
  fl.forEach((l, i) => drawTxt(ctx, l, 30, fTop + i * 12.8, fs));

  const hs = { s: 50, w: 700, c: "#fff", ls: -3 };
  const hl = wrapText(ctx, p.title, 300, hs);
  const bs = { s: 12, c: "#fff" };
  const bl = wrapText(ctx, p.body, 230, bs);
  const blockH = 21 + hl.length * 49 + 47 + 24 + 20 + 22 + bl.length * 19.2 + 22 + 58;
  let y = (46 + fTop - 10) / 2 - blockH / 2;
  drawTxt(ctx, "THE NEXT CHAPTER STARTS HERE.", 30, y + 9, { s: 9, c: pale, ls: 1.8 });
  y += 21;
  hl.forEach((l, i) => drawTxt(ctx, l, 30, y + 42 + i * 49, hs));
  y += hl.length * 49 + 22;
  ctx.fillStyle = "#91a982";
  ctx.fillRect(30, y, 48, 3);
  y += 25;
  drawTxt(ctx, p.subtitle, 30, y + 14, { s: 14, w: 700, c: "#fff", ls: 1.4 });
  y += 24;
  drawTxt(ctx, p.description, 30, y + 11, { s: 9, c: pale, ls: 1.26 });
  y += 20 + 22;
  bl.forEach((l, i) => drawTxt(ctx, l, 30, y + 13 + i * 19.2, bs));
  y += bl.length * 19.2 + 22 + 12;
  [p.email, p.website].forEach((t, i) => {
    const o = { s: 10, c: "#dce8d3" };
    const label = `${t} ↗`;
    drawTxt(ctx, label, 30, y + 12 + i * 29, o);
    ctx.fillStyle = "rgba(220,232,211,.45)";
    ctx.fillRect(30, y + 17 + i * 29, textW(ctx, label, o), 1);
  });
};

const paintInside = (ctx, p, imgs, w, h) => {
  const PX = 30;
  const CW = w - 60;
  const lab = { s: 8, w: 800, c: "#65725d", ls: 1.12 };
  drawTxt(ctx, p.label, PX, 36, lab);
  drawTxt(ctx, `${p.number} / 06`, w - PX, 36, { ...lab, align: "right" });

  const hs = { s: 31, w: 900, c: "#171914", ls: -2.02 };
  const hl = wrapText(ctx, p.title, CW, hs);
  const cs = { s: 11, c: "#4e5149" };
  const c1 = wrapText(ctx, p.body, CW, cs);
  const c2 = p.body2 ? wrapText(ctx, p.body2, CW, cs) : [];
  const copyH = c1.length * 18.7 + 10 + (c2.length ? c2.length * 18.7 + 10 : 0);

  const tg = { s: 7, w: 800, c: "#596650", ls: 0.56 };
  const tagLayout = [];
  let tagRows = 0;
  if (p.tags) {
    let x = 0;
    let row = 0;
    p.tags.forEach((t) => {
      const bw = textW(ctx, t, tg) + 16;
      if (x + bw > CW && x > 0) {
        row += 1;
        x = 0;
      }
      tagLayout.push([t, x, row, bw]);
      x += bw + 6;
    });
    tagRows = row + 1;
  }
  const tagH = p.tags ? tagRows * 22.5 + (tagRows - 1) * 6 + 2 : 0;

  const qs = { s: 11, w: 800, c: "#333a2e", ls: 0.385 };
  const ql = wrapText(ctx, p.quote, CW - 15, qs);
  const qH = 10 + ql.length * 17.05 + 16;
  const linkH = p.link ? 28 : 0;
  const heading = (p.type === "project" ? 16 : 0) + hl.length * 31 + (p.subtitle ? 20 : 0);
  const used = 10 + 14 + 18 + heading + 16 + copyH + tagH + qH + linkH + 20;
  const ih = clamp(h - 50 - used, 40, 150);

  const imgY = 52;
  ctx.fillStyle = "#e5e0d0";
  ctx.fillRect(PX, imgY, CW, ih);
  if (imgs[p.image]) {
    ctx.save();
    try {
      ctx.filter = "saturate(.85) sepia(.08)";
    } catch (e) {
      // filter is optional
    }
    drawCoverImg(ctx, imgs[p.image], PX, imgY, CW, ih);
    ctx.restore();
  }

  let y = imgY + ih + 18;
  if (p.type === "project") {
    drawTxt(ctx, "SELECTED WORK", PX, y + 8, { s: 8, w: 800, c: "#7d8f70", ls: 1.44 });
    y += 16;
  }
  hl.forEach((l, i) => drawTxt(ctx, l, PX, y + 25 + i * 31, hs));
  y += hl.length * 31;
  if (p.subtitle) {
    drawTxt(ctx, p.subtitle, PX, y + 19, { s: 10, c: "#72836a", ls: 1.2 });
    y += 20;
  }
  y += 16;
  c1.forEach((l, i) => drawTxt(ctx, l, PX, y + 13 + i * 18.7, cs));
  y += c1.length * 18.7 + 10;
  c2.forEach((l, i) => drawTxt(ctx, l, PX, y + 13 + i * 18.7, cs));
  if (c2.length) y += c2.length * 18.7 + 10;
  if (p.tags) {
    tagLayout.forEach(([t, x, row, bw]) => {
      const ty = y + row * 28.5;
      ctx.strokeStyle = "#d8ddcf";
      ctx.lineWidth = 1;
      ctx.strokeRect(PX + x + 0.5, ty + 0.5, bw - 1, 21.5);
      drawTxt(ctx, t, PX + x + 8, ty + 14.5, tg);
    });
  }

  const botTop = h - 22 - 20;
  ctx.fillStyle = "#dedfd5";
  ctx.fillRect(PX, botTop, CW, 1);
  const bs = { s: 7, w: 800, c: "#65725d", ls: 0.98 };
  drawTxt(ctx, "NEWLONG DEBBARMA", PX, botTop + 17, bs);
  drawTxt(ctx, "LETSBHARAT · PORTFOLIO", w - PX, botTop + 17, { ...bs, align: "right" });

  const qTop = botTop - linkH - qH;
  ctx.fillStyle = "#819a70";
  ctx.fillRect(PX, qTop, 3, 10 + ql.length * 17.05);
  ql.forEach((l, i) => drawTxt(ctx, l, PX + 15, qTop + 10 + 12 + i * 17.05, qs));
  if (p.link) {
    const lo = { s: 9, w: 900, c: "#516849", ls: 0.9 };
    const ly = qTop + qH + 9;
    drawTxt(ctx, p.linkText, PX, ly, lo);
    ctx.fillStyle = "#819a70";
    ctx.fillRect(PX, ly + 5, textW(ctx, p.linkText, lo), 1);
  }
};

// Paints `id` into canvas `cv`. `full` = false paints the bare paper only
// (the HTML layer animates the content in once the page settles).
const paintPage = (cv, id, imgs, full) => {
  const hard = id === 0 || id === "endpaper";
  const w = hard ? HARD_W : PAGE_W;
  const h = hard ? HARD_H : PAGE_H;
  const S = cv.width / w;
  const ctx = cv.getContext("2d");
  ctx.setTransform(S, 0, 0, S, 0, 0);
  ctx.clearRect(0, 0, w, h);

  if (id === "blank") {
    ctx.fillStyle = "#f3eedf";
    ctx.fillRect(0, 0, w, h);
    paintGrain(ctx, w, h);
    return;
  }
  if (id === "endpaper") {
    ctx.fillStyle = "#ebe6d3";
    ctx.fillRect(0, 0, w, h);
    if (full) {
      ctx.strokeStyle = "rgba(93,106,84,.28)";
      ctx.lineWidth = 1;
      ctx.strokeRect(18.5, 18.5, w - 37, h - 37);
      const cy = h / 2;
      drawTxt(ctx, "A DIGITAL PORTFOLIO · 2026", w / 2, cy - 30, { s: 8, w: 800, c: "#5d6a54", ls: 1.6, align: "center" });
      ctx.fillStyle = "#819a70";
      ctx.fillRect(w / 2 - 18, cy - 14, 36, 2);
      drawTxt(ctx, "NEWLONG DEBBARMA", w / 2, cy + 18, { s: 15, w: 800, c: "#2f3a2a", ls: 2.1, align: "center" });
      drawTxt(ctx, "FOUNDER · DEVELOPER · BUILDER", w / 2, cy + 44, { s: 8, w: 800, c: "#5d6a54", ls: 1.6, align: "center" });
    }
    paintGrain(ctx, w, h);
    return;
  }

  const p = portfolioPages[id];
  const dark = p.type === "cover" || p.type === "back";
  ctx.fillStyle = dark ? "#0B0B0C" : "#f7f3e8";
  ctx.fillRect(0, 0, w, h);
  if (full) {
    if (p.type === "cover") paintCover(ctx, p, imgs, w, h);
    else if (p.type === "back") paintBack(ctx, p, imgs, w, h);
    else paintInside(ctx, p, imgs, w, h);
  }
  paintGrain(ctx, w, h);
};

const loadImage = (src) =>
  new Promise((res) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onload = () => res(im);
    im.onerror = () => res(null);
    im.src = src;
  });

let imgPromise = null;
const loadAllImages = () => {
  if (!imgPromise) {
    const urls = [...new Set(portfolioPages.map((p) => p.image).filter(Boolean))];
    imgPromise = Promise.all(urls.map((u) => loadImage(u).then((im) => [u, im]))).then((arr) =>
      Object.fromEntries(arr)
    );
  }
  return imgPromise;
};

/* ==========================================================================
   THREE.JS PAPER ENGINE
   --------------------------------------------------------------------------
   Coordinates ("book space"): 1 unit = 1 css px at the z=0 plane, spine at
   x=0, pages extend to x=±PAGE_W, y up. The camera looks straight at the
   book, so the flat DOM layer lines up with the WebGL layer exactly.
   Sheet space (u, v): u = distance from the spine, v = distance from top.
   ========================================================================== */

const LX = -0.321;
const LY = 0.502;
const LZ = 0.803;

const spring = (o, p, v, target, dt, reduced, k = 220, c = 18) => {
  if (reduced) {
    o[p] = target;
    o[v] = 0;
    return;
  }
  const steps = Math.max(1, Math.ceil(dt / 0.008));
  const h = dt / steps;
  for (let s = 0; s < steps; s++) {
    const acc = k * (target - o[p]) - c * o[v];
    o[v] += acc * h;
    o[p] += o[v] * h;
  }
};

function createEngine(canvas, cfg) {
  const { leafSpecs, mobile, reducedRef } = cfg;
  const n = leafSpecs.length;
  const W = PAGE_W;
  const H = PAGE_H;
  const S = mobile ? 1.5 : 2; // texture / mask resolution multiplier
  const hasHard = !!leafSpecs[0].hard;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(20, 1, 200, 9000);
  const ZC = 2400;
  camera.position.set(W / 2, 0, ZC);
  const aniso = renderer.capabilities.getMaxAnisotropy();

  const disposables = [];
  const track = (o) => {
    disposables.push(o);
    return o;
  };
  const mat = (o) => track(new THREE.MeshBasicMaterial(o));

  let imgs = {};
  let seen = new Set();
  let k = 1;
  let step = 0;
  let raf = 0;
  let last = 0;
  let dead = false;
  let liveNow = false;
  let restT = 0;
  let restDone = false;
  let act = null; // current pointer interaction
  let selL = null; // last touched torn piece's leaf
  const undoStack = [];

  /* ------------------------------ textures ------------------------------ */

  const pageTex = {};
  const texFor = (id) => {
    if (pageTex[id]) return pageTex[id];
    const hard = id === 0 || id === "endpaper";
    const cv = document.createElement("canvas");
    cv.width = Math.round((hard ? HARD_W : PAGE_W) * S);
    cv.height = Math.round((hard ? HARD_H : PAGE_H) * S);
    paintPage(cv, id, imgs, seen.has(id));
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = aniso;
    const tf = new THREE.CanvasTexture(cv);
    tf.colorSpace = THREE.SRGBColorSpace;
    tf.anisotropy = aniso;
    tf.repeat.set(-1, 1);
    tf.offset.set(1, 0);
    pageTex[id] = { cv, t, tf };
    return pageTex[id];
  };
  const repaint = (id) => {
    const e = pageTex[id];
    if (!e) return;
    paintPage(e.cv, id, imgs, seen.has(id));
    e.t.needsUpdate = true;
    e.tf.needsUpdate = true;
  };

  /* -------------------------- static book parts -------------------------- */

  const edge = 0x0e100b;
  const boardMats = (c, transparent) =>
    [edge, edge, edge, edge, c, edge].map((col) => mat({ color: col, transparent }));
  const boardGeo = track(new THREE.BoxGeometry(W + 8, H + 14, 8));
  const boardR = new THREE.Mesh(boardGeo, boardMats(0x161912, false));
  boardR.position.set((W + 8) / 2, 0, -5);
  scene.add(boardR);
  const boardLMats = boardMats(0x161912, true);
  const boardL = new THREE.Mesh(boardGeo, boardLMats);
  boardL.position.set(-(W + 8) / 2, 0, -5);
  boardL.visible = false;
  scene.add(boardL);
  const spineMesh = new THREE.Mesh(
    track(new THREE.BoxGeometry(14, H + 14, 8)),
    mat({ color: 0x20241a })
  );
  spineMesh.position.set(0, 0, -5.2);
  scene.add(spineMesh);

  // layered page-stack edges peeking out of the right / bottom
  const stackCols = [0xe4ddc9, 0xf2eddd, 0xddd6c1, 0xefe9d8, 0xd6cfba];
  const stackGeo = track(new THREE.PlaneGeometry(W - 1, H - 2));
  const stackR = [];
  const stackL = [];
  stackCols.forEach((col, i) => {
    const kk = i + 1;
    const mr = mat({ color: col, transparent: true });
    const r = new THREE.Mesh(stackGeo, mr);
    r.position.set(W / 2 + kk, -kk, -0.9);
    scene.add(r);
    stackR.push(mr);
    if (!mobile) {
      const ml = mat({ color: col, transparent: true, opacity: 0 });
      const l = new THREE.Mesh(stackGeo, ml);
      l.position.set(-(W / 2 + kk), -kk, -0.9);
      scene.add(l);
      stackL.push(ml);
    }
  });

  // back cover: a fixed page on the right once everything is turned
  const staticGeo = track(new THREE.PlaneGeometry(W, H, SEG_U, 1));
  staticGeo.translate(W / 2, 0, 0);
  staticGeo.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(staticGeo.attributes.position.count * 3).fill(1), 3)
  );
  const staticMesh = new THREE.Mesh(
    staticGeo,
    mat({ map: texFor(BACK_INDEX).t, vertexColors: true })
  );
  staticMesh.position.z = 0.2;
  scene.add(staticMesh);

  // tear stroke preview
  const stroke = new THREE.Line(
    track(new THREE.BufferGeometry()),
    track(new THREE.LineBasicMaterial({ color: 0xccff00, depthTest: false, transparent: true }))
  );
  stroke.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(3 * 400), 3));
  stroke.geometry.setDrawRange(0, 0);
  stroke.frustumCulled = false;
  stroke.renderOrder = 999;
  stroke.visible = false;
  scene.add(stroke);

  /* -------------------------------- leaves -------------------------------- */

  const NU = SEG_U + 1;
  const NV = SEG_V + 1;
  const NVERT = NU * NV;
  const Ua = new Float32Array(NVERT);
  const Va = new Float32Array(NVERT);
  const Ra = new Uint16Array(NVERT);
  for (let iy = 0; iy < NV; iy++) {
    for (let ix = 0; ix < NU; ix++) {
      const idx = iy * NU + ix;
      Ua[idx] = (ix / SEG_U) * W;
      Va[idx] = (iy / SEG_V) * H;
      Ra[idx] = iy;
    }
  }
  const TX = new Float32Array(NV * (ARC_STEPS + 1));
  const TZ = new Float32Array(NV * (ARC_STEPS + 1));
  const TT = new Float32Array(NV * (ARC_STEPS + 1));

  const leaves = leafSpecs.map((spec, i) => {
    const L = {
      i,
      spec,
      hard: !!spec.hard,
      a: 0,
      prevA: 0,
      lastA: -1,
      w: 0,
      tw: null,
      phi: 0,
      phiV: 0,
      tau: 0,
      tauV: 0,
      hold: 0,
      holdV: 0,
      holdT: 0,
      dirS: 1,
      vg: H / 2,
      dirty: true,
      fold: { cu: 0, cv: 0, sgn: 1, x: 0, y: 0, xv: 0, yv: 0, tx: 0, ty: 0 },
      cr: {
        amt: 0, av: 0, aT: 0, cx: 0, cy: 0,
        dx: 0, dxv: 0, tdx: 0, dy: 0, dyv: 0, tdy: 0,
        fol: 0, fv: 0, fT: 0, seed: 1, sig: 170, sgn: 1, path: 0, sx: 0, sy: 0
      },
      tear: null
    };
    if (L.hard) {
      const g = new THREE.Group();
      const bgeo = track(new THREE.BoxGeometry(HARD_W, HARD_H, 7));
      bgeo.translate(HARD_W / 2, 0, 0);
      L.mF = mat({ map: texFor(spec.f).t });
      L.mB = mat({ map: texFor(spec.b).t });
      const side = () => mat({ color: 0x12140e });
      g.add(new THREE.Mesh(bgeo, [side(), side(), side(), side(), L.mF, L.mB]));
      scene.add(g);
      L.group = g;
    } else {
      const geo = track(new THREE.PlaneGeometry(W, H, SEG_U, SEG_V));
      const nv = geo.attributes.position.count;
      geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(nv * 3).fill(1), 3));
      const geoB = track(new THREE.BufferGeometry());
      geoB.setIndex(geo.index);
      geoB.setAttribute("position", geo.attributes.position);
      geoB.setAttribute("uv", geo.attributes.uv);
      geoB.setAttribute("color", new THREE.BufferAttribute(new Float32Array(nv * 3).fill(1), 3));
      L.geo = geo;
      L.geoB = geoB;
      L.matF = mat({ map: texFor(spec.f).t, vertexColors: true, side: THREE.FrontSide });
      L.matB = mat({ map: texFor(spec.b).tf, vertexColors: true, side: THREE.BackSide });
      const mf = new THREE.Mesh(geo, L.matF);
      const mb = new THREE.Mesh(geoB, L.matB);
      mf.frustumCulled = false;
      mb.frustumCulled = false;
      scene.add(mf, mb);
    }
    return L;
  });

  const zBase = (L) => {
    const i = L.i;
    let zr;
    let zl;
    if (L.hard) {
      zr = n * 1.1 + 3.5;
      zl = 3.5;
    } else if (!hasHard) {
      zr = (n - i) * 1.1;
      zl = (i + 1) * 1.1;
    } else {
      zr = (n - i) * 1.1;
      zl = 7 + i * 1.1;
    }
    return zr + (zl - zr) * smooth(60, 120, L.a);
  };

  const gutDark = (u) => (u < 17 ? 0.3 - 0.2 * (u / 17) : u < 55 ? 0.1 * (1 - (u - 17) / 38) : 0);
  const castShape = (u) =>
    u < 0.45 * W ? 0.55 - 0.27 * (u / (0.45 * W)) : u < 0.85 * W ? 0.28 * (1 - (u - 0.45 * W) / (0.4 * W)) : 0;
  const tint = (arr, o, b) => {
    arr[o] = b;
    arr[o + 1] = b < 1 ? b * (0.985 + 0.015 * b) : b;
    arr[o + 2] = b < 1 ? b * (0.95 + 0.05 * b) : b;
  };

  const shadeStatic = () => {
    const A = leaves[n - 1].a;
    const c = Math.sin(A * D2R) * 0.95;
    const pos = staticGeo.attributes.position.array;
    const col = staticGeo.attributes.color.array;
    for (let i = 0; i < pos.length / 3; i++) {
      const u = pos[3 * i];
      const b = clamp((1 - gutDark(u)) * (1 - c * castShape(u)), 0.25, 1.15);
      tint(col, 3 * i, b);
    }
    staticGeo.attributes.color.needsUpdate = true;
  };

  /* ------------------------------ deformation ----------------------------- */

  const updateHard = (L) => {
    const a = L.a * D2R;
    L.group.rotation.y = -a;
    L.group.position.z = zBase(L);
    const nd = -LX * Math.sin(a) + LZ * Math.cos(a);
    const cast = leaves[1] ? Math.sin(leaves[1].a * D2R) * 0.5 : 0;
    L.mF.color.setScalar(clamp(1 + 0.85 * (nd - LZ), 0.3, 1.15));
    L.mB.color.setScalar(clamp((1 + 0.85 * (-nd - LZ)) * (1 - cast), 0.3, 1.15));
  };

  const deform = (L) => {
    const P = L.geo.attributes.position.array;
    const ang = L.a * D2R;
    const zb = zBase(L);
    const du = W / ARC_STEPS;

    // 1) per-row arc tables: the sheet keeps its length while it bends
    for (let j = 0; j <= SEG_V; j++) {
      const v = (j / SEG_V) * H;
      const lead = 1 - clamp(Math.abs(v - L.vg) / H, 0, 1);
      const A = ang - L.dirS * L.tau * (1 - lead);
      const ph = L.phi * (0.7 + 0.3 * lead);
      const b = j * (ARC_STEPS + 1);
      let x = 0;
      let z = 0;
      let thp = clamp(A, 0, PI);
      TX[b] = 0;
      TZ[b] = 0;
      TT[b] = thp;
      for (let m = 1; m <= ARC_STEPS; m++) {
        const th = clamp(A + ph * (m / ARC_STEPS), 0, PI);
        const tm = (th + thp) * 0.5;
        x += Math.cos(tm) * du;
        z += Math.sin(tm) * du;
        TX[b + m] = x;
        TZ[b + m] = z;
        TT[b + m] = th;
        thp = th;
      }
    }

    // 2) per-vertex: crumple -> corner fold -> bend/hinge
    const F = L.fold;
    const C = L.cr;
    const fl = Math.hypot(F.x, F.y);
    const folding = fl > 1.5;
    let fnx = 0;
    let fny = 0;
    let fr = 0;
    let fmx = 0;
    let fmy = 0;
    if (folding) {
      fnx = F.x / fl;
      fny = F.y / fl;
      fr = 5 + fl * 0.035;
      const q = (fl + PI * fr) / 2;
      fmx = F.cu + fnx * q;
      fmy = F.cv + fny * q;
    }
    const crum = C.amt > 0.003 || C.fol > 0.003;

    for (let idx = 0; idx < NVERT; idx++) {
      let x = Ua[idx];
      let y = Va[idx];
      let zf = 0;

      if (crum) {
        const dx0 = x - C.cx;
        const dy0 = y - C.cy;
        const wg = Math.exp(-(dx0 * dx0 + dy0 * dy0) / (2 * C.sig * C.sig));
        if (wg > 0.01) {
          const s = C.seed;
          const n1 = fbm(x * 0.05 + s, y * 0.05 + s * 1.7);
          const n2 = vnoise(x * 0.13 + s * 2.3, y * 0.13 + s * 0.7);
          const n3 = vnoise(x * 0.09 + s * 3.1, y * 0.09 + s * 1.1);
          const ridge = 1 - Math.abs(2 * n1 - 1);
          zf += C.sgn * C.amt * wg * (ridge * 16 - 7 + (n2 - 0.5) * 9);
          x += -dx0 * 0.2 * C.amt * wg + (n2 - 0.5) * 7 * C.amt * wg + C.dx * wg * C.fol;
          y += -dy0 * 0.2 * C.amt * wg + (n3 - 0.5) * 7 * C.amt * wg + C.dy * wg * C.fol;
        }
      }

      if (folding) {
        const s = (fmx - x) * fnx + (fmy - y) * fny;
        if (s > 0) {
          const fx = x + fnx * s;
          const fy = y + fny * s;
          if (s < PI * fr) {
            const ph = s / fr;
            x = fx - fnx * fr * Math.sin(ph);
            y = fy - fny * fr * Math.sin(ph);
            zf += F.sgn * fr * (1 - Math.cos(ph));
          } else {
            const e = s - PI * fr;
            x = fx + fnx * e;
            y = fy + fny * e;
            zf += F.sgn * (2 * fr * Math.exp(-e / 70) + 1.2);
          }
        }
      }

      const xc = clamp(x, 0, W);
      const q = (xc / W) * ARC_STEPS;
      const m0 = Math.min(ARC_STEPS - 1, Math.floor(q));
      const f = q - m0;
      const b = Ra[idx] * (ARC_STEPS + 1) + m0;
      const th = TT[b] + (TT[b + 1] - TT[b]) * f;
      const sn = Math.sin(th);
      const cs = Math.cos(th);
      const ex = x - xc;
      const X = TX[b] + (TX[b + 1] - TX[b]) * f + ex * cs;
      const Z = TZ[b] + (TZ[b + 1] - TZ[b]) * f + ex * sn;
      P[3 * idx] = X - zf * sn;
      P[3 * idx + 1] = H / 2 - y;
      P[3 * idx + 2] = Z + zf * cs + zb;
    }

    L.geo.attributes.position.needsUpdate = true;
    L.geo.computeVertexNormals();

    // 3) lighting from the real normals + gutter + cast shadows
    const N = L.geo.attributes.normal.array;
    const CF = L.geo.attributes.color.array;
    const CB = L.geoB.attributes.color.array;
    const fc = L.i > 0 ? Math.sin(leaves[L.i - 1].a * D2R) * 0.95 : 0;
    const bc = L.i < n - 1 ? Math.sin(leaves[L.i + 1].a * D2R) * 0.95 : 0;
    for (let idx = 0; idx < NVERT; idx++) {
      const nd = N[3 * idx] * LX + N[3 * idx + 1] * LY + N[3 * idx + 2] * LZ;
      const u = Ua[idx];
      const gm = 1 - gutDark(u);
      const cs = castShape(u);
      const bF = clamp((1 + 0.85 * (nd - LZ)) * gm * (1 - fc * cs), 0.25, 1.18);
      const bB = clamp((1 + 0.85 * (-nd - LZ)) * gm * (1 - bc * cs), 0.25, 1.18);
      tint(CF, 3 * idx, bF);
      tint(CB, 3 * idx, bB);
    }
    L.geo.attributes.color.needsUpdate = true;
    L.geoB.attributes.color.needsUpdate = true;
  };

  /* --------------------------- tear: helper pieces ------------------------ */

  const PW = Math.round(W * S);
  const PH = Math.round(H * S);

  const pieceTransform = (L, T, o, dz, off) => {
    const right = L.a < 90;
    const pvx = right ? T.pu : -T.pu;
    const pvy = H / 2 - T.pv;
    const c = Math.cos(o.r);
    const s = Math.sin(o.r);
    return {
      x: o.x + pvx - (pvx * c - pvy * s) + off,
      y: o.y + pvy - (pvx * s + pvy * c) - off * 1.4,
      z: dz
    };
  };

  const updatePieces = (dt) => {
    let moving = false;
    const red = reducedRef.current;
    leaves.forEach((L) => {
      const T = L.tear;
      if (!T) return;
      const o = T.o;
      spring(o, "x", "xv", o.tx, dt, red, 150, 16);
      spring(o, "y", "yv", o.ty, dt, red, 150, 16);
      spring(o, "r", "rv", o.tr, dt, red, 130, 14);
      spring(o, "z", "zv", o.tz, dt, red, 160, 18);
      if (
        Math.abs(o.x - o.tx) > 0.2 || Math.abs(o.y - o.ty) > 0.2 ||
        Math.abs(o.r - o.tr) > 0.002 || Math.abs(o.z - o.tz) > 0.05 ||
        Math.abs(o.xv) + Math.abs(o.yv) > 1
      ) moving = true;
      const p = pieceTransform(L, T, o, o.z, 0);
      T.pg.rotation.z = o.r;
      T.pg.position.set(p.x, p.y, p.z);
      const lift = Math.hypot(o.x, o.y) + o.z * 3;
      const sp = pieceTransform(L, T, o, 0.2, 4 + o.z);
      T.sg.rotation.z = o.r;
      T.sg.position.set(sp.x, sp.y, sp.z);
      T.shadowMat.opacity = clamp(lift / 22, 0, 1) * 0.3;
      const gone = T.removed && Math.abs(o.y - o.ty) < 30;
      T.pg.visible = !gone;
      T.sg.visible = !gone;
    });
    return moving;
  };

  const notifyTear = () => {
    if (!cfg.onTear) return;
    cfg.onTear({
      canUndo: undoStack.length > 0,
      canReset: leaves.some((L) => L.tear),
      canRemove: !!(selL && selL.tear && !selL.tear.removed)
    });
  };

  const makeMaskTex = (arr) => {
    const c = document.createElement("canvas");
    c.width = PW;
    c.height = PH;
    const cx = c.getContext("2d");
    const id = cx.createImageData(PW, PH);
    for (let i = 0; i < arr.length; i++) {
      const v = arr[i];
      id.data[4 * i] = v;
      id.data[4 * i + 1] = v;
      id.data[4 * i + 2] = v;
      id.data[4 * i + 3] = 255;
    }
    cx.putImageData(id, 0, 0);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.NoColorSpace;
    return t;
  };

  const tearLeaf = (L, pts) => {
    if (L.hard || L.tear || pts.length < 3) return false;
    const p0 = pts[0];
    const p1 = pts[pts.length - 1];
    let dx = p1[0] - p0[0];
    let dy = p1[1] - p0[1];
    const len = Math.hypot(dx, dy);
    if (len < 45) return false;
    dx /= len;
    dy /= len;
    const nx = -dy;
    const ny = dx;
    const seed = Math.random() * 100;

    // user's stroke -> perpendicular deviation profile o(t)
    const prof = pts
      .map((p) => [
        (p[0] - p0[0]) * dx + (p[1] - p0[1]) * dy,
        (p[0] - p0[0]) * nx + (p[1] - p0[1]) * ny
      ])
      .sort((a, b) => a[0] - b[0]);
    const TN = 1801;
    const oT = new Float32Array(TN);
    const jT = new Float32Array(TN);
    const fT = new Float32Array(TN);
    const wT = new Float32Array(TN);
    let pi = 0;
    for (let i = 0; i < TN; i++) {
      const t = i - 900;
      while (pi < prof.length - 2 && prof[pi + 1][0] < t) pi++;
      const a = prof[pi];
      const b = prof[Math.min(pi + 1, prof.length - 1)];
      const span = b[0] - a[0];
      const f = span > 0.001 ? clamp((t - a[0]) / span, 0, 1) : 0;
      oT[i] = a[1] + (b[1] - a[1]) * f;
    }
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 4; i < TN - 4; i++) {
        let s = 0;
        for (let q = -4; q <= 4; q++) s += oT[i + q];
        oT[i] = s / 9;
      }
    }
    for (let i = 0; i < TN; i++) {
      const t = i - 900;
      jT[i] =
        9 * (vnoise(t * 0.035 + seed, 0.5) - 0.5) * 2 +
        3.2 * (vnoise(t * 0.2 + seed * 2, 1.5) - 0.5) * 2 +
        1.2 * (hash(Math.floor(t * 0.7), seed) - 0.5) * 2;
      fT[i] =
        1.2 + 2.2 * vnoise(t * 0.7 + seed * 3, 2.2) + (hash(Math.floor(t * 0.9), seed * 7) > 0.82 ? 2.5 : 0);
      wT[i] = 2.2 + 2.6 * vnoise(t * 0.4 + seed, 7.7);
    }

    const E = new Float32Array(PW * PH);
    const TI = new Uint16Array(PW * PH);
    let pos = 0;
    let neg = 0;
    for (let py = 0; py < PH; py++) {
      const y = (py + 0.5) / S - p0[1];
      for (let px = 0; px < PW; px++) {
        const x = (px + 0.5) / S - p0[0];
        const ti = clamp(Math.round(x * dx + y * dy) + 900, 0, 1800);
        const e = x * nx + y * ny - oT[ti] - jT[ti];
        const idx = py * PW + px;
        E[idx] = e;
        TI[idx] = ti;
        if (e > 0) pos++;
        else neg++;
      }
    }
    const side = pos < neg ? 1 : -1;
    const pieceCov = new Uint8Array(PW * PH);
    const baseCov = new Uint8Array(PW * PH);
    let cu = 0;
    let cvv = 0;
    let cn = 0;
    for (let py = 0; py < PH; py++) {
      for (let px = 0; px < PW; px++) {
        const idx = py * PW + px;
        const pv = side * E[idx];
        pieceCov[idx] = clamp(0.5 + (pv + fT[TI[idx]]) * S, 0, 1) * 255;
        baseCov[idx] = clamp(0.5 - pv * S, 0, 1) * 255;
        if (pv > 0 && (px & 3) === 0 && (py & 3) === 0) {
          cu += px / S;
          cvv += py / S;
          cn++;
        }
      }
    }
    if (cn < 40 || pos + neg - cn * 16 < 200) return false; // nothing meaningful torn off

    const bake = (id, mirror) => {
      const c = document.createElement("canvas");
      c.width = PW;
      c.height = PH;
      paintPage(c, id, imgs, true);
      const cx = c.getContext("2d");
      const im = cx.getImageData(0, 0, PW, PH);
      const dd = im.data;
      for (let py = 0; py < PH; py++) {
        for (let px = 0; px < PW; px++) {
          const ex = mirror ? PW - 1 - px : px;
          const idx = py * PW + ex;
          const pv = side * E[idx];
          if (pv > -7 && pv < 7) {
            const wh = clamp(1 - Math.abs(pv) / wT[TI[idx]], 0, 1);
            if (wh > 0) {
              const a = 0.85 * Math.pow(wh, 0.7);
              const o = (py * PW + px) * 4;
              dd[o] += (252 - dd[o]) * a;
              dd[o + 1] += (250 - dd[o + 1]) * a;
              dd[o + 2] += (243 - dd[o + 2]) * a;
            }
          }
        }
      }
      cx.putImageData(im, 0, 0);
      return c;
    };

    const tF = new THREE.CanvasTexture(bake(L.spec.f, false));
    tF.colorSpace = THREE.SRGBColorSpace;
    tF.anisotropy = aniso;
    const tB = new THREE.CanvasTexture(bake(L.spec.b, true));
    tB.colorSpace = THREE.SRGBColorSpace;
    tB.anisotropy = aniso;
    tB.repeat.set(-1, 1);
    tB.offset.set(1, 0);
    const baseT = makeMaskTex(baseCov);
    const pieceT = makeMaskTex(pieceCov);

    L.matF.map = tF;
    L.matF.alphaMap = baseT;
    L.matF.alphaTest = 0.5;
    L.matF.needsUpdate = true;
    L.matB.map = tB;
    L.matB.alphaMap = baseT;
    L.matB.alphaTest = 0.5;
    L.matB.needsUpdate = true;

    const pm = (map, sd) =>
      new THREE.MeshBasicMaterial({
        map,
        vertexColors: true,
        side: sd,
        alphaMap: pieceT,
        alphaTest: 0.5,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2
      });
    const pmF = pm(tF, THREE.FrontSide);
    const pmB = pm(tB, THREE.BackSide);
    const mf = new THREE.Mesh(L.geo, pmF);
    const mb = new THREE.Mesh(L.geoB, pmB);
    mf.frustumCulled = false;
    mb.frustumCulled = false;
    const pg = new THREE.Group();
    pg.add(mf, mb);
    scene.add(pg);

    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0,
      alphaMap: pieceT,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });
    const sh = new THREE.Mesh(L.geo, shadowMat);
    sh.frustumCulled = false;
    const sg = new THREE.Group();
    sg.add(sh);
    scene.add(sg);

    const rightSide = L.a < 90;
    const nbx = (rightSide ? nx : -nx) * side;
    const nby = -ny * side;
    L.tear = {
      pg, sg, shadowMat, pmF, pmB, tF, tB, baseT, pieceT, pieceCov,
      pu: cu / cn, pv: cvv / cn, removed: false,
      o: {
        x: 0, y: 0, r: 0, z: 0, xv: 0, yv: 0, rv: 0, zv: 0,
        tx: nbx * 7, ty: nby * 7, tr: 0, tz: 2.5
      }
    };
    selL = L;
    undoStack.push({ type: "tear", L });
    notifyTear();
    return true;
  };

  const untear = (L) => {
    const T = L.tear;
    if (!T) return;
    L.matF.map = texFor(L.spec.f).t;
    L.matF.alphaMap = null;
    L.matF.alphaTest = 0;
    L.matF.needsUpdate = true;
    L.matB.map = texFor(L.spec.b).tf;
    L.matB.alphaMap = null;
    L.matB.alphaTest = 0;
    L.matB.needsUpdate = true;
    scene.remove(T.pg);
    scene.remove(T.sg);
    [T.pmF, T.pmB, T.shadowMat].forEach((m) => m.dispose());
    [T.tF, T.tB, T.baseT, T.pieceT].forEach((t) => t.dispose());
    L.tear = null;
    if (selL === L) selL = null;
    L.dirty = true;
  };

  const removePiece = (L) => {
    const T = L.tear;
    if (!T || T.removed) return;
    T.removed = true;
    T.saved = { tx: T.o.tx, ty: T.o.ty, tr: T.o.tr, tz: T.o.tz };
    T.o.tx += (T.o.tx >= 0 ? 1 : -1) * 260;
    T.o.ty = -(H * 1.3);
    T.o.tr += 0.9;
    T.o.tz = 30;
    undoStack.push({ type: "remove", L });
    notifyTear();
    kick();
  };

  const hitPiece = (L, bx, by) => {
    const T = L.tear;
    if (!T || T.removed) return false;
    const o = T.o;
    const right = L.a < 90;
    const pvx = right ? T.pu : -T.pu;
    const pvy = H / 2 - T.pv;
    const rx = bx - o.x - pvx;
    const ry = by - o.y - pvy;
    const c = Math.cos(o.r);
    const s = Math.sin(o.r);
    const ox = pvx + rx * c + ry * s;
    const oy = pvy - rx * s + ry * c;
    const u = right ? ox : -ox;
    const v = H / 2 - oy;
    if (u < 0 || u >= W || v < 0 || v >= H) return false;
    return T.pieceCov[Math.floor(v * S) * PW + Math.floor(u * S)] > 127;
  };

  /* ------------------------------- main loop ------------------------------ */

  const unsettled = (L) => {
    if (L.tw) return true;
    if (Math.abs(L.w) > 1) return true;
    if (L.hard) return false;
    const F = L.fold;
    const C = L.cr;
    return (
      Math.abs(L.phi) > 0.004 || Math.abs(L.phiV) > 0.02 ||
      Math.abs(L.tau) > 0.004 || Math.abs(L.tauV) > 0.02 ||
      L.hold > 0.003 || L.holdT > 0 ||
      Math.abs(F.x) > 0.15 || Math.abs(F.y) > 0.15 || Math.abs(F.xv) + Math.abs(F.yv) > 0.5 ||
      C.amt > 0.003 || C.fol > 0.003 || C.aT > 0 || Math.abs(C.dx) + Math.abs(C.dy) > 0.2
    );
  };

  const needs3D = () => {
    if (act) return true;
    for (const L of leaves) {
      if (L.a > 0.4 && L.a < 179.6) return true;
      if (unsettled(L)) return true;
    }
    const vis = [step - 1, step];
    for (const vi of vis) {
      const L = leaves[vi];
      if (L && L.tear) return true;
    }
    return false;
  };

  const tick = (now) => {
    raf = 0;
    if (dead) return;
    const dt = clamp((now - last) / 1000, 0.001, 0.05);
    last = now;
    const red = reducedRef.current;
    let active = false;

    // pass 1: tweens, motion measurement, springs
    leaves.forEach((L) => {
      if (L.tw) {
        const p = clamp((now - L.tw.t0) / L.tw.dur, 0, 1);
        L.a = L.tw.from + (L.tw.to - L.tw.from) * L.tw.ease(p);
        if (p >= 1) L.tw = null;
        else active = true;
      }
      const inst = clamp((L.a - L.prevA) / dt, -2000, 2000);
      L.prevA = L.a;
      L.w = red ? 0 : L.w * 0.6 + inst * 0.4;
      if (Math.abs(L.w) > 8) L.dirS = L.w > 0 ? 1 : -1;

      if (!L.hard) {
        const wr = clamp(L.w * D2R, -9, 9);
        const sA = Math.sin(L.a * D2R);
        spring(L, "hold", "holdV", L.holdT, dt, red, 200, 22);
        const phiT = red ? 0 : -clamp(wr * 0.12, -0.8, 0.8) - L.dirS * (0.12 * sA + 0.3 * L.hold * sA);
        const tauT = red ? 0 : clamp(Math.abs(wr) * 0.07, 0, 0.4) + 0.22 * L.hold * sA;
        spring(L, "phi", "phiV", phiT, dt, red, 240, 17);
        spring(L, "tau", "tauV", tauT, dt, red, 200, 16);

        const F = L.fold;
        spring(F, "x", "xv", F.tx, dt, red, 120, 11);
        spring(F, "y", "yv", F.ty, dt, red, 120, 11);
        const C = L.cr;
        spring(C, "amt", "av", C.aT, dt, red, 70, 9);
        spring(C, "fol", "fv", C.fT, dt, red, 110, 13);
        spring(C, "dx", "dxv", C.tdx, dt, red, 110, 13);
        spring(C, "dy", "dyv", C.tdy, dt, red, 110, 13);
        if (C.aT === 0 && C.amt < 0.003) {
          C.amt = 0;
          C.av = 0;
        }
        if (C.fT === 0 && C.fol < 0.003) {
          C.fol = 0;
          C.fv = 0;
        }
      }
      if (unsettled(L)) active = true;
    });

    // pass 2: decide what to rebuild
    leaves.forEach((L) => {
      if (Math.abs(L.a - L.lastA) > 1e-4) {
        L.dirty = true;
        if (leaves[L.i - 1]) leaves[L.i - 1].dirty = true;
        if (leaves[L.i + 1]) leaves[L.i + 1].dirty = true;
      }
    });
    leaves.forEach((L) => {
      if (L.hard) {
        if (L.dirty) updateHard(L);
      } else if (L.dirty || unsettled(L)) deform(L);
      L.lastA = L.a;
      L.dirty = false;
    });
    shadeStatic();
    if (updatePieces(dt)) active = true;

    // book shift, boards, stack edges, ground vars
    const A0 = leaves[0].a;
    const open = mobile ? 0 : clamp(A0 / 180, 0, 1);
    const rem = 1 - clamp(leaves[n - 1].a / 180, 0, 1);
    camera.position.x = mobile ? W / 2 : (W / 2) * (1 - open);
    boardL.visible = !mobile && open > 0.01;
    boardLMats.forEach((m) => {
      m.opacity = open;
    });
    stackR.forEach((m) => {
      m.opacity = rem;
    });
    stackL.forEach((m) => {
      m.opacity = open;
    });
    const maxS = leaves.reduce((m, L) => Math.max(m, Math.sin(L.a * D2R)), 0);
    if (cfg.setVars) cfg.setVars(open, rem, maxS);

    renderer.render(scene, camera);

    // overlay (flat HTML) vs WebGL hand-over
    if (needs3D()) {
      restT = 0;
      restDone = false;
      if (!liveNow) {
        liveNow = true;
        cfg.setLive(true);
      }
    } else {
      restT += dt;
      if (restT > 0.14 && !restDone) {
        restDone = true;
        if (liveNow) {
          liveNow = false;
          cfg.setLive(false);
        }
        cfg.onRest();
      }
    }
    if (active || act || !restDone) raf = requestAnimationFrame(tick);
  };

  function kick() {
    if (dead || raf) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }

  /* ------------------------------ public API ------------------------------ */

  const tweenTo = (i, to, dur, ease = easeInOut) => {
    const L = leaves[i];
    if (!L) return;
    if (reducedRef.current || dur <= 0 || L.a === to) {
      L.tw = null;
      L.a = to;
      L.dirty = true;
    } else {
      L.tw = { from: L.a, to, t0: performance.now(), dur, ease };
    }
    kick();
  };

  const toBook = (cx, cy, rect) => ({
    bx: camera.position.x + (cx - (rect.left + rect.width / 2)) / k,
    by: -(cy - (rect.top + rect.height / 2)) / k
  });

  const pick = (cx, cy, rect) => {
    const { bx, by } = toBook(cx, cy, rect);
    const right = mobile ? true : bx > 0;
    let leaf = right ? (step < n ? step : -1) : step > 0 ? step - 1 : -1;
    if (leaf >= 0 && leaves[leaf].hard) leaf = -1;
    const u = right ? bx : -bx;
    const v = H / 2 - by;
    if (leaf < 0 || u < 0 || u > W || v < 0 || v > H) return { bx, by, leaf: -1 };
    return { bx, by, leaf, side: right ? "R" : "L", u, v };
  };

  const sheetOf = (L, bx, by) => ({ u: L.a < 90 ? bx : -bx, v: H / 2 - by });

  const api = {
    resize(cw, ch, kk) {
      k = kk;
      renderer.setSize(cw, ch, false);
      camera.aspect = cw / ch;
      camera.fov = (2 * Math.atan(ch / kk / 2 / ZC)) / D2R;
      camera.updateProjectionMatrix();
      leaves.forEach((L) => {
        L.dirty = true;
      });
      kick();
    },
    setImages(im) {
      imgs = im;
      Object.keys(pageTex).forEach((id) => repaint(id === "endpaper" || id === "blank" ? id : Number(id)));
      kick();
    },
    setSeen(s) {
      const prev = seen;
      seen = s;
      s.forEach((id) => {
        if (!prev.has(id)) repaint(id);
      });
      kick();
    },
    setStep(s) {
      step = s;
      kick();
    },
    tweenTo,
    cancelTween(i) {
      if (leaves[i]) leaves[i].tw = null;
    },
    setAngle(i, a) {
      const L = leaves[i];
      if (!L) return;
      L.tw = null;
      L.a = a;
      L.dirty = true;
      kick();
    },
    setHold(i, h) {
      if (leaves[i]) leaves[i].holdT = h;
      kick();
    },
    setVg(i, v) {
      if (leaves[i]) leaves[i].vg = clamp(v, 0, H);
    },
    resetAngles() {
      leaves.forEach((L) => {
        L.a = 0;
        L.prevA = 0;
        L.w = 0;
        L.tw = null;
        L.phi = L.phiV = L.tau = L.tauV = 0;
        L.dirty = true;
      });
      kick();
    },
    forceLive() {
      restT = 0;
      restDone = false;
      if (!liveNow) {
        liveNow = true;
        cfg.setLive(true);
      }
    },
    snapPieces() {
      leaves.forEach((L) => {
        const T = L.tear;
        if (T && !T.removed) {
          T.o.tx = 0;
          T.o.ty = 0;
          T.o.tr = 0;
          T.o.tz = 0;
        }
      });
      kick();
    },
    pick,

    /* ---- paper (fold / crumple) ---- */
    paperDown(pk, tool) {
      if (pk.leaf < 0) return false;
      const L = leaves[pk.leaf];
      if (tool === "fold") {
        const cu = pk.u < W / 2 ? 0 : W;
        const cv = pk.v < H / 2 ? 0 : H;
        if (Math.abs(pk.u - cu) > W * 0.34 || Math.abs(pk.v - cv) > H * 0.34) return false;
        Object.assign(L.fold, { cu, cv, sgn: pk.side === "R" ? 1 : -1 });
        act = { type: "fold", L, sx: pk.u, sy: pk.v };
      } else {
        const C = L.cr;
        C.cx = pk.u;
        C.cy = pk.v;
        C.sx = pk.u;
        C.sy = pk.v;
        C.seed = Math.random() * 50;
        C.sgn = pk.side === "R" ? 1 : -1;
        C.path = 0;
        C.aT = 0.35;
        C.fT = 1;
        C.tdx = 0;
        C.tdy = 0;
        act = { type: "crumple", L, lu: pk.u, lv: pk.v };
      }
      kick();
      return true;
    },
    paperMove(cx, cy, rect) {
      if (!act) return;
      const { bx, by } = toBook(cx, cy, rect);
      const L = act.L;
      const { u, v } = sheetOf(L, bx, by);
      if (act.type === "fold") {
        const F = L.fold;
        const ix = F.cu === 0 ? 1 : -1;
        const iy = F.cv === 0 ? 1 : -1;
        let dx = Math.max(0, (u - act.sx) * ix) * ix;
        let dy = Math.max(0, (v - act.sy) * iy) * iy;
        const m = Math.hypot(dx, dy);
        if (m > 340) {
          dx *= 340 / m;
          dy *= 340 / m;
        }
        F.tx = dx;
        F.ty = dy;
      } else {
        const C = L.cr;
        C.path += Math.hypot(u - act.lu, v - act.lv);
        act.lu = u;
        act.lv = v;
        C.tdx = clamp(u - C.sx, -130, 130);
        C.tdy = clamp(v - C.sy, -130, 130);
        C.aT = clamp(0.35 + C.path / 500, 0, 1);
      }
      kick();
    },
    paperUp() {
      if (!act) return;
      const L = act.L;
      if (act.type === "fold") {
        L.fold.tx = 0;
        L.fold.ty = 0;
      } else {
        L.cr.aT = 0;
        L.cr.fT = 0;
        L.cr.tdx = 0;
        L.cr.tdy = 0;
      }
      act = null;
      kick();
    },

    /* ---- tear ---- */
    tearDown(pk) {
      if (pk.leaf < 0) return null;
      const L = leaves[pk.leaf];
      if (L.tear) {
        if (hitPiece(L, pk.bx, pk.by)) {
          selL = L;
          L.tear.o.tz = 6;
          act = { type: "piece", L, sx: pk.bx, sy: pk.by, ox: L.tear.o.tx, oy: L.tear.o.ty };
          notifyTear();
          kick();
          return "piece";
        }
        return null;
      }
      act = { type: "stroke", L, pts: [[pk.u, pk.v]], book: [[pk.bx, pk.by]] };
      stroke.visible = true;
      stroke.geometry.setDrawRange(0, 0);
      kick();
      return "stroke";
    },
    tearMove(cx, cy, rect) {
      if (!act) return;
      const { bx, by } = toBook(cx, cy, rect);
      const L = act.L;
      if (act.type === "piece") {
        const o = L.tear.o;
        o.tx = act.ox + (bx - act.sx);
        o.ty = act.oy + (by - act.sy);
        o.tr = clamp((bx - act.sx) * 0.0016, -0.5, 0.5);
        kick();
      } else if (act.type === "stroke") {
        const { u, v } = sheetOf(L, bx, by);
        const lp = act.pts[act.pts.length - 1];
        if (Math.hypot(u - lp[0], v - lp[1]) < 3 || act.pts.length >= 399) return;
        act.pts.push([u, v]);
        act.book.push([bx, by]);
        const arr = stroke.geometry.attributes.position.array;
        act.book.forEach((p, i) => {
          arr[3 * i] = p[0];
          arr[3 * i + 1] = p[1];
          arr[3 * i + 2] = 40;
        });
        stroke.geometry.attributes.position.needsUpdate = true;
        stroke.geometry.setDrawRange(0, act.book.length);
        kick();
      }
    },
    tearUp() {
      if (!act) return;
      const a = act;
      act = null;
      if (a.type === "stroke") {
        stroke.visible = false;
        tearLeaf(a.L, a.pts);
      } else if (a.type === "piece") {
        const T = a.L.tear;
        const o = T.o;
        const outside = Math.abs(o.tx) > W * 1.05 || Math.abs(o.ty) > H * 0.55;
        if (outside) removePiece(a.L);
        else o.tz = 1.5;
      }
      kick();
    },
    undo() {
      const op = undoStack.pop();
      if (!op) return;
      if (op.type === "tear") untear(op.L);
      else if (op.type === "remove" && op.L.tear) {
        const T = op.L.tear;
        T.removed = false;
        Object.assign(T.o, T.saved);
        selL = op.L;
      }
      notifyTear();
      kick();
    },
    reset() {
      leaves.forEach((L) => untear(L));
      undoStack.length = 0;
      selL = null;
      notifyTear();
      kick();
    },
    removeSelected() {
      if (selL && selL.tear && !selL.tear.removed) removePiece(selL);
    },
    releaseAll() {
      act = null;
      stroke.visible = false;
      leaves.forEach((L) => {
        if (L.hard) return;
        L.fold.tx = 0;
        L.fold.ty = 0;
        L.cr.aT = 0;
        L.cr.fT = 0;
        L.cr.tdx = 0;
        L.cr.tdy = 0;
      });
      kick();
    },
    kick,
    dispose() {
      dead = true;
      cancelAnimationFrame(raf);
      leaves.forEach((L) => untear(L));
      disposables.forEach((o) => o.dispose && o.dispose());
      Object.values(pageTex).forEach((e) => {
        e.t.dispose();
        e.tf.dispose();
      });
      renderer.dispose();
      if (renderer.forceContextLoss) renderer.forceContextLoss();
    }
  };

  api.kick();
  return api;
}

/* ------------------------------- component ------------------------------- */

const MODE_LABEL = { read: "READ", paper: "PAPER", tear: "TEAR" };

export default function FlipbookBanner() {
  const audioContextRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const ovlRef = useRef(null);
  const eng = useRef(null);
  const stepRef = useRef(0);
  const drag = useRef(null);
  const peek = useRef({ leaf: -1, to: 0 });
  const reducedRef = useRef(false);
  const closeTimer = useRef(null);
  const suppressClick = useRef(false);
  const api = useRef({});
  const modeRef = useRef("read");
  const toolRef = useRef("fold");
  const seenRef = useRef(new Set());

  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [showFooterButton, setShowFooterButton] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [step, setStep] = useState(0);
  const [seen, setSeen] = useState(() => new Set());
  const [mode, setMode] = useState("read");
  const [tool, setTool] = useState("fold");
  const [tearInfo, setTearInfo] = useState({ canUndo: false, canReset: false, canRemove: false });
  const [vp, setVp] = useState(() =>
    typeof window === "undefined"
      ? { w: 1280, h: 800 }
      : { w: window.innerWidth, h: window.innerHeight }
  );

  const isMobile = vp.w < 760;
  const leaves = useMemo(
    () => (isMobile ? MOBILE_LEAVES : DESKTOP_LEAVES),
    [isMobile]
  );
  const stageW = isMobile ? PAGE_W : PAGE_W * 2;
  const availW = vp.w - (isMobile ? 24 : 64);
  const availH = vp.h - 250;
  const k = clamp(Math.min(availW / stageW, availH / PAGE_H), 0.3, 1.2);
  const canvasW = Math.round(stageW * k + CANVAS_PAD * 2);
  const canvasH = Math.round(PAGE_H * k + CANVAS_PAD * 2);

  const soundRef = useRef(soundEnabled);
  const leavesRef = useRef(leaves);
  const mobileRef = useRef(isMobile);
  soundRef.current = soundEnabled;
  leavesRef.current = leaves;
  mobileRef.current = isMobile;
  seenRef.current = seen;
  modeRef.current = mode;
  toolRef.current = tool;

  /* ---------------------------- viewport + a11y --------------------------- */

  useEffect(() => {
    const onResize = () =>
      setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedRef.current = mq.matches;
    };
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // 📜 Scroll logic (unchanged): auto-open once past hero, footer button near bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY > 300 && !hasAutoOpened) {
        setIsOpen(true);
        setHasAutoOpened(true);
      }

      const distanceFromBottom = docHeight - (scrollY + windowHeight);
      if (scrollY > 400 && distanceFromBottom <= 450) {
        setShowFooterButton(true);
      } else {
        setShowFooterButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAutoOpened]);

  // Lock background scroll + keyboard while open
  useEffect(() => {
    if (!isOpen) return undefined;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") api.current.close();
      if (event.key === "ArrowRight") api.current.next();
      if (event.key === "ArrowLeft") api.current.prev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(
    () => () => {
      clearTimeout(closeTimer.current);
      if (audioContextRef.current && audioContextRef.current.close) {
        audioContextRef.current.close().catch(() => {});
      }
    },
    []
  );

  /* ------------------------------- sound ---------------------------------- */

  const playFlipSound = (heavy = false) => {
    if (!soundRef.current) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioContextRef.current) audioContextRef.current = new Ctx();
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const dur = heavy ? 0.5 : 0.34;
      const len = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        const env = Math.sin(Math.PI * Math.pow(t, 0.6));
        data[i] = (Math.random() * 2 - 1) * env * (0.6 + 0.4 * Math.random());
      }

      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.Q.value = 0.7;
      bp.frequency.setValueAtTime(2600, ctx.currentTime);
      bp.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + dur);
      const g = ctx.createGain();
      g.gain.value = heavy ? 0.16 : 0.1;
      src.connect(bp);
      bp.connect(g);
      g.connect(ctx.destination);
      src.start();

      if (heavy) {
        const osc = ctx.createOscillator();
        const og = ctx.createGain();
        osc.frequency.setValueAtTime(90, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.25);
        og.gain.setValueAtTime(0.0001, ctx.currentTime);
        og.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
        og.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
        osc.connect(og);
        og.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.32);
      }
    } catch (error) {
      // Sound is optional.
    }
  };

  /* ---------------------- visible pages + settle handling ------------------ */

  const visibleIdsFor = (s) => {
    const list = leavesRef.current;
    const right = s < list.length ? list[s].f : BACK_INDEX;
    const left = !mobileRef.current && s > 0 ? list[s - 1].b : null;
    return left === null ? [right] : [left, right];
  };

  // Called by the engine when the book is at rest: text of the now-visible
  // pages starts its choreography (once per opening).
  const markSeen = () => {
    const ids = visibleIdsFor(stepRef.current);
    setSeen((prev) => {
      let changed = false;
      const next = new Set(prev);
      ids.forEach((id) => {
        if (!next.has(id)) {
          next.add(id);
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  };

  /* ----------------------------- WebGL engine ----------------------------- */

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return undefined;
    let e = null;
    try {
      e = createEngine(canvasRef.current, {
        leafSpecs: leaves,
        mobile: isMobile,
        reducedRef,
        setLive: (b) => {
          if (ovlRef.current) ovlRef.current.dataset.live = b ? "1" : "0";
        },
        setVars: (open, rem, turn) => {
          const el = stageRef.current;
          if (!el) return;
          el.style.setProperty("--open", open.toFixed(3));
          el.style.setProperty("--rem", rem.toFixed(3));
          el.style.setProperty("--turn", turn.toFixed(3));
        },
        onRest: () => api.current.rest && api.current.rest(),
        onTear: (s) => setTearInfo(s)
      });
    } catch (err) {
      e = null; // no WebGL: the flat HTML layer + instant page changes remain
    }
    eng.current = e;
    if (e) {
      e.setSeen(seenRef.current);
      e.setStep(stepRef.current);
      loadAllImages().then((imgs) => {
        if (eng.current === e) e.setImages(imgs);
      });
    }
    return () => {
      if (e) e.dispose();
      if (eng.current === e) eng.current = null;
    };
  }, [isOpen, isMobile, leaves]);

  useEffect(() => {
    if (eng.current) eng.current.resize(canvasW, canvasH, k);
  }, [canvasW, canvasH, k, isOpen, isMobile]);

  useEffect(() => {
    if (eng.current) eng.current.setSeen(seen);
  }, [seen]);

  useEffect(() => {
    if (eng.current) eng.current.setStep(step);
  }, [step]);

  // Every time the book opens (or switches layout): closed book → cover opens
  useEffect(() => {
    if (!isOpen) return undefined;

    if (eng.current) {
      eng.current.resetAngles();
      eng.current.reset();
    }
    stepRef.current = 0;
    peek.current = { leaf: -1, to: 0 };
    setStep(0);
    setSeen(new Set());
    setMode("read");
    modeRef.current = "read";

    const t = setTimeout(() => api.current.next(), reducedRef.current ? 200 : 1200);
    return () => {
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isMobile]);

  /* ---------------------------- turning actions --------------------------- */

  const goNext = () => {
    const list = leavesRef.current;
    const i = stepRef.current;
    if (i >= list.length) return;
    peek.current = { leaf: -1, to: 0 };
    const e = eng.current;
    if (e) {
      e.forceLive();
      e.snapPieces();
    }
    stepRef.current = i + 1;
    setStep(i + 1);
    const hard = !!list[i].hard;
    playFlipSound(hard);
    if (e) e.tweenTo(i, 180, hard ? 1500 : 1000, easeInOut);
    else markSeen();
  };

  const goPrev = () => {
    const i = stepRef.current - 1;
    if (i < 0) return;
    peek.current = { leaf: -1, to: 0 };
    const e = eng.current;
    if (e) {
      e.forceLive();
      e.snapPieces();
    }
    stepRef.current = i;
    setStep(i);
    const hard = !!leavesRef.current[i].hard;
    playFlipSound(hard);
    if (e) e.tweenTo(i, 0, hard ? 1500 : 1000, easeInOut);
    else markSeen();
  };

  const closeBook = () => {
    if (closing) return;
    setClosing(true);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(
      () => {
        setIsOpen(false);
        setClosing(false);
      },
      reducedRef.current ? 0 : 320
    );
  };

  api.current = { next: goNext, prev: goPrev, close: closeBook, rest: markSeen };

  const changeMode = (m) => {
    if (m === modeRef.current) return;
    modeRef.current = m;
    setMode(m);
    drag.current = null;
    if (stageRef.current) stageRef.current.classList.remove("is-dragging");
    if (eng.current) eng.current.releaseAll();
    clearPeek();
  };

  /* ------------------------------ pointer input --------------------------- */

  // Geometry of the visible book in screen space (spine position follows the
  // closed/open camera shift).
  const getGeom = () => {
    const stage = stageRef.current;
    if (!stage) return null;
    const r = stage.getBoundingClientRect();
    const mob = mobileRef.current;
    const pw = PAGE_W * (r.width / stageW);
    const scale = r.width / stageW;
    const cx = mob ? PAGE_W / 2 : stepRef.current === 0 ? PAGE_W / 2 : 0;
    const spineX = mob ? r.left : r.left + (PAGE_W - cx) * scale;
    const rect = {
      left: mob ? spineX : spineX - pw,
      right: spineX + pw,
      top: r.top,
      bottom: r.bottom,
      width: mob ? pw : pw * 2,
      height: r.height
    };
    return { rect, stageRect: r, spineX, pw };
  };

  const vgOf = (clientY, rect) => clamp(((clientY - rect.top) / rect.height) * PAGE_H, 0, PAGE_H);

  const setPeek = (leaf, to, clientY, rect) => {
    if (peek.current.leaf === leaf && peek.current.to === to) return;
    peek.current = { leaf, to };
    if (eng.current) {
      eng.current.setVg(leaf, vgOf(clientY, rect));
      eng.current.tweenTo(leaf, to, 280, easeOut);
    }
  };

  const clearPeek = () => {
    const p = peek.current;
    if (p.leaf < 0) return;
    const base = p.leaf < stepRef.current ? 180 : 0;
    peek.current = { leaf: -1, to: 0 };
    if (eng.current) eng.current.tweenTo(p.leaf, base, 320, easeOut);
  };

  const hoverPeek = (e) => {
    if (mobileRef.current || closing || modeRef.current !== "read") return;
    const g = getGeom();
    if (!g || !eng.current) return;
    const { rect, pw } = g;
    const cw = pw * 0.24;
    const ch = pw * 0.3;
    const x = e.clientX;
    const y = e.clientY;
    const nearV = y < rect.top + ch || y > rect.bottom - ch;
    const n = leavesRef.current.length;
    const s = stepRef.current;

    if (nearV && x > rect.right - cw && s < n) {
      setPeek(s, 13, y, rect);
    } else if (nearV && x < rect.left + cw && s > 0) {
      setPeek(s - 1, 167, y, rect);
    } else {
      clearPeek();
    }
  };

  const handleTap = (e, dr) => {
    if (dr.link) return;
    const { rect, spineX, pw } = dr;
    const x = e.clientX;
    const y = e.clientY;
    const s = stepRef.current;
    const n = leavesRef.current.length;

    // Closed book: tapping the cover opens it
    if (s === 0 && x > spineX) {
      goNext();
      return;
    }

    const cw = pw * 0.24;
    const ch = pw * 0.3;
    const nearV = y < rect.top + ch || y > rect.bottom - ch;
    const leftEdge = mobileRef.current ? spineX : rect.left;

    if (nearV && x > rect.right - cw && s < n) {
      if (eng.current) eng.current.setVg(s, vgOf(y, rect));
      goNext();
    } else if (nearV && x < leftEdge + cw && s > 0) {
      if (eng.current) eng.current.setVg(s - 1, vgOf(y, rect));
      goPrev();
    }
  };

  const capture = (id) => {
    if (!stageRef.current) return;
    try {
      stageRef.current.setPointerCapture(id);
    } catch (err) {
      // ignore
    }
    stageRef.current.classList.add("is-dragging");
  };

  const onPointerDown = (e) => {
    if (closing) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const g = getGeom();
    if (!g) return;
    clearPeek();
    const link = !!(e.target.closest && e.target.closest("a,button"));
    const m = modeRef.current;

    // PAPER / TEAR modes: direct manipulation of one sheet
    if (m !== "read") {
      const eg = eng.current;
      if (!eg) return;
      const pk = eg.pick(e.clientX, e.clientY, g.stageRect);
      let ok = false;
      if (m === "paper") ok = eg.paperDown(pk, toolRef.current);
      else ok = !!eg.tearDown(pk);
      if (ok) {
        drag.current = { kind: m, id: e.pointerId, started: true };
        suppressClick.current = true;
        capture(e.pointerId);
      }
      return;
    }

    drag.current = {
      kind: "read",
      id: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      rect: g.rect,
      spineX: g.spineX,
      pw: g.pw,
      leaf: -1,
      dir: 0,
      started: false,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      R: 1,
      anchor: 0,
      link
    };
  };

  const onPointerMove = (e) => {
    const dr = drag.current;
    if (!dr) {
      if (e.pointerType === "mouse") hoverPeek(e);
      return;
    }
    if (e.pointerId !== dr.id) return;
    const eg = eng.current;

    if (dr.kind !== "read") {
      const g = getGeom();
      if (!g || !eg) return;
      if (dr.kind === "paper") eg.paperMove(e.clientX, e.clientY, g.stageRect);
      else eg.tearMove(e.clientX, e.clientY, g.stageRect);
      return;
    }

    const dx = e.clientX - dr.sx;
    const dy = e.clientY - dr.sy;

    if (!dr.started) {
      if (Math.hypot(dx, dy) < 7) return;
      if (Math.abs(dy) > Math.abs(dx) * 1.6) {
        drag.current = null;
        return;
      }

      const n = leavesRef.current.length;
      const s = stepRef.current;
      const dir = mobileRef.current ? (dx < 0 ? 1 : -1) : dr.sx > dr.spineX ? 1 : -1;

      if (dir === 1 && (s >= n || dx > 0)) {
        drag.current = null;
        return;
      }
      if (dir === -1 && (s <= 0 || dx < 0)) {
        drag.current = null;
        return;
      }

      dr.dir = dir;
      dr.leaf = dir === 1 ? s : s - 1;
      dr.R = mobileRef.current
        ? dr.pw * 0.95
        : clamp(Math.abs(dr.sx - dr.spineX), dr.pw * 0.3, dr.pw);
      dr.anchor = dr.spineX + dir * dr.R;
      dr.started = true;
      suppressClick.current = true;

      if (eg) {
        eg.forceLive();
        eg.snapPieces();
        eg.cancelTween(dr.leaf);
        eg.setVg(dr.leaf, vgOf(dr.sy, dr.rect)); // grabbed row leads, the rest lags
        eg.setHold(dr.leaf, 1);
      }
      capture(dr.id);
    }

    // Leaf edge follows the pointer: x = spine + R·cos(angle)
    const x = dr.anchor + (e.clientX - dr.sx);
    const a = Math.acos(clamp((x - dr.spineX) / dr.R, -1, 1)) / D2R;
    if (eg) eg.setAngle(dr.leaf, a);
    dr.curA = a;

    const now = performance.now();
    const dt = now - dr.lastT;
    if (dt > 0) {
      dr.v = dr.v * 0.6 + ((e.clientX - dr.lastX) / dt) * 0.4;
      dr.lastX = e.clientX;
      dr.lastT = now;
    }
  };

  const endDrag = (e, cancelled) => {
    const dr = drag.current;
    if (!dr || e.pointerId !== dr.id) return;
    drag.current = null;
    const eg = eng.current;

    if (stageRef.current) {
      stageRef.current.classList.remove("is-dragging");
      try {
        stageRef.current.releasePointerCapture(dr.id);
      } catch (err) {
        // ignore
      }
    }

    if (dr.kind !== "read") {
      if (eg) {
        if (dr.kind === "paper") eg.paperUp();
        else eg.tearUp();
      }
      setTimeout(() => {
        suppressClick.current = false;
      }, 0);
      return;
    }

    if (!dr.started) {
      if (!cancelled) handleTap(e, dr);
      return;
    }
    setTimeout(() => {
      suppressClick.current = false;
    }, 0);

    const a = dr.curA === undefined ? 0 : dr.curA;
    const v = dr.v;
    let commit;
    if (dr.dir === 1) {
      commit = v < -0.35 ? true : v > 0.35 ? false : a > 75;
    } else {
      commit = v > 0.35 ? true : v < -0.35 ? false : a < 105;
    }
    if (cancelled) commit = false;

    let target;
    if (dr.dir === 1) {
      target = commit ? 180 : 0;
      if (commit) {
        stepRef.current = dr.leaf + 1;
        setStep(dr.leaf + 1);
      }
    } else {
      target = commit ? 0 : 180;
      if (commit) {
        stepRef.current = dr.leaf;
        setStep(dr.leaf);
      }
    }
    if (commit) playFlipSound(!!leavesRef.current[dr.leaf].hard);

    if (eg) {
      eg.setHold(dr.leaf, 0);
      eg.tweenTo(dr.leaf, target, 220 + (620 * Math.abs(target - a)) / 180, easeOut);
    }
  };

  /* ---------------------------- derived UI state -------------------------- */

  const visibleIds = useMemo(() => {
    const n = leaves.length;
    const right = step < n ? leaves[step].f : BACK_INDEX;
    const left = !isMobile && step > 0 ? leaves[step - 1].b : null;
    return left === null ? [right] : [left, right];
  }, [leaves, step, isMobile]);

  const nums = visibleIds
    .filter((id) => typeof id === "number")
    .map((id) => id + 1);
  const pageLabel =
    nums.length === 0
      ? "1"
      : nums.length === 1
      ? `${nums[0]}`
      : `${Math.min(...nums)}–${Math.max(...nums)}`;
  const progress = Math.min(
    100,
    Math.round((Math.max(1, ...nums) / portfolioPages.length) * 100)
  );

  // flat HTML layer (kept mounted so typography plays exactly once)
  const rId = step < leaves.length ? leaves[step].f : BACK_INDEX;
  const lId = !isMobile && step > 0 ? leaves[step - 1].b : null;
  const rightLeft = isMobile ? 0 : step === 0 ? PAGE_W / 2 : PAGE_W;
  const ovIds = isMobile
    ? portfolioPages.map((_, i) => i)
    : [...portfolioPages.map((_, i) => i), "endpaper"];

  const renderOverlayPage = (id) => {
    const role = id === rId ? "R" : lId !== null && id === lId ? "L" : null;
    const hard = id === 0 || id === "endpaper";
    const bw = hard ? HARD_W : PAGE_W;
    const bh = hard ? HARD_H : PAGE_H;
    const style = {
      width: bw,
      height: bh,
      top: hard ? -7 : 0,
      left: role === "L" ? rightLeft - bw : rightLeft
    };
    const play = seen.has(id);
    return (
      <div
        key={String(id)}
        className={`ov-page${role === "L" ? " ov-L" : ""}${role ? "" : " is-hidden"}`}
        style={style}
      >
        {id === "endpaper" ? (
          <Endpaper play={play} />
        ) : (
          <BookPage page={portfolioPages[id]} index={id} play={play} />
        )}
        <i className="fx fx-gut" />
        <i className="fx fx-tex" />
      </div>
    );
  };

  const openBook = () => setIsOpen(true);

  const hint =
    mode === "read"
      ? "Grab a page and drag it · let go early and it falls back"
      : mode === "paper"
      ? tool === "fold"
        ? "Pull a page corner to fold it · release and it springs back"
        : "Press and drag on a page to crumple it · release to smooth it out"
      : "Drag across a page to tear it · drag the torn piece, or remove it";

  /* --------------------------------- render ------------------------------- */

  return (
    <>
      <style>{`
        .portfolio-book-root {
          font-family: Inter, Arial, sans-serif;
        }

        /* 🟨 Yellow Neo-Brutalist Button (Shows only near Footer) */
        .portfolio-book-trigger {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 9990;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-width: 195px;
          height: 54px;
          padding: 0 18px;
          color: #0B0B0C;
          background: #CCFF00;
          border: 3px solid #0B0B0C;
          border-radius: 0px;
          box-shadow: 5px 5px 0 #0B0B0C;
          cursor: pointer;
          font-family: inherit;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
          animation: portfolio-trigger-pop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          will-change: transform;
        }

        @keyframes portfolio-trigger-pop {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .portfolio-book-trigger:hover {
          transform: translate(3px, 3px);
          box-shadow: 2px 2px 0 #0B0B0C;
          background: #d8ff33;
        }
        .portfolio-book-trigger:active {
          transform: translate(5px, 5px);
          box-shadow: 0px 0px 0 #0B0B0C;
        }
        .portfolio-book-trigger-icon {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          color: #CCFF00;
          background: #0B0B0C;
          border: 2px solid #0B0B0C;
          font-size: 16px;
          font-weight: 900;
        }

        /* ---------- overlay (dark studio, soft spotlight) ---------- */
        .portfolio-book-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px;
          background: radial-gradient(ellipse 80% 70% at 50% 42%, #1c1d18 0%, #0B0B0C 72%);
          animation: bookFadeIn .5s ease both;
        }
        .portfolio-book-overlay.is-closing {
          animation: bookFadeOut .3s ease both;
        }
        @keyframes bookFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bookFadeOut { from { opacity: 1; } to { opacity: 0; } }

        .portfolio-book-modal {
          width: min(100%, 1100px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          position: relative;
        }
        .portfolio-book-topbar {
          width: min(100%, 850px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #f7f3e8;
        }
        .portfolio-book-brand {
          font-size: 11px;
          letter-spacing: .18em;
          font-weight: 800;
        }
        .portfolio-book-brand span { color: #CCFF00; }
        .portfolio-book-actions { display: flex; align-items: center; gap: 9px; }

        .portfolio-icon-button {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 50%;
          color: white;
          background: rgba(255,255,255,.08);
          font-size: 16px;
          cursor: pointer;
          transition: background .2s, transform .2s;
        }
        .portfolio-icon-button:hover {
          background: rgba(255,255,255,.2);
          transform: translateY(-2px);
        }
        .portfolio-icon-button:focus-visible,
        .portfolio-nav-button:focus-visible,
        .pf-chip:focus-visible {
          outline: 2px solid #CCFF00;
          outline-offset: 2px;
        }

        /* ---------- mode switch (minimal) ---------- */
        .portfolio-modebar {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }
        .pf-chip {
          height: 28px;
          padding: 0 12px;
          color: rgba(247,243,232,.82);
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 14px;
          font-family: inherit;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .14em;
          cursor: pointer;
          transition: background .2s, color .2s;
        }
        .pf-chip:hover:not(:disabled) { background: rgba(255,255,255,.18); }
        .pf-chip[aria-pressed="true"] {
          background: #CCFF00;
          color: #0B0B0C;
          border-color: #CCFF00;
        }
        .pf-chip:disabled { opacity: .3; cursor: not-allowed; }
        .pf-sep { width: 1px; height: 16px; background: rgba(255,255,255,.2); margin: 0 4px; }
        .pf-hint {
          min-height: 12px;
          color: rgba(247,243,232,.55);
          font-size: 9px;
          letter-spacing: .1em;
          text-align: center;
        }

        .portfolio-book-stage {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
          padding: 10px 0;
        }

        .portfolio-book-footer {
          width: min(100%, 850px);
          display: flex;
          align-items: center;
          gap: 15px;
          color: rgba(247,243,232,.68);
          font-size: 10px;
          letter-spacing: .12em;
        }
        .portfolio-progress {
          flex: 1;
          height: 2px;
          background: rgba(255,255,255,.18);
          overflow: hidden;
          border-radius: 10px;
        }
        .portfolio-progress-fill {
          height: 100%;
          background: #CCFF00;
          transition: width .5s;
        }

        .portfolio-book-navigation {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
        }
        .portfolio-nav-button {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          color: #f7f3e8;
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          transition: .2s;
        }
        .portfolio-nav-button:hover:not(:disabled) {
          background: #CCFF00;
          color: #0B0B0C;
        }
        .portfolio-nav-button:disabled { opacity: .28; cursor: not-allowed; }

        /* =====================================================
           3D BOOK  (WebGL canvas + flat HTML reading layer)
           ===================================================== */
        .fb-stage {
          position: relative;
          flex: none;
          user-select: none;
          -webkit-user-select: none;
          -webkit-touch-callout: none;
          touch-action: none;
          cursor: grab;
        }
        .fb-stage.is-dragging { cursor: grabbing; }
        .fb-stage[data-mode="tear"] { cursor: crosshair; }

        .fb-canvas {
          position: absolute;
          display: block;
          pointer-events: none;
        }

        .fb-ground {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -34px;
          height: 54px;
          background: radial-gradient(ellipse at 50% 30%, rgba(0,0,0,.78), rgba(0,0,0,0) 68%);
          filter: blur(9px);
          pointer-events: none;
          opacity: calc(.8 + var(--turn, 0) * .2);
          transform: scaleX(calc(.55 + .45 * var(--open, 0)));
        }
        .fb-stage[data-mobile="1"] .fb-ground { transform: none; }

        .fb-ovl {
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 0;
          transform-origin: 0 0;
          transform: scale(var(--k));
          transition: opacity .14s ease;
        }
        .fb-ovl[data-live="1"] { opacity: 0; pointer-events: none; }
        .ov-page {
          position: absolute;
          overflow: hidden;
          background: #f7f3e8;
        }
        .ov-page.is-hidden { visibility: hidden; pointer-events: none; }

        /* gutter + paper grain on the flat layer */
        .fx { position: absolute; inset: 0; display: block; pointer-events: none; }
        .fx-gut {
          background: linear-gradient(90deg, rgba(0,0,0,.30) 0, rgba(0,0,0,.10) 4%, rgba(0,0,0,0) 13%);
        }
        .ov-L .fx-gut {
          background: linear-gradient(270deg, rgba(0,0,0,.30) 0, rgba(0,0,0,.10) 4%, rgba(0,0,0,0) 13%);
        }
        .fx-tex {
          opacity: .13;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .3 0 0 0 0 .26 0 0 0 0 .18 0 0 0 .6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* =====================================================
           PAGE DESIGN
           ===================================================== */
        .portfolio-page {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #f7f3e8;
        }

        .page-inner {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          color: #171914;
          background: #f7f3e8;
        }
        .page-cover, .page-back { background: #0B0B0C; }

        .page-image { position: absolute; inset: 0; overflow: hidden; }
        .page-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
        .page-cover .page-image::after,
        .page-back .page-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8,10,8,.28), rgba(8,10,8,.83));
        }

        /* hardcover details */
        .page-cover::before {
          content: "";
          position: absolute;
          left: 16px;
          top: 0;
          bottom: 0;
          width: 3px;
          z-index: 4;
          background: linear-gradient(90deg, rgba(0,0,0,.55), rgba(255,255,255,.14));
        }
        .page-cover::after {
          content: "";
          position: absolute;
          inset: 14px 12px 14px 26px;
          z-index: 3;
          border: 1px solid rgba(255,255,255,.14);
          pointer-events: none;
        }

        .cover-content, .back-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 36px 32px 34px 42px;
          color: #fff;
        }
        .back-content { padding: 34px 30px; }

        .cover-eyebrow, .back-eyebrow {
          font-size: 9px;
          letter-spacing: .2em;
          color: #d5dfce;
          font-weight: 700;
        }
        .cover-main { margin-top: auto; margin-bottom: auto; }
        .cover-small, .back-small {
          display: block;
          margin-bottom: 12px;
          font-size: 9px;
          letter-spacing: .2em;
          color: #d6dfcf;
        }
        .cover-main h1 {
          margin: 0;
          font-size: 68px;
          line-height: .9;
          letter-spacing: -.075em;
          font-weight: 900;
        }
        .cover-main h2 {
          margin: 8px 0 0;
          font-size: 42px;
          line-height: 1;
          letter-spacing: -.045em;
          font-weight: 500;
        }
        .cover-line, .back-rule {
          width: 48px;
          height: 3px;
          margin: 22px 0;
          background: #91a982;
        }
        .cover-main p {
          font-size: 9px;
          letter-spacing: .15em;
          font-weight: 800;
        }
        .cover-footer, .back-footer {
          max-width: 220px;
          font-size: 8px;
          line-height: 1.6;
          letter-spacing: .15em;
          color: #d6dfcf;
        }
        .cover-index {
          position: absolute;
          right: 30px;
          bottom: 34px;
          font-size: 9px;
          letter-spacing: .1em;
          color: #d6dfcf;
        }

        .back-main { margin: auto 0; }
        .back-main h2 {
          max-width: 300px;
          font-size: 50px;
          line-height: .98;
          letter-spacing: -.06em;
          margin: 0;
        }
        .back-main h3 { font-size: 14px; letter-spacing: .1em; margin: 0 0 7px; }
        .back-role { font-size: 9px; letter-spacing: .14em; color: #d6dfcf; }
        .back-body { max-width: 230px; margin: 22px 0; font-size: 12px; line-height: 1.6; }
        .back-main a {
          display: block;
          width: fit-content;
          margin-top: 12px;
          color: #dce8d3;
          font-size: 10px;
          text-decoration: none;
          border-bottom: 1px solid rgba(220,232,211,.45);
          padding-bottom: 4px;
        }

        .inside-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 28px 30px 22px;
          background: #f7f3e8;
        }
        .inside-top, .inside-bottom {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          font-size: 8px;
          letter-spacing: .14em;
          font-weight: 800;
          color: #65725d;
          flex: none;
        }
        .inside-image {
          flex: 1 1 0;
          min-height: 40px;
          max-height: 150px;
          margin-top: 14px;
          overflow: hidden;
          border-radius: 2px;
          background: #e5e0d0;
        }
        .inside-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          filter: saturate(.85) sepia(.08);
        }
        .inside-heading { margin-top: 18px; flex: none; }
        .inside-kicker {
          display: block;
          margin-bottom: 8px;
          font-size: 8px;
          letter-spacing: .18em;
          color: #7d8f70;
          font-weight: 800;
        }
        .inside-heading h2 {
          margin: 0;
          font-size: 31px;
          line-height: 1;
          letter-spacing: -.065em;
          font-weight: 900;
          color: #171914;
        }
        .inside-heading h3 {
          margin: 10px 0 0;
          font-size: 10px;
          letter-spacing: .12em;
          color: #72836a;
        }
        .inside-copy { margin-top: 16px; flex: none; }
        .inside-copy p {
          margin: 0 0 10px;
          font-size: 11px;
          line-height: 1.7;
          color: #4e5149;
        }
        .inside-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; flex: none; }
        .inside-tags span {
          border: 1px solid #d8ddcf;
          border-radius: 2px;
          padding: 6px 7px;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: .08em;
          color: #596650;
        }
        .inside-content blockquote {
          margin: auto 0 16px;
          padding: 10px 0 0 12px;
          border-left: 3px solid #819a70;
          color: #333a2e;
          font-size: 11px;
          line-height: 1.55;
          letter-spacing: .035em;
          font-weight: 800;
          flex: none;
        }
        .inside-link {
          width: fit-content;
          margin-bottom: 14px;
          color: #516849;
          font-size: 9px;
          letter-spacing: .1em;
          font-weight: 900;
          text-decoration: none;
          border-bottom: 1px solid #819a70;
          padding-bottom: 4px;
          flex: none;
        }
        .inside-bottom {
          padding-top: 10px;
          border-top: 1px solid #dedfd5;
          font-size: 7px;
        }

        .endpaper { background: #ebe6d3; }
        .endpaper-in {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          text-align: center;
          color: #5d6a54;
          font-size: 8px;
          letter-spacing: .2em;
          font-weight: 800;
          border: 1px solid rgba(93,106,84,.28);
          margin: 18px;
          height: calc(100% - 36px);
        }
        .endpaper-in strong { font-size: 15px; letter-spacing: .14em; color: #2f3a2a; }
        .endpaper-in i { display: block; width: 36px; height: 2px; background: #819a70; }

        /* mobile: slightly larger reading size (page is scaled down) */
        .fb-stage[data-mobile="1"] .inside-copy p { font-size: 12px; line-height: 1.62; }
        .fb-stage[data-mobile="1"] .inside-content blockquote { font-size: 12px; }
        .fb-stage[data-mobile="1"] .inside-tags span { font-size: 8px; }

        /* =====================================================
           TYPOGRAPHY CHOREOGRAPHY (plays once per opening)
           ===================================================== */
        .pg .rv, .pg .fw { opacity: 0; }
        .fw { display: inline-block; transform: translateY(.55em); }
        .wd {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          padding: .05em .08em .12em 0;
          margin: -.05em -.08em -.12em 0;
        }
        .wd-in { display: inline-block; transform: translateY(112%); }

        .pg[data-play="1"] .rv-up    { animation: fbUp .9s cubic-bezier(.2,.7,.2,1) calc(var(--b,0ms) + var(--d,0ms)) both; }
        .pg[data-play="1"] .rv-slide { animation: fbSlide 1s cubic-bezier(.2,.7,.2,1) calc(var(--b,0ms) + var(--d,0ms)) both; }
        .pg[data-play="1"] .rv-fade  { animation: fbFade 1.3s ease calc(var(--b,0ms) + var(--d,0ms)) both; }
        .pg[data-play="1"] .rv-rule  { animation: fbRule 1s cubic-bezier(.6,0,.2,1) calc(var(--b,0ms) + var(--d,0ms)) both; transform-origin: 0 50%; }
        .pg[data-play="1"] .rv-quote { animation: fbQuote 1.3s cubic-bezier(.2,.7,.2,1) calc(var(--b,0ms) + var(--d,0ms)) both; }
        .pg[data-play="1"] .rv-img   { animation: fbImg 1.9s cubic-bezier(.16,.8,.2,1) calc(var(--b,0ms) + var(--d,0ms)) both; }
        .pg[data-play="1"] .wd-in    { animation: fbWord 1s cubic-bezier(.2,.8,.2,1) calc(var(--b,0ms) + var(--d,0ms)) both; }
        .pg[data-play="1"] .fw       { animation: fbLine .85s cubic-bezier(.2,.7,.2,1) calc(var(--b,0ms) + var(--d,0ms)) both; }

        @keyframes fbUp    { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes fbSlide { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: none; } }
        @keyframes fbFade  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fbRule  { from { opacity: 1; transform: scaleX(0); } to { opacity: 1; transform: scaleX(1); } }
        @keyframes fbWord  { from { transform: translateY(112%); } to { transform: none; } }
        @keyframes fbLine  { from { opacity: 0; transform: translateY(.55em); } to { opacity: 1; transform: none; } }
        @keyframes fbQuote {
          from { opacity: 0; transform: translateX(-12px); clip-path: inset(0 100% 0 0); }
          to   { opacity: 1; transform: none; clip-path: inset(0 0 0 0); }
        }
        @keyframes fbImg   { from { opacity: 0; transform: scale(1.18); } to { opacity: 1; transform: scale(1); } }

        /* =====================================================
           RESPONSIVE UI CHROME
           ===================================================== */
        @media (max-width: 760px) {
          .portfolio-book-overlay { padding: 12px; }
          .portfolio-book-modal { gap: 10px; }
          .portfolio-book-topbar, .portfolio-book-footer { width: 100%; }
          .portfolio-book-brand { font-size: 9px; }
          .portfolio-icon-button { width: 34px; height: 34px; }
          .portfolio-book-trigger {
            right: 14px;
            bottom: 14px;
            min-width: 170px;
            height: 48px;
            padding: 0 13px;
            gap: 9px;
            font-size: 10px;
            border: 3px solid #0B0B0C;
            box-shadow: 4px 4px 0 #0B0B0C;
          }
          .portfolio-book-trigger-icon { width: 25px; height: 25px; }
          .portfolio-book-footer { font-size: 8px; gap: 9px; }
        }

        @media (max-height: 680px) {
          .portfolio-book-overlay { padding-top: 8px; padding-bottom: 8px; }
          .portfolio-book-modal { gap: 7px; }
          .portfolio-book-topbar { min-height: 32px; }
          .portfolio-book-footer { min-height: 18px; }
          .pf-hint { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-book-overlay,
          .portfolio-book-trigger,
          .portfolio-icon-button,
          .portfolio-nav-button,
          .portfolio-progress-fill,
          .fb-ovl {
            animation: none !important;
            transition: none !important;
          }
          .pg .rv, .pg .fw {
            opacity: 1 !important;
            animation: none !important;
            transform: none !important;
            clip-path: none !important;
          }
          .pg .wd-in { animation: none !important; transform: none !important; }
        }
      `}</style>

      <div className="portfolio-book-root">
        {!isOpen && showFooterButton && (
          <button
            className="portfolio-book-trigger"
            onClick={openBook}
            aria-label="Explore Newlong's digital portfolio"
          >
            <span className="portfolio-book-trigger-icon">↗</span>
            <span>EXPLORE VISION</span>
          </button>
        )}

        {isOpen && (
          <div
            className={`portfolio-book-overlay${closing ? " is-closing" : ""}`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeBook();
            }}
          >
            <div
              className="portfolio-book-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Newlong Debbarma digital portfolio"
            >
              <div className="portfolio-book-topbar">
                <div className="portfolio-book-brand">
                  NEWLONG <span> / DIGITAL PORTFOLIO</span>
                </div>

                <div className="portfolio-book-actions">
                  <button
                    className="portfolio-icon-button"
                    onClick={() => setSoundEnabled((value) => !value)}
                    aria-label={soundEnabled ? "Mute page sound" : "Enable page sound"}
                    title={soundEnabled ? "Sound on" : "Sound off"}
                  >
                    {soundEnabled ? "♪" : "♫"}
                  </button>

                  <button
                    className="portfolio-icon-button"
                    onClick={closeBook}
                    aria-label="Close book"
                    title="Close"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="portfolio-modebar" role="toolbar" aria-label="Interaction mode">
                {["read", "paper", "tear"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    className="pf-chip"
                    aria-pressed={mode === m}
                    onClick={() => changeMode(m)}
                  >
                    {MODE_LABEL[m]}
                  </button>
                ))}
                {mode === "paper" && (
                  <>
                    <span className="pf-sep" />
                    <button
                      type="button"
                      className="pf-chip"
                      aria-pressed={tool === "fold"}
                      onClick={() => setTool("fold")}
                    >
                      FOLD
                    </button>
                    <button
                      type="button"
                      className="pf-chip"
                      aria-pressed={tool === "crumple"}
                      onClick={() => setTool("crumple")}
                    >
                      CRUMPLE
                    </button>
                    <button
                      type="button"
                      className="pf-chip"
                      onClick={() => eng.current && eng.current.releaseAll()}
                    >
                      RESTORE
                    </button>
                  </>
                )}
                {mode === "tear" && (
                  <>
                    <span className="pf-sep" />
                    <button
                      type="button"
                      className="pf-chip"
                      disabled={!tearInfo.canUndo}
                      onClick={() => eng.current && eng.current.undo()}
                    >
                      UNDO
                    </button>
                    <button
                      type="button"
                      className="pf-chip"
                      disabled={!tearInfo.canReset}
                      onClick={() => eng.current && eng.current.reset()}
                    >
                      RESET
                    </button>
                    <button
                      type="button"
                      className="pf-chip"
                      disabled={!tearInfo.canRemove}
                      onClick={() => eng.current && eng.current.removeSelected()}
                    >
                      REMOVE PIECE
                    </button>
                  </>
                )}
              </div>
              <div className="pf-hint" aria-live="polite">
                {hint}
              </div>

              <div className="portfolio-book-stage">
                <div
                  ref={stageRef}
                  className="fb-stage"
                  data-mobile={isMobile ? 1 : 0}
                  data-mode={mode}
                  style={{
                    width: stageW * k,
                    height: PAGE_H * k,
                    "--k": k
                  }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={(e) => endDrag(e, false)}
                  onPointerCancel={(e) => endDrag(e, true)}
                  onPointerLeave={() => {
                    if (!drag.current) clearPeek();
                  }}
                  onClickCapture={(e) => {
                    // never follow a link while a page is being manipulated
                    if (modeRef.current !== "read" || suppressClick.current) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <div className="fb-ground" />
                  <canvas
                    ref={canvasRef}
                    className="fb-canvas"
                    style={{
                      left: -CANVAS_PAD,
                      top: -CANVAS_PAD,
                      width: canvasW,
                      height: canvasH
                    }}
                    aria-hidden="true"
                  />
                  <div className="fb-ovl" ref={ovlRef} data-live="0">
                    {ovIds.map(renderOverlayPage)}
                  </div>
                </div>
              </div>

              <div className="portfolio-book-footer">
                <span>PAGE {pageLabel} / 8</span>

                <div className="portfolio-progress">
                  <div
                    className="portfolio-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <span>{progress}%</span>
              </div>

              <div className="portfolio-book-navigation">
                <button
                  className="portfolio-nav-button"
                  onClick={goPrev}
                  disabled={step === 0}
                  aria-label="Previous page"
                >
                  ←
                </button>

                <button
                  className="portfolio-nav-button"
                  onClick={goNext}
                  disabled={step >= leaves.length}
                  aria-label="Next page"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
