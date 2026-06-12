import { useEffect, useRef } from "react";
import { Globe, ArrowRight, Mail, Send } from "lucide-react";
import AboutSection from "./components/AboutSection";
import FeaturedVideoSection from "./components/FeaturedVideoSection";
import PhilosophySection from "./components/PhilosophySection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

export default function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const animateOpacity = (from: number, to: number, duration: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        video.style.opacity = String(from + (to - from) * t);
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    let fadingOut = false;

    const handleCanPlay = () => {
      video.play().catch(() => {});
      animateOpacity(0, 1, 500);
    };

    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (!fadingOut && remaining <= 0.55) {
        fadingOut = true;
        animateOpacity(parseFloat(video.style.opacity || "1"), 0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        fadingOut = false;
        video.play().catch(() => {});
        animateOpacity(0, 1, 500);
      }, 100);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="bg-black">
      {/* SECTION 1 — HERO */}
      <section className="min-h-screen overflow-hidden relative flex flex-col">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          style={{ opacity: 0 }}
          muted
          autoPlay
          playsInline
          preload="auto"
          src={HERO_VIDEO}
        />

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <Globe size={24} className="text-white" />
              <span className="text-white font-semibold text-lg ml-2">Ojuade</span>
              <div className="hidden md:flex items-center gap-8 ml-8">
                <a href="#services" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  Services
                </a>
                <a href="#pricing" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  Pricing
                </a>
                <a href="#about" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  About
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white text-sm font-medium">Start a project</button>
              <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">
                Contact
              </button>
            </div>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
          <h1
            className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Funnels that <em className="italic">convert</em>.
          </h1>

          <div className="max-w-xl w-full mt-8">
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm"
              />
              <button
                className="bg-white rounded-full p-3 text-black shrink-0"
                aria-label="Submit email"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <p className="text-white text-sm leading-relaxed px-4 mt-6 max-w-xl">
            Get sales funnels, landing pages, and email sequences built to turn visitors
            into customers. Drop your email for tips, teardowns, and project openings.
          </p>

          <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-8">
            Read the approach
          </button>
        </div>

        {/* Social footer */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all" aria-label="Email">
            <Mail size={20} />
          </button>
          <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all" aria-label="Message">
            <Send size={20} />
          </button>
          <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all" aria-label="Website">
            <Globe size={20} />
          </button>
        </div>
      </section>

      <div id="about">
        <AboutSection />
      </div>
      <FeaturedVideoSection />
      <PhilosophySection />
      <div id="services">
        <ServicesSection />
      </div>
      <TestimonialsSection />
    </div>
  );
}
