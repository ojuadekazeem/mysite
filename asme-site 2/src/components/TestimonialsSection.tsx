import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    text: "I cannot possibly express what a delight it was to work with Kazeem. He did everything I asked and did not stop working on this project until we found the right technology to accomplish it. He is truly outstanding and I will be working with him on my other projects as well.",
    name: "Verified Fiverr client",
    service: "ClickFunnels build",
  },
  {
    text: "I don't say this lightly — Ojuade Kazeem is the real deal. I came in needing a SamCart funnel and what I got was clarity, strategy, and next-level execution. He didn't just build pages.",
    name: "Verified Fiverr client",
    service: "SamCart funnel",
  },
  {
    text: "Absolutely amazing! The best person I have worked with on Fiverr yet. Highly recommend. Delivery time is exceptional along with attention to detail and communication.",
    name: "Verified Fiverr client",
    service: "Sales funnel design",
  },
  {
    text: "Ojuade Kazeem was amazing — very good communication, timely, and he went above and beyond to give me a quality product. He is very knowledgeable and accommodating.",
    name: "Verified Fiverr client",
    service: "GoHighLevel setup",
  },
  {
    text: "Kazeem is truly awesome, finished the job early and was a man of his word. Amazing work, and friendly fast delivery.",
    name: "Verified Fiverr client",
    service: "Website development",
  },
  {
    text: "Very easy to work with and very quick to respond to my messages. If you are needing a quick sales page or other page I highly recommend.",
    name: "Verified Fiverr client",
    service: "Landing page design",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % reviews.length), []);
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [inView, next]);

  return (
    <section className="relative bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.025)_0%,_transparent_65%)]" />
      <div ref={ref} className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">
            What clients{" "}
            <span className="italic text-white/50" style={{ fontFamily: "'Instrument Serif', serif" }}>
              say
            </span>
          </h2>
          <span className="text-white/40 text-sm hidden md:block">From Fiverr</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="liquid-glass rounded-3xl p-8 md:p-14 min-h-[340px] md:min-h-[300px] flex flex-col justify-between"
        >
          <div>
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-white fill-white" />
              ))}
            </div>

            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white text-xl md:text-3xl leading-relaxed tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              "{reviews[index].text}"
            </motion.blockquote>
          </div>

          <div className="flex items-end justify-between mt-10">
            <div>
              <p className="text-white text-sm font-medium">{reviews[index].name}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase mt-1">
                {reviews[index].service}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous review"
                className="liquid-glass rounded-full p-3 text-white/80 hover:text-white hover:bg-white/5 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next review"
                className="liquid-glass rounded-full p-3 text-white/80 hover:text-white hover:bg-white/5 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
