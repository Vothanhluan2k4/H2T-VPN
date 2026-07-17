import { useState, useEffect } from "react";
import { 
  Key, 
  Globe, 
  Check, 
  ArrowUpRight, 
  List, 
  X, 
  CaretDown, 
  Speedometer, 
  Lock, 
  Circle,
  Clock,
  ArrowRight,
  Sparkle,
  Sun,
  Moon
} from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

import VpnShield3D from "./components/VpnShield3D";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";

// Mock Data for the Top VPNs of 2026
interface VpnProvider {
  rank: number;
  name: string;
  logo: string;
  slug: string;
  rating: number;
  speed: string;
  servers: string;
  countries: number;
  devices: string;
  price: string;
  period: string;
  features: string[];
  pros: string[];
  ctaUrl: string;
  badge?: string;
  highlightColor: string;
}

const VPN_PROVIDERS: VpnProvider[] = [
  {
    rank: 1,
    name: "NordVPN",
    logo: "https://cdn.simpleicons.org/nordvpn/ffffff",
    slug: "nordvpn",
    rating: 9.8,
    speed: "97.4 Mbps (Avg)",
    servers: "6,400+",
    countries: 111,
    devices: "10 devices",
    price: "$3.09",
    period: "month",
    features: ["Double VPN encryption", "Threat Protection Pro (Adblock)", "Strict Zero-Logs Policy audited by PwC"],
    pros: ["Best-in-class security", "Extremely fast NordLynx protocol", "Meshnet private network sharing"],
    ctaUrl: "https://nordvpn.com",
    badge: "Editors Choice 2026",
    highlightColor: "#10b981", // Emerald accent
  },
  {
    rank: 2,
    name: "ExpressVPN",
    logo: "https://cdn.simpleicons.org/expressvpn/ffffff",
    slug: "expressvpn",
    rating: 9.5,
    speed: "94.8 Mbps (Avg)",
    servers: "3,000+",
    countries: 105,
    devices: "8 devices",
    price: "$6.67",
    period: "month",
    features: ["Proprietary Lightway protocol", "TrustedServer RAM-only infrastructure", "Aircove router integration"],
    pros: ["Ultra-reliable streaming unblocking", "24/7 world-class support", "Excellent router application"],
    ctaUrl: "https://expressvpn.com",
    highlightColor: "#3b82f6", // Royal Blue accent
  },
  {
    rank: 3,
    name: "Surfshark",
    logo: "https://cdn.simpleicons.org/surfshark/ffffff",
    slug: "surfshark",
    rating: 9.3,
    speed: "92.1 Mbps (Avg)",
    servers: "3,200+",
    countries: 100,
    devices: "Unlimited",
    price: "$2.19",
    period: "month",
    features: ["Unlimited simultaneous connections", "CleanWeb 2.0 blocker", "Alternative ID generator"],
    pros: ["Outstanding value proposition", "No connection limits", "GPS spoofing on Android"],
    ctaUrl: "https://surfshark.com",
    badge: "Best Value Option",
    highlightColor: "#06b6d4", // Cyan accent
  }
];

interface NodeLocation {
  id: string;
  name: string;
  ping: number;
  speed: number;
  ip: string;
  x: number;
  y: number;
}

const SIMULATOR_NODES: NodeLocation[] = [
  { id: "us", name: "New York, USA", ping: 12, speed: 948, ip: "185.220.101.4", x: 30, y: 40 },
  { id: "uk", name: "London, UK", ping: 24, speed: 912, ip: "194.35.233.18", x: 50, y: 30 },
  { id: "sg", name: "Singapore", ping: 84, speed: 876, ip: "103.245.77.2", x: 75, y: 65 },
  { id: "jp", name: "Tokyo, Japan", ping: 112, speed: 855, ip: "210.140.10.85", x: 85, y: 35 }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"security" | "speed" | "privacy">("security");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Theme Switching State
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Simple State-Based Router for multi-page view
  const [view, setView] = useState<"home" | "terms" | "privacy">("home");

  // Scroll to top on view change
  const navigateTo = (newView: "home" | "terms" | "privacy") => {
    setView(newView);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Nav link handler that returns to home and scrolls to target hash if currently on another view
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (view !== "home") {
      e.preventDefault();
      navigateTo("home");
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  };

  // VPN Connection Simulator State
  const [connectionState, setConnectionState] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [selectedNode, setSelectedNode] = useState<NodeLocation>(SIMULATOR_NODES[0]);
  const [simulatedPing, setSimulatedPing] = useState(0);
  const [simulatedSpeed, setSimulatedSpeed] = useState(0);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Newsletter Signup State & Submission Simulation
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterStatus("error");
      return;
    }
    setNewsletterStatus("loading");
    setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterEmail("");
    }, 1200);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync theme state with DOM element class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // GSAP 3D Scroll Parallax & Mouse Hover Effect for the Hero Shield Card
  useEffect(() => {
    const trigger = document.getElementById("hero-3d-trigger");
    const card = document.getElementById("hero-3d-card");
    const bgImg = document.getElementById("hero-3d-bg-img");
    const hud1 = document.getElementById("hero-3d-hud-1");
    const hud2 = document.getElementById("hero-3d-hud-2");

    if (!card || !trigger) return;

    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      // 1. ScrollTrigger drives the PARENT trigger container translation
      gsap.to(trigger, {
        y: isDesktop ? 60 : 20,
        rotateX: isDesktop ? -8 : -2,
        scrollTrigger: {
          trigger: "header",
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });

      // 2. Mouse Move drives the CHILD card container (Desktop Only)
      if (isDesktop) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Max rotation degrees
          const rotateY = ((x / rect.width) - 0.5) * 35; // Tilt left-right
          const rotateX = (0.5 - (y / rect.height)) * 35; // Tilt up-down

          gsap.to(card, {
            rotateY: rotateY,
            rotateX: rotateX,
            scale: 1.08,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
          });

          // Background image tilts opposite slightly for deep depth
          if (bgImg) {
            gsap.to(bgImg, {
              x: ((x / rect.width) - 0.5) * -18,
              y: ((y / rect.height) - 0.5) * -18,
              z: -50,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto"
            });
          }

          // HUDs push forward towards the cursor
          if (hud1) {
            gsap.to(hud1, {
              x: ((x / rect.width) - 0.5) * 20,
              y: ((y / rect.height) - 0.5) * 20,
              z: 55,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto"
            });
          }

          if (hud2) {
            gsap.to(hud2, {
              x: ((x / rect.width) - 0.5) * 25,
              y: ((y / rect.height) - 0.5) * 25,
              z: 60,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        };

        const handleMouseLeave = () => {
          // Revert child card rotation back to neutral
          gsap.to(card, {
            rotateY: -12,
            rotateX: 8,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto"
          });

          if (bgImg) {
            gsap.to(bgImg, {
              x: 0,
              y: 0,
              z: -40,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto"
            });
          }

          if (hud1) {
            gsap.to(hud1, {
              x: 0,
              y: 0,
              z: 40,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto"
            });
          }

          if (hud2) {
            gsap.to(hud2, {
              x: 0,
              y: 0,
              z: 45,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        // Cleanup listener on unmount
        return () => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const startVpnSimulation = (node: NodeLocation) => {
    if (connectionState === "connecting") return;
    
    setSelectedNode(node);
    setConnectionState("connecting");
    setSimulatedProgress(0);
    setSimulatedSpeed(0);
    setSimulatedPing(0);

    const duration = 1500;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      setSimulatedProgress(progress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setConnectionState("connected");
        // Animate count up for speed and ping
        setSimulatedPing(node.ping);
        // Add slight random variance to make it look alive
        setSimulatedSpeed(Math.floor(node.speed - 20 + Math.random() * 40));
      }
    }, intervalTime);
  };

  const disconnectVpn = () => {
    setConnectionState("disconnected");
    setSimulatedProgress(0);
    setSimulatedSpeed(0);
    setSimulatedPing(0);
  };

  // Calculator coordinates for the curved map trajectory path
  const mapStartX = 12;
  const mapStartY = 82;
  const mapCtrlX = (mapStartX + selectedNode.x) / 2;
  const mapCtrlY = (mapStartY + selectedNode.y) / 2 - 12;

  return (
    <div className="relative min-h-[100dvh] bg-bg-theme text-text-theme selection:bg-[#10b981]/30 selection:text-[#10b981]">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Floating Island Navigation */}
      <nav className="fixed top-6 inset-x-0 z-50 mx-auto w-[90%] max-w-5xl rounded-full border border-border-theme bg-glass-theme px-6 py-3 backdrop-blur-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          
          {/* Rebranded Logo: HV Network Node Shield */}
          <button 
            type="button"
            onClick={() => navigateTo("home")}
            className="flex items-center gap-3 cursor-pointer border-none bg-transparent outline-none focus:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card-theme border border-border-theme p-1.5 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              {/* Custom Self-Designed VPN Link Logo */}
              <svg className="h-full w-full" viewBox="0 0 100 100" fill="none">
                {/* Outer Shield Outline */}
                <path 
                  d="M50 10 C68 10 82 18 82 45 C82 68 50 88 50 88 C50 88 18 68 18 45 C18 18 32 10 50 10 Z" 
                  stroke="url(#shield-grad)" 
                  strokeWidth="8" 
                  strokeLinejoin="round" 
                  fill="none"
                />
                {/* Connection Line */}
                <path 
                  d="M36 40 C 36 54, 64 46, 64 60" 
                  stroke="url(#link-grad)" 
                  strokeWidth="7" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                {/* Client Node */}
                <circle cx="36" cy="40" r="8" stroke="#10b981" strokeWidth="4" fill="currentColor" className="text-bg-theme" />
                {/* Server Node */}
                <circle cx="64" cy="60" r="8" stroke="#06b6d4" strokeWidth="4" fill="currentColor" className="text-bg-theme" />
                {/* Glowing Core */}
                <circle cx="50" cy="50" r="4.5" fill="#10b981" />
                
                <defs>
                  <linearGradient id="shield-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="link-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-text-theme">
              H2T <span className="text-[#10b981]">VPN</span>
            </span>
          </button>
 
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#vpn-rankings" 
              onClick={(e) => handleNavLinkClick(e, "vpn-rankings")}
              className="text-sm font-medium text-text-muted-theme hover:text-text-theme transition-colors duration-200"
            >
              Rankings
            </a>
            <a 
              href="#vpn-simulator" 
              onClick={(e) => handleNavLinkClick(e, "vpn-simulator")}
              className="text-sm font-medium text-text-muted-theme hover:text-text-theme transition-colors duration-200"
            >
              Speed Simulator
            </a>
            <a 
              href="#vpn-features" 
              onClick={(e) => handleNavLinkClick(e, "vpn-features")}
              className="text-sm font-medium text-text-muted-theme hover:text-text-theme transition-colors duration-200"
            >
              Key Features
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleNavLinkClick(e, "faq")}
              className="text-sm font-medium text-text-muted-theme hover:text-text-theme transition-colors duration-200"
            >
              FAQ
            </a>
          </div>

          {/* Theme Switch & Deal Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-theme bg-card-theme hover:bg-card-elevated-theme text-text-theme transition-all duration-300 active:scale-95"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-[#10b981]" weight="bold" /> : <Moon className="h-4.5 w-4.5 text-[#059669]" weight="bold" />}
            </button>

            <a 
              href="#vpn-rankings" 
              className="inline-flex items-center gap-2 rounded-full bg-[#10b981] px-5 py-2 text-sm font-semibold text-black hover:bg-[#34d399] transition-all duration-300 active:scale-[0.98]"
            >
              Compare Deals
              <ArrowUpRight className="h-4 w-4" weight="bold" />
            </a>
          </div>

          {/* Mobile Actions (Hamburger & Theme Toggle) */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-theme bg-card-theme text-text-theme"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-[#10b981]" /> : <Moon className="h-4.5 w-4.5 text-[#059669]" />}
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-theme bg-card-theme"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 inset-x-0 mx-auto w-full rounded-3xl border border-border-theme bg-card-theme/95 p-6 backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-5">
              <a 
                href="#vpn-rankings" 
                onClick={(e) => handleNavLinkClick(e, "vpn-rankings")}
                className="text-base font-medium text-text-muted-theme hover:text-text-theme transition-colors"
              >
                VPN Rankings
              </a>
              <a 
                href="#vpn-simulator" 
                onClick={(e) => handleNavLinkClick(e, "vpn-simulator")}
                className="text-base font-medium text-text-muted-theme hover:text-text-theme transition-colors"
              >
                Speed Simulator
              </a>
              <a 
                href="#vpn-features" 
                onClick={(e) => handleNavLinkClick(e, "vpn-features")}
                className="text-base font-medium text-text-muted-theme hover:text-text-theme transition-colors"
              >
                Key Features
              </a>
              <a 
                href="#faq" 
                onClick={(e) => handleNavLinkClick(e, "faq")}
                className="text-base font-medium text-text-muted-theme hover:text-text-theme transition-colors"
              >
                FAQ
              </a>
              <hr className="border-border-theme my-1" />
              <a 
                href="#vpn-rankings"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#10b981] py-3 text-sm font-semibold text-black"
              >
                Compare Deals
                <ArrowUpRight className="h-4 w-4" weight="bold" />
              </a>
            </div>
          </div>
        )}
      </nav>

      {view === "home" && (
        <>
          {/* Hero Section */}
      <header className="relative pt-36 pb-20 px-6 md:pt-48 md:pb-28 overflow-hidden max-w-7xl mx-auto">
        {/* Glow Spheres (Radial Gradients) */}
        <div className="absolute top-[20%] left-[-10%] h-[350px] w-[350px] rounded-full bg-[#10b981]/10 blur-[120px] pointer-events-none" style={{ opacity: "var(--glow-opacity)" }} />
        <div className="absolute top-[30%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[#06b6d4]/10 blur-[130px] pointer-events-none" style={{ opacity: "var(--glow-opacity)" }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Micro Badge / Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#10b981]/20 bg-[#10b981]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-[#10b981]">
              <Sparkle className="h-3.5 w-3.5 animate-pulse" weight="fill" />
              Verified Review Guide | 2026 Edition
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-text-theme mb-6">
              The Privacy Layer <br />
              <span className="gradient-text-green">For a Borderless Web</span>
            </h1>

            {/* Mobile/Tablet 3D Shield Core (Centered right below title) */}
            <div className="lg:hidden w-full flex justify-center my-6">
              <div 
                className="relative w-full max-w-[300px] aspect-square rounded-[2rem] transform-style-3d overflow-visible cursor-pointer"
                style={{ transform: "rotateX(8deg) rotateY(-12deg)", willChange: "transform" }}
              >
                <div className="relative h-full w-full flex items-center justify-center transform-style-3d">
                  <div className="absolute inset-0 z-0 transform-style-3d flex items-center justify-center">
                    {isMobile && <VpnShield3D theme={theme} />}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-text-muted-theme leading-relaxed max-w-[60ch] mb-8">
              Explore the independent performance and audit results of the top VPN providers in 2026. Protect your identity with protocols designed for next generation speed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <a 
                href="#vpn-rankings" 
                className="inline-flex items-center justify-center gap-2 rounded-full bg-card-theme border border-border-theme text-text-theme px-7 py-3.5 text-sm font-semibold hover:bg-card-elevated-theme transition-all duration-300 active:scale-[0.98] group"
              >
                Explore Rankings
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-card-elevated-theme group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                  <ArrowRight className="h-3 w-3 text-text-theme" weight="bold" />
                </div>
              </a>
              <a 
                href="#vpn-simulator" 
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-theme bg-card-theme hover:bg-card-elevated-theme px-7 py-3.5 text-sm font-semibold text-text-theme transition-all duration-300 active:scale-[0.98]"
              >
                Test Speeds
              </a>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border-theme w-full">
              <div className="flex items-center gap-2 text-xs text-text-muted-theme">
                <Check className="h-4 w-4 text-[#10b981]" weight="bold" />
                No Sponsored Bias
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted-theme">
                <Check className="h-4 w-4 text-[#10b981]" weight="bold" />
                PwC Log Audited Results
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted-theme">
                <Check className="h-4 w-4 text-[#10b981]" weight="bold" />
                Realtime WireGuard Benchmarks
              </div>
            </div>
          </div>

          {/* Hero Visual Asset (Double-Bezel 3D Nested Wrapper) - Desktop Only */}
          <div id="hero-3d-trigger" className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end perspective-1200">
            <div 
              id="hero-3d-card"
              className="relative w-full max-w-[500px] aspect-square rounded-[2.5rem] transform-style-3d overflow-visible cursor-pointer"
              style={{ transform: "rotateX(8deg) rotateY(-12deg)", willChange: "transform" }}
            >
              <div className="relative h-full w-full flex items-center justify-center transform-style-3d">
                {/* 1. Interactive 3D Three.js Particle Shield Core with Z-depth */}
                <div 
                  id="hero-3d-bg-img"
                  className="absolute inset-0 z-0 transform-style-3d flex items-center justify-center"
                  style={{ transform: "translateZ(-40px)", willChange: "transform" }}
                >
                  {!isMobile && <VpnShield3D theme={theme} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust & Verification Strip (Infinite Scrolling Marquee) */}
      <section className="py-10 bg-card-elevated-theme border-y border-border-theme overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] uppercase tracking-[0.25em] text-text-muted-theme mb-8 font-mono">
            Audited & Certified by Independent Authorities
          </p>
          
          <div className="relative flex overflow-x-hidden w-full mask-image-marquee">
            {/* Track 1 */}
            <div className="flex gap-16 md:gap-28 shrink-0 items-center animate-marquee opacity-60 grayscale dark:invert-0 invert-70 pr-16 md:pr-28">
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">DELOITTE</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">PWC LOGS</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">CURE53</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">AVTEST</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">KPMG AUDITED</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">EY SECURITY</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">ISO 27001</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">WIREGUARD</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">OWASP SECURE</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">GDPR COMPLIANT</span>
            </div>

            {/* Track 2 (Duplicate for Seamless Loop) */}
            <div className="flex gap-16 md:gap-28 shrink-0 items-center animate-marquee opacity-60 grayscale dark:invert-0 invert-70 pr-16 md:pr-28" aria-hidden="true">
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">DELOITTE</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">PWC LOGS</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">CURE53</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">AVTEST</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">KPMG AUDITED</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">EY SECURITY</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">ISO 27001</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">WIREGUARD</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">OWASP SECURE</span>
              <span className="font-display font-semibold text-base text-text-theme tracking-widest">GDPR COMPLIANT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 VPN Rankings Section */}
      <section id="vpn-rankings" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#10b981]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-[#10b981] mb-4">
            Security Assessment Matrix
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-text-theme mb-4">
            Best VPN Providers of 2026
          </h2>
          <p className="text-text-muted-theme">
            Unbiased review rankings compiled from real-time speed benchmarking, encryption protocol checks, and zero-knowledge audits.
          </p>
        </div>

        {/* Bento Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Rank #1: NordVPN (Large Double-Bezel Card, spans 7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-[2.5rem] border border-border-theme bg-card-theme p-2.5 shadow-2xl relative overflow-hidden group">
            {/* Emerald glow flare */}
            <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#10b981]/15 blur-[60px] pointer-events-none" style={{ opacity: "var(--glow-opacity)" }} />
            
            <div className="h-full w-full rounded-[calc(2.5rem-0.625rem)] bg-card-theme/90 border border-border-theme p-6 md:p-8 flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card-elevated-theme border border-border-theme p-2.5">
                      <img src={VPN_PROVIDERS[0].logo} alt="NordVPN logo" className="h-full w-full object-contain theme-logo-img" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-xl font-bold text-text-theme">{VPN_PROVIDERS[0].name}</h3>
                        <span className="rounded-full bg-[#10b981]/10 border border-[#10b981]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[#10b981]">
                          {VPN_PROVIDERS[0].badge}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted-theme">Rank #1 Best Overall VPN</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-display text-2xl font-black text-[#10b981]">{VPN_PROVIDERS[0].rating}</span>
                    <span className="text-xs text-text-muted-theme block">Expert Score</span>
                  </div>
                </div>

                <p className="text-text-muted-theme text-sm mb-6 leading-relaxed">
                  NordVPN continues to dominate the privacy sector in 2026. The custom NordLynx protocol achieves near lossless speeds while maintaining quantum-resistant cryptography.
                </p>

                {/* Specs List */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 border-y border-border-theme py-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-text-muted-theme font-mono">Speed Metric</span>
                    <p className="text-sm font-semibold text-text-theme mt-1">{VPN_PROVIDERS[0].speed}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-text-muted-theme font-mono">Active Nodes</span>
                    <p className="text-sm font-semibold text-text-theme mt-1">{VPN_PROVIDERS[0].servers}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-text-muted-theme font-mono">Regions</span>
                    <p className="text-sm font-semibold text-text-theme mt-1">{VPN_PROVIDERS[0].countries} countries</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-text-muted-theme font-mono">Simul-Devices</span>
                    <p className="text-sm font-semibold text-text-theme mt-1">{VPN_PROVIDERS[0].devices}</p>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted-theme">Security Standards</h4>
                  {VPN_PROVIDERS[0].features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981]/15 text-[#10b981]">
                        <Check className="h-2.5 w-2.5" weight="bold" />
                      </div>
                      <span className="text-xs text-text-theme">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Block */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-border-theme mt-auto">
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-xs text-text-muted-theme">2-Year Plan Special</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-text-theme">{VPN_PROVIDERS[0].price}</span>
                    <span className="text-xs text-text-muted-theme">/ {VPN_PROVIDERS[0].period}</span>
                  </div>
                </div>
                
                <a 
                  href={VPN_PROVIDERS[0].ctaUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#10b981] px-6 py-3.5 text-sm font-semibold text-black hover:bg-[#34d399] transition-all duration-300 active:scale-[0.98] group"
                >
                  Get NordVPN Deals
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black/5 group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                    <ArrowUpRight className="h-3 w-3 text-black" weight="bold" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right side stack: Rank 2 and Rank 3 cards (Spans 5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Rank #2: ExpressVPN */}
            <div className="rounded-[2rem] border border-border-theme bg-card-theme p-2 relative overflow-hidden group">
              {/* Blue glow flare */}
              <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[#3b82f6]/10 blur-[40px] pointer-events-none" style={{ opacity: "var(--glow-opacity)" }} />
              
              <div className="h-full w-full rounded-[calc(2rem-0.5rem)] bg-card-theme border border-border-theme p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-card-elevated-theme border border-border-theme p-2">
                        <img src={VPN_PROVIDERS[1].logo} alt="ExpressVPN logo" className="h-full w-full object-contain theme-logo-img" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold text-text-theme">{VPN_PROVIDERS[1].name}</h3>
                        <p className="text-[10px] text-text-muted-theme">Rank #2 Premium Speed</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-display text-lg font-bold text-[#3b82f6]">{VPN_PROVIDERS[1].rating}</span>
                      <span className="text-[10px] text-text-muted-theme block">Score</span>
                    </div>
                  </div>

                  <p className="text-xs text-text-muted-theme leading-relaxed mb-6">
                    A premium option known for pristine stability. RAM-only servers erase connection history on every reboot cycle.
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-6 border-y border-border-theme py-3">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-text-muted-theme font-mono block">Avg Speed</span>
                      <span className="text-xs font-semibold text-text-theme mt-0.5">{VPN_PROVIDERS[1].speed}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-text-muted-theme font-mono block">Countries</span>
                      <span className="text-xs font-semibold text-text-theme mt-0.5">{VPN_PROVIDERS[1].countries}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-text-muted-theme font-mono block">Pricing</span>
                      <span className="text-xs font-semibold text-text-theme mt-0.5">{VPN_PROVIDERS[1].price}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-auto">
                  <span className="text-xs text-[#3b82f6] font-medium">RAM-only Architecture</span>
                  <a 
                    href={VPN_PROVIDERS[1].ctaUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-full bg-card-elevated-theme border border-border-theme px-4 py-2 text-xs font-semibold text-text-theme hover:bg-card-theme transition-all duration-300"
                  >
                    Get Deal
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Rank #3: Surfshark */}
            <div className="rounded-[2rem] border border-border-theme bg-card-theme p-2 relative overflow-hidden group">
              {/* Cyan glow flare */}
              <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[#06b6d4]/10 blur-[40px] pointer-events-none" style={{ opacity: "var(--glow-opacity)" }} />
              
              <div className="h-full w-full rounded-[calc(2rem-0.5rem)] bg-card-theme border border-border-theme p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-card-elevated-theme border border-border-theme p-2">
                        <img src={VPN_PROVIDERS[2].logo} alt="Surfshark logo" className="h-full w-full object-contain theme-logo-img" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-display text-base font-bold text-text-theme">{VPN_PROVIDERS[2].name}</h3>
                          <span className="rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/20 px-2 py-0.5 text-[8px] font-semibold text-[#06b6d4]">
                            Best Value
                          </span>
                        </div>
                        <p className="text-[10px] text-text-muted-theme">Rank #3 Unlimited Connections</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-display text-lg font-bold text-[#06b6d4]">{VPN_PROVIDERS[2].rating}</span>
                      <span className="text-[10px] text-text-muted-theme block">Score</span>
                    </div>
                  </div>

                  <p className="text-xs text-text-muted-theme leading-relaxed mb-6">
                    Perfect for families or households with many hardware devices. Share a single account across infinite connections.
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-6 border-y border-border-theme py-3">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-text-muted-theme font-mono block">Devices</span>
                      <span className="text-xs font-semibold text-text-theme mt-0.5">{VPN_PROVIDERS[2].devices}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-text-muted-theme font-mono block">Countries</span>
                      <span className="text-xs font-semibold text-text-theme mt-0.5">{VPN_PROVIDERS[2].countries}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-text-muted-theme font-mono block">Pricing</span>
                      <span className="text-xs font-semibold text-[#06b6d4] mt-0.5 font-bold">{VPN_PROVIDERS[2].price}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-auto">
                  <span className="text-xs text-[#06b6d4] font-medium">Unlimited Devices</span>
                  <a 
                    href={VPN_PROVIDERS[2].ctaUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-full bg-card-elevated-theme border border-border-theme px-4 py-2 text-xs font-semibold text-text-theme hover:bg-card-theme transition-all duration-300"
                  >
                    Get Deal
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive VPN Node Speed Simulator Section */}
      <section id="vpn-simulator" className="py-24 px-6 bg-card-elevated-theme border-y border-border-theme overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text info (Spans 5 columns) */}
            <div className="lg:col-span-5 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#10b981]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-[#10b981] mb-4">
                Interactive Benchmarking
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-text-theme mb-6">
                Simulate Node Latency & WireGuard Speeds
              </h2>
              <p className="text-text-muted-theme text-sm leading-relaxed mb-6">
                Choose a regional server to test local network simulation. See how protocol overhead impacts packet transit speeds compared to raw connections in 2026.
              </p>

              <div className="space-y-4">
                <span className="text-xs uppercase tracking-wider text-text-muted-theme font-mono block">Select Regional Server</span>
                <div className="grid grid-cols-2 gap-3">
                  {SIMULATOR_NODES.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => startVpnSimulation(node)}
                      className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-300 ${
                        selectedNode.id === node.id && connectionState !== "disconnected"
                          ? "border-[#10b981] bg-[#10b981]/5"
                          : "border-border-theme bg-card-theme hover:border-text-muted-theme"
                      }`}
                    >
                      <span className="text-sm font-semibold text-text-theme">{node.name}</span>
                      <span className="text-xs text-text-muted-theme font-mono mt-1">Ping: {node.ping} ms</span>
                    </button>
                  ))}
                </div>
              </div>

              {connectionState === "connected" && (
                <button
                  onClick={disconnectVpn}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-xs font-semibold text-red-500 dark:text-red-400 hover:bg-red-500/20 transition-all duration-300"
                >
                  <Circle className="h-2.5 w-2.5 fill-red-500 dark:fill-red-400" />
                  Terminate Connection
                </button>
              )}
            </div>

            {/* Right side Simulator Display (Spans 7 columns) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-[580px] rounded-[2.5rem] border border-border-theme bg-bg-theme p-3.5 shadow-2xl relative">
                {/* Simulator UI */}
                <div className="w-full rounded-[calc(2.5rem-0.875rem)] bg-card-theme border border-border-theme p-6 font-mono text-left text-xs text-text-muted-theme relative overflow-hidden">
                  
                  {/* Glowing core background */}
                  <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[300px] w-[300px] rounded-full bg-[#10b981]/5 blur-[80px] pointer-events-none" />

                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border-theme mb-6">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                      <span className="text-[10px] text-text-muted-theme/60 ml-2">H2T BENCHMARK v2.6</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        connectionState === "connected" ? "bg-[#10b981]" : connectionState === "connecting" ? "bg-yellow-500 animate-ping" : "bg-red-500"
                      }`} />
                      <span className="text-[10px] uppercase font-bold text-text-muted-theme">
                        {connectionState === "connected" ? "CONNECTED" : connectionState === "connecting" ? "CONNECTING" : "SECURE DISCONNECTED"}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Simulation Terminal Log */}
                  <div className="space-y-4 mb-8 min-h-[140px] flex flex-col justify-end">
                    {connectionState === "disconnected" && (
                      <div className="text-text-muted-theme/70 space-y-1">
                        <p>&gt; System idle. Waiting for target authorization...</p>
                        <p>&gt; Click any server node on the left to initialize tunneling.</p>
                      </div>
                    )}

                    {connectionState === "connecting" && (
                      <div className="space-y-1 text-yellow-600 dark:text-yellow-500">
                        <p>&gt; Handshake protocol initialized via WireGuard 2.0</p>
                        <p>&gt; Establishing cryptographic tunnel to {selectedNode.name}</p>
                        <p>&gt; Allocating virtual interface IP: {selectedNode.ip}</p>
                        <p className="animate-pulse">&gt; Loading tunnel parameters... {Math.floor(simulatedProgress)}%</p>
                      </div>
                    )}

                    {connectionState === "connected" && (
                      <div className="space-y-1.5 text-text-theme">
                        <p className="text-[#10b981] font-bold">&gt; Cryptographic connection established.</p>
                        <p>&gt; Tunnel node: <span className="text-text-theme font-bold">{selectedNode.name}</span> ({selectedNode.ip})</p>
                        <p>&gt; Cipher spec: ChaCha20-Poly1305 quantum-resistant payload</p>
                        <p>&gt; Route metric optimization complete.</p>
                      </div>
                    )}
                  </div>

                  {/* Network Map / SVG Graph */}
                  <div className="relative h-[200px] w-full rounded-2xl border border-border-theme bg-bg-theme/40 overflow-hidden mb-6 flex items-center justify-center select-none group/map">
                    
                    {/* Cyber Grid Coordinates / OS Labels at corners */}
                    <div className="absolute top-2.5 left-3 text-[6px] font-mono text-text-muted-theme/40 tracking-widest pointer-events-none">
                      SYS_LOC: [34.72, -112.04]
                    </div>
                    <div className="absolute top-2.5 right-3 text-[6px] font-mono text-text-muted-theme/40 tracking-widest pointer-events-none flex items-center gap-1">
                      <span className={`h-1 w-1 rounded-full ${connectionState === "connected" ? "bg-[#10b981] animate-pulse" : "bg-red-500"}`} />
                      NODE_SEC: {connectionState === "connected" ? "ACTIVE" : "OFFLINE"}
                    </div>
                    <div className="absolute bottom-2.5 left-3 text-[6px] font-mono text-text-muted-theme/40 tracking-widest pointer-events-none">
                      LAT_SCALE: 1:1
                    </div>
                    <div className="absolute bottom-2.5 right-3 text-[6px] font-mono text-text-muted-theme/40 tracking-widest pointer-events-none">
                      GRID_UNIT: 20px
                    </div>

                    {/* Technical Grid Overlay */}
                    <svg className="absolute inset-0 h-full w-full opacity-[0.15] dark:opacity-[0.25] pointer-events-none">
                      <defs>
                        <pattern id="cyber-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#cyber-grid)" />
                    </svg>

                    {/* Nodes map visualization */}
                    <div className="absolute inset-0">
                      {/* Connection Line & Cyber flow in SVG */}
                      {connectionState !== "disconnected" && (
                        <svg className="absolute inset-0 h-full w-full pointer-events-none z-10">
                          {/* Thick glowing underlayer path */}
                          <path
                            d={`M ${mapStartX}% ${mapStartY}% Q ${mapCtrlX}% ${mapCtrlY}% ${selectedNode.x}% ${selectedNode.y}%`}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            strokeOpacity="0.18"
                            strokeLinecap="round"
                          />
                          {/* Animated cyber flow laser path */}
                          <path
                            d={`M ${mapStartX}% ${mapStartY}% Q ${mapCtrlX}% ${mapCtrlY}% ${selectedNode.x}% ${selectedNode.y}%`}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="animate-cyber-flow"
                          />
                        </svg>
                      )}

                      {/* Home Node ("YOU") */}
                      <div className="absolute left-[12%] top-[82%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                        {/* Outer radar pulse ring */}
                        <div className="absolute h-8 w-8 rounded-full border border-[#10b981]/30 bg-[#10b981]/5 animate-radar-pulse pointer-events-none" />
                        
                        {/* Core dot wrapper */}
                        <div className="h-5 w-5 rounded-full bg-card-theme border border-[#10b981] flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all duration-300">
                          <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                        </div>
                        
                        {/* Home label */}
                        <span className="text-[7px] text-[#10b981] mt-1.5 font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20">
                          YOU
                        </span>
                      </div>

                      {/* Server Destination Nodes */}
                      {SIMULATOR_NODES.map((node) => {
                        const isSelected = selectedNode.id === node.id && connectionState !== "disconnected";
                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => startVpnSimulation(node)}
                            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group cursor-pointer border-none bg-transparent outline-none focus:outline-none"
                            style={{ left: `${node.x}%`, top: `${node.y}%` }}
                          >
                            {/* Dynamic target ring on selected node */}
                            {isSelected && (
                              <div className="absolute h-8 w-8 rounded-full border border-[#10b981]/40 bg-[#10b981]/5 animate-radar-pulse pointer-events-none" />
                            )}
                            
                            {/* Server node target dot */}
                            <div className={`h-4.5 w-4.5 rounded-full border bg-card-theme/90 flex items-center justify-center transition-all duration-300 ${
                              isSelected 
                                ? "border-[#10b981] scale-110 shadow-[0_0_14px_rgba(16,185,129,0.4)]" 
                                : "border-border-theme group-hover:border-text-theme/40 group-hover:scale-105"
                            }`}>
                              <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                isSelected 
                                  ? "bg-[#10b981]" 
                                  : "bg-text-muted-theme/40 group-hover:bg-text-theme/70"
                              }`} />
                            </div>
                            
                            {/* Server label tag */}
                            <span className={`text-[7px] mt-1.5 font-mono tracking-wider px-1.5 py-0.5 rounded-md transition-all duration-300 ${
                              isSelected
                                ? "text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 font-bold"
                                : "text-text-muted-theme bg-card-theme/50 border border-border-theme group-hover:text-text-theme group-hover:bg-card-elevated-theme"
                            }`}>
                              {node.id.toUpperCase()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Real-time stats block */}
                  <div className="grid grid-cols-3 gap-4 border-t border-border-theme pt-6">
                    <div>
                      <span className="text-[10px] text-text-muted-theme flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        LATENCY PING
                      </span>
                      <p className="text-xl font-bold text-text-theme mt-1">
                        {simulatedPing > 0 ? `${simulatedPing} ms` : "0 ms"}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted-theme flex items-center gap-1.5">
                        <Speedometer className="h-3 w-3" />
                        TUNNEL SPEED
                      </span>
                      <p className="text-xl font-bold text-[#10b981] mt-1">
                        {simulatedSpeed > 0 ? `${simulatedSpeed} Mbps` : "0 Mbps"}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted-theme flex items-center gap-1.5">
                        <Lock className="h-3 w-3" />
                        SECURITY
                      </span>
                      <p className="text-xl font-bold text-text-theme mt-1">
                        {connectionState === "connected" ? "SECURED" : "NONE"}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Feature Deep-Dive Section */}
      <section id="vpn-features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#10b981]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-[#10b981] mb-4">
            Technical Architectures
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-text-theme mb-4">
            Security Features Built for 2026
          </h2>
          <p className="text-text-muted-theme">
            Compare essential safety infrastructure parameters. Protect yourself from rising geo-restrictions and advanced ISP inspection.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full border border-border-theme bg-card-theme p-1.5">
            <button
              onClick={() => setActiveTab("security")}
              className={`rounded-full px-6 py-2.5 text-xs font-semibold transition-all duration-300 ${
                activeTab === "security" ? "bg-[#10b981] text-black" : "text-text-muted-theme hover:text-text-theme"
              }`}
            >
              Encryption Standards
            </button>
            <button
              onClick={() => setActiveTab("speed")}
              className={`rounded-full px-6 py-2.5 text-xs font-semibold transition-all duration-300 ${
                activeTab === "speed" ? "bg-[#10b981] text-black" : "text-text-muted-theme hover:text-text-theme"
              }`}
            >
              Protocol Performance
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`rounded-full px-6 py-2.5 text-xs font-semibold transition-all duration-300 ${
                activeTab === "privacy" ? "bg-[#10b981] text-black" : "text-text-muted-theme hover:text-text-theme"
              }`}
            >
              Zero-Knowledge Logging
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="rounded-[2.5rem] border border-border-theme bg-card-theme p-2.5 shadow-2xl">
          <div className="w-full rounded-[calc(2.5rem-0.625rem)] bg-card-theme/95 border border-border-theme p-8 md:p-12 text-left">
            {activeTab === "security" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="font-display text-2xl font-bold text-text-theme mb-4">Post Quantum Encryption Systems</h3>
                  <p className="text-text-muted-theme text-sm leading-relaxed mb-6">
                    With quantum computing advancements, standard AES-256 is becoming vulnerable to download now, decrypt later strategy. In 2026, leading VPN providers are shifting to post quantum cryptography using Kyber algorithms.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                        <Check className="h-3 w-3" weight="bold" />
                      </div>
                      <span className="text-xs text-text-theme">Kyber-1024 hybrid keys for quantum proofing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                        <Check className="h-3 w-3" weight="bold" />
                      </div>
                      <span className="text-xs text-text-theme">Perfect Forward Secrecy rotates key lists every 15 minutes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                        <Check className="h-3 w-3" weight="bold" />
                      </div>
                      <span className="text-xs text-text-theme">ChaCha20-Poly1305 standard for mobile hardware</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-border-theme bg-card-elevated-theme p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card-theme border border-border-theme text-[#10b981]">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-theme">Quantum Resistant Key Exchange</h4>
                      <p className="text-xs text-text-muted-theme mt-1">Shielded from future inspection threat.</p>
                    </div>
                  </div>
                  <div className="h-px bg-border-theme" />
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card-theme border border-border-theme text-[#06b6d4]">
                      <Key className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-theme">Zero-Knowledge Token Auth</h4>
                      <p className="text-xs text-text-muted-theme mt-1">Providers cannot link account profiles to IP tunnels.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "speed" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="font-display text-2xl font-bold text-text-theme mb-4">WireGuard 2.0 and Lightway Dominance</h3>
                  <p className="text-text-muted-theme text-sm leading-relaxed mb-6">
                    Forget bloated OpenVPN code structures. Modern protocols in 2026 operate directly within the operating system kernel, avoiding processor interrupts to deliver 950+ Mbps bandwidth.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                        <Check className="h-3 w-3" weight="bold" />
                      </div>
                      <span className="text-xs text-text-theme">Under 4,000 lines of code for complete audit verification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                        <Check className="h-3 w-3" weight="bold" />
                      </div>
                      <span className="text-xs text-text-theme">Instant handshakes connect under 0.2 seconds on wake</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                        <Check className="h-3 w-3" weight="bold" />
                      </div>
                      <span className="text-xs text-text-theme">Extremely low battery consumption on mobile devices</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-border-theme bg-card-elevated-theme p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted-theme">NordLynx Protocol Avg</span>
                    <span className="text-xs font-bold text-[#10b981]">97.4 Mbps</span>
                  </div>
                  <div className="h-2 w-full bg-card-theme rounded-full overflow-hidden">
                    <div className="h-full bg-[#10b981] rounded-full" style={{ width: "97.4%" }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted-theme">Lightway Protocol Avg</span>
                    <span className="text-xs font-bold text-[#3b82f6]">94.8 Mbps</span>
                  </div>
                  <div className="h-2 w-full bg-card-theme rounded-full overflow-hidden">
                    <div className="h-full bg-[#3b82f6] rounded-full" style={{ width: "94.8%" }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted-theme">Legacy OpenVPN Avg</span>
                    <span className="text-xs font-bold text-text-muted-theme">62.1 Mbps</span>
                  </div>
                  <div className="h-2 w-full bg-card-theme rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500 rounded-full" style={{ width: "62.1%" }} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="font-display text-2xl font-bold text-text-theme mb-4">Independent Audit Logging Regimes</h3>
                  <p className="text-text-muted-theme text-sm leading-relaxed mb-6">
                    A VPN is only as good as its logging policy. Our selected providers operate under strictly audited, RAM-only parameters. Without writeable hard-drives, logging connections becomes physically impossible.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                        <Check className="h-3 w-3" weight="bold" />
                      </div>
                      <span className="text-xs text-text-theme">RAM-only server structure writes nothing to non-volatile disks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                        <Check className="h-3 w-3" weight="bold" />
                      </div>
                      <span className="text-xs text-text-theme">No logs on DNS queries or IP allocation paths</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                        <Check className="h-3 w-3" weight="bold" />
                      </div>
                      <span className="text-xs text-text-theme">Audits conducted by Big Four firms (PwC & Deloitte)</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-border-theme bg-card-elevated-theme p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <Globe className="h-6 w-6 text-[#10b981]" />
                    <div>
                      <h4 className="text-sm font-semibold text-text-theme">Safe Jurisdiction Bases</h4>
                      <p className="text-xs text-text-muted-theme mt-1">Based in countries outside the 5/9/14 Eyes alliances.</p>
                    </div>
                  </div>
                  <div className="h-px bg-border-theme" />
                  <div className="flex items-center gap-4">
                    <Lock className="h-6 w-6 text-[#06b6d4]" />
                    <div>
                      <h4 className="text-sm font-semibold text-text-theme">Independent Warrant Canary</h4>
                      <p className="text-xs text-text-muted-theme mt-1">Regularly published declarations confirming zero data seizures.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#10b981]/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-[#10b981] mb-4">
            Security Common Questions
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-theme mb-4">
            FAQ on Modern VPN Systems
          </h2>
          <p className="text-text-muted-theme text-sm">
            Learn more about encryption systems, server nodes, and streaming bypass mechanisms.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {[
            {
              q: "Why are Big Four audit logs important for a zero logs claim?",
              a: "Many VPNs claim they do not save logs, but only an independent forensic audit can verify this. Big Four firms like PwC or Deloitte log in to VPN servers with zero warning to inspect actual configuration files, verifying that RAM-only policies are active and that no user trace is saved."
            },
            {
              q: "What is the WireGuard security protocol?",
              a: "WireGuard is a modern, light security protocol that operates in the operating system kernel. With under 4,000 lines of code, it is much easier to review for security gaps compared to legacy OpenVPN (over 100,000 lines). It provides faster speed and quicker connection handshakes."
            },
            {
              q: "Can a VPN bypass advanced geographical streaming blocks?",
              a: "Yes. Premium VPNs rotate their node IP addresses continuously to bypass blocks from platforms like Netflix or BBC iPlayer. NordVPN and ExpressVPN use obfuscated servers that hide VPN headers, making traffic look like standard HTTPS connections."
            },
            {
              q: "What is post quantum encryption for VPNs?",
              a: "Post quantum encryption uses mathematical algorithms (like Kyber) that cannot be broken by future quantum computers. Premium VPN services use hybrid key exchanges (combining standard AES with Kyber) to ensure that captured traffic cannot be decrypted decades later."
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="rounded-2xl border border-border-theme bg-card-theme overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-card-elevated-theme transition-all duration-300"
              >
                <span className="text-sm font-semibold text-text-theme">{item.q}</span>
                <CaretDown className={`h-4 w-4 text-text-muted-theme transition-transform duration-300 ${
                  expandedFaq === index ? "rotate-180 text-text-theme" : ""
                }`} />
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${
                expandedFaq === index ? "max-h-[200px] border-t border-border-theme" : "max-h-0"
              } overflow-hidden`}>
                <p className="p-6 text-xs text-text-muted-theme leading-relaxed bg-bg-theme/25">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / Deal Alerts CTA Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
        {/* Glow effect in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-gradient-to-tr from-[#10b981]/10 to-[#06b6d4]/10 blur-[80px] pointer-events-none" />
        
        {/* Premium Bento Card Wrapper */}
        <div className="relative rounded-[2.5rem] border border-border-theme bg-card-theme p-8 md:p-12 overflow-hidden shadow-xl">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40 dark:opacity-100" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Column 1: Info copy */}
            <div className="lg:col-span-7 text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 px-3 py-1 text-xs font-semibold text-[#10b981] mb-6">
                <Sparkle className="h-3.5 w-3.5 animate-pulse" />
                WEEKLY PRIVACY INTEL & DEALS
              </span>
              
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-theme mb-4 tracking-tight leading-tight">
                Stay Ahead of Censorship. <br />
                <span className="gradient-text-green">Never Pay Full Price.</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-text-muted-theme leading-relaxed max-w-[54ch]">
                Join <span className="text-text-theme font-semibold">45,000+ subscriber advocates</span> receiving monthly independent audit summaries, verified speed benchmarks, and exclusive VPN coupon codes directly to their inbox.
              </p>
            </div>
            
            {/* Column 2: Signup form */}
            <div className="lg:col-span-5 w-full">
              <div className="p-1 rounded-3xl bg-card-theme border border-border-theme shadow-2xl backdrop-blur-md">
                <div className="p-6 md:p-8 bg-card-elevated-theme/40 rounded-[calc(1.5rem-0.25rem)]">
                  {newsletterStatus === "success" ? (
                    <div className="text-center py-6 animate-fade-in">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#10b981]/15 text-[#10b981] mb-4">
                        <Check className="h-6 w-6" weight="bold" />
                      </div>
                      <h4 className="font-display text-base font-bold text-text-theme mb-2">You're on the whitelist!</h4>
                      <p className="text-xs text-text-muted-theme">Check your inbox for the latest privacy report and deals.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="newsletter-email" className="block text-[10px] font-mono uppercase tracking-wider text-text-muted-theme mb-2 text-left">
                          Secure Email Address
                        </label>
                        <input
                          id="newsletter-email"
                          type="email"
                          placeholder="name@domain.com"
                          value={newsletterEmail}
                          onChange={(e) => {
                            setNewsletterEmail(e.target.value);
                            if (newsletterStatus === "error") setNewsletterStatus("idle");
                          }}
                          className="w-full rounded-xl border border-border-theme bg-card-theme px-4 py-3 text-xs text-text-theme outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 transition-all duration-300 placeholder:text-text-muted-theme/40 font-sans"
                        />
                      </div>
                      
                      {newsletterStatus === "error" && (
                        <p className="text-[10px] text-red-500 text-left font-mono">
                          * Please enter a valid email address.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={newsletterStatus === "loading"}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#10b981] px-5 py-3.5 text-xs font-semibold text-black hover:bg-[#34d399] transition-all duration-300 active:scale-[0.98] cursor-pointer disabled:opacity-50"
                      >
                        {newsletterStatus === "loading" ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        ) : (
                          <>
                            Subscribe to Deal Alerts
                            <ArrowRight className="h-3.5 w-3.5 text-black" weight="bold" />
                          </>
                        )}
                      </button>
                      
                      <p className="text-[9px] text-text-muted-theme/60 text-center leading-relaxed mt-3">
                        Zero spam. Unsubscribe anytime in one-click. We protect your metadata securely.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        </>
      )}

      {view === "terms" && (
        <TermsOfService navigateTo={navigateTo} />
      )}

      {view === "privacy" && (
        <PrivacyPolicy navigateTo={navigateTo} />
      )}

      {/* Footer Section */}
      <footer className="bg-card-elevated-theme border-t border-border-theme py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">
            
            {/* Logo and candidate context */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-card-theme border border-border-theme p-1.5 shadow-[0_0_10px_rgba(16,185,129,0.03)]">
                  {/* Custom Self-Designed VPN Link Logo */}
                  <svg className="h-full w-full" viewBox="0 0 100 100" fill="none">
                    {/* Outer Shield Outline */}
                    <path 
                      d="M50 10 C68 10 82 18 82 45 C82 68 50 88 50 88 C50 88 18 68 18 45 C18 18 32 10 50 10 Z" 
                      stroke="url(#shield-grad-footer)" 
                      strokeWidth="8" 
                      strokeLinejoin="round" 
                      fill="none"
                    />
                    {/* Connection Line */}
                    <path 
                      d="M36 40 C 36 54, 64 46, 64 60" 
                      stroke="url(#link-grad-footer)" 
                      strokeWidth="7" 
                      strokeLinecap="round" 
                      fill="none" 
                    />
                    {/* Client Node */}
                    <circle cx="36" cy="40" r="8" stroke="#10b981" strokeWidth="4" fill="currentColor" className="text-bg-theme" />
                    {/* Server Node */}
                    <circle cx="64" cy="60" r="8" stroke="#06b6d4" strokeWidth="4" fill="currentColor" className="text-bg-theme" />
                    {/* Glowing Core */}
                    <circle cx="50" cy="50" r="4.5" fill="#10b981" />
                    
                    <defs>
                      <linearGradient id="shield-grad-footer" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <linearGradient id="link-grad-footer" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span className="font-display text-base font-bold tracking-tight text-text-theme">
                  H2T <span className="text-[#10b981]">VPN</span>
                </span>
              </div>
              <p className="text-xs text-text-muted-theme leading-relaxed max-w-[35ch]">
                H2T VPN is an independent review platform comparing global VPN speed, encryption protocols, and zero-knowledge audits.
              </p>
            </div>

            {/* Links Columns */}
            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-text-muted-theme mb-4">Site Sections</h5>
              <ul className="space-y-3">
                <li><a href="#vpn-rankings" onClick={(e) => handleNavLinkClick(e, "vpn-rankings")} className="text-xs text-text-muted-theme hover:text-text-theme transition-colors">Top rankings</a></li>
                <li><a href="#vpn-simulator" onClick={(e) => handleNavLinkClick(e, "vpn-simulator")} className="text-xs text-text-muted-theme hover:text-text-theme transition-colors">Speed simulator</a></li>
                <li><a href="#vpn-features" onClick={(e) => handleNavLinkClick(e, "vpn-features")} className="text-xs text-text-muted-theme hover:text-text-theme transition-colors">Technical specs</a></li>
                <li><a href="#faq" onClick={(e) => handleNavLinkClick(e, "faq")} className="text-xs text-text-muted-theme hover:text-text-theme transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-text-muted-theme mb-4">VPN Providers</h5>
              <ul className="space-y-3">
                <li><a href="https://nordvpn.com" target="_blank" rel="noreferrer" className="text-xs text-text-muted-theme hover:text-text-theme transition-colors">NordVPN reviews</a></li>
                <li><a href="https://expressvpn.com" target="_blank" rel="noreferrer" className="text-xs text-text-muted-theme hover:text-text-theme transition-colors">ExpressVPN reviews</a></li>
                <li><a href="https://surfshark.com" target="_blank" rel="noreferrer" className="text-xs text-text-muted-theme hover:text-text-theme transition-colors">Surfshark reviews</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-border-theme pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="text-xs text-text-muted-theme/60">
              &copy; {new Date().getFullYear()} H2T VPN. All rights reserved.
            </span>
            <div className="flex gap-6 text-xs text-text-muted-theme/60">
              <span>English (Global)</span>
              <button 
                type="button"
                onClick={() => navigateTo("terms")}
                className="hover:text-text-theme transition-colors cursor-pointer border-none bg-transparent p-0 outline-none"
              >
                Terms of Service
              </button>
              <button 
                type="button"
                onClick={() => navigateTo("privacy")}
                className="hover:text-text-theme transition-colors cursor-pointer border-none bg-transparent p-0 outline-none"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
