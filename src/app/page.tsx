"use client";

import { useState, useEffect, useRef } from "react";
import Link from 'next/link';

const SOCIAL_APIS = [
  { name: "Twitter / X", icon: "𝕏", color: "#1DA1F2", desc: "Tweets, trends & DMs" },
  { name: "Instagram", icon: "◉", color: "#E1306C", desc: "Posts, reels & stories" },
  { name: "YouTube", icon: "▶", color: "#FF0000", desc: "Videos, shorts & analytics" },
  { name: "TikTok", icon: "♪", color: "#69C9D0", desc: "Clips, trends & profiles" },
  { name: "LinkedIn", icon: "in", color: "#0A66C2", desc: "Jobs, posts & connections" },
  { name: "Reddit", icon: "👽", color: "#FF4500", desc: "Posts, comments & karma" },
  { name: "Facebook", icon: "f", color: "#1877F2", desc: "Pages, groups & events" },
  { name: "Twitch", icon: "♟", color: "#9147FF", desc: "Streams, clips & chat" },
  { name: "Discord", icon: "◈", color: "#5865F2", desc: "Servers, channels & users" },
  { name: "Pinterest", icon: "℗", color: "#E60023", desc: "Pins, boards & trends" },
  { name: "Snapchat", icon: "👻", color: "#FFFC00", desc: "Snaps, stories & maps" },
  { name: "Spotify", icon: "♬", color: "#1DB954", desc: "Tracks, playlists & artists" },
];

const CODE_SNIPPET = `import ConnectAPI from '@connectapi/sdk';

const api = new ConnectAPI({ 
  apiKey: 'your_key_here' 
});

// Fetch from ALL platforms at once
const feed = await api.unified.getFeed({
  platforms: ['instagram', 'twitter', 'tiktok'],
  limit: 20,
});

// Post to multiple platforms simultaneously
await api.unified.post({
  content: "Hello from ConnectAPI! 🚀",
  platforms: ['twitter', 'linkedin', 'facebook'],
});`;

export default function ConnectAPILanding() {
  const [typed, setTyped] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const taglines = [
    "One API. Every Platform.",
    "All Social Media. One Key.",
    "Connect Everything. Instantly.",
  ];
  const [taglineIdx, setTaglineIdx] = useState(0);

  useEffect(() => {
    const full = taglines[taglineIdx];
    let i = 0;
    setTyped("");
    const interval = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(interval);
        setTimeout(() => setTaglineIdx((prev) => (prev + 1) % taglines.length), 2000);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [taglineIdx]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const PLANS = [
    { name: "Starter", price: "$0", desc: "Perfect to get started", features: ["5 platforms", "1,000 API calls/mo", "REST API", "Community support"], cta: "Start Free", highlight: false },
    { name: "Pro", price: "$29", desc: "For growing projects", features: ["All 12 platforms", "100K API calls/mo", "Webhooks + WebSockets", "Priority support", "Analytics dashboard"], cta: "Go Pro", highlight: true },
    { name: "Enterprise", price: "Custom", desc: "For scale & compliance", features: ["Unlimited calls", "SLA guarantee", "Dedicated infra", "SSO + SAML", "White-label option"], cta: "Contact Us", highlight: false },
  ];

  return (
    <div className="min-h-screen bg-[#030711] text-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .font-display { font-family: 'Syne', sans-serif; }
        .font-mono   { font-family: 'JetBrains Mono', monospace; }
        .font-body   { font-family: 'Outfit', sans-serif; }

        .glow-cursor {
          position: fixed;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          transform: translate(-50%, -50%);
          transition: left 0.15s ease, top 0.15s ease;
        }

        .hero-grid {
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .api-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s ease;
        }
        .api-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(99,102,241,0.3);
          transform: translateY(-4px);
        }


        .code-block {
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(99,102,241,0.2);
          position: relative;
        }
        .code-block::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent);
        }

        .nav-blur {
          background: rgba(3,7,17,0.8);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* ─── BUTTON SYSTEM ─────────────────────────────── */

        /* Solid violet — primary action */
        .btn-primary {
          background: #5b54f5;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          box-shadow: 0 1px 0 #3b35c4, inset 0 1px 0 rgba(255,255,255,0.1);
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .btn-primary:hover {
          background: #6760f6;
          box-shadow: 0 4px 18px rgba(91,84,245,0.4), 0 1px 0 #3b35c4;
          transform: translateY(-2px);
        }
        .btn-primary:active { transform: translateY(0); }

        /* Ghost — secondary action */
        .btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.12);
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.24);
          color: #fff;
          transform: translateY(-2px);
        }

        /* Nav CTA — small, pulsing */
        .btn-nav {
          background: #5b54f5;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.8125rem;
          animation: navPulse 2.4s ease-out infinite;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-nav:hover { background: #6760f6; transform: translateY(-1px); }
        @keyframes navPulse {
          0%  { box-shadow: 0 0 0 0   rgba(91,84,245,0.5); }
          70% { box-shadow: 0 0 0 10px rgba(91,84,245,0);  }
          100%{ box-shadow: 0 0 0 0   rgba(91,84,245,0);  }
        }

        /* Plan — highlighted */
        .btn-plan-primary {
          background: #5b54f5;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          box-shadow: 0 1px 0 #3b35c4;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .btn-plan-primary:hover {
          background: #6760f6;
          box-shadow: 0 6px 22px rgba(91,84,245,0.35), 0 1px 0 #3b35c4;
          transform: translateY(-2px);
        }

        /* Plan — default */
        .btn-plan-ghost {
          background: transparent;
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .btn-plan-ghost:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.85);
        }

        /* CTA banner — inverse white */
        .btn-cta {
          background: #fff;
          color: #1a1550;
          border: 1px solid rgba(255,255,255,0.9);
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          box-shadow: 0 4px 0 rgba(0,0,0,0.18), 0 10px 36px rgba(0,0,0,0.28);
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .btn-cta:hover {
          background: #eeeeff;
          box-shadow: 0 6px 0 rgba(0,0,0,0.15), 0 16px 44px rgba(91,84,245,0.22);
          transform: translateY(-3px);
        }
        .btn-cta:active { transform: translateY(0); }

        /* ─── PLAN CARD HIGHLIGHT ───────────────────────── */
        .plan-highlight {
          background: rgba(91,84,245,0.08);
          border-color: rgba(91,84,245,0.35) !important;
        }
        .plan-highlight::before {
          content: 'MOST POPULAR';
          position: absolute;
          top: -12px; left: 50%;
          transform: translateX(-50%);
          background: #5b54f5;
          color: #fff;
          padding: 2px 14px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          font-family: 'Syne', sans-serif;
          white-space: nowrap;
          box-shadow: 0 2px 10px rgba(91,84,245,0.4);
        }

        .floating {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030711; }
        ::-webkit-scrollbar-thumb { background: #1e1b4b; border-radius: 3px; }
      `}</style>

      {/* Cursor glow */}
      <div className="glow-cursor" style={{ left: mousePos.x, top: mousePos.y }} />

      {/* NAV */}
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#5b54f5] flex items-center justify-center text-sm font-black font-display shadow-md shadow-violet-900/40">C</div>
            <span className="font-display font-bold text-lg tracking-tight">ConnectAPI<span className="text-violet-400">.dev</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-body text-sm text-white/50">
            {["Platforms", "Docs", "Pricing", "Blog"].map(item => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-body text-white/60 hover:text-white transition-colors px-3 py-1.5">
              Sign in
            </Link>
            <button className="btn-nav px-4 py-2 rounded-lg">
              Get API Key →
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="hero-grid relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-mono text-xs text-violet-300">v2.0 just launched · 12 platforms supported</span>
              </div>

              <h1 className="font-display text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
                <span className="block text-white/90">All Social</span>
                <span className="block text-violet-400">Media APIs.</span>
                <span className="block text-white/90">One Place.</span>
              </h1>

              <p className="font-body text-white/50 text-xl leading-relaxed mb-6 max-w-lg">
                Stop juggling OAuth tokens and SDKs. ConnectAPI gives you a single unified REST API to read, post, and analyze across every major social platform.
              </p>

              <div className="h-8 mb-10">
                <span className="font-mono text-violet-300 text-lg">{typed}<span className="animate-pulse">|</span></span>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="btn-primary px-8 py-3.5 rounded-xl text-sm">
                  Start for free →
                </button>
                <button className="btn-ghost px-8 py-3.5 rounded-xl text-sm">
                  View Docs
                </button>
              </div>

              <div className="flex items-center gap-6 mt-10 font-body text-sm text-white/30">
                <span>✓ No credit card required</span>
                <span>✓ 1K free calls/mo</span>
                <span>✓ 2 min setup</span>
              </div>
            </div>

            {/* Code preview */}
            <div className="floating">
              <div className="code-block rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-3 font-mono text-xs text-white/30">connectapi-example.ts</span>
                </div>
                <pre className="p-6 font-mono text-sm overflow-x-auto leading-relaxed">
                  {CODE_SNIPPET.split('\n').map((line, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-white/15 select-none w-4 text-right shrink-0">{i + 1}</span>
                      <span className={
                        line.includes('//') ? 'text-white/30' :
                        line.includes("'") || line.includes('"') ? 'text-sky-300' :
                        line.includes('await') || line.includes('const') || line.includes('import') ? 'text-violet-400' :
                        'text-white/70'
                      }>{line}</span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORMS GRID */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-violet-400 text-sm mb-4 tracking-widest uppercase">Supported Platforms</p>
            <h2 className="font-display text-5xl font-bold text-white">Every platform.</h2>
            <p className="font-body text-white/40 mt-4 text-lg">All 12 major social media APIs under one unified interface.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SOCIAL_APIS.map((api, i) => (
              <div key={i} className="api-card rounded-2xl p-5 cursor-pointer group">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 font-bold"
                  style={{ background: `${api.color}15`, color: api.color }}
                >
                  {api.icon}
                </div>
                <div className="font-display font-semibold text-white/90 text-sm mb-1">{api.name}</div>
                <div className="font-body text-white/35 text-xs">{api.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <p className="font-mono text-sky-400 text-sm mb-4 tracking-widest uppercase">Why ConnectAPI</p>
            <h2 className="font-display text-5xl font-bold text-white">Built for developers<br /><span className="text-violet-400">who move fast.</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "Unified REST API", desc: "One endpoint, one auth token. Access Instagram, Twitter, TikTok and more through a single standardized interface.", accent: "#6366f1" },
              { icon: "🔄", title: "Real-time Webhooks", desc: "Get instant notifications for new posts, comments, follows and DMs across all connected platforms simultaneously.", accent: "#38bdf8" },
              { icon: "📊", title: "Unified Analytics", desc: "Cross-platform engagement metrics, reach, impressions and growth data in one consistent response schema.", accent: "#a78bfa" },
              { icon: "🔐", title: "OAuth Handled", desc: "We manage token refresh, rate limits and platform-specific auth flows so you never hit unexpected 401s.", accent: "#34d399" },
              { icon: "🌍", title: "Global Edge Network", desc: "Sub-50ms response times from 28 global PoPs. Built on bare metal with zero cold starts.", accent: "#fb923c" },
              { icon: "📖", title: "OpenAPI 3.1 Spec", desc: "Fully typed SDK for TypeScript, Python, Go and PHP. Auto-generated from our spec and always up to date.", accent: "#f472b6" },
            ].map((f, i) => (
              <div key={i} className="api-card shimmer rounded-2xl p-6 group">
                <div className="text-3xl mb-5 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${f.accent}12` }}>
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-3">{f.title}</h3>
                <p className="font-body text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-mono text-violet-400 text-sm mb-4 tracking-widest uppercase">Setup in minutes</p>
          <h2 className="font-display text-5xl font-bold text-white mb-16">
            From zero to connected<br /><span className="text-violet-400">in 3 steps.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
            {[
              { step: "01", title: "Get your API key", desc: "Sign up and grab your free API key. No credit card. No forms. Just email." },
              { step: "02", title: "Connect platforms", desc: "Use our OAuth wizard to link your social accounts in one click. We handle the rest." },
              { step: "03", title: "Start building", desc: "Use our REST API or any of our SDKs. Your first request is ready in under 2 minutes." },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="w-24 h-24 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6">
                  <span className="font-display font-black text-2xl text-violet-400">{s.step}</span>
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-3">{s.title}</h3>
                <p className="font-body text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="font-mono text-sky-400 text-sm mb-4 tracking-widest uppercase">Pricing</p>
            <h2 className="font-display text-5xl font-bold text-white">Simple. <span className="text-violet-400">Transparent.</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 border ${plan.highlight ? 'plan-highlight border-violet-500/40' : 'api-card'}`}
              >
                <div className="mb-6">
                  <h3 className="font-display font-bold text-white text-xl mb-1">{plan.name}</h3>
                  <p className="font-body text-white/40 text-sm">{plan.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="font-display text-5xl font-extrabold text-white">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="font-body text-white/30 ml-2">/month</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 font-body text-sm text-white/60">
                      <span className="text-violet-400 text-xs">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl text-sm transition-all ${plan.highlight ? 'btn-plan-primary' : 'btn-plan-ghost'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className="relative rounded-3xl overflow-hidden p-16"
            style={{ background: 'linear-gradient(135deg, rgba(91,84,245,0.16) 0%, rgba(56,189,248,0.07) 100%)', border: '1px solid rgba(91,84,245,0.22)' }}
          >
            <div className="absolute inset-0 hero-grid opacity-30" />
            <div className="relative z-10">
              <h2 className="font-display text-5xl lg:text-6xl font-extrabold text-white mb-6">
                Ready to connect<br /><span className="text-violet-400">everything?</span>
              </h2>
              <p className="font-body text-white/50 text-xl mb-10">
                Join 2,400+ developers already using ConnectAPI. Start free, scale as you grow.
              </p>
              <button className="btn-cta text-lg px-12 py-4 rounded-2xl">
                Get your free API key →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#5b54f5] flex items-center justify-center text-xs font-black font-display shadow shadow-violet-900/40">C</div>
                <span className="font-display font-bold text-base">ConnectAPI<span className="text-violet-400">.dev</span></span>
              </div>
              <p className="font-body text-white/30 text-sm leading-relaxed">The unified social media API platform for modern developers.</p>
            </div>

            {[
              { title: "Product", links: ["Platforms", "Docs", "Changelog", "Status"] },
              { title: "Company",  links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal",    links: ["Terms", "Privacy", "Security", "Cookies"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-display font-semibold text-white/60 text-xs uppercase tracking-widest mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="font-body text-white/30 text-sm hover:text-white/60 transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-white/20 text-sm">© 2025 ConnectAPI.dev · All rights reserved</p>
            <div className="flex items-center gap-2 font-mono text-xs text-white/20">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}