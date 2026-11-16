import React, {
  useState,
  useEffect,
  useRef,
  forwardRef
} from "react";
import HTMLFlipBook from "react-pageflip";

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

const BookPage = forwardRef(({ page, index }, ref) => {
  return (
    <div className="portfolio-page" ref={ref}>
      <div className={`page-inner page-${page.type}`}>
        {page.image && (
          <div className="page-image">
            <img src={page.image} alt="" loading="lazy" />
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

              <a href="mailto:newlong@letsbharat.com">
                {page.email} ↗
              </a>
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

        {["story", "statement", "project", "vision"].includes(page.type) && (
          <div className="inside-content">
            <div className="inside-top">
              <span>{page.label}</span>
              <span>{page.number} / 06</span>
            </div>

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
});

BookPage.displayName = "BookPage";

export default function FlipbookBanner() {
  const bookRef = useRef(null);
  const audioContextRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [showFooterButton, setShowFooterButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pageSize, setPageSize] = useState({
    width: 420,
    height: 560
  });

  // Responsive fixed page dimensions
  useEffect(() => {
    const updateSize = () => {
      const mobile = window.innerWidth < 760;
      setIsMobile(mobile);

      if (mobile) {
        const width = Math.max(
          260,
          Math.min(340, window.innerWidth - 42)
        );
        const height = Math.round(width * 1.34);

        setPageSize({ width, height });
      } else {
        setPageSize({ width: 420, height: 560 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 📜 Scroll Logic:
  // 1. Hero section par button hide rahega.
  // 2. Thoda scroll karne par (scrollY > 300) floating book automatically ek baar open hoga.
  // 3. Niche footer ke paas pahunchne par hi yellow button show hoga.
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Auto-open book once when user scrolls down past hero section
      if (scrollY > 300 && !hasAutoOpened) {
        setIsOpen(true);
        setHasAutoOpened(true);
      }

      // Show button ONLY when user reaches near the footer (within 450px of bottom)
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

  // Lock background scrolling while the book is open.
  useEffect(() => {
    if (!isOpen) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowRight") nextPage();
      if (event.key === "ArrowLeft") previousPage();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, pageIndex]);

  // Soft paper-like page-turn sound using Web Audio.
  const playFlipSound = () => {
    if (!soundEnabled) return;

    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }

      const audio = audioContextRef.current;

      if (audio.state === "suspended") audio.resume();

      const duration = 0.16;
      const buffer = audio.createBuffer(
        1,
        audio.sampleRate * duration,
        audio.sampleRate
      );

      const data = buffer.getChannelData(0);

      for (let i = 0; i < data.length; i++) {
        const fade = 1 - i / data.length;
        data[i] = (Math.random() * 2 - 1) * fade;
      }

      const source = audio.createBufferSource();
      const filter = audio.createBiquadFilter();
      const gain = audio.createGain();

      source.buffer = buffer;
      filter.type = "lowpass";
      filter.frequency.value = 1500;

      gain.gain.setValueAtTime(0.0001, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.055,
        audio.currentTime + 0.025
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + duration
      );

      source.connect(filter);
      filter.connect(gain);
      gain.connect(audio.destination);
      source.start();
    } catch (error) {
      // Sound is optional; the book still works without it.
    }
  };

  const nextPage = () => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flipNext();
  };

  const previousPage = () => {
    if (!bookRef.current) return;
    bookRef.current.pageFlip().flipPrev();
  };

  const handleFlip = (event) => {
    setPageIndex(event.data);
    playFlipSound();
  };

  const openBook = () => {
    setIsOpen(true);
  };

  const closeBook = () => {
    setIsOpen(false);
  };

  const progress = Math.min(
    100,
    Math.round(((pageIndex + 1) / portfolioPages.length) * 100)
  );

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

        .portfolio-book-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px;
          background: rgba(8, 9, 8, .78);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          animation: bookFadeIn .3s ease both;
        }

        @keyframes bookFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .portfolio-book-modal {
          width: min(100%, 960px);
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

        .portfolio-book-brand {
          font-size: 11px;
          letter-spacing: .18em;
          font-weight: 800;
        }

        .portfolio-book-brand span {
          color: #CCFF00;
        }

        .portfolio-book-actions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

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

        .portfolio-book-stage {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
          padding: 4px 0;
        }

        .portfolio-book-stage .stf__parent {
          margin: 0 auto;
        }

        .portfolio-book-stage .stf__block {
          box-shadow: 0 25px 75px rgba(0,0,0,.42);
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
          transition: width .25s;
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

        .portfolio-nav-button:disabled {
          opacity: .28;
          cursor: not-allowed;
        }

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

        .page-image {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

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
          background: linear-gradient(
            180deg,
            rgba(8,10,8,.28),
            rgba(8,10,8,.83)
          );
        }

        .cover-content,
        .back-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 34px 30px;
          color: #fff;
        }

        .cover-eyebrow,
        .back-eyebrow {
          font-size: 9px;
          letter-spacing: .2em;
          color: #d5dfce;
          font-weight: 700;
        }

        .cover-main {
          margin-top: auto;
          margin-bottom: auto;
        }

        .cover-small,
        .back-small {
          display: block;
          margin-bottom: 12px;
          font-size: 9px;
          letter-spacing: .2em;
          color: #d6dfcf;
        }

        .cover-main h1 {
          margin: 0;
          font-size: clamp(45px, 6vw, 68px);
          line-height: .9;
          letter-spacing: -.075em;
          font-weight: 900;
        }

        .cover-main h2 {
          margin: 8px 0 0;
          font-size: clamp(25px, 3.5vw, 42px);
          line-height: 1;
          letter-spacing: -.045em;
          font-weight: 500;
        }

        .cover-line,
        .back-rule {
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

        .cover-footer,
        .back-footer {
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

        .back-main {
          margin: auto 0;
        }

        .back-main h2 {
          max-width: 300px;
          font-size: clamp(34px, 4.4vw, 50px);
          line-height: .98;
          letter-spacing: -.06em;
          margin: 0;
        }

        .back-main h3 {
          font-size: 14px;
          letter-spacing: .1em;
          margin: 0 0 7px;
        }

        .back-role {
          font-size: 9px;
          letter-spacing: .14em;
          color: #d6dfcf;
        }

        .back-body {
          max-width: 230px;
          margin: 22px 0;
          font-size: 12px;
          line-height: 1.6;
        }

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
          padding: 30px 30px 24px;
          background: #f7f3e8;
        }

        .inside-top,
        .inside-bottom {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          font-size: 8px;
          letter-spacing: .14em;
          font-weight: 800;
          color: #65725d;
        }

        .inside-heading {
          margin-top: 38px;
        }

        .inside-kicker {
          display: block;
          margin-bottom: 10px;
          font-size: 8px;
          letter-spacing: .18em;
          color: #7d8f70;
          font-weight: 800;
        }

        .inside-heading h2 {
          margin: 0;
          font-size: clamp(27px, 3.3vw, 39px);
          line-height: .99;
          letter-spacing: -.065em;
          font-weight: 900;
          color: #171914;
        }

        .inside-heading h3 {
          margin: 12px 0 0;
          font-size: 10px;
          letter-spacing: .12em;
          color: #72836a;
        }

        .inside-copy {
          margin-top: 24px;
        }

        .inside-copy p {
          margin: 0 0 13px;
          font-size: 11px;
          line-height: 1.75;
          color: #4e5149;
        }

        .inside-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }

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
          margin: auto 0 22px;
          padding: 12px 0 0 12px;
          border-left: 3px solid #819a70;
          color: #333a2e;
          font-size: 11px;
          line-height: 1.55;
          letter-spacing: .035em;
          font-weight: 800;
        }

        .inside-link {
          width: fit-content;
          margin-bottom: 18px;
          color: #516849;
          font-size: 9px;
          letter-spacing: .1em;
          font-weight: 900;
          text-decoration: none;
          border-bottom: 1px solid #819a70;
          padding-bottom: 4px;
        }

        .inside-bottom {
          padding-top: 12px;
          border-top: 1px solid #dedfd5;
          font-size: 7px;
        }

        @media (max-width: 760px) {
          .portfolio-book-overlay {
            padding: 12px;
          }

          .portfolio-book-modal {
            gap: 13px;
          }

          .portfolio-book-topbar,
          .portfolio-book-footer {
            width: 100%;
          }

          .portfolio-book-brand {
            font-size: 9px;
          }

          .portfolio-icon-button {
            width: 34px;
            height: 34px;
          }

          .portfolio-book-stage {
            max-width: 100%;
          }

          .portfolio-book-stage .stf__parent {
            max-width: 100%;
          }

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

          .portfolio-book-trigger-icon {
            width: 25px;
            height: 25px;
          }

          .cover-content,
          .back-content {
            padding: 27px 23px;
          }

          .cover-main h1 {
            font-size: 48px;
          }

          .cover-main h2 {
            font-size: 30px;
          }

          .inside-content {
            padding: 24px 22px 19px;
          }

          .inside-heading {
            margin-top: 31px;
          }

          .inside-heading h2 {
            font-size: 30px;
          }

          .inside-copy p {
            font-size: 10px;
            line-height: 1.65;
          }

          .inside-content blockquote {
            font-size: 10px;
          }

          .portfolio-book-footer {
            font-size: 8px;
            gap: 9px;
          }
        }

        @media (max-height: 680px) {
          .portfolio-book-overlay {
            padding-top: 8px;
            padding-bottom: 8px;
          }

          .portfolio-book-modal {
            gap: 8px;
          }

          .portfolio-book-topbar {
            min-height: 32px;
          }

          .portfolio-book-footer {
            min-height: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-book-overlay,
          .portfolio-book-trigger,
          .portfolio-icon-button,
          .portfolio-nav-button {
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
            className="portfolio-book-overlay"
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

              <div className="portfolio-book-stage">
                <HTMLFlipBook
                  key={`${pageSize.width}-${pageSize.height}-${isMobile}`}
                  ref={bookRef}
                  width={pageSize.width}
                  height={pageSize.height}
                  size="fixed"
                  minWidth={260}
                  maxWidth={420}
                  minHeight={350}
                  maxHeight={560}
                  showCover={true}
                  usePortrait={isMobile}
                  mobileScrollSupport={false}
                  drawShadow={true}
                  flippingTime={850}
                  useMouseEvents={true}
                  maxShadowOpacity={0.35}
                  showPageCorners={true}
                  startPage={0}
                  onFlip={handleFlip}
                  className="newlong-portfolio-flipbook"
                  style={{ margin: "0 auto" }}
                >
                  {portfolioPages.map((page, index) => (
                    <BookPage
                      key={`${page.type}-${index}`}
                      page={page}
                      index={index}
                    />
                  ))}
                </HTMLFlipBook>
              </div>

              <div className="portfolio-book-footer">
                <span>PAGE {pageIndex + 1} / 8</span>

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
                  onClick={previousPage}
                  disabled={pageIndex === 0}
                  aria-label="Previous page"
                >
                  ←
                </button>

                <button
                  className="portfolio-nav-button"
                  onClick={nextPage}
                  disabled={pageIndex >= portfolioPages.length - 1}
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