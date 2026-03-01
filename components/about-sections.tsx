"use client"

import { useEffect, useRef, useState } from "react"
import { Lightbulb, Wrench, ShieldCheck, TrendingUp } from "lucide-react"

/* ─── Scroll-reveal hook ─────────────────────────────────── */
function useInView(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Fade-up helper ─────────────────────────────────────── */
function fadeUp(visible: boolean, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(36px)",
    transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  }
}

/* ═══════════════════════════════════════════════════════════
   OUR MISSION
   Layout: full-width dark image banner at top, then 4 cards
   Image gets a circular crop inset over the banner
═══════════════════════════════════════════════════════════ */
export function OurMissionSection({
  t,
}: {
  t: {
    mission: { title: string }
    features: {
      feature1: { title: string; desc: string }
      feature2: { title: string; desc: string }
      feature3: { title: string; desc: string }
      feature4: { title: string; desc: string }
    }
  }
}) {
  const { ref: bannerRef, visible: bannerVisible } = useInView(0.15)
  const { ref: cardsRef, visible: cardsVisible } = useInView(0.12)

  const cards = [
    { icon: <Lightbulb className="w-6 h-6 text-white" />, grad: "from-blue-600 to-cyan-500", border: "hover:border-blue-500", shadow: "shadow-blue-500/20", key: "feature1" },
    { icon: <Wrench className="w-6 h-6 text-white" />, grad: "from-cyan-500 to-blue-600", border: "hover:border-cyan-500", shadow: "shadow-cyan-500/20", key: "feature2" },
    { icon: <ShieldCheck className="w-6 h-6 text-white" />, grad: "from-blue-700 to-cyan-600", border: "hover:border-blue-600", shadow: "shadow-blue-600/20", key: "feature3" },
    { icon: <TrendingUp className="w-6 h-6 text-white" />, grad: "from-cyan-600 to-blue-700", border: "hover:border-cyan-600", shadow: "shadow-cyan-600/20", key: "feature4" },
  ]

  const featureMap = {
    feature1: t.features.feature1,
    feature2: t.features.feature2,
    feature3: t.features.feature3,
    feature4: t.features.feature4,
  } as Record<string, { title: string; desc: string }>

  return (
    <section className="relative bg-slate-950">
      {/* ── Full-width image banner ── */}
      <div ref={bannerRef} className="relative h-[520px] md:h-[600px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-x1g1uy37oNf2CcPw1Q47o2PPcFlJC6.png"
          alt="Team presenting Company Mission on a whiteboard"
          className="w-full h-full object-cover object-center"
          style={{
            transform: bannerVisible ? "scale(1)" : "scale(1.06)",
            transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />

        {/* Title overlaid on image */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 xl:px-24 pb-16">
          <div style={fadeUp(bannerVisible, 0.1)}>
            <p className="text-cyan-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              Who We Are
            </p>
          </div>
          <div style={fadeUp(bannerVisible, 0.22)}>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight">
              {t.mission.title}
            </h2>
          </div>
          {/* Animated underline */}
          <div
            className="mt-6 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
            style={{
              width: bannerVisible ? "120px" : "0px",
              transition: "width 1s cubic-bezier(0.22,1,0.36,1) 0.5s",
            }}
          />
        </div>
      </div>

      {/* ── 4-card grid below the banner ── */}
      <div ref={cardsRef} className="relative z-10 px-8 md:px-16 xl:px-24 pb-24 -mt-1 bg-slate-950">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #7dd3fc 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="relative grid sm:grid-cols-2 xl:grid-cols-4 gap-5 pt-16">
          {cards.map((c, i) => {
            const feat = featureMap[c.key]
            return (
              <div
                key={c.key}
                className={`group relative flex flex-col p-7 rounded-2xl bg-slate-900 border border-slate-800 ${c.border} hover:border-opacity-100 hover:shadow-2xl transition-all duration-500 cursor-default overflow-hidden`}
                style={fadeUp(cardsVisible, 0.1 + i * 0.12)}
              >
                {/* Top-right glow accent */}
                <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${c.grad} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`} />

                {/* Icon badge */}
                <div className={`w-13 h-13 w-[52px] h-[52px] rounded-2xl bg-gradient-to-br ${c.grad} flex items-center justify-center mb-5 shadow-lg ${c.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  {c.icon}
                </div>

                {/* Thin top rule */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl`} />

                <h3 className="text-white font-bold text-base leading-snug mb-3 flex-1">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>

                {/* Number */}
                <span className="absolute bottom-5 right-6 text-6xl font-black text-slate-800 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   CORE VALUES
   Layout: white section, large heading, circle image inset
   left, staggered value rows on the right
═══════════════════════════════════════════════════════════ */
export function CoreValuesSection({
  lang,
  values,
}: {
  lang: "en" | "th"
  values: Record<string, { title: string; desc: string }>
}) {
  const { ref: headRef, visible: headVisible } = useInView(0.15)
  const { ref: bodyRef, visible: bodyVisible } = useInView(0.1)

  const entries = Object.entries(values).filter(([k]) => k.startsWith("value"))

  const accentColors = [
    "bg-blue-600",
    "bg-cyan-500",
    "bg-blue-500",
    "bg-cyan-600",
    "bg-blue-700",
    "bg-cyan-400",
  ]

  return (
    <section className="relative bg-white overflow-hidden">

      {/* ── Full-width banner header with background image ── */}
      <div ref={headRef} className="relative h-[300px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UYQpktym8ZkFV2bjZNTGB18rwsrM8f.png"
          alt="Core Values whiteboard"
          className="w-full h-full object-cover object-center"
          style={{
            transform: headVisible ? "scale(1)" : "scale(1.06)",
            transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)",
            filter: "brightness(0.35)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 xl:px-24">
          <div style={fadeUp(headVisible, 0.1)}>
            <p className="text-cyan-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              {lang === "th" ? "คุณค่าหลักของเรา" : "What We Stand For"}
            </p>
          </div>
          <div style={fadeUp(headVisible, 0.22)}>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight">
              {lang === "th" ? "คุณค่าหลักของ Ignite" : "Ignite's Core Value"}
            </h2>
          </div>
          <div
            className="mt-6 h-[3px] bg-gradient-to-r from-amber-400 to-cyan-500 rounded-full"
            style={{
              width: headVisible ? "120px" : "0px",
              transition: "width 1s cubic-bezier(0.22,1,0.36,1) 0.5s",
            }}
          />
        </div>
      </div>

      {/* ── Body: circle image + staggered value list ── */}
      <div ref={bodyRef} className="relative px-8 md:px-16 xl:px-24 py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: circle image with decorative ring */}
          <div
            className="flex-shrink-0 flex justify-center lg:justify-start"
            style={fadeUp(bodyVisible, 0.05)}
          >
            <div className="relative w-80 h-80 md:w-[460px] md:h-[460px]">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-200 scale-[1.07]" />
              {/* Dashed orbit ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-blue-300/50 scale-[1.15]"
                style={{ animation: "spin 30s linear infinite" }}
              />
              {/* Accent dots */}
              <div className="absolute top-3 right-8 w-4 h-4 rounded-full bg-amber-400 shadow-md shadow-amber-400/40" />
              <div className="absolute bottom-8 left-3 w-3 h-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/40" />
              {/* Circle image */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-blue-200/60 ring-4 ring-cyan-100">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UYQpktym8ZkFV2bjZNTGB18rwsrM8f.png"
                  alt="Core Values whiteboard"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Right: value rows */}
          <div className="flex-1 flex flex-col divide-y divide-gray-100">
            {entries.map(([key, val], idx) => (
              <div
                key={key}
                className="group flex items-start gap-5 py-5 cursor-default"
                style={fadeUp(bodyVisible, 0.1 + idx * 0.1)}
              >
                {/* Colored number pill */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${accentColors[idx] ?? "bg-blue-600"} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white font-bold text-sm leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-bold text-lg leading-snug mb-1 group-hover:text-blue-600 transition-colors duration-300">
                    {val.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                </div>
                {/* Right arrow accent */}
                <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9h12M10 4l5 5-5 5" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { from { transform: rotate(0deg) scale(1.18); } to { transform: rotate(360deg) scale(1.18); } }`}</style>
    </section>
  )
}
