import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// DATA
// ============================================================
const PROFILE = {
  name: "YAMEEN AHMED",
  handle: "YameenZ1",
  role: "SOFTWARE DEVELOPER",
  bio: "Software developer from UT Dallas with experience at Paycom and Code Ninjas. Passionate about AI/ML, systems programming, and building scalable solutions. Certified in Cloud and Cybersecurity.",
  github: "https://github.com/YameenZ1",
  linkedin: "https://www.linkedin.com/in/yameenahmed/",
  email: "yameen.ahmed@gmail.com",
};

const PROJECTS = [
  {
    id: "AIML-01",
    name: "CLIMATE ML MODEL",
    category: "AI/ML",
    color: "#39ff14",
    desc: "Led a team to design, develop and present an ML model that analyzes climate change trends across the US. Applied data science and visualization techniques to deliver impactful insights.",
    tech: ["Python", "ML", "Jupyter"],
  },
  {
    id: "AIML-02",
    name: "IMAGE RECOGNITION",
    category: "AI/ML",
    color: "#39ff14",
    desc: "Applied ML models to recognize images from a sample dataset leveraging Python and Jupyter Notebooks. Trained and evaluated multiple model architectures.",
    tech: ["Python", "Jupyter", "ML"],
  },
  {
    id: "AIML-03",
    name: "AI FLASHCARDS APP",
    category: "AI/ML",
    color: "#39ff14",
    desc: "Built an AI-powered flashcard application leveraging OpenAI API for smart content generation, NodeJS backend, and Stripe Payments for subscription management.",
    tech: ["NodeJS", "OpenAI API", "Stripe"],
  },
  {
    id: "AIML-04",
    name: "AI LEGAL ASSISTANT",
    category: "AI/ML",
    color: "#39ff14",
    desc: "Participated in a team effort to design and develop AI designed to offer legal assistance to users with intelligent recommendations and document analysis.",
    tech: ["AI", "ML", "Team Collaboration"],
  },
  {
    id: "SYS-01",
    name: "CPU/MEMORY SIM",
    category: "SYSTEMS",
    color: "#00cfff",
    desc: "Simulated a CPU and Memory system in C++ that accepts plain text input files, reads and processes instructions — a deep dive into OS fundamentals.",
    tech: ["C++", "OS Concepts"],
  },
  {
    id: "ALG-01",
    name: "PERT ALGORITHM",
    category: "ALGORITHMS",
    color: "#ffb300",
    desc: "Implemented the Program Evaluation and Review Technique (PERT) by extending a graph algorithm in Java, enabling critical path analysis for project scheduling.",
    tech: ["Java", "Graph Theory"],
  },
  {
    id: "ALG-02",
    name: "MULTI-DIM SEARCH",
    category: "ALGORITHMS",
    color: "#ffb300",
    desc: "Designed a multi-dimensional search engine leveraging hashmaps and binary trees in Java, enabling efficient lookup across multiple data dimensions simultaneously.",
    tech: ["Java", "Hashmaps", "BST"],
  },
];

const SKILLS = [
  { name: "Java", level: 88 },
  { name: "Python", level: 85 },
  { name: "C++", level: 75 },
  { name: "React", level: 82 },
  { name: "HTML/CSS/JS", level: 90 },
  { name: "PHP", level: 80 },
  { name: "MySQL", level: 82 },
  { name: "AWS Cloud", level: 78 },
  { name: "ArcGIS Pro", level: 72 },
  { name: "Docker", level: 75 },
  { name: "Networking", level: 75 },
  { name: "Adobe PS", level: 74 },
  { name: "G/MS Suite", level: 88 },
];

const SKILL_CATEGORIES = {
  LANG: ["Java", "Python", "C++", "React", "HTML/CSS/JS", "PHP"],
  DATA: ["MySQL", "ArcGIS Pro"],
  CLOUD: ["AWS Cloud", "Networking"],
  TOOLS: ["Adobe PS", "G/MS Suite"],
};

// ============================================================
// STYLES (inline for single-file JSX)
// ============================================================
const injectStyles = () => {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=VT323&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #0f0f0f;
      font-family: 'Share Tech Mono', monospace;
      color: #c4a460;
      min-height: 100vh;
      overflow-x: auto;
      cursor: crosshair;
    }

    /* CRT scanlines */
    body::before {
      content: '';
      position: fixed; top:0;left:0;right:0;bottom:0;
      background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px);
      pointer-events: none;
      z-index: 9999;
    }

    .scanline {
      position: fixed; top:0; left:0; right:0;
      height: 80px;
      background: linear-gradient(180deg, transparent, rgba(196,164,96,.006), transparent);
      animation: scanMove 10s linear infinite;
      pointer-events: none;
      z-index: 9998;
    }
    @keyframes scanMove { from{top:-80px} to{top:100vh} }

    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes flicker { 0%,100%{opacity:1} 93%{opacity:.7} 94%{opacity:1} 97%{opacity:.85} }
    @keyframes glow-pulse { 0%,100%{text-shadow:0 0 6px rgba(196,164,96,.25)} 50%{text-shadow:0 0 12px rgba(196,164,96,.35),0 0 20px rgba(196,164,96,.1)} }
    @keyframes slide-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fade-in { from{opacity:0} to{opacity:1} }
    @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes needle { 0%,100%{transform-origin:50% 80%;transform:rotate(var(--from))} 50%{transform-origin:50% 80%;transform:rotate(var(--to))} }

    .crt-flicker { animation: flicker 8s infinite; }
    .glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }

    /* PANEL */
    .terminal-root {
      max-width: 1280px;
      margin: 0 auto;
      padding: 16px 12px;
      animation: fade-in 0.6s ease;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* HEADER */
    .t-header {
      background: linear-gradient(180deg,#1f1f1f,#151515);
      border: 2px solid #333;
      border-bottom: 3px solid #8b7355;
      border-radius: 4px 4px 0 0;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .t-header::after {
      content:'';
      position:absolute;top:0;left:0;right:0;
      height:1px;
      background:linear-gradient(90deg,transparent,rgba(196,164,96,.3),transparent);
    }

    .t-title {
      font-family: 'Orbitron', sans-serif;
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 8px;
      color: #d4a960;
      text-shadow: 0 0 10px rgba(212,169,96,.4);
    }
    .t-subtitle {
      font-size: 10px;
      letter-spacing: 4px;
      color: #8b7355;
      margin-top: 2px;
    }
    .t-header-right { display:flex; align-items:center; gap:16px; }
    .t-uptime { font-size:11px; letter-spacing:2px; color:#8b7355; }
    .t-uptime span { color:#c4a460; }

    .status-dot {
      width:10px;height:10px;border-radius:50%;
      animation: blink 1.4s ease-in-out infinite;
    }
    .dot-green { background:#39ff14; box-shadow:0 0 8px #39ff14,0 0 16px rgba(57,255,20,.4); }
    .dot-amber { background:#c4a460; box-shadow:0 0 8px rgba(196,164,96,.5); }
    .dot-red   { background:#ff3c3c; box-shadow:0 0 8px #ff3c3c; }

    .screw {
      width:13px;height:13px;border-radius:50%;flex-shrink:0;
      background:radial-gradient(circle at 35% 35%,#555,#333 60%,#1a1a1a);
      position:relative;
    }
    .screw::after {
      content:'✕';position:absolute;top:50%;left:50%;
      transform:translate(-50%,-50%);font-size:6px;
      color:rgba(255,255,255,.15);line-height:1;
    }

    /* BODY GRID */
    .t-body {
      background: #121212;
      border: 2px solid #333;
      border-top: none;
      padding: 14px;
      display: grid;
      grid-template-columns: minmax(220px, 1fr) minmax(280px, 2fr) minmax(220px, 1fr);
      gap: 12px;
      flex: 1;
    }

    /* MODULES */
    .module {
      background: linear-gradient(180deg,#1a1a1a,#141414);
      border: 1px solid #333;
      border-radius: 3px;
      padding: 12px;
      position: relative;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.02), 0 2px 6px rgba(0,0,0,.5);
      min-width: 0;
    }
    .module-title {
      font-family:'Orbitron',sans-serif;
      font-size: 8px;
      letter-spacing: 3px;
      color: #8b7355;
      text-transform: uppercase;
      margin-bottom: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid #2a2207;
    }
    .full-width { grid-column: 1/-1; }

    /* PROFILE HERO */
    .profile-hero {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 14px;
    }
    .avatar-ring {
      width: 64px; height: 64px; border-radius: 50%;
      border: 2px solid #c4a460;
      box-shadow: 0 0 10px rgba(196,164,96,.2), inset 0 0 16px rgba(0,0,0,.5);
      display: flex; align-items: center; justify-content: center;
      background: radial-gradient(circle at 40% 35%, #3a2f25, #1a150f);
      flex-shrink: 0;
      font-family: 'Orbitron',sans-serif;
      font-size: 20px;
      font-weight: 900;
      color: #d4a960;
      text-shadow: 0 0 8px rgba(212,169,96,.3);
    }
    .profile-name {
      font-family:'Orbitron',sans-serif;
      font-size: 16px;
      font-weight: 900;
      letter-spacing: 4px;
      color: #d4a960;
      text-shadow: 0 0 8px rgba(212,169,96,.3);
    }
    .profile-role {
      font-size: 9px;
      letter-spacing: 3px;
      color: #8b7355;
      margin-top: 3px;
    }
    .profile-school {
      font-size: 9px;
      letter-spacing: 2px;
      color: #6b5a47;
      margin-top: 2px;
    }

    /* SOCIAL LINKS */
    .social-links { display:flex; flex-direction:column; gap:7px; }
    .social-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border: 1px solid #3a2f25;
      border-radius: 2px;
      background: #14120e;
      color: #8b7355;
      font-family: 'Share Tech Mono', monospace;
      font-size: 10px;
      letter-spacing: 2px;
      cursor: pointer;
      text-decoration: none;
      transition: all .15s;
      position: relative;
      overflow: hidden;
    }
    .social-btn::before {
      content:'';position:absolute;left:0;top:0;bottom:0;
      width:2px;background:currentColor;opacity:.3;
    }
    .social-btn:hover {
      color: #c4a460;
      border-color: #8b7355;
      background: #1a1610;
      box-shadow: 0 0 8px rgba(196,164,96,.08);
    }
    .social-btn.github:hover { color:#39ff14; border-color:#1a5a2a; box-shadow:0 0 12px rgba(57,255,20,.1); }
    .social-btn.linkedin:hover { color:#00cfff; border-color:#004466; box-shadow:0 0 12px rgba(0,207,255,.1); }
    .social-btn.email:hover { color:#ff9966; border-color:#662200; box-shadow:0 0 12px rgba(255,150,100,.1); }

    .social-icon { font-size:14px; width:18px; text-align:center; }
    .social-label { flex:1; }
    .social-arrow { font-size:10px; opacity:.5; }

    /* CRT SCREEN */
    .crt-screen {
      background: #0d1208;
      border: 2px solid #1a2410;
      border-radius: 2px;
      padding: 10px 12px;
      position: relative;
      overflow: hidden;
      min-height: 140px;
    }
    .crt-screen::before {
      content:'';position:absolute;top:0;left:0;right:0;bottom:0;
      background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,60,0,.03) 3px,rgba(0,60,0,.03) 4px);
      pointer-events:none;z-index:1;
    }
    .crt-text {
      font-family:'VT323',monospace;
      font-size:16px;
      color:#5ac85a;
      line-height:1.5;
      text-shadow:0 0 3px rgba(90,200,90,.2);
      position:relative;z-index:2;
      white-space:pre-wrap;
    }
    .crt-cursor::after { content:'█'; animation:blink .8s step-end infinite; }

    /* AMBER SCREEN */
    .amber-screen {
      background: #0f0d0a;
      border: 2px solid #261f18;
      border-radius: 2px;
      padding: 10px 12px;
      min-height: 80px;
    }
    .amber-text {
      font-family:'VT323',monospace;
      font-size:16px;
      color:#c4a460;
      line-height:1.5;
      text-shadow:0 0 3px rgba(196,164,96,.2);
      white-space:pre-wrap;
    }

    /* SECTION LABEL */
    .sec-label {
      font-size: 8px;
      letter-spacing: 2px;
      color: #6b5a47;
      text-transform: uppercase;
      margin: 10px 0 6px;
    }

    /* TOGGLE SWITCHES */
    .switches-row { display:flex; gap:12px; flex-wrap:wrap; margin:4px 0; }
    .sw-unit { display:flex; flex-direction:column; align-items:center; gap:4px; cursor:pointer; }
    .sw-label { font-size:7px; letter-spacing:1px; color:#6b5a47; text-align:center; max-width:38px; line-height:1.2; }
    .sw-body {
      width:22px; height:40px;
      background:linear-gradient(180deg,#222,#141414);
      border:1px solid #333;border-radius:2px;
      position:relative;
      box-shadow:inset 0 1px 3px rgba(0,0,0,.8);
      transition:all .1s;
    }
    .sw-lever {
      position:absolute;left:3px;right:3px;height:16px;
      background:linear-gradient(180deg,#777,#444 50%,#2a2a2a);
      border-radius:1px;
      transition:top .12s cubic-bezier(.4,0,.2,1);
      top:20px;
      box-shadow:0 2px 4px rgba(0,0,0,.6);
    }
    .sw-unit.on .sw-lever { top:4px; }
    .sw-ind {
      position:absolute;bottom:3px;left:50%;transform:translateX(-50%);
      width:5px;height:5px;border-radius:50%;
      background:#2a2218; transition:all .15s;
    }
    .sw-unit.on .sw-ind { background:#c4a460; box-shadow:0 0 4px rgba(196,164,96,.4); }

    /* ROTARY DIALS */
    .dial-row { display:flex; gap:10px; justify-content:space-around; flex-wrap:wrap; }
    .dial-unit { display:flex; flex-direction:column; align-items:center; gap:5px; cursor:pointer; }
    .dial-name { font-size:7px; letter-spacing:1px; color:#6b5a47; text-transform:uppercase; }
    .dial-outer {
      width:54px;height:54px;border-radius:50%;
      background:radial-gradient(circle at 38% 32%,#383838,#181818 60%,#0d0d0d);
      border:2px solid #333;
      box-shadow:0 4px 10px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.05),0 0 0 3px #111,0 0 0 4px #2a2a2a;
      position:relative;
      display:flex;align-items:center;justify-content:center;
      transition:box-shadow .2s;
      user-select:none;
    }
    .dial-outer:hover {
      box-shadow:0 4px 10px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.05),0 0 0 3px #111,0 0 0 4px rgba(255,179,0,.4);
    }
    .dial-ptr {
      position:absolute;top:6px;left:50%;
      width:3px;height:11px;
      background:linear-gradient(180deg,#c4a460,#8b7355);
      border-radius:2px;
      box-shadow:0 0 3px rgba(196,164,96,.3);
      transform-origin:bottom center;
    }
    .dial-val { font-size:8px; color:#c4a460; letter-spacing:1px; font-family:'Share Tech Mono',monospace; }

    /* PUSH BUTTONS */
    .btn-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:7px; }
    .btn-grid-2 { display:grid; grid-template-columns:repeat(2,1fr); gap:7px; }
    .p-btn {
      padding:7px 4px;
      background:linear-gradient(180deg,#2a2620,#1e1a16);
      border:1px solid #3a3228;border-bottom:3px solid #0f0d0a;
      border-radius:2px;
      color:#6b5a47;
      font-family:'Share Tech Mono',monospace;
      font-size:8px;letter-spacing:1px;
      cursor:pointer;text-align:center;
      transition:all .08s;
      box-shadow:0 3px 5px rgba(0,0,0,.4);
      user-select:none;
    }
    .p-btn:hover { color:#c4a460; border-color:#8b7355; }
    .p-btn:active { border-bottom:1px solid #0f0d0a; transform:translateY(2px); }
    .p-btn.active { background:linear-gradient(180deg,#3a3220,#2a2416); color:#c4a460; border-color:#8b7355; box-shadow:0 3px 5px rgba(0,0,0,.4),0 0 8px rgba(196,164,96,.08),inset 0 0 8px rgba(196,164,96,.02); }
    .p-btn.green { color:#1a4a1a; }
    .p-btn.green:hover,.p-btn.green.active { color:#39ff14; border-color:#1a5a2a; background:linear-gradient(180deg,#001400,#000e00); box-shadow:0 3px 5px rgba(0,0,0,.5),0 0 8px rgba(57,255,20,.1); }
    .p-btn.blue { color:#003344; }
    .p-btn.blue:hover,.p-btn.blue.active { color:#00cfff; border-color:#004466; background:linear-gradient(180deg,#001a22,#001118); box-shadow:0 3px 5px rgba(0,0,0,.5),0 0 8px rgba(0,207,255,.1); }
    .p-btn.red { color:#440000; }
    .p-btn.red:hover,.p-btn.red.active { color:#ff3c3c; border-color:#880000; background:linear-gradient(180deg,#180000,#100000); box-shadow:0 3c 5px rgba(0,0,0,.5),0 0 8px rgba(255,60,60,.1); }

    /* PILOT LAMPS */
    .lamp-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:7px; }
    .lamp-unit { display:flex; flex-direction:column; align-items:center; gap:4px; cursor:pointer; }
    .lamp-body {
      width:26px;height:26px;border-radius:50%;
      border:2px solid #2a2a2a;
      background:radial-gradient(circle at 40% 35%,#1a1a1a,#0a0a0a);
      box-shadow:inset 0 1px 3px rgba(0,0,0,.8);
      transition:all .2s;
    }
    .lamp-body.lit-green { background:radial-gradient(circle at 40% 35%,#aaffaa,#39ff14 60%,#003300); box-shadow:0 0 10px #39ff14,0 0 20px rgba(57,255,20,.35); border-color:#00aa00; }
    .lamp-body.lit-amber { background:radial-gradient(circle at 40% 35%,#ffe599,#ffb300 60%,#331a00); box-shadow:0 0 10px #ffb300,0 0 20px rgba(255,179,0,.35); border-color:#7a5500; }
    .lamp-body.lit-red   { background:radial-gradient(circle at 40% 35%,#ffaaaa,#ff3c3c 60%,#330000); box-shadow:0 0 10px #ff3c3c,0 0 20px rgba(255,60,60,.35); border-color:#880000; }
    .lamp-body.lit-blue  { background:radial-gradient(circle at 40% 35%,#99eeff,#00cfff 60%,#003344); box-shadow:0 0 10px #00cfff,0 0 20px rgba(0,207,255,.35); border-color:#006688; }
    .lamp-label { font-size:7px; letter-spacing:.5px; color:#6b5a47; text-align:center; max-width:42px; line-height:1.2; }

    /* VU METERS */
    .vu-list { display:flex; flex-direction:column; gap:5px; }
    .vu-row { display:flex; align-items:center; gap:6px; }
    .vu-lbl { font-size:8px; color:#6b5a47; width:30px; flex-shrink:0; letter-spacing:1px; }
    .vu-track { flex:1; height:7px; background:#0a0804; border:1px solid #261f18; border-radius:1px; overflow:hidden; }
    .vu-fill { height:100%; border-radius:1px; transition:width .25s ease; background:linear-gradient(90deg,#8b7355 0%,#c4a460 60%,#d4b570 85%,#b8714e 100%); box-shadow:0 0 3px rgba(196,164,96,.3); }
    .vu-num { font-size:8px; color:#c4a460; width:26px; text-align:right; flex-shrink:0; }

    /* FREQUENCY / SEG DISPLAY */
    .freq-box {
      background:#0d0f08;
      border:2px solid #151f0c;
      border-radius:2px;padding:8px 12px;
      text-align:center;
      box-shadow:inset 0 0 20px rgba(0,0,0,.8);
    }
    .freq-val {
      font-family:'VT323',monospace;
      font-size:38px;color:#5ac85a;
      text-shadow:0 0 6px rgba(90,200,90,.2);
      letter-spacing:4px;line-height:1;
    }
    .freq-lbl { font-size:8px; color:#3a5a3a; letter-spacing:2px; }

    .seg-box {
      background:#0f0e0b;
      border:2px solid #261f18;
      border-radius:2px;padding:6px 10px;
      text-align:center;
    }
    .seg-val {
      font-family:'VT323',monospace;
      font-size:30px;color:#c4a460;
      text-shadow:0 0 4px rgba(196,164,96,.15);
      letter-spacing:6px;
    }
    .seg-lbl { font-size:7px; color:#5a5a38; letter-spacing:2px; }

    /* TICKER */
    .ticker-wrap { background:#0f0d0a; border:1px solid #261f18; padding:4px 0; overflow:hidden; position:relative; }
    .ticker-inner {
      font-family:'VT323',monospace;
      font-size:14px;color:#c4a460;
      text-shadow:0 0 2px rgba(196,164,96,.2);
      white-space:nowrap;
      display:inline-block;
      animation:ticker 28s linear infinite;
    }

    /* SCOPE */
    .scope-wrap {
      background:#0d0f0a;
      border:2px solid #151f10;
      padding:6px;position:relative;
    }
    .scope-wrap::before {
      content:'';position:absolute;top:0;left:0;right:0;bottom:0;
      background:linear-gradient(rgba(0,255,0,.025) 1px,transparent 1px),
                 linear-gradient(90deg,rgba(0,255,0,.025) 1px,transparent 1px);
      background-size:18px 18px;
      pointer-events:none;
    }

    /* PROJECT CARD */
    .project-card {
      border:1px solid #332f27;
      border-radius:2px;
      padding:10px 12px;
      background:#14120e;
      transition:all .2s;
      cursor:pointer;
    }
    .project-card:hover { border-color:#8b7355; background:#1a1710; }
    .project-card.active { border-color:var(--proj-color,#c4a460); background:#1a1710; box-shadow:0 0 8px rgba(196,164,96,.04); }
    .proj-id { font-size:8px; letter-spacing:2px; color:#6b5a47; }
    .proj-name { font-family:'Orbitron',sans-serif; font-size:11px; font-weight:700; letter-spacing:2px; color:var(--proj-color,#c4a460); margin:3px 0; }
    .proj-cat { font-size:8px; letter-spacing:2px; color:#6b5a47; }
    .proj-desc { font-size:10px; color:#9a8a7a; line-height:1.5; margin-top:6px; }
    .proj-tech { display:flex; flex-wrap:wrap; gap:4px; margin-top:6px; }
    .tech-tag {
      padding:2px 6px;
      border:1px solid #3a3228;
      border-radius:1px;
      font-size:7px;
      letter-spacing:1px;
      color:#6b5a47;
      background:#14120e;
    }

    /* SKILL BAR */
    .skill-list { display:flex; flex-direction:column; gap:5px; }
    .skill-row { display:flex; align-items:center; gap:6px; }
    .skill-name { font-size:8px; color:#6b5a47; width:70px; flex-shrink:0; letter-spacing:.5px; }
    .skill-track { flex:1; height:6px; background:#0a0804; border:1px solid #261f18; border-radius:1px; overflow:hidden; }
    .skill-fill { height:100%; border-radius:1px; transition:width .5s ease; }
    .skill-fill.lang { background:linear-gradient(90deg,#8b7355,#c4a460); box-shadow:0 0 3px rgba(196,164,96,.25); }
    .skill-fill.data { background:linear-gradient(90deg,#004466,#00cfff); box-shadow:0 0 4px rgba(0,207,255,.4); }
    .skill-fill.cloud{ background:linear-gradient(90deg,#1a4a1a,#39ff14); box-shadow:0 0 4px rgba(57,255,20,.4); }
    .skill-fill.tools{ background:linear-gradient(90deg,#440000,#ff3c3c); box-shadow:0 0 4px rgba(255,60,60,.4); }
    .skill-pct { font-size:8px; color:#6b5a47; width:26px; text-align:right; }

    /* SLIDERS */
    .slider-bank { display:flex; gap:10px; justify-content:space-around; align-items:flex-end; }
    .sl-unit { display:flex; flex-direction:column; align-items:center; gap:4px; }
    .sl-track-wrap { height:70px; width:18px; position:relative; display:flex; justify-content:center; }
    .sl-track { width:5px; height:100%; background:#0a0804; border:1px solid #261f18; border-radius:2px; position:relative; }
    .sl-thumb {
      position:absolute;left:50%;transform:translateX(-50%);
      width:16px;height:10px;
      background:linear-gradient(180deg,#666,#333 50%,#222);
      border:1px solid #444;border-radius:1px;
      cursor:pointer;
      box-shadow:0 2px 4px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.08);
      transition:top .3s ease;
    }
    .sl-val { font-size:8px; color:#c4a460; letter-spacing:1px; }
    .sl-name { font-size:7px; color:#6b5a47; letter-spacing:1px; text-transform:uppercase; }

    /* GAUGE SVG */
    .gauge-cluster { display:flex; gap:10px; justify-content:space-around; }
    .g-unit { display:flex; flex-direction:column; align-items:center; gap:4px; }
    .g-name { font-size:7px; color:#6b5a47; letter-spacing:1.5px; text-transform:uppercase; }
    .g-val { font-family:'Orbitron',sans-serif; font-size:8px; letter-spacing:1px; }

    /* BOTTOM */
    .t-footer {
      background:linear-gradient(180deg,#151515,#1f1f1f);
      border:2px solid #333;
      border-top:3px solid #8b7355;
      border-radius:0 0 4px 4px;
      padding:8px 24px;
      display:flex;align-items:center;justify-content:space-between;
    }
    .footer-stat { font-size:9px; color:#6b5a47; letter-spacing:2px; }
    .footer-stat span { color:#8b7355; }

    /* MODAL / OVERLAY */
    .info-panel {
      border:1px solid #3a3228;
      border-radius:2px;
      padding:10px 12px;
      background:#14120e;
      animation:slide-in .2s ease;
      margin-top:8px;
    }
    .info-panel p { font-size:10px; color:#9a8a7a; line-height:1.6; }

    /* FLIP CHARS */
    .flip-row { display:flex; gap:3px; }
    .flip-c {
      width:24px;height:32px;
      background:linear-gradient(180deg,#080600 50%,#060400 50%);
      border:1px solid #1a1200;border-radius:1px;
      display:flex;align-items:center;justify-content:center;
      font-family:'VT323',monospace;font-size:24px;
      color:#ffe066;text-shadow:0 0 6px #ffe066;
      box-shadow:inset 0 0 6px rgba(0,0,0,.8);
      position:relative;
    }
    .flip-c::after { content:'';position:absolute;left:0;right:0;top:50%;height:1px;background:#111; }

    @media(max-width:1100px) {
      .t-body { grid-template-columns:1fr 1.5fr; }
      .full-width { grid-column:1/-1; }
    }
    @media(max-width:800px) {
      .t-body { grid-template-columns:1fr; }
      .t-title { font-size:18px; letter-spacing:5px; }
      .terminal-root { padding:12px 8px; }
    }
    @media(max-width:480px) {
      .t-title { font-size:14px; letter-spacing:2px; }
      .t-body { padding:10px; gap:10px; }
    }
  `;
  const el = document.createElement("style");
  el.textContent = css;
  document.head.appendChild(el);
};

// ============================================================
// OSCILLOSCOPE HOOK
// ============================================================
function useScope(canvasRef, mode) {
  const off = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let raf;
    const draw = () => {
      const W = canvas.clientWidth;
      const H = 56;
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#010905";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#39ff14";
      ctx.shadowColor = "#39ff14";
      ctx.shadowBlur = 4;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const t = (x + off.current) * 0.042;
        let y;
        if (mode === "sine") y = H / 2 + Math.sin(t) * 16 + Math.sin(t * 2.1) * 6;
        else if (mode === "square") y = H / 2 + (Math.sin(t) > 0 ? 14 : -14);
        else if (mode === "noise") y = H / 2 + (Math.sin(t) * 12 + Math.sin(t * 5.3) * 5 + Math.sin(t * 11) * 3);
        else y = H / 2 + Math.sin(t) * 14 + Math.sin(t * 2.7) * 7 + Math.sin(t * 0.4) * 4;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      off.current += 2;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [canvasRef, mode]);
}

// ============================================================
// COMPONENTS
// ============================================================
function ToggleSwitch({ label, on, onClick, color = "amber" }) {
  return (
    <div className={`sw-unit${on ? " on" : ""}`} onClick={onClick} title={label}>
      <div className="sw-body">
        <div className="sw-lever" />
        <div className="sw-ind" style={on ? { background: color === "green" ? "#39ff14" : color === "blue" ? "#00cfff" : "#ffb300", boxShadow: `0 0 5px ${color === "green" ? "#39ff14" : color === "blue" ? "#00cfff" : "#ffb300"}` } : {}} />
      </div>
      <div className="sw-label">{label}</div>
    </div>
  );
}

function RotaryDial({ label, angle, onClick, valLabel }) {
  return (
    <div className="dial-unit" onClick={onClick} title={`Dial: ${label}`}>
      <div className="dial-name">{label}</div>
      <div className="dial-outer">
        <div className="dial-ptr" style={{ transform: `translateX(-50%) rotate(${angle}deg)`, transformOrigin: "50% 100%" }} />
      </div>
      <div className="dial-val">{valLabel}</div>
    </div>
  );
}

function PilotLamp({ label, color, lit, onClick }) {
  const litClass = lit ? `lit-${color}` : "";
  return (
    <div className="lamp-unit" onClick={onClick} title={label}>
      <div className={`lamp-body ${litClass}`} />
      <div className="lamp-label">{label}</div>
    </div>
  );
}

function PushBtn({ label, active, variant, onClick }) {
  return (
    <div className={`p-btn${active ? " active" : ""}${variant ? " " + variant : ""}`} onClick={onClick} title={label}>
      {label}
    </div>
  );
}

function VUMeter({ label, value }) {
  const db = Math.round((value - 100) * 0.27);
  return (
    <div className="vu-row">
      <div className="vu-lbl">{label}</div>
      <div className="vu-track"><div className="vu-fill" style={{ width: value + "%" }} /></div>
      <div className="vu-num">{db >= 0 ? "+" : ""}{db}dB</div>
    </div>
  );
}

function GaugeNeedle({ label, angle, color, valText }) {
  const cx = 35, cy = 35, r = 28;
  const rad = (angle - 90) * Math.PI / 180;
  const x2 = cx + (r - 8) * Math.cos(rad);
  const y2 = cy + (r - 8) * Math.sin(rad);
  return (
    <div className="g-unit">
      <svg width="70" height="70" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r="32" fill="#0d0d0d" stroke="#2a2a2a" strokeWidth="1.5" />
        <circle cx="35" cy="35" r="28" fill="none" stroke="#1a1200" strokeWidth="0.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
          const ar = (a - 90) * Math.PI / 180;
          return <line key={a} x1={35 + 24 * Math.cos(ar)} y1={35 + 24 * Math.sin(ar)}
            x2={35 + 29 * Math.cos(ar)} y2={35 + 29 * Math.sin(ar)}
            stroke="#2a1800" strokeWidth="0.8" />;
        })}
        <line x1="35" y1="35" x2={x2} y2={y2} stroke={color} strokeWidth="1.8" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
        <circle cx="35" cy="35" r="3" fill="#222" stroke="#444" />
        <text x="35" y="54" textAnchor="middle" fill="#2a1800" fontSize="6" fontFamily="'Share Tech Mono',monospace" letterSpacing="1">{label}</text>
      </svg>
      <div className="g-name">{label}</div>
      <div className="g-val" style={{ color }}>{valText}</div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  useEffect(() => { injectStyles(); }, []);

  // --- Uptime ---
  const startRef = useRef(Date.now());
  const [uptime, setUptime] = useState("000:00:00");
  useEffect(() => {
    const t = setInterval(() => {
      const e = Math.floor((Date.now() - startRef.current) / 1000);
      const h = String(Math.floor(e / 3600)).padStart(3, "0");
      const m = String(Math.floor((e % 3600) / 60)).padStart(2, "0");
      const s = String(e % 60).padStart(2, "0");
      setUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // --- CRT Log ---
  const [crtLines, setCrtLines] = useState([
    "UNIT 7-ALPHA :: YAMEEN AHMED",
    "STATUS: ONLINE",
    "CLEARANCE: DELTA",
    "USE CONTROLS TO EXPLORE...",
    "> AWAITING INPUT_",
  ]);
  const log = useCallback((msg) => {
    setCrtLines(prev => {
      const next = [...prev, "> " + msg];
      return next.length > 12 ? next.slice(-12) : next;
    });
  }, []);

  // --- Active project ---
  const [activeProj, setActiveProj] = useState(null);

  // --- SWITCHES — each wired to something ---
  const [sw, setSw] = useState({
    bio: true,    // show bio panel
    skills: false,
    proj: true,
    contact: false,
    enc: true,
    link: true,
  });
  const toggleSw = (key, label, onMsg, offMsg) => {
    setSw(p => {
      const next = { ...p, [key]: !p[key] };
      log(next[key] ? onMsg : offMsg);
      return next;
    });
  };

  // --- DIALS ---
  const [dials, setDials] = useState({ freq: 45, squelch: -90, vol: 0, scan: 120 });
  const rotateDial = (key, label) => {
    setDials(p => {
      const next = ((p[key] + 30 + 180) % 360) - 180;
      const messages = {
        freq: `FREQ TUNED: ${(121.5 + next / 36).toFixed(3)} MHz`,
        squelch: `SQUELCH: ${next}°`,
        vol: `VOLUME: ${Math.round((next + 180) / 3.6)}%`,
        scan: `SCAN RATE: ${Math.abs(next)} RPM`,
      };
      log(messages[key] || `DIAL [${label}]: ${next}°`);
      return { ...p, [key]: next };
    });
  };

  // --- PUSH BUTTONS wired to projects / actions ---
  const [activeBtns, setActiveBtns] = useState({ AIML: false, SYS: false, ALG: false, INIT: true, SYNC: false, CLEAR: false });
  const handleBtn = (key, msg, projFilter) => {
    setActiveBtns(p => ({ ...p, [key]: !p[key] }));
    log(msg);
    if (projFilter) {
      const found = PROJECTS.filter(p => p.category === projFilter);
      if (found.length) setActiveProj(found[0]);
    }
  };

  // --- PILOT LAMPS ---
  const [lamps, setLamps] = useState({
    sysok: true, github: false, linkedin: false, email: false, nav: true, warn: false,
  });
  const toggleLamp = (key, msg) => {
    setLamps(p => { const next = { ...p, [key]: !p[key] }; log(msg); return next; });
  };

  // --- VU METERS (animated) ---
  const [vuVals, setVuVals] = useState([78, 45, 92, 63, 18]);
  useEffect(() => {
    const t = setInterval(() => {
      setVuVals(p => p.map(v => {
        let nv = v + (Math.random() - 0.5) * 10;
        return Math.max(5, Math.min(97, nv));
      }));
    }, 300);
    return () => clearInterval(t);
  }, []);

  // --- GAUGES (animated) ---
  const [gauges, setGauges] = useState({ hdg: 120, vsi: 210, pwr: 165 });
  useEffect(() => {
    const t = setInterval(() => {
      setGauges(p => ({
        hdg: Math.max(60, Math.min(300, p.hdg + (Math.random() - 0.5) * 6)),
        vsi: Math.max(120, Math.min(300, p.vsi + (Math.random() - 0.5) * 5)),
        pwr: Math.max(90, Math.min(270, p.pwr + (Math.random() - 0.5) * 4)),
      }));
    }, 900);
    return () => clearInterval(t);
  }, []);

  // --- SLIDERS ---
  const [sliders, setSliders] = useState([15, 38, 25, 52]);
  const slideClick = (i, label) => {
    const vals = [
      ["GAIN: MAX", "GAIN: HIGH", "GAIN: MED", "GAIN: LOW"],
      ["JAVA: EXPERT", "PYTHON: ADV", "REACT: ADV", "JS: EXPERT"],
      ["C++: PROF", "AWS: INT", "PHP: INT", "SQL: ADV"],
      ["ARC GIS: INT", "PHOTOSHOP: INT", "NETWORKS: INT", "OS CONCEPTS: INT"],
    ];
    const newPos = Math.floor(Math.random() * 60) + 5;
    setSliders(p => { const n = [...p]; n[i] = newPos; return n; });
    log(vals[i][Math.floor(Math.random() * 4)]);
  };

  // --- SCOPE MODE via band selector ---
  const [scopeMode, setScopeMode] = useState("default");
  const [activeBand, setActiveBand] = useState("AM");
  const scopeRef = useRef();
  useScope(scopeRef, scopeMode);
  const bands = ["AM", "FM", "HF", "VHF", "UHF", "SAT"];
  const bandModes = { AM: "sine", FM: "default", HF: "square", VHF: "noise", UHF: "default", SAT: "sine" };
  const bandMessages = {
    AM: "BAND: AM — Climate ML Model ACTIVE",
    FM: "BAND: FM — AI Flashcards ACTIVE",
    HF: "BAND: HF — CPU/Memory Sim ACTIVE",
    VHF: "BAND: VHF — PERT Algorithm ACTIVE",
    UHF: "BAND: UHF — Multi-Dim Search ACTIVE",
    SAT: "BAND: SAT — Image Recognition ACTIVE",
  };
  const bandProjects = { AM: "AIML-01", FM: "AIML-03", HF: "SYS-01", VHF: "ALG-01", UHF: "ALG-02", SAT: "AIML-02" };
  const selectBand = (b) => {
    setActiveBand(b);
    setScopeMode(bandModes[b]);
    log(bandMessages[b]);
    const proj = PROJECTS.find(p => p.id === bandProjects[b]);
    if (proj) setActiveProj(proj);
  };

  // --- MORSE KEY ---
  const [morseActive, setMorseActive] = useState(false);
  const morsePress = () => { setMorseActive(true); log("--- TRANSMITTING: CONTACT ME ---"); };
  const morseRelease = () => setMorseActive(false);

  // --- KEY SWITCH ---
  const [keyArmed, setKeyArmed] = useState(false);
  const toggleKey = () => {
    setKeyArmed(p => {
      log(!p ? "⚠ AUTH KEY ARMED — FULL ACCESS GRANTED" : "KEY LOCKED");
      return !p;
    });
  };

  // --- SKILL CATEGORY dial ---
  const [skillCat, setSkillCat] = useState("LANG");
  const skillCats = ["LANG", "DATA", "CLOUD", "TOOLS"];
  const skillCatColors = { LANG: "lang", DATA: "data", CLOUD: "cloud", TOOLS: "tools" };
  const cycleSkillCat = () => {
    setSkillCat(p => {
      const idx = skillCats.indexOf(p);
      const next = skillCats[(idx + 1) % skillCats.length];
      log(`SKILL FILTER: ${next}`);
      return next;
    });
  };

  // --- NUMERIC PAD ---
  const [numBuf, setNumBuf] = useState("");
  const numMessages = {
    "1": "PROJECT #1 SELECTED", "2": "PROJECT #2 SELECTED",
    "3": "PROJECT #3 SELECTED", "4": "PROJECT #4 SELECTED",
    "5": "PROJECT #5 SELECTED", "6": "PROJECT #6 SELECTED",
    "7": "SKILL LEVEL 7", "8": "SKILL LEVEL 8", "9": "SKILL LEVEL 9",
    "0": "SYSTEM CODE: 0",
  };
  const numPress = (v) => {
    if (v === "CLR") { setNumBuf(""); log("INPUT CLEARED"); return; }
    if (v === "ENT") {
      const projIdx = parseInt(numBuf) - 1;
      if (projIdx >= 0 && projIdx < PROJECTS.length) {
        setActiveProj(PROJECTS[projIdx]);
        log(`LOADED PROJECT [${PROJECTS[projIdx].name}]`);
      } else { log(`COMMAND EXEC: [${numBuf}]`); }
      setNumBuf(""); return;
    }
    const next = (numBuf + v).slice(-6);
    setNumBuf(next);
    log(numMessages[v] || `INPUT: ${next}`);
  };

  // --- AUTO MESSAGES ---
  const autoMsgs = [
    "LINK QUALITY: 94%",
    "ENCRYPTION: AES-256",
    "GITHUB: YameenZ1 — REPOS ONLINE",
    "SKILL MATRIX LOADED",
    "PORTFOLIO: NOMINAL",
    "UTD GRADUATE: CONFIRMED",
    "AI/ML SUBSYSTEM: ACTIVE",
    "JAVA COMPILER: READY",
    "PYTHON KERNEL: RUNNING",
    "AWS REGION: US-EAST-1",
  ];
  const autoRef = useRef(0);
  useEffect(() => {
    const t = setInterval(() => {
      log(autoMsgs[autoRef.current++ % autoMsgs.length]);
    }, 6000);
    return () => clearInterval(t);
  }, [log]);

  // FLIP DISPLAY for coordinates (position)
  const flipChars = ["5", "1", ".", "3", "3", "N"];

  // TICKER TEXT
  const tickerText = "◆ YAMEEN AHMED — SOFTWARE DEVELOPER ◆ UTD GRADUATE ◆ AI/ML • SYSTEMS • ALGORITHMS ◆ JAVA • PYTHON • REACT • C++ • AWS ◆ GITHUB: YameenZ1 ◆ SEEKING OPPORTUNITIES ◆ LETS BUILD SOMETHING GREAT ◆    ";

  const skills = (SKILL_CATEGORIES[skillCat] || []).map(n => SKILLS.find(s => s.name === n)).filter(Boolean);

  return (
    <>
      <div className="scanline" />
      <div className="terminal-root">

        {/* ===== HEADER ===== */}
        <div className="t-header">
          <div className="screw" />
          <div>
            <div className="t-title crt-flicker glow-pulse">YAMEEN AHMED</div>
            <div className="t-subtitle">SOFTWARE DEVELOPER // UNIT 7-ALPHA // UTD</div>
          </div>
          <div className="t-header-right">
            <div className="t-uptime">SESSION: <span>{uptime}</span></div>
            <div className="status-dot dot-green" />
            <div className="t-uptime">ONLINE</div>
          </div>
          <div className="screw" />
        </div>

        {/* ===== BODY ===== */}
        <div className="t-body">

          {/* ============================== LEFT COL ============================== */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* PROFILE MODULE */}
            <div className="module">
              <div className="module-title">⬡ Operator Profile</div>
              <div className="profile-hero">
                <div className="avatar-ring">YA</div>
                <div>
                  <div className="profile-name">YAMEEN AHMED</div>
                  <div className="profile-role">SOFTWARE DEVELOPER</div>
                  <div className="profile-school">UTD GRADUATE</div>
                </div>
              </div>

              {/* BIO — toggled by switch */}
              {sw.bio && (
                <div className="info-panel">
                  <p>{PROFILE.bio}</p>
                </div>
              )}
            </div>

            {/* SOCIAL LINKS MODULE */}
            <div className="module">
              <div className="module-title">⬡ Comms / Links</div>
              <div className="social-links">
                <a className={`social-btn github`} href={PROFILE.github} target="_blank" rel="noreferrer"
                  onClick={() => { toggleLamp("github", "GITHUB LINK OPENED"); log("NAVIGATING: GITHUB/YameenZ1"); }}>
                  <span className="social-icon">⬡</span>
                  <span className="social-label">GITHUB / YAMEENZ1</span>
                  <span className="social-arrow">→</span>
                </a>
                <a className={`social-btn linkedin`} href={PROFILE.linkedin} target="_blank" rel="noreferrer"
                  onClick={() => { toggleLamp("linkedin", "LINKEDIN LINK OPENED"); log("NAVIGATING: LINKEDIN"); }}>
                  <span className="social-icon">▣</span>
                  <span className="social-label">LINKEDIN PROFILE</span>
                  <span className="social-arrow">→</span>
                </a>
                <a className={`social-btn email`} href={`mailto:${PROFILE.email}`}
                  onClick={() => { toggleLamp("email", "EMAIL CLIENT OPENED"); log("COMPOSE: yameen.ahmed@gmail.com"); }}>
                  <span className="social-icon">✉</span>
                  <span className="social-label">{PROFILE.email}</span>
                  <span className="social-arrow">→</span>
                </a>
              </div>
            </div>

            {/* SWITCH BANK */}
            <div className="module">
              <div className="module-title">⬡ Display Toggles</div>
              <div className="switches-row">
                <ToggleSwitch label="BIO" on={sw.bio} onClick={() => toggleSw("bio", "BIO", "BIO PANEL: ON", "BIO PANEL: OFF")} />
                <ToggleSwitch label="SKILLS" on={sw.skills} onClick={() => toggleSw("skills", "SKILLS", "SKILLS: VISIBLE", "SKILLS: HIDDEN")} color="green" />
                <ToggleSwitch label="PROJ" on={sw.proj} onClick={() => toggleSw("proj", "PROJ", "PROJECTS: VISIBLE", "PROJECTS: HIDDEN")} />
                <ToggleSwitch label="CNTCT" on={sw.contact} onClick={() => toggleSw("contact", "CNTCT", "CONTACT INFO: SHOWN", "CONTACT INFO: HIDDEN")} color="blue" />
                <ToggleSwitch label="ENC" on={sw.enc} onClick={() => toggleSw("enc", "ENC", "ENCRYPTION: ON", "ENCRYPTION: OFF")} />
              </div>

              {sw.contact && (
                <div className="info-panel" style={{ marginTop: 8 }}>
                  <p>EMAIL: yameen.ahmed@gmail.com<br />GITHUB: github.com/YameenZ1<br />LINKEDIN: /in/yameenahmed</p>
                </div>
              )}
            </div>

            {/* DIALS */}
            <div className="module">
              <div className="module-title">⬡ Tuning Controls</div>
              <div className="dial-row">
                <RotaryDial label="FREQ" angle={dials.freq} onClick={() => rotateDial("freq", "FREQ")} valLabel={`${(121.5 + dials.freq / 36).toFixed(2)}`} />
                <RotaryDial label="SQUELCH" angle={dials.squelch} onClick={() => rotateDial("squelch", "SQ")} valLabel={`SQ${dials.squelch > 0 ? "+" : ""}${dials.squelch}`} />
                <RotaryDial label="SKILLS" angle={dials.vol} onClick={() => { rotateDial("vol", "VOL"); cycleSkillCat(); }} valLabel={skillCat} />
                <RotaryDial label="SCAN" angle={dials.scan} onClick={() => rotateDial("scan", "SCAN")} valLabel={`${Math.abs(dials.scan)}rpm`} />
              </div>
            </div>

          </div>

          {/* ============================== CENTER COL ============================== */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* CRT MAIN SCREEN */}
            <div className="module">
              <div className="module-title">⬡ System Output</div>
              <div className="crt-screen crt-flicker">
                <div className="crt-text">
                  {crtLines.join("\n")}
                  <span className="crt-cursor"> </span>
                </div>
              </div>
            </div>

            {/* SCOPE + BAND */}
            <div className="module">
              <div className="module-title">⬡ Signal Monitor — Band = Project Channel</div>
              <div className="scope-wrap">
                <canvas ref={scopeRef} style={{ width: "100%", display: "block" }} height="56" />
              </div>
              <div className="sec-label" style={{ marginTop: 8 }}>Select band → load project</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}>
                {bands.map(b => (
                  <div key={b}
                    className={`p-btn${activeBand === b ? " active" : ""}${b === "HF" || b === "SAT" ? " blue" : b === "UHF" ? " green" : ""}`}
                    style={{ flex: 1, minWidth: 36 }}
                    onClick={() => selectBand(b)}>{b}</div>
                ))}
              </div>
            </div>

            {/* TICKER */}
            <div className="module" style={{ padding: "10px 14px" }}>
              <div className="ticker-wrap">
                <div className="ticker-inner">{tickerText + tickerText}</div>
              </div>
            </div>

            {/* ACTIVE PROJECT DISPLAY */}
            {sw.proj && (
              <div className="module">
                <div className="module-title">⬡ Projects — Click or use band selector</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                  {PROJECTS.map(p => (
                    <div key={p.id}
                      className={`project-card${activeProj?.id === p.id ? " active" : ""}`}
                      style={{ "--proj-color": p.color }}
                      onClick={() => { setActiveProj(p); log(`PROJECT LOADED: ${p.name}`); }}>
                      <div className="proj-id">{p.id}</div>
                      <div className="proj-name">{p.name}</div>
                      <div className="proj-cat">[{p.category}]</div>
                      {activeProj?.id === p.id && (
                        <>
                          <div className="proj-desc">{p.desc}</div>
                          <div className="proj-tech">{p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKILLS — toggled by switch & dial */}
            {sw.skills && (
              <div className="module">
                <div className="module-title">⬡ Skill Matrix — [{skillCat}] — Rotate SKILLS dial to change</div>
                <div className="skill-list">
                  {skills.map(s => (
                    <div key={s.name} className="skill-row">
                      <div className="skill-name">{s.name}</div>
                      <div className="skill-track">
                        <div className="skill-fill" style={{ width: s.level + "%", "--fill-color": "#ffb300" }}
                          className={`skill-fill ${skillCatColors[skillCat]}`} />
                      </div>
                      <div className="skill-pct">{s.level}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VU METERS */}
            <div className="module">
              <div className="module-title">⬡ Signal Levels</div>
              <div className="vu-list">
                <VUMeter label="JAVA" value={vuVals[0]} />
                <VUMeter label="PY" value={vuVals[1]} />
                <VUMeter label="REACT" value={vuVals[2]} />
                <VUMeter label="C++" value={vuVals[3]} />
                <VUMeter label="AWS" value={vuVals[4]} />
              </div>
            </div>

          </div>

          {/* ============================== RIGHT COL ============================== */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* COMMAND BUTTONS → project categories */}
            <div className="module">
              <div className="module-title">⬡ Mission Select</div>
              <div className="btn-grid">
                <PushBtn label="AI/ML" active={activeBtns.AIML} variant="green" onClick={() => { handleBtn("AIML", "LOADING AI/ML PROJECTS...", "AI/ML"); }} />
                <PushBtn label="SYS" active={activeBtns.SYS} variant="blue" onClick={() => { handleBtn("SYS", "LOADING SYSTEMS PROJECTS...", "SYSTEMS"); }} />
                <PushBtn label="ALGO" active={activeBtns.ALG} variant="" onClick={() => { handleBtn("ALG", "LOADING ALGO PROJECTS...", "ALGORITHMS"); }} />
                <PushBtn label="INIT" active={activeBtns.INIT} onClick={() => { handleBtn("INIT", "SYSTEM INITIALIZED"); }} />
                <PushBtn label="SYNC" active={activeBtns.SYNC} variant="blue" onClick={() => { handleBtn("SYNC", "SYNCING GITHUB..."); }} />
                <PushBtn label="CLEAR" variant="red" onClick={() => { setCrtLines(["TERMINAL CLEARED.", "> READY_"]); log("LOG CLEARED"); }} />
              </div>

              {/* PILOT LAMPS */}
              <div className="sec-label" style={{ marginTop: 10 }}>Status Indicators</div>
              <div className="lamp-grid">
                <PilotLamp label="SYS OK" color="green" lit={lamps.sysok} onClick={() => toggleLamp("sysok", "SYS OK TOGGLE")} />
                <PilotLamp label="GITHUB" color="green" lit={lamps.github} onClick={() => { toggleLamp("github", "GITHUB STATUS TOGGLE"); window.open(PROFILE.github, "_blank"); }} />
                <PilotLamp label="LINKEDIN" color="blue" lit={lamps.linkedin} onClick={() => { toggleLamp("linkedin", "LINKEDIN STATUS TOGGLE"); window.open(PROFILE.linkedin, "_blank"); }} />
                <PilotLamp label="EMAIL" color="amber" lit={lamps.email} onClick={() => { toggleLamp("email", "EMAIL STATUS TOGGLE"); window.location.href = `mailto:${PROFILE.email}`; }} />
                <PilotLamp label="NAV FIX" color="green" lit={lamps.nav} onClick={() => toggleLamp("nav", "NAV FIX TOGGLE")} />
                <PilotLamp label="ALERT" color="red" lit={lamps.warn} onClick={() => toggleLamp("warn", lamps.warn ? "ALERT: CLEARED" : "⚠ ALERT TRIGGERED")} />
              </div>
            </div>

            {/* GAUGES */}
            <div className="module">
              <div className="module-title">⬡ Performance Instruments</div>
              <div className="gauge-cluster">
                <GaugeNeedle label="JAVA" angle={gauges.hdg} color="#ffb300" valText={`${Math.round(gauges.hdg - 90)}%`} />
                <GaugeNeedle label="PY" angle={gauges.vsi} color="#ff3c3c" valText={`${Math.round(gauges.vsi - 120)}%`} />
                <GaugeNeedle label="AWS" angle={gauges.pwr} color="#39ff14" valText={`${Math.round(gauges.pwr - 90)}%`} />
              </div>
            </div>

            {/* FREQUENCY + ALT */}
            <div className="module">
              <div className="module-title">⬡ Readouts</div>
              <div className="freq-box crt-flicker">
                <div className="freq-lbl">FREQ (MHz)</div>
                <div className="freq-val">{(121.5 + dials.freq / 36).toFixed(3)}</div>
              </div>
              <div style={{ marginTop: 8 }}>
                <div className="seg-box">
                  <div className="seg-lbl">PROJ COUNT</div>
                  <div className="seg-val">000{PROJECTS.length}</div>
                </div>
              </div>
            </div>

            {/* SLIDERS — skill levels by category */}
            <div className="module">
              <div className="module-title">⬡ Skill Faders — Click to Adjust</div>
              <div className="slider-bank">
                {["LANG", "DATA", "CLOUD", "TOOLS"].map((cat, i) => (
                  <div key={cat} className="sl-unit" onClick={() => slideClick(i, cat)}>
                    <div className="sl-track-wrap">
                      <div className="sl-track">
                        <div className="sl-thumb" style={{ top: `${sliders[i]}px` }} />
                      </div>
                    </div>
                    <div className="sl-val">{Math.round(100 - (sliders[i] / 70) * 100)}%</div>
                    <div className="sl-name">{cat}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* KEY SWITCH + MORSE */}
            <div className="module">
              <div className="module-title">⬡ Authorization</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer" }} onClick={toggleKey}>
                <div style={{
                  width: 36, height: 18,
                  background: "linear-gradient(180deg,#2a2a2a,#141414)",
                  border: "1px solid #333", borderRadius: 2,
                  position: "relative", boxShadow: "inset 0 1px 3px rgba(0,0,0,.6)"
                }}>
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: 4, height: 12, background: "#111",
                    transform: "translate(-50%,-50%)", borderRadius: 1
                  }} />
                  <div style={{
                    position: "absolute", top: "50%", left: keyArmed ? 8 : 18,
                    width: 14, height: 7,
                    background: "linear-gradient(180deg,#777,#444)",
                    borderRadius: 1,
                    transform: keyArmed ? "translateY(-50%) rotate(90deg)" : "translateY(-50%)",
                    transformOrigin: "center",
                    transition: "all .2s"
                  }} />
                </div>
                <div style={{ fontSize: 9, letterSpacing: 2, color: keyArmed ? "#ff3c3c" : "#4a3000" }}>
                  {keyArmed ? "⚠ ARMED" : "LOCKED"}
                </div>
              </div>

              <div
                className={`p-btn${morseActive ? " active" : ""}`}
                style={{ width: "100%", padding: "9px 4px", letterSpacing: 3, color: morseActive ? "#ffb300" : "#4a3000", borderColor: morseActive ? "#7a5500" : "#333" }}
                onMouseDown={morsePress} onMouseUp={morseRelease}
                onTouchStart={morsePress} onTouchEnd={morseRelease}
              >
                ⬥ TRANSMIT ⬥
              </div>

              {/* NUMERIC PAD */}
              <div className="sec-label" style={{ marginTop: 10 }}>Numeric Entry — 1-6 loads project</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5 }}>
                {["7","8","9","4","5","6","1","2","3","CLR","0","ENT"].map(v => (
                  <div key={v}
                    className={`p-btn${v === "CLR" ? " red" : v === "ENT" ? " blue" : ""}`}
                    style={{ borderRadius: "50%", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
                    onClick={() => numPress(v)}>{v}</div>
                ))}
              </div>
              {numBuf && <div style={{ marginTop: 6, fontSize: 10, color: "#ffb300", letterSpacing: 2, textAlign: "center" }}>INPUT: {numBuf}_</div>}
            </div>

          </div>

          {/* ============================== BOTTOM STRIP ============================== */}
          <div className="module full-width" style={{ padding: "10px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 8, letterSpacing: 3, color: "#4a3000" }}>
                ⬡ CLASSIFIED — YAMEEN AHMED // UTD — AUTHORIZED ACCESS ONLY
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div className="status-dot dot-amber" style={{ animationDelay: ".4s" }} />
                <div style={{ fontSize: 9, letterSpacing: 2, color: "#4a3000" }}>ENCRYPTION: AES-256</div>
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <div className="amber-screen crt-flicker">
                <div className="amber-text">
                  {"UNIT 7-ALPHA // YAMEEN AHMED — UTD GRAD — yameen.ahmed@gmail.com\n"}
                  {"GITHUB: github.com/YameenZ1 — LINKEDIN: /in/yameenahmed — SEEKING OPPORTUNITIES\n"}
                  {"> "}
                  <span style={{ animation: "blink .8s step-end infinite" }}>█</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ===== FOOTER ===== */}
        <div className="t-footer">
          <div className="screw" />
          <div className="footer-stat">UNIT: <span>7-ALPHA</span> &nbsp;|&nbsp; VER: <span>4.2.1</span> &nbsp;|&nbsp; BUILD: <span>20250210</span></div>
          <div className="footer-stat">OPERATOR: <span>YAMEEN AHMED</span> &nbsp;|&nbsp; CLEARANCE: <span>DELTA</span></div>
          <div className="screw" />
        </div>

      </div>
    </>
  );
}
