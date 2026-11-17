import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo
} from "react";

/* ==========================================================================
   NEWLONG DEBBARMA — REAL-FEEL 3D HARDCOVER BOOK
   --------------------------------------------------------------------------
   * Koi fold / cut / guide option nahi. Sirf page ko pakdo aur kheencho.
   * Page asli kagaz ki tarah MUDTA (curl) hai: jab page hil raha hota hai
     to wo vertical strips me ban jaata hai aur har strip alag angle leti hai.
   * Page ka kinara pointer ke saath chalta hai, beech me page latakta hai,
     chhodne par velocity ke hisaab se gir jaata hai ya wapas jaata hai.
   * Light + shadow har strip pe angle ke hisaab se badalti hai.
   * Mobile: ek page, poori screen ke hisaab se size. PC: do page ka spread.
   * Mobile landscape / chhoti height: UI chrome apne aap chhota ho jaata hai.
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
    quote:
      "THE GOAL IS NOT JUST TO BUILD SOFTWARE. THE GOAL IS TO BUILD THINGS THAT MATTER.",
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
const D2R = Math.PI / 180;
const BACK_INDEX = portfolioPages.length - 1;
const BEND = 32; // max total curl of a moving page, in degrees

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Desktop: two-sided leaves. First leaf is the rigid hard cover.
const DESKTOP_LEAVES = [
  { f: 0, b: "endpaper", hard: true },
  { f: 1, b: 2 },
  { f: 3, b: 4 },
  { f: 5, b: 6 }
];
// Mobile: one page at a time.
const MOBILE_LEAVES = portfolioPages
  .slice(0, BACK_INDEX)
  .map((_, i) => ({ f: i, b: "blank" }));

/* --------------------------------- pages --------------------------------- */

const BookPage = ({ page }) => {
  const inside = ["story", "statement", "project", "vision"].includes(page.type);

  return (
    <div className="portfolio-page pg">
      <div className={`page-inner page-${page.type}`}>
        {(page.type === "cover" || page.type === "back") && page.image && (
          <div className="page-image">
            <img src={page.image} alt="" decoding="async" draggable={false} />
          </div>
        )}

        {page.type === "cover" && (
          <div className="cover-content">
            <span className="cover-eyebrow">{page.eyebrow}</span>
            <div className="cover-main">
              <span className="cover-small">THE PORTFOLIO OF</span>
              <h1>{page.title}</h1>
              <h2>{page.subtitle}</h2>
              <div className="cover-line" />
              <p>{page.description}</p>
            </div>
            <span className="cover-footer">{page.footer}</span>
            <span className="cover-index">01 — 08</span>
          </div>
        )}

        {page.type === "back" && (
          <div className="back-content">
            <span className="back-eyebrow">{page.eyebrow}</span>
            <div className="back-main">
              <span className="back-small">THE NEXT CHAPTER STARTS HERE.</span>
              <h2>{page.title}</h2>
              <div className="back-rule" />
              <h3>{page.subtitle}</h3>
              <p className="back-role">{page.description}</p>
              <p className="back-body">{page.body}</p>
              <a href="mailto:newlong@letsbharat.com">{page.email} ↗</a>
              <a
                href="https://newlongdebbarma.letsbharat.com"
                target="_blank"
                rel="noreferrer"
              >
                {page.website} ↗
              </a>
            </div>
            <span className="back-footer">{page.footer}</span>
          </div>
        )}

        {inside && (
          <div className="inside-content">
            <div className="inside-top">
              <span>{page.label}</span>
              <span>{page.number} / 06</span>
            </div>

            {page.image && (
              <div className="inside-image">
                <img src={page.image} alt="" decoding="async" draggable={false} />
              </div>
            )}

            <div className="inside-heading">
              {page.type === "project" && (
                <span className="inside-kicker">SELECTED WORK</span>
              )}
              <h2>{page.title}</h2>
              {page.subtitle && <h3>{page.subtitle}</h3>}
            </div>

            <div className="inside-copy">
              <p>{page.body}</p>
              {page.body2 && <p>{page.body2}</p>}
            </div>

            {page.tags && (
              <div className="inside-tags">
                {page.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}

            <blockquote>{page.quote}</blockquote>

            {page.link && (
              <a
                className="inside-link"
                href={page.link}
                target="_blank"
                rel="noreferrer"
              >
                {page.linkText}
              </a>
            )}

            <div className="inside-bottom">
              <span>NEWLONG DEBBARMA</span>
              <span>LETSBHARAT · PORTFOLIO</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Endpaper = () => (
  <div className="portfolio-page pg endpaper">
    <div className="endpaper-in">
      <span>A DIGITAL PORTFOLIO · 2026</span>
      <i />
      <strong>NEWLONG DEBBARMA</strong>
      <span>FOUNDER · DEVELOPER · BUILDER</span>
    </div>
  </div>
);

const renderFace = (id) => {
  if (id === "endpaper") return <Endpaper />;
  if (id === "blank") return <div className="portfolio-page blank-paper" />;
  return <BookPage page={portfolioPages[id]} />;
};

// One flat side of a leaf (used while the leaf is at rest)
const Face = ({ side, children }) => (
  <div className={`face face-${side}`}>
    {children}
    <i className="fx fx-gut" />
    <i className="fx fx-tex" />
    <i className="fx fx-light" />
    <i className="fx fx-cast" />
  </div>
);

/* ---------------------------------------------------------------------------
   CURL: while a soft page is moving it is rebuilt from N thin vertical strips.
   Strip i is nested inside strip i-1, so every strip can take its own angle
   relative to the previous one. That is what makes the paper truly bend.
   --------------------------------------------------------------------------- */
const castAlpha = (d) => Math.max(0, 0.55 * (1 - d / 0.85));

const Curl = ({ n, front, back }) => {
  const w = PAGE_W / n;
  const ws = w + 0.75; // small overlap hides hairline seams

  const strip = (i) => {
    const d0 = i / n;
    const d1 = (i + 1) / n;
    return (
      <div
        className="cs"
        data-i={i}
        style={{ left: i === 0 ? 0 : w, width: ws }}
      >
        <div className="cs-face cs-f">
          <div
            className="cs-in"
            style={{ transform: `translateX(${-i * w}px)` }}
          >
            {renderFace(front)}
          </div>
          {i === 0 && <i className="cs-gut cs-gut-f" />}
          <i
            className="cs-cast"
            style={{
              background: `linear-gradient(90deg, rgba(0,0,0,${castAlpha(
                d0
              ).toFixed(3)}), rgba(0,0,0,${castAlpha(d1).toFixed(3)}))`
            }}
          />
          <i className="cs-shade" />
        </div>

        <div className="cs-face cs-b">
          <div
            className="cs-in"
            style={{ transform: `translateX(${-(PAGE_W - (i + 1) * w - 0.75)}px)` }}
          >
            {renderFace(back)}
          </div>
          {i === 0 && <i className="cs-gut cs-gut-b" />}
          <i
            className="cs-cast"
            style={{
              background: `linear-gradient(90deg, rgba(0,0,0,${castAlpha(
                d1
              ).toFixed(3)}), rgba(0,0,0,${castAlpha(d0).toFixed(3)}))`
            }}
          />
          <i className="cs-shade" />
        </div>

        {i < n - 1 && strip(i + 1)}
      </div>
    );
  };

  return (
    <div className="curl" aria-hidden="true">
      {strip(0)}
    </div>
  );
};

/* ------------------------------- component ------------------------------- */

export default function FlipbookBanner() {
  const audioContextRef = useRef(null);
  const stageRef = useRef(null);
  const bookRef = useRef(null);
  const staticRef = useRef(null);
  const leafEls = useRef([]);
  const stripCache = useRef({});

  const angles = useRef([]); // 0..180 per leaf
  const dirs = useRef([]); // +1 turning forward, -1 turning back (per leaf)
  const tweens = useRef([]);
  const stepRef = useRef(0);
  const lagRef = useRef(0);
  const drag = useRef(null);
  const peek = useRef({ leaf: -1, to: 0 });
  const reducedRef = useRef(false);
  const closeTimer = useRef(null);
  const api = useRef({});

  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [showFooterButton, setShowFooterButton] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [step, setStep] = useState(0);
  const [live, setLiveState] = useState(() => new Set());
  const [vp, setVp] = useState(() =>
    typeof window === "undefined"
      ? { w: 1280, h: 800 }
      : { w: window.innerWidth, h: window.innerHeight }
  );

  const isMobile = vp.w < 760;
  const compact = vp.h < 520; // phone in landscape etc.
  const leaves = useMemo(
    () => (isMobile ? MOBILE_LEAVES : DESKTOP_LEAVES),
    [isMobile]
  );
  const stripN = isMobile ? 8 : 10;

  const stageW = isMobile ? PAGE_W : PAGE_W * 2;
  const reserved = compact ? 78 : isMobile ? 178 : 200;
  const availW = vp.w - (isMobile ? 28 : 72);
  const availH = vp.h - reserved;
  const k = clamp(Math.min(availW / stageW, availH / PAGE_H), 0.2, 1.35);

  const soundRef = useRef(soundEnabled);
  const leavesRef = useRef(leaves);
  const mobileRef = useRef(isMobile);
  soundRef.current = soundEnabled;
  leavesRef.current = leaves;
  mobileRef.current = isMobile;
  if (angles.current.length !== leaves.length) {
    angles.current = leaves.map(() => 0);
    dirs.current = leaves.map(() => 1);
  }

  const setLive = (i, on) => {
    const l = leavesRef.current[i];
    if (!l || l.hard) return; // hard cover never bends
    setLiveState((prev) => {
      if (prev.has(i) === on) return prev;
      const next = new Set(prev);
      if (on) next.add(i);
      else next.delete(i);
      return next;
    });
  };

  /* ---------------------------- viewport + a11y --------------------------- */

  useEffect(() => {
    const read = () => {
      const vv = window.visualViewport;
      setVp({
        w: window.innerWidth,
        h: Math.round(vv ? vv.height : window.innerHeight)
      });
    };
    read();
    window.addEventListener("resize", read);
    window.addEventListener("orientationchange", read);
    if (window.visualViewport) window.visualViewport.addEventListener("resize", read);
    return () => {
      window.removeEventListener("resize", read);
      window.removeEventListener("orientationchange", read);
      if (window.visualViewport)
        window.visualViewport.removeEventListener("resize", read);
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

  // Scroll logic: auto-open once past hero, footer button near bottom
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
      setShowFooterButton(scrollY > 400 && distanceFromBottom <= 450);
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

  useEffect(
    () => () => {
      tweens.current.forEach((t) => t && cancelAnimationFrame(t.raf));
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
      // sound is optional
    }
  };

  /* --------------------------- 3D render engine --------------------------- */

  // Bend one moving leaf: every strip gets its own absolute angle theta[j];
  // the CSS transform of a strip is the difference to its parent strip.
  const bendStrips = (strips, a, dir) => {
    const N = strips.length;
    const p = dir === 1 ? a / 180 : (180 - a) / 180; // progress of this motion
    // outer edge lags first, then leads as the page falls over
    const bend = dir * BEND * Math.sin(a * D2R) * (1 - 1.5 * p);
    const seg = bend / (N - 1);

    const th = new Array(N);
    th[0] = a;
    for (let j = 1; j < N; j++) th[j] = clamp(a - j * seg, 0, 180);

    const shF = new Array(N);
    const shB = new Array(N);
    for (let j = 0; j < N; j++) {
      const s = Math.sin(th[j] * D2R);
      const c = Math.cos(th[j] * D2R);
      // light from upper-left-front
      const fF = Math.max(0, 0.35 * s + 0.8 * c);
      const fB = Math.max(0, -0.35 * s - 0.8 * c);
      shF[j] = clamp((0.8 - fF) / 0.8, 0, 1) * 0.5;
      shB[j] = clamp((0.8 - fB) / 0.8, 0, 1) * 0.5;
    }

    for (let j = 0; j < N; j++) {
      const el = strips[j];
      if (!el) continue;
      if (j > 0) {
        el.style.transform = `rotateY(${(-(th[j] - th[j - 1])).toFixed(3)}deg)`;
      }
      const nx = Math.min(j + 1, N - 1);
      el.style.setProperty("--shf", shF[j].toFixed(3));
      el.style.setProperty("--shfn", shF[nx].toFixed(3));
      el.style.setProperty("--shb", shB[j].toFixed(3));
      el.style.setProperty("--shbn", shB[nx].toFixed(3));
    }
  };

  // Writes transforms + lighting straight to the DOM (no React work per frame)
  const applyAll = () => {
    const book = bookRef.current;
    const A = angles.current;
    const n = A.length;
    if (!book || !n) return;

    let maxS = 0;
    const lag = lagRef.current;

    for (let i = 0; i < n; i++) {
      const el = leafEls.current[i];
      if (!el) continue;
      const a = A[i];
      const s = Math.sin(a * D2R);
      maxS = Math.max(maxS, s);

      const ramp = clamp(Math.min(a, 180 - a) / 8, 0, 1);
      const z = (a > 90 ? i + 1 : n - i) * 1.2 + 22 * ramp;
      const moving = a > 0.4 && a < 179.6;

      el.style.transform =
        `translateZ(${z.toFixed(2)}px) rotateY(${(-a).toFixed(2)}deg)` +
        (moving ? ` skewY(${(lag * s * 2.2).toFixed(2)}deg)` : "");

      const fl = a < 90 ? 0.9 * Math.pow(a / 90, 1.3) : 0;
      const bl = a > 90 ? 0.9 * Math.pow((180 - a) / 90, 1.3) : 0;
      const fc = i > 0 ? Math.sin(A[i - 1] * D2R) * 0.95 : 0;
      const bc = i < n - 1 ? Math.sin(A[i + 1] * D2R) * 0.95 : 0;

      el.style.setProperty("--fl", fl.toFixed(3));
      el.style.setProperty("--bl", bl.toFixed(3));
      el.style.setProperty("--fc", fc.toFixed(3));
      el.style.setProperty("--bc", bc.toFixed(3));

      const strips = stripCache.current[i];
      if (strips && strips.length > 1) bendStrips(strips, a, dirs.current[i] || 1);
    }

    if (staticRef.current) {
      staticRef.current.style.setProperty(
        "--fc",
        (Math.sin(A[n - 1] * D2R) * 0.95).toFixed(3)
      );
    }

    const open = mobileRef.current ? 0 : clamp(A[0] / 180, 0, 1);
    const shift = (-PAGE_W / 2) * (1 - open);
    const tilt = 4 + 6 * (1 - open);
    book.style.transform = `translateX(${shift.toFixed(2)}px) rotateX(${tilt.toFixed(2)}deg)`;
    book.style.setProperty("--open", open.toFixed(3));
    book.style.setProperty("--rem", (1 - clamp(A[n - 1] / 180, 0, 1)).toFixed(3));
    book.style.setProperty("--turn", maxS.toFixed(3));
  };

  const tweenTo = (i, to, dur, ease = easeInOut, curl = true) => {
    const prev = tweens.current[i];
    if (prev) cancelAnimationFrame(prev.raf);
    tweens.current[i] = null;

    const from = angles.current[i];
    if (from !== to) dirs.current[i] = to > from ? 1 : -1;

    if (reducedRef.current || dur <= 0 || from === to) {
      angles.current[i] = to;
      setLive(i, false);
      applyAll();
      return;
    }

    if (curl) setLive(i, true);

    const t0 = performance.now();
    const tw = { raf: 0 };
    tweens.current[i] = tw;

    const tick = (now) => {
      const p = clamp((now - t0) / dur, 0, 1);
      angles.current[i] = from + (to - from) * ease(p);
      applyAll();
      if (p < 1) {
        tw.raf = requestAnimationFrame(tick);
      } else {
        tweens.current[i] = null;
        setLive(i, false);
      }
    };
    tw.raf = requestAnimationFrame(tick);
  };

  const cancelTweens = () => {
    tweens.current.forEach((t) => t && cancelAnimationFrame(t.raf));
    tweens.current = [];
  };

  // After strips mount/unmount: re-collect them and draw immediately
  const liveKey = useMemo(() => Array.from(live).sort().join(","), [live]);
  useIsoLayoutEffect(() => {
    const cache = {};
    live.forEach((i) => {
      const el = leafEls.current[i];
      if (el) cache[i] = Array.from(el.querySelectorAll(".cs"));
    });
    stripCache.current = cache;
    applyAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveKey, leaves, isOpen]);

  // Every time the book opens (or layout switches): closed book -> cover opens
  useEffect(() => {
    if (!isOpen) return undefined;

    cancelTweens();
    angles.current = leaves.map(() => 0);
    dirs.current = leaves.map(() => 1);
    stepRef.current = 0;
    peek.current = { leaf: -1, to: 0 };
    setStep(0);
    setLiveState(new Set());
    applyAll();

    const t = setTimeout(() => api.current.next(), reducedRef.current ? 200 : 1100);
    return () => {
      clearTimeout(t);
      cancelTweens();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isMobile]);

  /* ---------------------------- turning actions --------------------------- */

  const goNext = () => {
    const list = leavesRef.current;
    const i = stepRef.current;
    if (i >= list.length) return;
    peek.current = { leaf: -1, to: 0 };
    stepRef.current = i + 1;
    setStep(i + 1);
    const hard = !!list[i].hard;
    playFlipSound(hard);
    tweenTo(i, 180, hard ? 1500 : 1000, easeInOut);
  };

  const goPrev = () => {
    const i = stepRef.current - 1;
    if (i < 0) return;
    peek.current = { leaf: -1, to: 0 };
    stepRef.current = i;
    setStep(i);
    const hard = !!leavesRef.current[i].hard;
    playFlipSound(hard);
    tweenTo(i, 0, hard ? 1500 : 1000, easeInOut);
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

  api.current = { next: goNext, prev: goPrev, close: closeBook };

  /* ------------------------------ pointer input --------------------------- */

  const getGeom = () => {
    const book = bookRef.current;
    if (!book) return null;
    const rect = book.getBoundingClientRect();
    return { rect, spineX: rect.left + rect.width / 2, pw: rect.width / 2 };
  };

  // Hover on desktop: the corner lifts a little (like a real page)
  const setPeek = (leaf, to) => {
    if (peek.current.leaf === leaf && peek.current.to === to) return;
    if (tweens.current[leaf] && peek.current.leaf !== leaf) return;
    peek.current = { leaf, to };
    tweenTo(leaf, to, 280, easeOut, false);
  };

  const clearPeek = () => {
    const p = peek.current;
    if (p.leaf < 0) return;
    const base = p.leaf < stepRef.current ? 180 : 0;
    peek.current = { leaf: -1, to: 0 };
    tweenTo(p.leaf, base, 320, easeOut, false);
  };

  const hoverPeek = (e) => {
    if (mobileRef.current || closing) return;
    const g = getGeom();
    if (!g) return;
    const { rect, pw } = g;
    const cw = pw * 0.24;
    const ch = pw * 0.3;
    const x = e.clientX;
    const y = e.clientY;
    const nearV = y < rect.top + ch || y > rect.bottom - ch;
    const n = leavesRef.current.length;
    const s = stepRef.current;

    if (nearV && x > rect.right - cw && s < n) {
      lagRef.current = y > rect.top + rect.height / 2 ? 0.8 : -0.8;
      setPeek(s, 13);
    } else if (nearV && x < rect.left + cw && s > 0) {
      lagRef.current = y > rect.top + rect.height / 2 ? 0.8 : -0.8;
      setPeek(s - 1, 167);
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

    // Phone: tap the right / left third of the page to turn it
    if (mobileRef.current) {
      const rel = (x - spineX) / pw;
      if (rel > 0.62 && s < n) {
        lagRef.current = y > rect.top + rect.height / 2 ? 0.8 : -0.8;
        goNext();
      } else if (rel < 0.38 && s > 0) {
        lagRef.current = y > rect.top + rect.height / 2 ? 0.8 : -0.8;
        goPrev();
      }
      return;
    }

    const cw = pw * 0.24;
    const ch = pw * 0.3;
    const nearV = y < rect.top + ch || y > rect.bottom - ch;

    if (nearV && x > rect.right - cw && s < n) {
      lagRef.current = y > rect.top + rect.height / 2 ? 0.8 : -0.8;
      goNext();
    } else if (nearV && x < rect.left + cw && s > 0) {
      lagRef.current = y > rect.top + rect.height / 2 ? 0.8 : -0.8;
      goPrev();
    }
  };

  const onPointerDown = (e) => {
    if (closing) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const g = getGeom();
    if (!g) return;
    clearPeek();
    drag.current = {
      id: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      ...g,
      leaf: -1,
      dir: 0,
      started: false,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      R: 1,
      anchor: 0,
      link: !!(e.target.closest && e.target.closest("a,button"))
    };
  };

  const onPointerMove = (e) => {
    const dr = drag.current;
    if (!dr) {
      if (e.pointerType === "mouse") hoverPeek(e);
      return;
    }
    if (e.pointerId !== dr.id) return;

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
      lagRef.current = clamp(
        ((dr.sy - dr.rect.top) / dr.rect.height - 0.5) * 2,
        -1,
        1
      );

      const tw = tweens.current[dr.leaf];
      if (tw) cancelAnimationFrame(tw.raf);
      tweens.current[dr.leaf] = null;
      dirs.current[dr.leaf] = dir;
      setLive(dr.leaf, true);

      if (stageRef.current) {
        try {
          stageRef.current.setPointerCapture(dr.id);
        } catch (err) {
          // ignore
        }
        stageRef.current.classList.add("is-dragging");
      }
    }

    // finger height changes which corner leads
    const targetLag = clamp(
      ((e.clientY - dr.rect.top) / dr.rect.height - 0.5) * 2,
      -1,
      1
    );
    lagRef.current += (targetLag - lagRef.current) * 0.25;

    // Leaf edge follows the pointer: x = spine + R·cos(angle)
    const x = dr.anchor + (e.clientX - dr.sx);
    const a = Math.acos(clamp((x - dr.spineX) / dr.R, -1, 1)) / D2R;
    angles.current[dr.leaf] = a;
    dirs.current[dr.leaf] = dr.dir;
    applyAll();

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

    if (stageRef.current) {
      stageRef.current.classList.remove("is-dragging");
      try {
        stageRef.current.releasePointerCapture(dr.id);
      } catch (err) {
        // ignore
      }
    }

    if (!dr.started) {
      if (!cancelled) handleTap(e, dr);
      return;
    }

    const a = angles.current[dr.leaf];
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

    // fast flick = short settle, slow release = longer, heavier fall
    const speed = clamp(Math.abs(v), 0, 2);
    const base = 260 + (640 * Math.abs(target - a)) / 180;
    tweenTo(dr.leaf, target, base / (1 + speed * 0.6), easeOut);
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

  const openBook = () => setIsOpen(true);

  /* --------------------------------- render ------------------------------- */

  return (
    <>
      <style>{`
        .portfolio-book-root { font-family: Inter, Arial, sans-serif; }

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
          border-radius: 0;
          box-shadow: 5px 5px 0 #0B0B0C;
          cursor: pointer;
          font-family: inherit;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
          animation: portfolio-trigger-pop .35s cubic-bezier(.175,.885,.32,1.275) forwards;
          will-change: transform;
        }
        @keyframes portfolio-trigger-pop {
          0% { opacity: 0; transform: translateY(20px) scale(.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .portfolio-book-trigger:hover {
          transform: translate(3px, 3px);
          box-shadow: 2px 2px 0 #0B0B0C;
          background: #d8ff33;
        }
        .portfolio-book-trigger:active {
          transform: translate(5px, 5px);
          box-shadow: 0 0 0 #0B0B0C;
        }
        .portfolio-book-trigger-icon {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          color: #CCFF00;
          background: #0B0B0C;
          font-size: 16px;
          font-weight: 900;
        }

        /* ---------- overlay ---------- */
        .portfolio-book-overlay {
          position: fixed;
          inset: 0;
          height: 100vh;
          height: 100dvh;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: max(22px, env(safe-area-inset-top)) max(22px, env(safe-area-inset-right))
                   max(22px, env(safe-area-inset-bottom)) max(22px, env(safe-area-inset-left));
          background: radial-gradient(ellipse 80% 70% at 50% 42%, #1c1d18 0%, #0B0B0C 72%);
          overscroll-behavior: contain;
          touch-action: none;
          animation: bookFadeIn .5s ease both;
        }
        .portfolio-book-overlay.is-closing { animation: bookFadeOut .3s ease both; }
        @keyframes bookFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bookFadeOut { from { opacity: 1; } to { opacity: 0; } }

        .portfolio-book-modal {
          width: min(100%, 1100px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 17px;
          position: relative;
        }
        .portfolio-book-topbar {
          width: min(100%, 850px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #f7f3e8;
        }
        .portfolio-book-brand { font-size: 11px; letter-spacing: .18em; font-weight: 800; }
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
        .portfolio-icon-button:hover { background: rgba(255,255,255,.2); transform: translateY(-2px); }
        .portfolio-icon-button:focus-visible,
        .portfolio-nav-button:focus-visible { outline: 2px solid #CCFF00; outline-offset: 2px; }

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
        .portfolio-progress-fill { height: 100%; background: #CCFF00; transition: width .5s; }

        .portfolio-book-navigation { display: flex; justify-content: center; align-items: center; gap: 15px; }
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
        .portfolio-nav-button:hover:not(:disabled) { background: #CCFF00; color: #0B0B0C; }
        .portfolio-nav-button:disabled { opacity: .28; cursor: not-allowed; }

        /* compact mode: phone in landscape / very short window */
        .portfolio-book-modal.is-compact { gap: 4px; }
        .portfolio-book-modal.is-compact .portfolio-book-footer,
        .portfolio-book-modal.is-compact .portfolio-book-navigation { display: none; }
        .portfolio-book-modal.is-compact .portfolio-book-topbar { min-height: 30px; }
        .portfolio-book-modal.is-compact .portfolio-icon-button { width: 30px; height: 30px; }

        /* =====================================================
           3D BOOK
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
        .fb-stage[data-mobile="1"] { clip-path: inset(-40px -14px -70px 0); }

        .fb-scale {
          position: absolute;
          left: 0;
          top: 0;
          width: var(--SW);
          height: var(--H);
          transform-origin: 0 0;
          transform: scale(var(--k));
          perspective: 2000px;
          perspective-origin: 50% 42%;
        }

        .fb-book {
          position: absolute;
          top: 0;
          left: calc(50% - var(--W));
          width: calc(var(--W) * 2);
          height: var(--H);
          transform-style: preserve-3d;
          transform: translateX(calc(var(--W) * -.5)) rotateX(10deg);
        }

        .fb-ground {
          position: absolute;
          left: calc(50% - var(--W));
          top: calc(var(--H) - 4px);
          width: calc(var(--W) * 2);
          height: 54px;
          background: radial-gradient(ellipse at 50% 30%, rgba(0,0,0,.78), rgba(0,0,0,0) 68%);
          filter: blur(9px);
          pointer-events: none;
          opacity: calc(.8 + var(--turn, 0) * .2);
          transform: translateZ(-30px)
                     translateX(calc(var(--W) * .5 * (1 - var(--open, 0))))
                     scaleX(calc(.55 + .45 * var(--open, 0)));
        }

        .fb-spine {
          position: absolute;
          top: -7px;
          left: calc(50% - 7px);
          width: 14px;
          height: calc(var(--H) + 14px);
          border-radius: 3px;
          background: linear-gradient(90deg, #0d0f0a, #2a2f22 50%, #0d0f0a);
          transform: translateZ(-9px);
          pointer-events: none;
        }

        .fb-board {
          position: absolute;
          top: -7px;
          width: calc(var(--W) + 8px);
          height: calc(var(--H) + 14px);
          background-color: #161912;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .5 0 0 0 0 .55 0 0 0 0 .45 0 0 0 .5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          transform: translateZ(-9px);
          pointer-events: none;
          box-shadow: 0 1px 0 #0a0b08, 0 2px 0 #0a0b08, 0 3px 0 #0a0b08, 0 4px 0 #0a0b08,
                      0 30px 50px rgba(0,0,0,.45);
        }
        .fb-board-r { left: 50%; border-radius: 0 5px 5px 0; }
        .fb-board-l { right: 50%; border-radius: 5px 0 0 5px; opacity: var(--open, 0); }

        .fb-stack {
          position: absolute;
          top: 1px;
          width: calc(var(--W) - 1px);
          height: calc(var(--H) - 2px);
          background: #efe9d8;
          transform: translateZ(-4px);
          pointer-events: none;
        }
        .fb-stack-r {
          left: 50%;
          opacity: var(--rem, 1);
          box-shadow: 1px 1px 0 #e4ddc9, 2px 2px 0 #f2eddd, 3px 3px 0 #ddd6c1,
                      4px 4px 0 #efe9d8, 5px 5px 0 #d6cfba;
        }
        .fb-stack-l {
          right: 50%;
          opacity: var(--open, 0);
          box-shadow: -1px 1px 0 #e4ddc9, -2px 2px 0 #f2eddd, -3px 3px 0 #ddd6c1,
                      -4px 4px 0 #efe9d8, -5px 5px 0 #d6cfba;
        }
        .fb-stage[data-mobile="1"] .fb-board-l,
        .fb-stage[data-mobile="1"] .fb-stack-l { display: none; }

        .fb-static {
          position: absolute;
          left: 50%;
          top: 0;
          width: var(--W);
          height: var(--H);
        }

        .leaf {
          position: absolute;
          left: 50%;
          top: 0;
          width: var(--W);
          height: var(--H);
          --t: .35px;
          transform-origin: 0 50%;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .leaf-hard {
          top: -7px;
          width: calc(var(--W) + 8px);
          height: calc(var(--H) + 14px);
          --t: 3.5px;
        }
        /* while a soft page moves, the flat faces are replaced by the curl */
        .leaf.is-live > .face { visibility: hidden; }

        .face {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #f7f3e8;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .face-front { transform: translateZ(var(--t, .35px)); }
        .face-back  { transform: rotateY(180deg) translateZ(var(--t, .35px)); }

        .leaf-edge {
          position: absolute;
          top: 0;
          right: 0;
          width: calc(var(--t) * 2);
          height: 100%;
          background: linear-gradient(180deg, #e9e3d0, #d8d1bb);
          transform-origin: 100% 50%;
          transform: translateZ(calc(var(--t) * -1)) rotateY(90deg);
        }
        .leaf-hard .leaf-edge { background: #0e100b; }
        .leaf.is-live > .leaf-edge { display: none; }

        /* flat lighting layers */
        .fx { position: absolute; inset: 0; display: block; pointer-events: none; }
        .fx-gut {
          background: linear-gradient(90deg, rgba(0,0,0,.30) 0, rgba(0,0,0,.10) 4%, rgba(0,0,0,0) 13%);
        }
        .face-back .fx-gut {
          background: linear-gradient(270deg, rgba(0,0,0,.30) 0, rgba(0,0,0,.10) 4%, rgba(0,0,0,0) 13%);
        }
        .fx-tex {
          opacity: .13;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .3 0 0 0 0 .26 0 0 0 0 .18 0 0 0 .6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .fx-light { background: linear-gradient(90deg, rgba(30,22,10,0) 0%, rgba(30,22,10,.5) 100%); }
        .face-back .fx-light { background: linear-gradient(270deg, rgba(30,22,10,0) 0%, rgba(30,22,10,.5) 100%); }
        .face-front .fx-light { opacity: var(--fl, 0); }
        .face-back  .fx-light { opacity: var(--bl, 0); }
        .fx-cast { background: linear-gradient(90deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.28) 45%, rgba(0,0,0,0) 85%); }
        .face-back .fx-cast { background: linear-gradient(270deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.28) 45%, rgba(0,0,0,0) 85%); }
        .face-front .fx-cast { opacity: var(--fc, 0); }
        .face-back  .fx-cast { opacity: var(--bc, 0); }

        /* =====================================================
           CURL (strips of a moving page)
           ===================================================== */
        .curl {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          pointer-events: none;
        }
        .cs {
          position: absolute;
          top: 0;
          height: 100%;
          transform-origin: 0 50%;
          transform-style: preserve-3d;
        }
        .cs-face {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #f7f3e8;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .cs-f { transform: translateZ(.35px); }
        .cs-b { transform: rotateY(180deg) translateZ(.35px); }
        .cs-in {
          position: absolute;
          left: 0;
          top: 0;
          width: var(--W);
          height: var(--H);
        }
        .cs-gut, .cs-cast, .cs-shade { position: absolute; inset: 0; display: block; pointer-events: none; }
        .cs-gut-f { background: linear-gradient(90deg, rgba(0,0,0,.30), rgba(0,0,0,.08) 45%, rgba(0,0,0,.02)); }
        .cs-gut-b { background: linear-gradient(270deg, rgba(0,0,0,.30), rgba(0,0,0,.08) 45%, rgba(0,0,0,.02)); }
        .cs-f .cs-cast { opacity: var(--fc, 0); }
        .cs-b .cs-cast { opacity: var(--bc, 0); }
        .cs-f .cs-shade {
          background: linear-gradient(90deg, rgba(20,14,6,var(--shf,0)), rgba(20,14,6,var(--shfn,0)));
        }
        .cs-b .cs-shade {
          background: linear-gradient(90deg, rgba(20,14,6,var(--shbn,0)), rgba(20,14,6,var(--shb,0)));
        }

        /* =====================================================
           PAGE DESIGN
           ===================================================== */
        .portfolio-page { width: 100%; height: 100%; overflow: hidden; background: #f7f3e8; }
        .blank-paper { background: #f3eedf; }

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
        .page-image img { width: 100%; height: 100%; display: block; object-fit: cover; }
        .page-cover .page-image::after,
        .page-back .page-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8,10,8,.28), rgba(8,10,8,.83));
        }

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

        .cover-eyebrow, .back-eyebrow { font-size: 9px; letter-spacing: .2em; color: #d5dfce; font-weight: 700; }
        .cover-main { margin-top: auto; margin-bottom: auto; }
        .cover-small, .back-small {
          display: block;
          margin-bottom: 12px;
          font-size: 9px;
          letter-spacing: .2em;
          color: #d6dfcf;
        }
        .cover-main h1 { margin: 0; font-size: 68px; line-height: .9; letter-spacing: -.075em; font-weight: 900; }
        .cover-main h2 { margin: 8px 0 0; font-size: 42px; line-height: 1; letter-spacing: -.045em; font-weight: 500; }
        .cover-line, .back-rule { width: 48px; height: 3px; margin: 22px 0; background: #91a982; }
        .cover-main p { font-size: 9px; letter-spacing: .15em; font-weight: 800; }
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
        .back-main h2 { max-width: 300px; font-size: 50px; line-height: .98; letter-spacing: -.06em; margin: 0; }
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
        .inside-heading h3 { margin: 10px 0 0; font-size: 10px; letter-spacing: .12em; color: #72836a; }
        .inside-copy { margin-top: 16px; flex: none; }
        .inside-copy p { margin: 0 0 10px; font-size: 11px; line-height: 1.7; color: #4e5149; }
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
        .inside-bottom { padding-top: 10px; border-top: 1px solid #dedfd5; font-size: 7px; }

        .endpaper { background: #ebe6d3; }
        .endpaper-in {
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

        .fb-stage[data-mobile="1"] .inside-copy p { font-size: 12px; line-height: 1.62; }
        .fb-stage[data-mobile="1"] .inside-content blockquote { font-size: 12px; }
        .fb-stage[data-mobile="1"] .inside-tags span { font-size: 8px; }

        /* =====================================================
           RESPONSIVE UI CHROME
           ===================================================== */
        @media (max-width: 760px) {
          .portfolio-book-overlay {
            padding: max(12px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right))
                     max(12px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
          }
          .portfolio-book-modal { gap: 13px; }
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
            box-shadow: 4px 4px 0 #0B0B0C;
          }
          .portfolio-book-trigger-icon { width: 25px; height: 25px; }
          .portfolio-book-footer { font-size: 8px; gap: 9px; }
        }

        @media (max-height: 680px) {
          .portfolio-book-overlay { padding-top: 8px; padding-bottom: 8px; }
          .portfolio-book-modal { gap: 8px; }
          .portfolio-book-topbar { min-height: 32px; }
          .portfolio-book-footer { min-height: 18px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-book-overlay,
          .portfolio-book-trigger,
          .portfolio-icon-button,
          .portfolio-nav-button,
          .portfolio-progress-fill {
            animation: none !important;
            transition: none !important;
          }
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
              className={`portfolio-book-modal${compact ? " is-compact" : ""}`}
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

              <div className="portfolio-book-stage">
                <div
                  ref={stageRef}
                  className="fb-stage"
                  data-mobile={isMobile ? 1 : 0}
                  style={{
                    width: stageW * k,
                    height: PAGE_H * k,
                    "--k": k,
                    "--W": `${PAGE_W}px`,
                    "--H": `${PAGE_H}px`,
                    "--SW": `${stageW}px`
                  }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={(e) => endDrag(e, false)}
                  onPointerCancel={(e) => endDrag(e, true)}
                  onPointerLeave={() => {
                    if (!drag.current) clearPeek();
                  }}
                >
                  <div className="fb-scale">
                    <div className="fb-book" ref={bookRef}>
                      <div className="fb-ground" />
                      <div className="fb-spine" />
                      <div className="fb-board fb-board-l" />
                      <div className="fb-board fb-board-r" />
                      <div className="fb-stack fb-stack-l" />
                      <div className="fb-stack fb-stack-r" />

                      {/* Back cover: fixed board on the right at the end */}
                      <div className="fb-static" ref={staticRef}>
                        <Face side="front">{renderFace(BACK_INDEX)}</Face>
                      </div>

                      {leaves.map((leaf, i) => {
                        const isLive = !leaf.hard && live.has(i);
                        return (
                          <div
                            key={`${isMobile ? "m" : "d"}-${i}`}
                            className={`leaf${leaf.hard ? " leaf-hard" : ""}${
                              isLive ? " is-live" : ""
                            }`}
                            ref={(el) => {
                              leafEls.current[i] = el;
                            }}
                          >
                            <Face side="front">{renderFace(leaf.f)}</Face>
                            <Face side="back">{renderFace(leaf.b)}</Face>
                            {isLive && (
                              <Curl n={stripN} front={leaf.f} back={leaf.b} />
                            )}
                            <span className="leaf-edge" />
                          </div>
                        );
                      })}
                    </div>
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
