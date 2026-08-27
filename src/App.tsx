import { useState, useEffect } from "react";

/* ── palette ── */
const C = {
  navy: "#1A2340",
  navyLight: "#2D3A5C",
  ivory: "#FAF8F4",
  ivoryDeep: "#F2EDE8",
  rose: "#C9788A",
  roseMuted: "#E8C4CC",
  lavender: "#9B8EB5",
  lavenderMuted: "#D8D2E8",
  peach: "#D4967A",
  peachMuted: "#EDD5C4",
  border: "#DDD8D0",
  muted: "#7A8099",
};

/* ── responsive override ── */
const css = `
  @media (max-width: 900px) {
    #hero-grid { grid-template-columns: 1fr !important; padding-top: 96px !important; gap: 2rem !important; }
    #hero-visual { display: flex !important; max-width: 520px; margin: 0 auto; }
    #about-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
  }
`;

/* ── Nav ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Projects", "Skills", "Contact"];

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(1.5rem,6vw,5rem)",
        backgroundColor: scrolled ? "rgba(250,248,244,0.93)" : "transparent",
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <a href="#hero" style={{ fontFamily: "'Lora',serif", fontWeight: 600, fontSize: "1.05rem", color: C.navy, textDecoration: "none" }}>
        Rania Rashid
      </a>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {links.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: "0.875rem", color: C.muted, textDecoration: "none", transition: "color .2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = C.navy)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >
            {l}
          </a>
        ))}
        <PillLink href="#contact">Let's connect</PillLink>
      </div>
    </nav>
  );
}

function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Source Sans 3',sans-serif", fontSize: "0.8rem", fontWeight: 600,
        color: h ? C.lavender : C.navy, textDecoration: "none",
        border: `1px solid ${h ? C.lavender : C.border}`, borderRadius: 6,
        padding: "0.38rem 0.95rem", transition: "all .2s",
      }}
    >
      {children}
    </a>
  );
}

/* ── Thinking System SVG ── */
function ThinkingSystem() {
  const nodes = [
    { id: 1, cx: 155, cy: 95,  r: 9,  cls: "node-float-1", color: C.lavender },
    { id: 2, cx: 290, cy: 68,  r: 6,  cls: "node-float-2", color: C.rose },
    { id: 3, cx: 362, cy: 158, r: 11, cls: "node-float-3", color: C.peach },
    { id: 4, cx: 212, cy: 215, r: 7,  cls: "node-float-4", color: C.lavender },
    { id: 5, cx: 98,  cy: 272, r: 8,  cls: "node-float-5", color: C.rose },
    { id: 6, cx: 312, cy: 302, r: 5,  cls: "node-float-6", color: C.peach },
    { id: 7, cx: 185, cy: 358, r: 7,  cls: "node-float-2", color: C.navy + "88" },
  ];
  const edges = [[1,2],[2,3],[3,4],[4,1],[4,5],[4,6],[5,7],[6,7],[1,5],[2,4]];
  const get = (id: number) => nodes.find(n => n.id === id)!;

  const annotations = [
    { x: 58,  y: 182, text: "input layer",   cls: "annotation-drift-1" },
    { x: 282, y: 120, text: "weight?",        cls: "annotation-drift-2" },
    { x: 328, y: 342, text: "iterate →",      cls: "annotation-drift-3" },
    { x: 92,  y: 332, text: "loss ↓",         cls: "annotation-drift-1" },
  ];
  const frags = [
    { x: 132, y: 50,  text: "model.fit(X, y)" },
    { x: 245, y: 258, text: "if conf > 0.8:" },
    { x: 48,  y: 112, text: "np.gradient()"  },
  ];

  return (
    <svg viewBox="0 0 440 440" width="100%" height="100%" style={{ overflow: "visible", maxWidth: 480 }} aria-hidden="true">
      {/* ambient fills */}
      <ellipse cx="220" cy="220" rx="185" ry="170" fill={C.lavenderMuted} opacity="0.15" />
      <ellipse cx="292" cy="160" rx="82"  ry="62"  fill={C.peachMuted}    opacity="0.2"  />

      {/* decorative geometry */}
      <polygon points="372,58 396,100 348,100" fill="none" stroke={C.rose}     strokeWidth="1"   opacity="0.3"  className="annotation-drift-2" />
      <path d="M 43,242 Q 68,202 95,232"       fill="none" stroke={C.lavender} strokeWidth="1.2" opacity="0.4"  className="annotation-drift-3" />
      <circle cx="392" cy="312" r="18"         fill="none" stroke={C.peach}    strokeWidth="1"   strokeDasharray="3 4" opacity="0.35" className="node-float-3" />

      {/* edges with line-draw animation */}
      {edges.map(([a, b], i) => {
        const na = get(a), nb = get(b);
        const len = Math.hypot(nb.cx - na.cx, nb.cy - na.cy);
        return (
          <line key={i}
            x1={na.cx} y1={na.cy} x2={nb.cx} y2={nb.cy}
            stroke={C.navy} strokeWidth="0.75" opacity="0.18"
            strokeDasharray={len} strokeDashoffset={len}
            style={{ animation: `drawLine ${1.6 + i * 0.18}s ease-out ${0.25 + i * 0.12}s forwards` }}
          />
        );
      })}

      {/* node rings */}
      {nodes.slice(0, 4).map(n => (
        <circle key={`r${n.id}`} cx={n.cx} cy={n.cy} r={n.r + 5}
          fill="none" stroke={n.color} strokeWidth="0.6" opacity="0.22" className={n.cls} />
      ))}

      {/* nodes */}
      {nodes.map(n => (
        <circle key={n.id} cx={n.cx} cy={n.cy} r={n.r}
          fill={n.color} opacity="0.82" className={n.cls} />
      ))}

      {/* handwritten annotations */}
      {annotations.map((a, i) => (
        <text key={i} x={a.x} y={a.y}
          fontFamily="'Lora',serif" fontStyle="italic" fontSize="11"
          fill={C.navy} opacity="0.52" className={a.cls}>
          {a.text}
        </text>
      ))}
      <line x1="88"  y1="177" x2="148" y2="186" stroke={C.muted} strokeWidth="0.6" opacity="0.28" strokeDasharray="2 2" />
      <line x1="318" y1="114" x2="290" y2="98"  stroke={C.muted} strokeWidth="0.6" opacity="0.28" strokeDasharray="2 2" />

      {/* code fragments */}
      {frags.map((f, i) => (
        <text key={i} x={f.x} y={f.y}
          fontFamily="'JetBrains Mono',monospace" fontSize="9.5"
          fill={C.navy} opacity="0.36">
          {f.text}
        </text>
      ))}

      {/* tiny axis ticks */}
      {[0,1,2,3].map(i => (
        <line key={i} x1={418} y1={82 + i*54} x2={424} y2={82 + i*54}
          stroke={C.muted} strokeWidth="0.8" opacity="0.28" />
      ))}
      <line x1="418" y1="82" x2="418" y2="244" stroke={C.muted} strokeWidth="0.5" opacity="0.18" />
    </svg>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section id="hero" style={{ scrollMarginTop: 64 }}>
      <div id="hero-grid" style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "0 clamp(1.5rem,6vw,5rem)",
        gap: "4rem",
        paddingTop: 80,
      }}>
        {/* left */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem",
            letterSpacing: "0.08em", color: C.muted,
            display: "flex", alignItems: "center", gap: "0.55rem",
            animation: "fadeInUp .6s ease-out .1s both",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.rose, opacity: .8, display: "inline-block" }} />
            BS Artificial Intelligence · Ghazi University, DG Khan
          </div>

          <div style={{ animation: "fadeInUp .7s ease-out .22s both" }}>
            <h1 style={{
              fontFamily: "'Lora',serif", fontWeight: 700,
              fontSize: "clamp(2.8rem,5.5vw,4.25rem)",
              lineHeight: 1.08, color: C.navy, letterSpacing: "-.022em", margin: 0,
            }}>
              Rania Rashid
            </h1>
            <h2 style={{
              fontFamily: "'Lora',serif", fontWeight: 400, fontStyle: "italic",
              fontSize: "clamp(1.35rem,2.8vw,2rem)",
              lineHeight: 1.38, color: C.navyLight, margin: ".5rem 0 0",
            }}>
              Learning how intelligent<br />systems take shape.
            </h2>
          </div>

          <p style={{
            fontFamily: "'Source Sans 3',sans-serif", fontSize: "1.025rem",
            lineHeight: 1.72, color: C.muted, maxWidth: "42ch",
            fontWeight: 300, margin: 0,
            animation: "fadeInUp .7s ease-out .38s both",
          }}>
            I build practical Python tools, explore data carefully, and keep
            moving toward a deeper career in AI engineering.
          </p>

          <div style={{ width: 48, height: 1, backgroundColor: C.rose, opacity: .55, animation: "fadeIn .6s ease-out .5s both" }} />

          <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", animation: "fadeInUp .6s ease-out .54s both" }}>
            <CTA primary href="#projects">View my work</CTA>
            <CTA href="#contact">Let's connect</CTA>
          </div>
          <div style={{ display: "flex", gap: "1.25rem", animation: "fadeIn .7s ease-out .7s both" }}>
            <a href="https://github.com/raniarashid780-sketch" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", color: C.muted, textDecoration: "none", letterSpacing: ".02em", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.navy)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >GitHub ↗</a>
            <a href="https://www.linkedin.com/in/rania-rashid00/" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", color: C.muted, textDecoration: "none", letterSpacing: ".02em", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.navy)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >LinkedIn ↗</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: ".5rem", animation: "fadeIn .7s ease-out 1s both", marginTop: ".5rem" }}>
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" style={{ opacity: .35 }}>
              <rect x="4" y="0" width="6" height="11" rx="3" stroke={C.navy} strokeWidth="1.2" fill="none" />
              <circle cx="7" cy="4" r="1.5" fill={C.navy} className="node-float-1" />
              <path d="M7 14 L7 19 M4.5 17 L7 19 L9.5 17" stroke={C.navy} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".72rem", color: C.muted, opacity: .55, letterSpacing: ".04em" }}>
              scroll to explore
            </span>
          </div>
        </div>

        {/* right */}
        <div id="hero-visual" style={{ display: "flex", justifyContent: "center", alignItems: "center", animation: "fadeIn .9s ease-out .3s both" }}>
          <ThinkingSystem />
        </div>
      </div>
    </section>
  );
}

function CTA({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Source Sans 3',sans-serif", fontSize: ".9rem", fontWeight: 600,
        textDecoration: "none", padding: ".65rem 1.6rem", borderRadius: 8,
        border: primary ? "none" : `1px solid ${C.border}`,
        backgroundColor: primary ? (h ? C.navyLight : C.navy) : h ? C.ivoryDeep : "transparent",
        color: primary ? C.ivory : h ? C.navy : C.navyLight,
        transform: h ? "scale(1.02) translateY(-1px)" : "scale(1)",
        boxShadow: primary ? (h ? `0 8px 24px ${C.navy}28` : `0 3px 10px ${C.navy}16`) : "none",
        transition: "all .2s ease-out",
        display: "inline-flex", alignItems: "center", gap: ".35rem",
      }}
    >
      {children}
      {!primary && <span style={{ opacity: .6, fontSize: ".8rem" }}>→</span>}
    </a>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="about" style={{ scrollMarginTop: 64, borderTop: `1px solid ${C.border}` }}>
      <div id="about-grid" style={{
        padding: "6rem clamp(1.5rem,6vw,5rem)",
        display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start",
      }}>
        <div>
          <Label>About</Label>
          <h3 style={{ fontFamily: "'Lora',serif", fontSize: "1.75rem", fontWeight: 600, color: C.navy, lineHeight: 1.25, marginTop: ".75rem", letterSpacing: "-.015em" }}>
            Quiet curiosity,<br />careful craft.
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: "1.025rem", lineHeight: 1.75, color: C.navyLight, fontWeight: 300, margin: 0 }}>
            I'm a BS Artificial Intelligence student at Ghazi University, DG Khan,
            interested in practical Python development, automation, and data-focused
            problem solving. I enjoy building small tools that are understandable,
            useful, and reliable.
          </p>
          <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: "1.025rem", lineHeight: 1.75, color: C.muted, fontWeight: 300, margin: 0 }}>
            My work so far has centered on object-oriented programming, command-line
            tools, and data analysis with Python. I'm still learning and improving,
            and I prefer to present work that I can stand behind with clarity and honesty.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".55rem", marginTop: ".25rem" }}>
            {["Python","OOP","Data Analysis","Automation","CLI Tools"].map(t => (
              <span key={t} style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem",
                color: C.lavender, border: `1px solid ${C.lavenderMuted}`,
                borderRadius: 100, padding: ".25rem .75rem",
                backgroundColor: C.lavenderMuted + "55", letterSpacing: ".02em",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Projects ── */
const PROJECTS = [
  {
    title: "SmartCare-Clinic",
    desc: "A terminal-based clinic appointment and diagnosis simulation. Auto-generates patient IDs, routes symptoms to the right specialty, flags urgent cases, assigns doctors, and bills with an urgency surcharge — colored terminal output for readability.",
    detail: "Inheritance (Patient, Doctor, Receptionist from Person), polymorphism across introduce() and apply(), encapsulation via private attributes, abstract base classes, and operator overloading for sorting and printing appointments.",
    tags: ["Python","OOP","ABC","colorama"],
    accent: C.rose, muted: C.roseMuted, status: "OOP capstone",
    github: "https://github.com/raniarashid780-sketch/SmartCare-Clinic",
    demo: null,
  },
  {
    title: "File Organizer Automation",
    desc: "A command-line utility that organizes files into folders by type and date while avoiding risky moves when a file is still in use. Handles real filesystem edge cases gracefully.",
    detail: "Learned that a script which crashes on a locked file isn't done yet. pathlib and shutil over manual string path handling. Also built a Streamlit UI so non-terminal users can run it.",
    tags: ["Python","pathlib","shutil","os","Streamlit"],
    accent: C.lavender, muted: C.lavenderMuted, status: "First shipped project",
    github: "https://github.com/raniarashid780-sketch/file-organizer-automation",
    demo: "https://raniarashid780-sketch-file-organizer-autom-streamlit-app-sypeq4.streamlit.app/",
  },
  {
    title: "FreelanceLens",
    desc: "A small data analysis project exploring manually collected freelance listings to identify common skills, categories, and budget patterns — fixed-price and hourly kept separate.",
    detail: "Small sample sizes lie if you let them: categories with only 2–3 listings get their average reported alongside the sample size. Budget ranges were recorded at their minimum value — a known bias I documented rather than hid.",
    tags: ["Python","pandas"],
    accent: C.peach, muted: C.peachMuted, status: "Data analysis",
    github: "https://github.com/raniarashid780-sketch/Freelancelens",
    demo: null,
  },
];

function Projects() {
  return (
    <section id="projects" style={{
      scrollMarginTop: 64,
      padding: "6rem clamp(1.5rem,6vw,5rem)",
      borderTop: `1px solid ${C.border}`,
      backgroundColor: C.ivoryDeep,
    }}>
      <Label>Projects</Label>
      <h3 style={{ fontFamily: "'Lora',serif", fontSize: "1.75rem", fontWeight: 600, color: C.navy, marginTop: ".75rem", marginBottom: "2.5rem", letterSpacing: "-.015em" }}>
        Things I've built & studied.
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,340px),1fr))", gap: "1.5rem" }}>
        {PROJECTS.map(p => <ProjectCard key={p.title} {...p} />)}
      </div>
    </section>
  );
}

function ProjectCard({ title, desc, detail, tags, accent, muted, status, github, demo }: typeof PROJECTS[0]) {
  const [h, setH] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        backgroundColor: C.ivory,
        border: `1px solid ${h ? accent + "55" : C.border}`,
        borderRadius: 12, padding: "1.75rem",
        display: "flex", flexDirection: "column", gap: "1rem",
        transform: h ? "translateY(-3px)" : "none",
        boxShadow: h ? `0 12px 32px ${accent}18` : "none",
        transition: "all .22s ease-out",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: accent, opacity: .78, display: "inline-block", marginTop: 3 }} />
        <span style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: ".64rem",
          color: accent, backgroundColor: muted + "66",
          borderRadius: 100, padding: ".18rem .58rem", letterSpacing: ".04em",
        }}>{status}</span>
      </div>
      <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, backgroundColor: C.ivoryDeep }}>
        <img
          src={title === "SmartCare-Clinic" ? "/media/smartcare-demo.png" : title === "File Organizer Automation" ? "/media/file-organizer-demo.png" : "/media/freelancelens-output.png"}
          alt={`${title} project preview`}
          loading="lazy"
          style={{ display: "block", width: "100%", height: 150, objectFit: "cover", objectPosition: "top" }}
        />
      </div>
      <div>
        <h4 style={{ fontFamily: "'Lora',serif", fontSize: "1.125rem", fontWeight: 600, color: C.navy, margin: "0 0 .45rem", letterSpacing: "-.01em" }}>{title}</h4>
        <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".9rem", lineHeight: 1.65, color: C.muted, margin: 0, fontWeight: 300 }}>{desc}</p>
      </div>

      {/* expandable detail */}
      {open && (
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: ".85rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".64rem", letterSpacing: ".06em", textTransform: "uppercase", color: C.muted, opacity: .6, marginBottom: ".4rem" }}>
            what i learned
          </p>
          <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: ".875rem", lineHeight: 1.65, color: C.muted, margin: 0, fontWeight: 300 }}>{detail}</p>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
        {tags.map(t => (
          <span key={t} style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: ".66rem",
            color: C.navyLight, border: `1px solid ${C.border}`,
            borderRadius: 4, padding: ".18rem .48rem", opacity: .72,
          }}>{t}</span>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: ".25rem" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href={github} target="_blank" rel="noopener" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".76rem", color: accent, textDecoration: "none", opacity: .85 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = ".85")}
          >Repository ↗</a>
          {demo && (
            <a href={demo} target="_blank" rel="noopener" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".76rem", color: C.muted, textDecoration: "none", opacity: .75 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = ".75")}
            >Live demo ↗</a>
          )}
        </div>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            fontFamily: "'Source Sans 3',sans-serif", fontSize: ".75rem",
            color: C.muted, background: "none", border: "none", cursor: "pointer",
            opacity: .6, padding: 0, transition: "opacity .15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = ".6")}
        >
          {open ? "less ↑" : "more ↓"}
        </button>
      </div>
    </div>
  );
}

/* ── Skills ── */
const SKILLS = [
  { group: "Language",  color: C.rose,     muted: C.roseMuted,     items: ["Python"] },
  { group: "Data",      color: C.lavender, muted: C.lavenderMuted, items: ["NumPy","pandas","matplotlib"] },
  { group: "Database",  color: C.peach,    muted: C.peachMuted,    items: ["SQL","PostgreSQL","DBeaver"] },
  { group: "Tooling",   color: C.rose,     muted: C.roseMuted,     items: ["pathlib","shutil","argparse","logging","pytest","Git / GitHub","Streamlit"] },
  { group: "Practices", color: C.lavender, muted: C.lavenderMuted, items: ["Object-Oriented Programming"] },
  { group: "Building",  color: C.peach,    muted: C.peachMuted,    items: ["FastAPI","Docker"] },
];

function Skills() {
  return (
    <section id="skills" style={{ scrollMarginTop: 64, padding: "6rem clamp(1.5rem,6vw,5rem)", borderTop: `1px solid ${C.border}` }}>
      <Label>Skills</Label>
      <h3 style={{ fontFamily: "'Lora',serif", fontSize: "1.75rem", fontWeight: 600, color: C.navy, marginTop: ".75rem", marginBottom: "2.5rem", letterSpacing: "-.015em" }}>
        Tools I reach for.
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {SKILLS.map(({ group, color, muted, items }) => (
          <div key={group} style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: ".67rem",
              color, letterSpacing: ".08em", textTransform: "uppercase",
              width: 88, flexShrink: 0, paddingTop: ".3rem", opacity: .85,
            }}>{group}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".45rem" }}>
              {items.map(s => <Pill key={s} label={s} color={color} muted={muted} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pill({ label, color, muted }: { label: string; color: string; muted: string }) {
  const [h, setH] = useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Source Sans 3',sans-serif", fontSize: ".875rem",
        fontWeight: h ? 600 : 400,
        color: h ? color : C.navyLight,
        border: `1px solid ${h ? color + "88" : C.border}`,
        borderRadius: 100, padding: ".28rem .88rem",
        backgroundColor: h ? muted + "55" : "transparent",
        transition: "all .18s ease-out", cursor: "default",
      }}
    >
      {label}
    </span>
  );
}

/* ── Contact ── */
function Contact() {
  return (
    <section id="contact" style={{
      scrollMarginTop: 64,
      padding: "7rem clamp(1.5rem,6vw,5rem)",
      borderTop: `1px solid ${C.border}`,
      backgroundColor: C.ivoryDeep,
      textAlign: "center",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem",
    }}>
      <Label center>Contact</Label>
      <h3 style={{
        fontFamily: "'Lora',serif",
        fontSize: "clamp(1.8rem,3.5vw,2.75rem)",
        fontWeight: 600, color: C.navy, lineHeight: 1.2,
        letterSpacing: "-.02em", maxWidth: "18ch", margin: 0,
      }}>
        Let's have a thoughtful conversation.
      </h3>
      <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: "1.0rem", lineHeight: 1.72, color: C.muted, fontWeight: 300, maxWidth: "44ch", margin: 0 }}>
        Open to internships, collaborative work, and opportunities to build
        practical Python tools that solve real problems.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: ".5rem" }}>
        <ContactBtn href="mailto:raniarashid780@gmail.com" primary>raniarashid780@gmail.com</ContactBtn>
        <ContactBtn href="https://github.com/raniarashid780-sketch" target="_blank">GitHub ↗</ContactBtn>
        <ContactBtn href="https://www.linkedin.com/in/rania-rashid00/" target="_blank">LinkedIn ↗</ContactBtn>
      </div>
    </section>
  );
}

function ContactBtn({ href, children, primary, target }: { href: string; children: React.ReactNode; primary?: boolean; target?: string }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={target} rel={target ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Source Sans 3',sans-serif", fontSize: ".9rem", fontWeight: 600,
        textDecoration: "none", padding: ".7rem 1.75rem", borderRadius: 8,
        border: primary ? "none" : `1px solid ${C.border}`,
        backgroundColor: primary ? (h ? C.navyLight : C.navy) : h ? C.border + "55" : "transparent",
        color: primary ? C.ivory : h ? C.navy : C.navyLight,
        transform: h ? "scale(1.02)" : "scale(1)",
        boxShadow: primary && h ? `0 8px 24px ${C.navy}28` : "none",
        transition: "all .2s ease-out",
      }}
    >
      {children}
    </a>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`,
      padding: "1.5rem clamp(1.5rem,6vw,5rem)",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: ".5rem",
    }}>
      <span style={{ fontFamily: "'Lora',serif", fontSize: ".875rem", color: C.muted, opacity: .68 }}>Rania Rashid</span>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".66rem", color: C.muted, opacity: .45, letterSpacing: ".04em" }}>
        BS Artificial Intelligence · Ghazi University · 2026
      </span>
    </footer>
  );
}

/* ── shared ── */
function Label({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: center ? "center" : "flex-start", gap: ".45rem" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.rose, opacity: .72, display: "inline-block" }} />
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: C.muted, opacity: .72 }}>
        {children}
      </span>
    </div>
  );
}

/* ── App ── */
export default function App() {
  return (
    <>
      <style>{css}</style>
      <div style={{ backgroundColor: C.ivory, minHeight: "100vh" }}>
        <Nav />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
