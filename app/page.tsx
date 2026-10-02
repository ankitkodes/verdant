"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  CircleAlert,
  Clock3,
  Code2,
  GraduationCap,
  Layers,
  MessageSquare,
  MessageSquareText,
  Mic,
  RotateCcw,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Video,
  Zap,
} from "lucide-react";
import { Caveat, Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
});

const navItems = ["Features", "Roles", "How it Works", "FAQ"];

const heroFeatures = [
  { label: "Practice by Chat", icon: MessageSquare },
  { label: "Voice Interviews", icon: Mic },
  { label: "Video Call Interviews", icon: Video },
  { label: "Get AI Feedback", icon: BarChart3 },
];

const roles = [
  {
    title: "Software Engineer",
    description: "DSA, System Design, Behavioral",
    icon: Code2,
  },
  {
    title: "Product Manager",
    description: "Product Sense, Case Studies",
    icon: BriefcaseBusiness,
  },
  {
    title: "Data Analyst",
    description: "SQL, Analytics, Problem Solving",
    icon: BarChart3,
  },
  {
    title: "Business Analyst",
    description: "Business Cases, Communication",
    icon: BriefcaseBusiness,
  },
  {
    title: "UX Designer",
    description: "Design Thinking, Portfolio Review",
    icon: Sparkles,
  },
  {
    title: "Marketing",
    description: "Strategy, Creativity, Real-world Scenarios",
    icon: Zap,
  },
];

const feedbackMetrics = [
  { label: "Technical Knowledge", value: 8.5 },
  { label: "Communication", value: 8.0 },
  { label: "Confidence", value: 7.5 },
  { label: "Problem Solving", value: 8.5 },
];

const problemCards = [
  {
    title: "No real feedback",
    description:
      "You answer practice questions but never learn what was weak, unclear or missing.",
    icon: MessageSquareText,
  },
  {
    title: "No real pressure",
    description:
      "Reading answers is easy. Answering out loud, on time, with someone evaluating you is a different skill.",
    icon: Clock3,
  },
  {
    title: "No clear direction",
    description:
      "You don't know which topics to focus on, so you end up repeating what you already know.",
    icon: Target,
  },
];

const howItWorksSteps = [
  {
    step: "Step 01",
    title: "Choose your role or topic",
    description:
      "Pick the kind of interview you want to prepare for, from technical rounds to HR questions, and set the difficulty you're comfortable with.",
    pills: ["Role-based", "Difficulty levels"],
  },
  {
    step: "Step 02",
    title: "Take the AI mock interview",
    description:
      "Answer questions generated for your chosen track, in a timed setup that feels like the real thing.",
    pills: ["AI-generated questions", "Timed"],
  },
  {
    step: "Step 03",
    title: "Get instant feedback",
    description:
      "See what was strong, what was missing and how you can answer better, right after you finish.",
    pills: ["Detailed review", "Actionable tips"],
  },
  {
    step: "Step 04",
    title: "Track progress and retry",
    description:
      "Come back, retake sessions and watch your weak areas improve over time.",
    pills: ["Progress tracking", "Unlimited retries"],
  },
];

interface LogoProps {
  size?: "sm" | "md" | "lg" | "footer";
  showText?: boolean;
  dark?: boolean;
  className?: string;
}

function Logo({
  size = "md",
  showText = true,
  dark = false,
  className = "",
}: LogoProps) {
  const sizes = {
    sm: {
      wrapper: "h-8",
      icon: 32,
      text: "text-[21px]",
    },
    md: {
      wrapper: "h-10",
      icon: 40,
      text: "text-[26px]",
    },
    lg: {
      wrapper: "h-14",
      icon: 56,
      text: "text-[38px]",
    },
    footer: {
      wrapper: "h-11",
      icon: 44,
      text: "text-[28px]",
    },
  };

  const current = sizes[size];
  const reactId = useId();
  const iconId = `verdantLogo_${size}_${reactId.replace(/:/g, '')}`;

  return (
    <div className={`inline-flex items-center gap-2 ${current.wrapper} ${className}`}>
      <svg
        width={current.icon}
        height={current.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Verdant logo"
        className="shrink-0"
      >
        <defs>
          <linearGradient id={`${iconId}_light`} x1="8" y1="8" x2="36" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#6BC9A7" />
            <stop offset="1" stopColor="#45C9AA" />
          </linearGradient>
          <linearGradient id={`${iconId}_dark`} x1="36" y1="6" x2="36" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0B806B" />
            <stop offset="1" stopColor="#075D4C" />
          </linearGradient>
        </defs>

        {/* Left arm of V — lighter green */}
        <path
          d="M8 10C8 7.8 9.8 6 12 6H22C24.5 6 26.7 7.4 27.8 9.6L40 34L32 50L10 10.5C9.2 9 8 10 8 10Z"
          fill={`url(#${iconId}_light)`}
        />
        <path
          d="M8.5 8.5C8.5 7 9.8 5.8 11.5 5.8H22.5C24.8 5.8 26.8 7.2 28 9.3L41 35.5L32 52.5L9 9.5C8.5 8.5 8.5 8.5 8.5 8.5Z"
          fill={`url(#${iconId}_light)`}
        />

        {/* Right arm of V — darker teal */}
        <path
          d="M36 6H52C54.5 6 56 8.5 55 10.8L37 48C35.5 51 31.5 51 30 48L24 36L36 6Z"
          fill={`url(#${iconId}_dark)`}
        />
      </svg>

      {showText && (
        <span
          className={`${current.text} font-bold leading-none tracking-[-0.055em] ${dark ? "text-white" : "text-[#17242C]"
            }`}
        >
          Verdant
        </span>
      )}
    </div>
  );
}

function LogoMark() {
  return <Logo size="sm" showText={false} />;
}

function VideoMockup() {
  return (
    <div className="relative w-full max-w-[280px] rotate-[2deg] rounded-[22px] border border-white/70 bg-white/70 p-3 shadow-[0_24px_65px_rgba(17,60,48,0.20)] backdrop-blur-xl">
      <img
        src="/images/videoInterview.png"
        alt="Video interview preview"
        className="block w-full rounded-[16px] object-cover"
        style={{ aspectRatio: "3/4" }}
      />
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="relative w-full max-w-[420px] rounded-[22px] border border-[#dfe8e3] bg-white p-6 shadow-[0_20px_55px_rgba(20,58,47,0.10)]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5f4ee]">
          <LogoMark />
        </div>

        <div>
          <div className="text-[16px] font-bold text-[#172128]">Verdant AI</div>
          <div className="text-[13px] text-[#08755e]">
            Software Engineer Interview
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4 pb-4">
        {/* AI question */}
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17a985]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          </div>

          <div className="max-w-[280px] rounded-[16px] rounded-tl-[4px] bg-[#f0f4f2] px-4 py-3 text-[14px] leading-[1.5] text-[#263238]">
            Can you explain the difference between a stack and a queue?
          </div>
        </div>

        {/* User answer */}
        <div className="flex items-start justify-end gap-2.5">
          <div className="max-w-[280px] rounded-[16px] rounded-tr-[4px] bg-[#dff4ec] px-4 py-3 text-[14px] leading-[1.5] text-[#263238]">
            Yes, a stack follows LIFO (Last In First Out) while a queue follows FIFO (First In First Out)...
          </div>

          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2196F3] text-[12px] font-bold text-white">
            A
          </div>
        </div>

        {/* AI follow-up */}
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17a985]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          </div>

          <div className="max-w-[280px] rounded-[16px] rounded-tl-[4px] bg-[#f0f4f2] px-4 py-3 text-[14px] leading-[1.5] text-[#263238]">
            Great! Can you give a real-world example for each?
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-3 rounded-full border border-[#e2e8e5] bg-[#f8faf9] px-4 py-3">
        <span className="flex-1 text-[14px] text-[#9aa3a8]">
          Type your answer...
        </span>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17a985] text-white shadow-[0_4px_12px_rgba(23,169,133,0.25)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
        </div>
      </div>
    </div>
  );
}

function FeedbackCard() {
  return (
    <div className="w-full rounded-[20px] border border-[#dceae4] bg-[#edf7f2] p-6 shadow-[0_16px_45px_rgba(17,74,58,0.08)]">
      <div className="flex gap-5">
        {/* Left: Metrics */}
        <div className="flex-1 min-w-0">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#17a985] shadow-[0_2px_8px_rgba(23,169,133,0.1)]">
              <BarChart3 className="h-3.5 w-3.5" />
            </div>

            <span className="text-[16px] font-bold text-[#172128]">
              AI Feedback
            </span>
          </div>

          <div className="space-y-2.5">
            {feedbackMetrics.map((metric) => (
              <div
                key={metric.label}
                className="grid grid-cols-[140px_1fr_32px] items-center gap-3"
              >
                <span className="text-[13px] text-[#3d4c53]">
                  {metric.label}
                </span>

                <div className="h-[7px] overflow-hidden rounded-full bg-[#d4e6dd]">
                  <div
                    className="h-full rounded-full bg-[#17a985]"
                    style={{
                      width: `${metric.value * 10}%`,
                    }}
                  />
                </div>

                <span className="text-right text-[13px] font-semibold text-[#253039]">
                  {metric.value.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Encouragement */}
        <div className="flex w-[160px] shrink-0 flex-col items-center justify-center rounded-[16px] bg-white/70 px-4 py-5 text-center shadow-[0_4px_16px_rgba(17,74,58,0.05)]">
          <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-[#17a985] text-white shadow-[0_8px_20px_rgba(23,169,133,0.25)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          </div>

          <div className="text-[15px] font-bold leading-[1.2] text-[#1a1d1f]">
            Keep going!
          </div>
          <div className="mt-1 text-[13px] leading-[1.4] text-[#5a6a72]">
            You&apos;re on the right track.
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!sectionRef.current || prefersReducedMotion) {
      const items = sectionRef.current?.querySelectorAll("[data-fade-item]");
      items?.forEach((item) => {
        item.classList.remove("opacity-0", "translate-y-6");
        item.classList.add("opacity-100", "translate-y-0");
      });
      return;
    }

    const revealItems = Array.from(
      sectionRef.current.querySelectorAll("[data-fade-item]")
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.remove("opacity-0", "translate-y-6");
            target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item, index) => {
      item.classList.add("opacity-0", "translate-y-6");
      item.style.transitionDelay = `${index * 100}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="the-problem"
      aria-labelledby="problem-heading"
      className="relative px-5 py-[72px] sm:py-[88px] lg:px-10 lg:py-[110px]"
    >
      <div className="mx-auto max-w-[1320px]">
        <div
          data-fade-item
          className="mx-auto max-w-[760px] text-center transition duration-700 ease-out"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#08755e]">
            The problem
          </p>
          <h2
            id="problem-heading"
            className="mt-4 text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.055em] text-[#101c24] sm:text-[2.6rem] lg:text-[3.2rem]"
          >
            Practicing for interviews alone doesn&apos;t work
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-[1.7] text-[#617079] sm:text-[16px]">
            Most people prepare by reading answers and hoping for the best. That leaves real gaps you only discover in the actual interview.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {problemCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <li
                key={card.title}
                data-fade-item
                className="group list-none rounded-[22px] border border-[#dceae4] bg-[#f9fbfa] p-6 shadow-[0_10px_30px_rgba(18,61,49,0.04)] transition duration-200 ease-out hover:-translate-y-1 hover:border-[#c9e7dc] hover:shadow-[0_16px_36px_rgba(15,140,108,0.10)]"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#d8efe6] bg-[#e9f7f1] text-[#08755e]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-[1.1rem] font-semibold text-[#181f24]">
                  {card.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-[#617079]">
                  {card.description}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-9 text-center">
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#08755e] transition hover:text-[#075d4c]"
          >
            <span>There&apos;s a better way to prepare.</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function StepPreview({ activeStep }: { activeStep: number }) {
  return (
    <div aria-hidden="true" className="mt-6 hidden h-[280px] w-full max-w-[420px] flex-col rounded-[24px] border border-[#dceae4] bg-white p-6 shadow-[0_16px_38px_rgba(17,74,58,0.08)] lg:flex">
      <p className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#72878d]">Step {String(activeStep + 1).padStart(2, "0")} preview</p>
      <div key={activeStep} className="animate-timeline-preview mt-4 flex min-h-0 flex-1 flex-col">
        {activeStep === 0 && (
          <div className="flex flex-1 flex-col justify-center">
            <p className="text-[13px] font-semibold text-[#243038]">Choose a role</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Frontend", "Backend", "HR Round"].map((role, index) => (
                <span key={role} className={`rounded-full border px-3 py-1.5 text-[12px] font-medium ${index === 0 ? "border-[#08755e] bg-[#eaf7f2] text-[#08755e]" : "border-[#dce5e0] bg-[#f9fbfa] text-[#52636a]"}`}>
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div className="flex flex-1 flex-col justify-center">
            <div className="w-fit max-w-full rounded-[14px] rounded-tl-[4px] bg-[#f0f4f2] px-4 py-3 text-[13px] leading-[1.5] text-[#34434a]">Tell me about a project you&apos;re proud of.</div>
            <div className="mt-3 h-10 rounded-[12px] border border-[#e2eae6] bg-[#f7faf8] px-3 py-2"><div className="h-full w-[78%] rounded-[8px] bg-[#edf2ef]" /></div>
          </div>
        )}
        {activeStep === 2 && (
          <div className="flex flex-1 flex-col justify-center gap-3">
            <div className="rounded-[13px] border border-[#d7efe6] bg-[#edf7f2] px-3.5 py-3 text-[12px] font-medium text-[#08755e]">What went well: clear example and structure</div>
            <div className="rounded-[13px] border border-[#dce5e0] bg-[#f7faf8] px-3.5 py-3 text-[12px] font-medium text-[#52636a]">Improve this: add a little more detail</div>
          </div>
        )}
        {activeStep === 3 && (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex min-h-0 flex-1 flex-col justify-center rounded-[15px] border border-[#e2eae6] bg-[#f9fbfa] p-6">
              <svg viewBox="0 0 320 88" className="h-[76px] w-full" fill="none">
                <path d="M2 18H318M2 44H318M2 70H318" stroke="#dceae4" strokeWidth="1" />
                <path d="M2 68C35 62 53 66 82 48C110 31 132 39 156 51C184 65 204 44 229 39C259 32 282 23 318 12" stroke="#08755e" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M2 78C34 72 58 74 86 62C113 50 136 57 162 61C190 66 211 57 239 51C272 44 292 39 318 32" stroke="#5fc2a2" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 7" />
              </svg>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-[#52636a]">
                <span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-[#08755e]" />This session</span>
                <span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-[#5fc2a2]" />Previous</span>
              </div>
            </div>
            <button tabIndex={-1} className="mt-3 inline-flex h-9 w-fit items-center rounded-full border border-[#dce5e0] bg-white px-4 text-[14px] font-medium text-[#243038] transition hover:bg-[#f0f5f2]">Retake</button>
          </div>
        )}
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const circleRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !trackRef.current || !progressRef.current) return;

      const targetY = window.innerHeight * 0.46;
      let nextActiveIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      circleRefs.current.forEach((circle, index) => {
        if (!circle) return;
        const rect = circle.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - targetY);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextActiveIndex = index;
        }
      });

      setActiveStep(nextActiveIndex);
      const activeCircle = circleRefs.current[nextActiveIndex];
      const firstCircle = circleRefs.current[0];
      const lastCircle = circleRefs.current[circleRefs.current.length - 1];
      if (!activeCircle || !firstCircle || !lastCircle) return;

      const circleRect = activeCircle.getBoundingClientRect();
      const firstCircleRect = firstCircle.getBoundingClientRect();
      const lastCircleRect = lastCircle.getBoundingClientRect();
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const firstCenter = firstCircleRect.top + firstCircleRect.height / 2 - timelineRect.top;
      const lastCenter = lastCircleRect.top + lastCircleRect.height / 2 - timelineRect.top;
      const activeCenter = circleRect.top + circleRect.height / 2 - timelineRect.top;
      const trackHeight = Math.max(0, lastCenter - firstCenter);
      trackRef.current.style.top = `${firstCenter}px`;
      trackRef.current.style.height = `${trackHeight}px`;
      progressRef.current.style.top = `${firstCenter}px`;
      progressRef.current.style.height = `${Math.max(0, Math.min(activeCenter - firstCenter, trackHeight))}px`;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("animate-timeline-step");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    sectionRef.current.querySelectorAll("[data-step-content]").forEach((content) => observer.observe(content));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative px-5 py-16 lg:px-10 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1320px] items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="self-start lg:sticky lg:top-[calc(76px_+_32px)]">
          <p className="text-left text-[11px] font-bold uppercase tracking-[0.22em] text-[#08755e]">
            How it works
          </p>

          <h2
            id="how-it-works-heading"
            className="mt-4 max-w-[460px] text-left text-[2rem] font-extrabold leading-[1.05] tracking-[-0.055em] text-[#101c24] [text-wrap:balance] sm:text-[2.35rem] lg:text-[2.8rem]"
          >
            From first question to real confidence
          </h2>

          <p className="mt-4 max-w-[420px] text-left text-[15px] leading-[1.7] text-[#617079] sm:text-[16px]">
            Four simple steps. Practice as often as you like, and see what improves each round.
          </p>

          <a
            href="#get-started"
            className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#dce5e0] bg-white px-5 py-2.5 text-sm font-medium text-[#243038] transition hover:bg-[#f0f5f2]"
          >
            Try it now
          </a>
          <StepPreview activeStep={activeStep} />
        </div>

        <div ref={timelineRef} className="relative">
          <div
            ref={trackRef}
            aria-hidden="true"
            className="absolute left-[15px] w-[2px] bg-[#dceae4] sm:left-[17px]"
          />
          <div
            ref={progressRef}
            aria-hidden="true"
            className="absolute left-[15px] w-[2px] bg-[#08755e] transition-[height] duration-300 ease-out motion-reduce:transition-none sm:left-[17px]"
            style={{ top: 0, height: 0 }}
          />

          <ol className="space-y-0">
            {howItWorksSteps.map((item, index) => (
              <li
                key={item.title}
                className={`relative pl-12 sm:pl-14 ${index < howItWorksSteps.length - 1 ? "pb-12 lg:pb-14" : ""}`}
              >
                <div
                  ref={(el) => { circleRefs.current[index] = el; }}
                  aria-hidden="true"
                  className={`absolute left-0 top-[4px] flex h-8 w-8 items-center justify-center rounded-full border text-[12px] font-semibold sm:h-9 sm:w-9 ${index === activeStep ? "border-[#08755e] bg-[#08755e] text-white shadow-[0_0_0_5px_rgba(8,117,94,0.10),0_10px_22px_rgba(7,93,76,.18)]" : index < activeStep ? "border-[#cfe7dc] bg-[#e5f4ee] text-[#08755e]" : "border-[#cfe7dc] bg-[#f7faf8] text-[#1f3934]"}`}
                >
                  {index < activeStep ? <Check className="h-4 w-4" strokeWidth={2.5} /> : index + 1}
                </div>

                <div data-step-content className={`transition-opacity duration-300 ${index > activeStep ? "opacity-70" : "opacity-100"}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${index > activeStep ? "text-[#263238]" : "text-[#72878d]"}`}>
                    {item.step}
                  </p>

                  <h3 className={`mt-0.5 text-[1.2rem] font-semibold leading-[1.2] sm:text-[1.35rem] ${index > activeStep ? "text-[#263238]" : "text-[#181f24]"}`}>
                    {item.title}
                  </h3>

                  <p className={`mt-0.5 max-w-[480px] text-[16px] leading-[1.6] ${index > activeStep ? "text-[#263238]" : "text-[#617079]"}`}>
                    {item.description}
                  </p>

                  <div className="mt-1 flex flex-wrap gap-2">
                    {item.pills.map((pill) => (
                      <span
                        key={pill}
                        className={`rounded-full border border-[#dceae4] bg-[#f7faf8] px-3 py-1.5 text-[13px] font-medium ${index > activeStep ? "text-[#263238]" : "text-[#42515a]"}`}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function AIQuestionsMock() {
  return (
    <div aria-hidden="true" className="flex h-full min-h-[370px] flex-col bg-white p-4 sm:p-5">
      <div className="flex items-center gap-3 border-b border-[#e6ece8] pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5f4ee] text-[#08755e]"><Sparkles className="h-4 w-4" /></div>
        <span className="text-sm font-semibold text-[#243038]">Interviewer</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3 py-4 text-[14px] leading-[1.55] text-[#34434a]">
        <div className="max-w-[88%] rounded-[16px] rounded-tl-[4px] bg-[#f0f4f2] px-4 py-3">Tell me about a project you&apos;re proud of.</div>
        <div className="ml-auto max-w-[78%] rounded-[16px] rounded-tr-[4px] bg-[#dff4ee] px-4 py-3">Your answer will appear here when you respond.<br />Add a few details about your approach.</div>
        <div className="max-w-[88%] rounded-[16px] rounded-tl-[4px] bg-[#f0f4f2] px-4 py-3">What would you do differently next time?</div>
        <div className="flex w-fit items-center gap-1 rounded-full bg-[#f0f4f2] px-3 py-2"><i className="h-1.5 w-1.5 rounded-full bg-[#8aa69b]" /><i className="h-1.5 w-1.5 rounded-full bg-[#8aa69b]" /><i className="h-1.5 w-1.5 rounded-full bg-[#8aa69b]" /></div>
      </div>
      <div className="flex items-center gap-3 rounded-full border border-[#e2e8e5] bg-[#f8faf9] px-4 py-2.5">
        <span className="flex-1 text-[14px] text-[#8a989e]">Write your answer...</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#08755e] text-white"><ArrowRight className="h-4 w-4" /></span>
      </div>
    </div>
  );
}

function FeedbackMock() {
  const ratings = [
    { label: "Clarity", level: "Strong", width: "w-[82%]" },
    { label: "Structure", level: "Good", width: "w-[66%]" },
    { label: "Depth", level: "Needs work", width: "w-[42%]" },
  ];

  return (
    <div aria-hidden="true" className="flex h-full min-h-[370px] flex-col gap-4 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-[16px] font-semibold text-[#172128]">Answer review</h4>
        <span className="rounded-full border border-[#d7efe6] bg-[#eaf7f2] px-3 py-1 text-[11px] font-semibold text-[#08755e]">Good start</span>
      </div>
      <div className="space-y-3 rounded-[16px] border border-[#e5eee9] bg-[#f9fbfa] p-4">
        {ratings.map((rating) => (
          <div key={rating.label} className="grid grid-cols-[78px_1fr_auto] items-center gap-3 text-[12px]">
            <span className="font-medium text-[#435159]">{rating.label}</span>
            <span className="h-2 overflow-hidden rounded-full bg-[#e4ece8]"><span className={`block h-full rounded-full bg-[#17a985] ${rating.width}`} /></span>
            <span className="text-[#617079]">{rating.level}</span>
          </div>
        ))}
      </div>
      <div className="grid flex-1 gap-3 sm:grid-cols-2">
        <div className="rounded-[16px] border border-[#d7efe6] bg-[#edf7f2] p-4">
          <p className="text-[13px] font-semibold text-[#08755e]">What went well</p>
          <p className="mt-2 text-[13px] leading-[1.55] text-[#52636a]">Your main point was easy to follow.</p>
          <p className="mt-1 text-[13px] leading-[1.55] text-[#52636a]">You included a relevant example.</p>
        </div>
        <div className="rounded-[16px] border border-[#dce5e0] bg-[#f7faf8] p-4">
          <p className="text-[13px] font-semibold text-[#42515a]">Improve this</p>
          <p className="mt-2 text-[13px] leading-[1.55] text-[#617079]">Add more detail about your actions.</p>
          <p className="mt-1 text-[13px] leading-[1.55] text-[#617079]">Close with what you learned.</p>
        </div>
      </div>
    </div>
  );
}

function RoleMock() {
  const roleOptions = [
    { label: "Frontend", icon: Code2 },
    { label: "Backend", icon: Target },
    { label: "Full Stack", icon: Layers },
    { label: "Data", icon: BarChart3 },
    { label: "HR Round", icon: MessageSquare },
    { label: "System Design", icon: BriefcaseBusiness },
  ];

  return (
    <div aria-hidden="true" className="flex h-full min-h-[370px] flex-col bg-white p-4 sm:p-5">
      <h4 className="text-[16px] font-semibold text-[#172128]">Start a session</h4>
      <div className="mt-4 grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
        {roleOptions.map((role, index) => {
          const RoleIcon = role.icon;
          return (
            <div key={role.label} className={`flex min-h-[88px] flex-col items-start justify-center gap-2 rounded-[14px] border px-4 py-3 ${index === 0 ? "border-[#08755e] bg-[#eaf7f2] text-[#08755e]" : "border-[#e2eae6] bg-[#fbfdfc] text-[#52636a]"}`}>
              <span className={`flex h-9 w-9 items-center justify-center rounded-[11px] ${index === 0 ? "bg-white/80" : "bg-[#eaf7f2]"}`}>
                <RoleIcon className="h-[22px] w-[22px] shrink-0" />
              </span>
              <span className="text-[14px] font-medium">{role.label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <p className="mb-2 text-[14px] font-semibold text-[#52636a]">Difficulty</p>
        <div className="grid grid-cols-3 rounded-[12px] border border-[#dceae4] bg-[#f7faf8] p-1 text-center text-[14px]">
          <span className="rounded-[9px] px-2 py-2 text-[#617079]">Easy</span>
          <span className="rounded-[9px] bg-[#08755e] px-2 py-2 font-semibold text-white">Medium</span>
          <span className="rounded-[9px] px-2 py-2 text-[#617079]">Hard</span>
        </div>
      </div>
      <button tabIndex={-1} className="mt-4 w-full rounded-full bg-[#075d4c] px-4 py-3 text-[13px] font-semibold text-white">Start interview</button>
    </div>
  );
}

function TimedMock() {
  return (
    <div aria-hidden="true" className="flex h-full min-h-[370px] flex-col bg-white p-4 sm:p-5">
      <div className="h-1.5 overflow-hidden rounded-full bg-[#e4ece8]"><div className="h-full w-[58%] rounded-full bg-[#17a985]" /></div>
      <div className="mt-4 flex items-center justify-between text-[12px] font-medium text-[#52636a]">
        <span>Question 3 of 5</span>
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 44 44" className="h-9 w-9 -rotate-90" fill="none"><circle cx="22" cy="22" r="18" stroke="#dceae4" strokeWidth="4" /><circle cx="22" cy="22" r="18" stroke="#08755e" strokeWidth="4" strokeLinecap="round" strokeDasharray="78 113" /></svg>
          <span>Time left</span>
        </span>
      </div>
      <div className="my-4 flex flex-1 flex-col rounded-[18px] border border-[#e2eae6] bg-[#f9fbfa] p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#72878d]">Behavioral question</span>
          <span className="rounded-full border border-[#dceae4] bg-white px-2.5 py-1 text-[11px] font-medium text-[#617079]">Open response</span>
        </div>
        <h4 className="mt-3 text-[16px] font-semibold leading-[1.5] text-[#243038]">How would you approach a problem with competing priorities?</h4>
        <div className="mt-4 flex flex-1 flex-col rounded-[13px] border border-[#e2eae6] bg-white p-3.5">
          <span className="text-[12px] font-semibold text-[#52636a]">Your response</span>
          <div className="mt-3 space-y-3">
            <div className="h-2 w-[92%] rounded-full bg-[#edf2ef]" />
            <div className="h-2 w-[80%] rounded-full bg-[#edf2ef]" />
            <div className="h-2 w-[66%] rounded-full bg-[#edf2ef]" />
          </div>
          <div className="mt-auto flex items-center gap-2 pt-5 text-[11px] font-medium text-[#72878d]">
            <Mic className="h-3.5 w-3.5 text-[#08755e]" />
            <span>Type or speak your answer</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <button tabIndex={-1} className="rounded-full border border-[#dce5e0] bg-white px-4 py-2.5 text-[12px] font-medium text-[#42515a]">Skip</button>
        <button tabIndex={-1} className="rounded-full bg-[#075d4c] px-5 py-2.5 text-[12px] font-semibold text-white">Submit answer</button>
      </div>
    </div>
  );
}

function ProgressMock() {
  const sessionRows = [
    { role: "Frontend interview", tag: "Technical" },
    { role: "Product interview", tag: "Behavioral" },
    { role: "Data interview", tag: "Practice" },
  ];

  return (
    <div aria-hidden="true" className="flex h-full min-h-[370px] flex-col gap-3 bg-white p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Sessions", icon: BarChart3 },
          { label: "Strong areas", icon: TrendingUp },
          { label: "To improve", icon: Target },
        ].map((tile) => {
          const TileIcon = tile.icon;
          return <div key={tile.label} className="flex items-center gap-2 rounded-[13px] border border-[#e2eae6] bg-[#f9fbfa] px-2.5 py-3"><TileIcon className="h-4 w-4 shrink-0 text-[#08755e]" /><span className="text-[11px] font-medium text-[#52636a]">{tile.label}</span></div>;
        })}
      </div>
      <div className="rounded-[15px] border border-[#e2eae6] bg-[#fbfdfc] p-3">
        <svg viewBox="0 0 360 112" preserveAspectRatio="none" className="h-[100px] w-full" fill="none">
          <path d="M0 16H360M0 42H360M0 68H360M0 94H360" stroke="#e4ece8" strokeWidth="1" />
          <path d="M4 82C35 76 52 80 77 63C102 45 119 57 145 62C171 68 190 48 214 48C240 48 252 35 278 39C308 43 327 23 356 17" stroke="#08755e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M4 92C35 85 55 90 78 78C107 63 126 72 150 73C177 75 194 63 218 68C246 74 263 55 286 59C313 63 335 45 356 41" stroke="#5fc2a2" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 7" />
        </svg>
      </div>
      <div className="flex-1 divide-y divide-[#e8efeb] rounded-[14px] border border-[#e2eae6] bg-white px-3">
        {sessionRows.map((row) => (
          <div key={row.role} className="flex items-center gap-2 py-2.5">
            <div className="min-w-0 flex-1"><p className="truncate text-[12px] font-medium text-[#34434a]">{row.role}</p><span className="mt-1 inline-flex rounded-full bg-[#edf6f2] px-2 py-0.5 text-[10px] font-medium text-[#08755e]">{row.tag}</span></div>
            <button tabIndex={-1} className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#dce5e0] bg-[#f9fbfa] px-2 py-1 text-[9px] font-semibold text-[#52636a] transition hover:border-[#c8e4d8] hover:bg-[#edf7f2] hover:text-[#08755e]">
              <RotateCcw className="h-2.5 w-2.5" aria-hidden="true" />
              Retake
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const featureTabs = [
  {
    id: "ai-questions",
    icon: Sparkles,
    label: "AI questions",
    title: "Questions made for your role",
    description: "Choose what you're preparing for and get questions that match it, one after another, like a real interviewer would ask.",
    bullets: ["Tailored to role and level", "Follow-up questions based on your answers", "Technical and HR rounds"],
    image: "",
    Mock: AIQuestionsMock,
  },
  {
    id: "instant-feedback",
    icon: BarChart3,
    label: "Instant feedback",
    title: "Know exactly what to improve",
    description: "As soon as you finish, see a clear breakdown of your answer so you can fix gaps before the real interview.",
    bullets: ["Strengths and gaps highlighted", "Suggestions you can act on", "Better sample answers"],
    image: "",
    Mock: FeedbackMock,
  },
  {
    id: "role-based",
    icon: BriefcaseBusiness,
    label: "Role-based",
    title: "Practice for the job you want",
    description: "Pick a track and a difficulty level, and every session stays focused on what that role actually tests.",
    bullets: ["Multiple role tracks", "Easy, medium and hard levels", "Switch tracks anytime"],
    image: "",
    Mock: RoleMock,
  },
  {
    id: "timed-sessions",
    icon: Clock3,
    label: "Timed sessions",
    title: "Practice under real pressure",
    description: "Set a timer and answer like it's the real thing, so the actual interview feels familiar.",
    bullets: ["Per-question timers", "Full session mode", "Pause and review after"],
    image: "",
    Mock: TimedMock,
  },
  {
    id: "progress",
    icon: TrendingUp,
    label: "Progress",
    title: "Watch yourself get better",
    description: "Every session adds to your history, so you can see which areas are improving and which still need work.",
    bullets: ["Session history", "Strong and weak topics", "Retake any session"],
    image: "",
    Mock: ProgressMock,
  },
];

function FirstSessionMiniUI() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#dce5e0] bg-white p-5 shadow-[0_16px_38px_rgba(17,74,58,0.12)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-semibold text-[#243038]">Your first session</p>
        <span className="rounded-full bg-[#eaf7f2] px-3 py-1.5 text-[13px] font-medium text-[#08755e]">Easy</span>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e4ece8]"><div className="h-full w-[38%] rounded-full bg-[#17a985]" /></div>
      <p className="mt-5 text-[13px] font-semibold text-[#52636a]">Sample question</p>
      <p className="mt-2 text-[15px] leading-[1.5] text-[#243038]">Tell me about a time you solved a difficult problem.</p>
      <div className="mt-4 space-y-3">
        <div className="h-2 w-[94%] rounded-full bg-[#edf2ef]" />
        <div className="h-2 w-[82%] rounded-full bg-[#edf2ef]" />
        <div className="h-2 w-[68%] rounded-full bg-[#edf2ef]" />
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        <span className="rounded-full bg-[#f7faf8] px-3 py-1.5 text-[12px] font-medium text-[#52636a]">Take your time</span>
        <span className="rounded-full bg-[#f7faf8] px-3 py-1.5 text-[12px] font-medium text-[#52636a]">Speak clearly</span>
      </div>
      <div className="mt-4 border-t border-[#e2eae6]" />
      <span className="mt-3 block rounded-full bg-[#075d4c] px-4 py-3 text-center text-[13px] font-semibold text-white">Start session</span>
    </div>
  );
}

function RoleTracksMiniUI() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#dce5e0] bg-white p-5 shadow-[0_16px_38px_rgba(17,74,58,0.12)] sm:p-6">
      <p className="text-[15px] font-semibold text-[#243038]">Choose your track</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {["Frontend", "Backend", "Full Stack", "Data", "HR Round"].map((role, index) => (
          <span key={role} className={`rounded-full border px-3 py-2 text-[13px] font-medium ${index === 1 ? "border-[#08755e] bg-[#eaf7f2] text-[#08755e]" : "border-[#dce5e0] bg-[#f9fbfa] text-[#52636a]"}`}>
            {role}
          </span>
        ))}
      </div>
      <p className="mb-2 mt-6 text-[13px] font-semibold text-[#52636a]">Difficulty</p>
      <div className="grid grid-cols-3 rounded-[13px] border border-[#dceae4] bg-[#f7faf8] p-1 text-center text-[13px]">
        <span className="rounded-[10px] px-2 py-2.5 text-[#617079]">Easy</span>
        <span className="rounded-[10px] bg-[#08755e] px-2 py-2.5 font-semibold text-white">Medium</span>
        <span className="rounded-[10px] px-2 py-2.5 text-[#617079]">Hard</span>
      </div>
      <span className="mt-auto block rounded-full bg-[#075d4c] px-4 py-3 text-center text-[13px] font-semibold text-white">Start interview</span>
    </div>
  );
}

function CareerSwitchMiniUI() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-[#dce5e0] bg-white p-5 shadow-[0_16px_38px_rgba(17,74,58,0.12)] sm:p-6">
      <p className="text-[15px] font-semibold text-[#243038]">Your transition</p>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-3 rounded-[13px] bg-[#f7faf8] px-3.5 py-3"><BriefcaseBusiness className="h-4 w-4 text-[#08755e]" /><span className="text-[13px] font-medium text-[#52636a]">Previous role</span></div>
        <div className="flex justify-center"><ArrowDown className="h-4 w-4 text-[#08755e]" /></div>
        <div className="flex items-center gap-3 rounded-[13px] bg-[#eaf7f2] px-3.5 py-3"><Target className="h-4 w-4 text-[#08755e]" /><span className="text-[13px] font-medium text-[#52636a]">Target role</span></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Core skills", "Industry context", "Storytelling"].map((skill) => <span key={skill} className="rounded-full border border-[#dce5e0] bg-[#f9fbfa] px-3 py-1.5 text-[12px] font-medium text-[#52636a]">{skill}</span>)}
      </div>
      <span className="mt-auto block rounded-full bg-[#075d4c] px-4 py-3 text-center text-[13px] font-semibold text-white">See practice plan</span>
    </div>
  );
}

const personaPanels = [
  {
    id: "students",
    icon: GraduationCap,
    name: "Students and freshers",
    descriptor: "Just starting out",
    summary: "Get comfortable before your first real interview.",
    struggles: ["Little or no interview experience", "Nervous about speaking under pressure", "Unsure what interviewers actually ask"],
    helps: ["Beginner-friendly difficulty levels", "Safe space to make mistakes", "Clear feedback after every answer"],
    tint: "color-mix(in srgb, #08755e 7%, #f7faf8)",
    MiniUI: FirstSessionMiniUI,
  },
  {
    id: "job-seekers",
    icon: BriefcaseBusiness,
    name: "Job seekers",
    descriptor: "Actively applying",
    summary: "Sharpen your answers for the roles you're applying to.",
    struggles: ["Repeating the same weak answers", "No one to give honest feedback", "Hard to know which topics to revisit"],
    helps: ["Role-based question tracks", "Timed rounds that feel real", "Weak areas highlighted for retakes"],
    tint: "color-mix(in srgb, #08755e 13%, #f7faf8)",
    MiniUI: RoleTracksMiniUI,
  },
  {
    id: "career-switchers",
    icon: RefreshCw,
    name: "Career switchers",
    descriptor: "Changing fields",
    summary: "Build confidence in a field that's new to you.",
    struggles: ["Unfamiliar with the new field's questions", "Doubting if your background fits", "Hard to explain your transition"],
    helps: ["Practice new-role questions step by step", "Learn what good answers look like", "Retake until it feels natural"],
    tint: "color-mix(in srgb, #08755e 20%, #f7faf8)",
    MiniUI: CareerSwitchMiniUI,
  },
];

function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoProgress, setAutoProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || !autoAdvanceEnabled || paused) return;

    const interval = window.setInterval(() => {
      elapsedRef.current += 50;
      setAutoProgress(Math.min((elapsedRef.current / 7000) * 100, 100));
      if (elapsedRef.current >= 7000) {
        elapsedRef.current = 0;
        setAutoProgress(0);
        setActiveIndex((current) => (current + 1) % featureTabs.length);
      }
    }, 50);

    return () => window.clearInterval(interval);
  }, [activeIndex, autoAdvanceEnabled, paused, reducedMotion]);

  const selectTab = (index: number, stopAutoAdvance = true) => {
    if (stopAutoAdvance) {
      setAutoAdvanceEnabled(false);
    }
    elapsedRef.current = 0;
    setActiveIndex(index);
    setAutoProgress(0);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % featureTabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + featureTabs.length) % featureTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = featureTabs.length - 1;
    else return;

    event.preventDefault();
    selectTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const activeTab = featureTabs[activeIndex];
  const Mock = activeTab.Mock;

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative isolate overflow-hidden px-5 pb-[72px] pt-0 sm:pb-[88px] sm:pt-0 lg:px-10 lg:pb-[110px] lg:pt-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 grid gap-5 md:gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#08755e]">Features</p>
            <h2 id="features-heading" className="mt-4 max-w-[700px] text-left text-[2rem] font-extrabold leading-[1.05] tracking-[-0.055em] text-[#101c24] sm:text-[2.35rem] lg:text-[2.8rem]">
              Everything you need to practice like it&apos;s the real thing
            </h2>
          </div>
          <p className="max-w-[360px] text-left text-[15px] leading-[1.6] text-[#617079] sm:text-[16px] lg:justify-self-end">
            Built to help you find your weak spots and fix them, one session at a time.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Interview practice features"
          className="-mx-5 mb-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {featureTabs.map((tab, index) => {
            const TabIcon = tab.icon;
            const isActive = index === activeIndex;
            return (
              <button
                key={tab.id}
                ref={(element) => { tabRefs.current[index] = element; }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls="feature-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`relative flex min-h-[44px] shrink-0 snap-start items-center gap-2 overflow-hidden rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${isActive ? "border-[#075d4c] bg-[#075d4c] text-white" : "border-[#dce5e0] bg-transparent text-[#617079] hover:border-[#c8e4d8] hover:text-[#243038]"}`}
              >
                <TabIcon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                {tab.label}
                {isActive && autoAdvanceEnabled && !reducedMotion && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/35">
                    <span className="block h-full bg-[#17a985] transition-[width] duration-100" style={{ width: `${autoProgress}%` }} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div
          id="feature-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab.id}`}
          tabIndex={0}
          className="relative overflow-hidden rounded-[28px] border border-[#dceae4] p-5 shadow-[0_20px_55px_rgba(17,74,58,0.06)] sm:p-7 lg:min-h-[480px] lg:p-10"
          style={{ background: "linear-gradient(125deg, rgba(8,117,94,0.07) 0%, #f9fbf9 54%, #f7faf8 100%)" }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 rounded-[28px] opacity-25 [background-image:radial-gradient(#cfe7dc_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_76%)]" />
          <div key={activeTab.id} className="relative z-10 grid min-h-[440px] gap-8 lg:min-h-[400px] lg:grid-cols-[2fr_3fr] lg:items-stretch lg:gap-8">
            <div className="flex flex-col justify-center py-2 lg:py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#08755e] animate-feature-copy">{activeTab.label}</p>
              <h3 className="mt-4 max-w-[440px] text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.04em] text-[#172128] sm:text-[2.125rem] animate-feature-copy">
                {activeTab.title}
              </h3>
              <p className="mt-4 max-w-[460px] text-[18px] leading-[1.65] text-[#617079] animate-feature-copy">
                {activeTab.description}
              </p>
              <ul className="mt-6 space-y-[14px]">
                {activeTab.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-[16px] font-medium leading-[1.5] text-[#42515a]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5f4ee] text-[#08755e]"><Check className="h-3 w-3" strokeWidth={2.5} /></span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <a href="#get-started" className="mt-5 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-[#08755e] transition hover:text-[#075d4c]">
                Try it yourself
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="min-w-0 lg:-mb-4">
              <div className="flex h-full min-h-[390px] flex-col overflow-hidden rounded-[20px] border border-[#dce5e0] bg-white shadow-[0_24px_60px_rgba(17,74,58,0.14)] lg:min-h-[440px] animate-feature-mock">
                <div aria-hidden="true" className="flex h-10 shrink-0 items-center gap-1.5 border-b border-[#e6ece8] bg-[#f7faf8] px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#dce5e0]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#cfe7dc]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8fcbb4]" />
                </div>
                <div className="flex flex-1 flex-col">
                  {activeTab.image ? (
                    <img src={activeTab.image} alt={`${activeTab.label} preview`} className="h-full min-h-[350px] w-full flex-1 object-cover object-top" />
                  ) : (
                    <Mock />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoItsForSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const panelButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastClickedIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handlePanelKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % personaPanels.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + personaPanels.length) % personaPanels.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = personaPanels.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    panelButtonRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="who-its-for" aria-labelledby="who-its-for-heading" className="relative px-5 pb-12 pt-[72px] sm:pb-12 sm:pt-[88px] lg:px-10 lg:pb-[72px] lg:pt-[110px]">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-9 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#08755e]">Who it&apos;s for</p>
          <h2 id="who-its-for-heading" className="mt-4 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.055em] text-[#101c24] sm:text-[2.35rem] lg:text-[2.8rem]">Built for every stage of the journey</h2>
        </header>
        <div className="flex flex-col gap-4 min-[900px]:h-[440px] min-[900px]:flex-row" onMouseLeave={() => setActiveIndex(lastClickedIndexRef.current ?? 0)}>
          {personaPanels.map((panel, index) => {
            const Icon = panel.icon;
            const MiniUI = panel.MiniUI;
            const isActive = index === activeIndex;
            return (
              <article key={panel.id} style={{ backgroundColor: panel.tint, borderColor: isActive ? "rgba(8,117,94,0.25)" : "#cfe7dc" }} className={`persona-panel relative isolate min-w-0 overflow-hidden rounded-[28px] border ${isActive ? "flex-[3] max-[899px]:h-[700px]" : "flex-[1] max-[899px]:h-[96px]"} max-[899px]:flex-none ${reducedMotion ? "transition-none" : "transition-[flex,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"}`} onMouseEnter={() => { if (window.matchMedia("(min-width: 900px)").matches) setActiveIndex(index); }}>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: "radial-gradient(circle, rgba(8,117,94,0.19) 1.5px, transparent 1.6px)", backgroundSize: "16px 16px", maskImage: "radial-gradient(ellipse at center, #000 0%, transparent 78%)" }} />
                {!isActive && <div aria-hidden="true" className="pointer-events-none absolute bottom-[-28px] right-[-26px] z-[1] text-[#08755e] opacity-[0.11]"><Icon className="h-[140px] w-[140px]" strokeWidth={1.2} /></div>}
                <button ref={(element) => { panelButtonRefs.current[index] = element; }} type="button" id={`persona-header-${panel.id}`} aria-expanded={isActive} aria-controls={`persona-region-${panel.id}`} aria-label={panel.name} onClick={() => { lastClickedIndexRef.current = index; setActiveIndex(index); }} onFocus={() => setActiveIndex(index)} onKeyDown={(event) => handlePanelKeyDown(event, index)} className={`absolute inset-0 flex flex-col items-start justify-between p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#08755e] max-[899px]:bottom-auto max-[899px]:h-[96px] max-[899px]:flex-row max-[899px]:items-center max-[899px]:gap-3 max-[899px]:px-4 max-[899px]:py-0 ${isActive ? "z-30" : "z-10"}`}>
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[17px] border border-[#cfe7dc] bg-white/75 text-[#08755e] transition-opacity max-[899px]:h-12 max-[899px]:w-12 ${isActive ? "min-[900px]:opacity-0" : "opacity-100"}`}><Icon className="h-7 w-7" strokeWidth={1.7} aria-hidden="true" /></span>
                  <span className={`flex max-w-[84%] flex-col text-[#172128] transition-opacity duration-200 motion-reduce:transition-none max-[899px]:max-w-none max-[899px]:flex-1 ${isActive ? "min-[900px]:opacity-0" : "opacity-100"}`}><span className="text-[20px] font-semibold leading-[1.15] max-[899px]:text-[18px]">{panel.name}</span><span className="mt-1 text-[14px] font-normal leading-[1.3] text-[#617079]">{panel.descriptor}</span></span>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#c8e4d8] bg-white/85 text-[#08755e] shadow-[0_4px_12px_rgba(17,74,58,0.06)] ${isActive ? "absolute right-6 top-6 z-40" : "absolute bottom-6 right-6 max-[899px]:static max-[899px]:ml-auto max-[899px]:h-8 max-[899px]:w-8"}`}><span aria-hidden="true" className={`block text-[26px] font-normal leading-none transition-transform duration-300 motion-reduce:transition-none ${isActive ? "rotate-45" : "rotate-0"}`}>+</span></span>
                </button>
                <div id={`persona-region-${panel.id}`} role="region" aria-labelledby={`persona-header-${panel.id}`} aria-hidden={!isActive} className={`persona-panel-content pointer-events-none absolute inset-x-6 bottom-5 top-6 z-20 flex flex-col gap-5 min-[900px]:bottom-11 min-[900px]:grid min-[900px]:grid-cols-2 min-[900px]:gap-6 max-[899px]:inset-x-5 max-[899px]:bottom-5 max-[899px]:top-[82px] ${reducedMotion ? "transition-none" : `transition-[opacity,transform] duration-300 ${isActive ? "min-[900px]:delay-300 max-[899px]:delay-200" : "delay-0"}`} ${isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                  <div className="persona-copy-column min-w-0">
                    <div className="hidden h-14 w-14 items-center justify-center rounded-[17px] border border-[#cfe7dc] bg-white/75 text-[#08755e] min-[900px]:flex"><Icon className="h-7 w-7" strokeWidth={1.7} aria-hidden="true" /></div>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#08755e]">{panel.name}</p>
                    <h3 className="mt-2 max-w-[560px] text-[1.5rem] font-semibold leading-[1.12] tracking-[-0.025em] text-[#172128] [text-wrap:balance] sm:text-[1.65rem]">{panel.summary}</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="mb-2 text-[12px] font-semibold text-[#52636a]">What they struggle with</h4>
                        <ul className="space-y-1.5">{panel.struggles.map((item) => <li key={item} className="flex items-start gap-2 text-[13px] leading-[1.35] text-[#52636a]"><span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#82958d]" />{item}</li>)}</ul>
                      </div>
                      <div>
                        <h4 className="mb-2 text-[12px] font-semibold text-[#52636a]">How the platform helps</h4>
                        <ul className="space-y-1.5">{panel.helps.map((item) => <li key={item} className="flex items-start gap-2 text-[13px] leading-[1.35] text-[#52636a]"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#08755e]" strokeWidth={2.2} aria-hidden="true" />{item}</li>)}</ul>
                      </div>
                    </div>
                  </div>
                  <div className="persona-preview-column min-w-0 min-[900px]:min-h-0">
                    <div className="persona-mini-ui h-full min-h-[260px] w-full [backface-visibility:hidden] will-change-transform max-[899px]:rotate-0 min-[900px]:-mb-8 min-[900px]:-mr-8 min-[900px]:rotate-[1deg] min-[900px]:transform-gpu">
                      <MiniUI />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  { id: "faq-01", category: "Getting started", question: "Who is this platform for?", answer: "Students, job seekers and career switchers who want to practice interviews before the real thing." },
  { id: "faq-02", category: "Getting started", question: "Do I need any experience to start?", answer: "No. Pick a difficulty level that suits you and build up from there." },
  { id: "faq-03", category: "Getting started", question: "Is it free to use?", answer: "[Edit this answer to match your plan.]" },
  { id: "faq-04", category: "Practice and feedback", question: "How are the questions created?", answer: "Questions are generated by AI based on the role and level you choose." },
  { id: "faq-05", category: "Practice and feedback", question: "How does the feedback work?", answer: "After each answer you see what went well, what was missing and how to improve it." },
  { id: "faq-06", category: "Practice and feedback", question: "Can I retake a session?", answer: "Yes. You can repeat sessions as often as you like and compare your progress." },
  { id: "faq-07", category: "Privacy", question: "Is my data private?", answer: "[Edit this answer to match your privacy approach.]" },
  { id: "faq-08", category: "Privacy", question: "Can I delete my sessions?", answer: "[Edit this answer to match what your product supports.]" },
];

const faqCategories = ["All", "Getting started", "Practice and feedback", "Privacy"];

interface FAQCardProps {
  item: (typeof faqItems)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  idSuffix: string;
}

function FAQCard({ item, index, isOpen, onToggle, idSuffix }: FAQCardProps) {
  const headerId = `${item.id}-${idSuffix}-header`;
  const answerId = `${item.id}-${idSuffix}-answer`;

  return (
    <article
      data-faq-card
      data-faq-index={index}
      className={`faq-card overflow-hidden rounded-[20px] border bg-[#f9fbfa] transition-colors duration-200 ${isOpen ? "bg-[#edf7f2]" : ""}`}
      style={{ borderColor: isOpen ? "rgba(8,117,94,0.30)" : "#dceae4", transitionDelay: `${index * 60}ms` }}
    >
      <button
        id={headerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="w-7 shrink-0 text-[12px] font-bold text-[#08755e]">{item.id.slice(-2)}</span>
        <span className="flex-1 text-[17px] font-semibold leading-[1.4] text-[#172128] sm:text-[18px]">{item.question}</span>
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[#08755e] transition-colors duration-200 ${isOpen ? "border-[#08755e] bg-[#08755e] text-white" : "border-[#cfe7dc] bg-white"}`}>
          <span aria-hidden="true" className={`block text-[22px] font-normal leading-none transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"}`}>+</span>
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div id={answerId} role="region" aria-labelledby={headerId} aria-hidden={!isOpen} className="pb-5 pl-16 pr-5 sm:pb-6 sm:pl-[4.25rem] sm:pr-6">
            <p className="text-[15px] leading-[1.7] text-[#617079] sm:text-[16px]">{item.answer}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0].id);
  const sectionRef = useRef<HTMLElement | null>(null);

  const visibleFAQs = faqItems.filter((item) => activeCategory === "All" || item.category === activeCategory);

  useEffect(() => {
    if (!sectionRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("opacity-0", "translate-y-3");
        entry.target.classList.add("opacity-100", "translate-y-0");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    sectionRef.current.querySelectorAll("[data-faq-card]").forEach((card) => {
      card.classList.add("opacity-0", "translate-y-3", "transition-all", "duration-500", "ease-out");
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, [activeCategory]);

  useEffect(() => {
    const filteredItems = faqItems.filter((item) => activeCategory === "All" || item.category === activeCategory);
    setOpenFaqId(filteredItems[0]?.id ?? null);
  }, [activeCategory]);

  const toggleFaq = (id: string) => setOpenFaqId((current) => current === id ? null : id);

  return (
    <section ref={sectionRef} id="faq" aria-labelledby="faq-heading" className="relative px-5 py-10 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-8 flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#08755e]">FAQ</p>
            <h2 id="faq-heading" className="mt-4 max-w-[700px] text-left text-[2rem] font-extrabold leading-[1.05] tracking-[-0.055em] text-[#101c24] [text-wrap:balance] sm:text-[2.35rem] lg:text-[2.8rem]">Questions, answered</h2>
          </div>
          <a href="#get-started" className="inline-flex items-center gap-3 rounded-full border border-[#dce5e0] bg-white px-5 py-2.5 text-sm font-medium text-[#243038] transition hover:bg-[#f0f5f2]">
            Contact us <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div role="group" aria-label="Filter frequently asked questions" className="-mx-5 mb-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {faqCategories.map((category) => (
            <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)} className={`shrink-0 snap-start rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${activeCategory === category ? "border-[#075d4c] bg-[#075d4c] text-white" : "border-[#dce5e0] bg-transparent text-[#617079] hover:border-[#c8e4d8] hover:text-[#243038]"}`}>
              {category}
            </button>
          ))}
        </div>

        <div key={activeCategory} className="animate-faq-filter flex flex-col gap-3">
          {visibleFAQs.slice(0, 10).map((item, index) => (
            <FAQCard key={item.id} item={item} index={index} isOpen={openFaqId === item.id} onToggle={() => toggleFaq(item.id)} idSuffix="faq" />
          ))}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[25px] border border-[#d7eee5] bg-[#effaf6] px-6 py-7 sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(8,117,94,0.18) 1.5px, transparent 1.6px)", backgroundSize: "16px 16px", maskImage: "radial-gradient(ellipse at center, #000 0%, transparent 78%)" }} />
          <div className="relative z-10 flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-[#d7efe6] bg-[#eaf7f2] text-[#08755e]"><MessageSquareText className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <h3 className="text-[1.35rem] font-semibold leading-[1.2] text-[#172128]">Still have questions?</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-[#617079]">Reach out and we&apos;ll get back to you.</p>
            </div>
          </div>
          <a href="#get-started" className="relative z-10 mt-5 inline-flex items-center gap-3 rounded-full bg-[#075d4c] px-6 py-3 text-sm font-semibold text-white shadow-[0_9px_22px_rgba(7,93,76,.18)] transition hover:-translate-y-0.5 hover:bg-[#064f41] lg:mt-0">
            Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeNavItem, setActiveNavItem] = useState("");

  useEffect(() => {
    const targets = navItems
      .map((item) => ({ item, element: document.getElementById(item.toLowerCase().replaceAll(" ", "-")) }))
      .filter((target): target is { item: string; element: HTMLElement } => target.element instanceof HTMLElement);

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (!visibleEntries.length) return;
      const currentEntry = visibleEntries.reduce((closest, entry) =>
        Math.abs(entry.boundingClientRect.top - 120) < Math.abs(closest.boundingClientRect.top - 120) ? entry : closest
      );
      const currentItem = targets.find(({ element }) => element === currentEntry.target)?.item;
      if (currentItem) setActiveNavItem(currentItem);
    }, { rootMargin: "-16% 0px -68% 0px", threshold: [0, 0.1, 0.25] });

    targets.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7faf8] text-[#142029]">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-[#dceae4] bg-[#f7faf8]/90 backdrop-blur-[12px]">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 lg:px-10">
          <a href="#" className="flex items-center">
            <Logo size="md" />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                aria-current={activeNavItem === item ? "location" : undefined}
                className={`text-sm font-medium transition hover:text-[#08755e] ${activeNavItem === item ? "font-semibold text-[#08755e]" : "text-[#45535b]"}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-[#dce5e0] bg-white px-5 py-2.5 text-sm font-medium text-[#243038] transition hover:bg-[#f0f5f2] sm:block">
              Log in
            </button>

            <button className="rounded-full bg-[#075d4c] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_9px_22px_rgba(7,93,76,.18)] transition hover:-translate-y-0.5 hover:bg-[#064f41]">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_13%_16%,rgba(107,188,159,.18),transparent_27%),radial-gradient(circle_at_78%_8%,rgba(139,202,181,.17),transparent_23%),linear-gradient(180deg,#f7faf8_0%,#f8fbf9_100%)]" />

        <div className="mx-auto max-w-[1320px] px-5 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-16">
          <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.05fr]">
            {/* LEFT CONTENT */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe7dc] bg-[#e5f4ee] px-4 py-2 text-sm font-medium text-[#08755e]">
                <Sparkles className="h-4 w-4" />
                Practice Today. Perform Tomorrow.
              </div>

              <h1 className="mt-7 max-w-[720px] text-[3.4rem] font-extrabold leading-[.95] tracking-[-.065em] text-[#101c24] sm:text-[4.6rem] lg:text-[5.5rem]">
                Ace Your Next
                <span className="block">Interview with</span>
                <span className="block bg-gradient-to-r from-[#08755e] via-[#16a987] to-[#48c9aa] bg-clip-text text-transparent">
                  AI that Feels Real.
                </span>
              </h1>

              <p className="mt-7 max-w-[520px] text-base leading-7 text-[#617079] sm:text-[17px]">
                Verdant is an AI-powered mock interview platform where students
                can practice for real-world interviews — by chat, voice, or
                video call — for any role, anytime.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4">
                <button id="get-started" className="group inline-flex items-center gap-3 rounded-full bg-[#075d4c] px-7 py-3.5 text-base font-semibold text-white shadow-[0_14px_28px_rgba(7,93,76,.18)] transition hover:-translate-y-0.5">
                  <span>Start Practicing Free</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>

                <span className="text-sm italic text-[#68757d]">
                  No credit card required.
                </span>
              </div>

              <div className="mt-11 grid max-w-[520px] grid-cols-2 gap-4 sm:grid-cols-4">
                {heroFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.label}
                      className="group flex flex-col items-center text-center"
                    >
                      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border border-[#d8eae2] bg-[#ebf5f0] text-[#08755e] shadow-[inset_0_1px_0_white] transition group-hover:-translate-y-1 group-hover:bg-[#e2f3ec]">
                        <Icon className="h-5 w-5" strokeWidth={1.45} />
                      </div>

                      <span className="mt-2.5 max-w-[100px] text-[11px] font-semibold leading-4 text-[#2f3d46]">
                        {feature.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HERO PRODUCT MOCKUP — Right Side */}
            <div className="relative lg:min-h-[720px]">
              {/* Background glow */}
              <div className="absolute right-[-60px] top-[60px] h-[500px] w-[500px] rounded-full bg-[#dcefe8] opacity-50 blur-[120px]" />

              {/* Handwritten text — top right */}
              <div className="absolute right-0 -top-2 z-30 hidden max-w-[220px] text-right font-[cursive] text-[20px] italic leading-[1.2] text-[#34434a] lg:block">
                Different Roles.
                <br />
                Real Conversations.
                <br />
                <span className="ml-6">Better You.</span>
                <svg className="ml-auto mt-1" width="30" height="22" viewBox="0 0 30 22" fill="none">
                  <path d="M3 20C8 11 16 5 28 3" stroke="#34434a" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                  <path d="M22 1L28 3L24 8" stroke="#34434a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>

              {/* Composition wrapper */}
              <div className="relative pt-16 lg:pt-14">
                {/* Chat Mockup — positioned left */}
                <div className="relative z-10 inline-block rotate-[1deg]">
                  <ChatMockup />
                </div>

                {/* Video Mockup — no longer overlapping */}
                <div className="absolute right-[-50px] top-[100px] z-20 hidden sm:block lg:right-[-60px]">
                  <VideoMockup />
                </div>

                {/* Feedback Card — below, shifted right */}
                <div className="relative z-30 -mt-3 ml-8 w-[100%] rotate-[1deg]">
                  <FeedbackCard />
                </div>
              </div>
            </div>
          </div>

          {/* ROLE CHIPS */}
          <div id="roles" className="mt-14 scroll-mt-[92px] border-t border-[#e6ece8] pt-8">
            <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[.22em] text-[#899399]">
              Prepare for roles like
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                ...roles.map((r) => r.title),
                "and more...",
              ].map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-[#dce4e0] bg-white/70 px-5 py-2.5 text-sm text-[#435159] shadow-[inset_0_1px_0_white]"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <WhoItsForSection />
      <FAQSection />

      {/* ================= CTA ================= */}
      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden px-5 py-20 lg:px-10 lg:py-[90px]">

        <div className="relative mx-auto max-w-[1250px] overflow-hidden rounded-[25px] border border-[#d7eee5] bg-[#effaf6] px-6 py-[55px] sm:px-10 lg:min-h-[300px] lg:px-20">

          {/* Background */}
          <div className="pointer-events-none absolute inset-0">

            <div className="absolute left-1/2 top-[-130px] h-[230px] w-[520px] -translate-x-1/2 rounded-full bg-[#e9f8f3] blur-[35px]" />

            <div className="absolute left-[-100px] top-[40px] h-[220px] w-[300px] rounded-full bg-[#e5f7f1] blur-[55px]" />

            <div className="absolute right-[-100px] top-[30px] h-[230px] w-[320px] rounded-full bg-[#e4f6ef] blur-[55px]" />

            <svg
              className="absolute bottom-0 left-0 h-[125px] w-full"
              viewBox="0 0 1250 160"
              preserveAspectRatio="none"
            >
              <path
                d="M0 95 C120 30 205 30 320 88 C430 145 515 145 625 95 C735 45 820 42 930 92 C1040 143 1140 142 1250 75 L1250 160 L0 160 Z"
                fill="#dff5ee"
              />

              <path
                d="M0 125 C130 65 220 62 335 112 C450 162 525 158 635 110 C745 62 825 60 945 112 C1055 158 1150 155 1250 100 L1250 160 L0 160 Z"
                fill="#e8f8f3"
              />
            </svg>

          </div>


          {/* Handwritten left */}
          <div className="pointer-events-none absolute left-[38px] top-1/2 hidden -translate-y-1/2 -rotate-[8deg] lg:block">

            <div className={`${caveat.className} text-[27px] font-semibold leading-[.9] text-[#56686f]`}>
              Practice.
              <br />
              Learn.
              <br />
              Grow.
              <br />
              Repeat.
            </div>

            <div className="ml-[38px] mt-2 h-[2px] w-[65px] rotate-[4deg] rounded-full bg-[#48c9aa]" />

          </div>


          {/* Handwritten right */}
          <div className="pointer-events-none absolute right-[38px] top-1/2 hidden translate-y-[-46%] rotate-[7deg] text-right lg:block">

            <div className={`${caveat.className} text-[27px] font-semibold leading-[.92] text-[#56686f]`}>
              Better
              <br />
              Interviews.
              <br />
              Brighter
              <br />
              Futures.
            </div>

            <div className="ml-auto mr-[12px] mt-2 h-[2px] w-[65px] rotate-[-3deg] rounded-full bg-[#48c9aa]" />

          </div>


          {/* CTA */}
          <div className="relative z-10 mx-auto max-w-[780px] text-center">

            <p className="text-[10px] font-semibold uppercase tracking-[.19em] text-[#72857f] sm:text-[11px]">
              Your Next Opportunity Is Closer Than You Think
            </p>

            <h2 className="mt-4 text-[31px] font-extrabold leading-[1.05] tracking-[-.055em] text-[#101c24] sm:text-[39px] lg:text-[42px]">
              Start Your Interview Practice{" "}
              <span className="text-[#08755e]">Today</span>
            </h2>

            {/* <div className="mt-3 flex items-center justify-center gap-[5px]">
              <span className="h-[1.5px] w-[20px] rotate-[35deg] rounded-full bg-[#48c9aa]" />
              <span className="h-[1.5px] w-[12px] rotate-[55deg] rounded-full bg-[#48c9aa]" />
              <span className="h-[5px] w-[5px] rounded-full bg-[#48c9aa]" />
              <span className="h-[1.5px] w-[12px] -rotate-[55deg] rounded-full bg-[#48c9aa]" />
              <span className="h-[1.5px] w-[20px] -rotate-[35deg] rounded-full bg-[#48c9aa]" />
            </div> */}

            <button className="group mt-6 inline-flex items-center gap-4 rounded-full bg-[#075d4c] px-8 py-[14px] text-[14px] font-semibold text-white shadow-[0_12px_25px_rgba(7,93,76,.19)] transition hover:-translate-y-0.5 hover:bg-[#064f41]">
              Get Started for Free
              <ArrowRight className="h-[17px] w-[17px] transition group-hover:translate-x-1" />
            </button>

            <p className="mt-3 text-[11px] text-[#72857f]">
              No credit card required.
            </p>

          </div>

        </div>
      </section>


      {/* ================= FOOTER ================= */}
      {/* ================= FOOTER ================= */}
      <footer className="relative overflow-hidden bg-[#fbfdfc]">

        {/* =========================================
      DECORATIVE BACKGROUND WAVES
  ========================================== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Bottom left main wave */}
          <svg
            className="absolute bottom-[-2px] left-[-5%] h-[240px] w-[55%] min-w-[600px]"
            viewBox="0 0 700 240"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="
          M0 145
          C95 75 170 72 265 125
          C350 174 430 180 520 132
          C590 94 650 94 700 110
          L700 240
          L0 240
          Z
        "
              fill="#e1f5ee"
            />

            <path
              d="
          M0 180
          C110 108 190 108 280 155
          C370 201 450 200 535 153
          C600 117 660 116 700 130
          L700 240
          L0 240
          Z
        "
              fill="#edf9f5"
            />
          </svg>


          {/* Bottom right main wave */}
          <svg
            className="absolute bottom-[-5px] right-[-5%] h-[250px] w-[53%] min-w-[600px]"
            viewBox="0 0 700 250"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="
          M0 150
          C85 88 160 85 250 130
          C340 175 420 178 505 128
          C595 77 650 78 700 115
          L700 250
          L0 250
          Z
        "
              fill="#e2f6ef"
            />

            <path
              d="
          M0 190
          C90 128 170 124 265 165
          C355 204 430 208 515 163
          C600 118 655 120 700 145
          L700 250
          L0 250
          Z
        "
              fill="#eefaf6"
            />
          </svg>


          {/* Top right subtle glow */}
          {/* <div className="absolute right-[-130px] top-[-130px] h-[300px] w-[450px] rounded-full bg-[#effaf7]" /> */}

          {/* Bottom glow */}
          <div className="absolute bottom-[-100px] left-1/2 h-[250px] w-[700px] -translate-x-1/2 rounded-full bg-[#f0faf7] blur-[40px]" />
        </div>


        {/* =========================================
      FOOTER CONTAINER
  ========================================== */}
        <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">

          {/* Top divider */}
          <div className="border-t border-[#dcebe5]" />


          {/* =====================================
        FOOTER MAIN GRID
    ====================================== */}
          <div className="grid gap-12 border-b border-[#e1ece7] py-12 md:grid-cols-2 lg:grid-cols-[1.55fr_1fr_1fr_1fr_1.45fr] lg:gap-8 lg:py-14">


            {/* =================================
          BRAND
      ================================== */}
            <div>

              <a
                href="#"
                className="inline-block"
              >
                <Logo size="footer" />
              </a>


              <p className="mt-4 text-[14px] font-medium text-[#667980]">
                Practice today. Perform tomorrow.
              </p>


              <p className="mt-3 max-w-[285px] text-[14px] leading-[1.7] text-[#718087]">
                AI-powered mock interview platform for students to build confidence,
                improve skills, and land their dream opportunities.
              </p>


              {/* =================================
            SOCIAL MEDIA ICONS
        ================================== */}
              <div className="mt-6 flex items-center gap-[10px]">

                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="group flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#eaf7f2] text-[#2d5f54] transition-all duration-200 hover:-translate-y-1 hover:bg-[#d8f1e8]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>


                {/* Twitter / X */}
                <a
                  href="#"
                  aria-label="Twitter"
                  className="group flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#eaf7f2] text-[#2d5f54] transition-all duration-200 hover:-translate-y-1 hover:bg-[#d8f1e8]"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>


                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="group flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#eaf7f2] text-[#2d5f54] transition-all duration-200 hover:-translate-y-1 hover:bg-[#d8f1e8]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>


                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="group flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#eaf7f2] text-[#2d5f54] transition-all duration-200 hover:-translate-y-1 hover:bg-[#d8f1e8]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>


                {/* GitHub */}
                <a
                  href="#"
                  aria-label="GitHub"
                  className="group flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#eaf7f2] text-[#2d5f54] transition-all duration-200 hover:-translate-y-1 hover:bg-[#d8f1e8]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>

              </div>
            </div>


            {/* =================================
          PRODUCT
      ================================== */}
            <div>

              <h3 className="text-[14px] font-bold text-[#17242c]">
                Product
              </h3>

              <div className="mt-5 space-y-[11px] text-[14px] text-[#718087]">

                <a
                  href="#features"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Features
                </a>

                <a
                  href="#roles"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Roles
                </a>

                <a
                  href="#how-it-works"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  How it Works
                </a>

                <a
                  href="#pricing"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Pricing
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  For Students
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  For Educators
                </a>

              </div>
            </div>


            {/* =================================
          COMPANY
      ================================== */}
            <div>

              <h3 className="text-[14px] font-bold text-[#17242c]">
                Company
              </h3>

              <div className="mt-5 space-y-[11px] text-[14px] text-[#718087]">

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  About Us
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Our Mission
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Careers
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Blog
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Press
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Contact
                </a>

              </div>
            </div>


            {/* =================================
          RESOURCES
      ================================== */}
            <div>

              <h3 className="text-[14px] font-bold text-[#17242c]">
                Resources
              </h3>

              <div className="mt-5 space-y-[11px] text-[14px] text-[#718087]">

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Interview Tips
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Resume Guide
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Sample Questions
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Success Stories
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Help Center
                </a>

                <a
                  href="#"
                  className="block transition-colors duration-200 hover:text-[#08755e]"
                >
                  Community
                </a>

              </div>
            </div>


            {/* =================================
          NEWSLETTER
      ================================== */}
            <div className="border-l border-[#e3eee9] pl-7">

              <h3 className="text-[14px] font-bold text-[#17242c]">
                Stay in the Loop
              </h3>

              <p className="mt-2 max-w-[240px] text-[14px] leading-[1.65] text-[#718087]">
                Get the latest updates, interview tips, and product news.
              </p>


              <div className="mt-5 flex h-[54px] overflow-hidden rounded-full border border-[#dce9e3] bg-white p-[4px] shadow-[0_4px_15px_rgba(20,70,55,.035)]">

                <input
                  type="email"
                  aria-label="Email address"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent px-4 text-[13px] text-[#52676d] outline-none placeholder:text-[#9aa9aa]"
                />

                <button
                  aria-label="Subscribe"
                  className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#075d4c] text-white transition-all duration-200 hover:bg-[#064f41] hover:shadow-[0_6px_15px_rgba(7,93,76,.18)]"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>

              </div>

              <p className="mt-3 text-[11px] text-[#8b9a9b]">
                No spam. Just valuable updates.
              </p>

            </div>

          </div>


          {/* =====================================
        BOTTOM BAR
    ====================================== */}
          <div className="relative z-10 flex flex-col justify-between gap-5 py-6 text-[12px] text-[#899399] sm:flex-row sm:items-center">

            <span>
              © 2026 Verdant. All rights reserved.
            </span>


            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">

              <a
                href="#"
                className="transition-colors hover:text-[#08755e]"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="transition-colors hover:text-[#08755e]"
              >
                Terms of Service
              </a>

              <a
                href="#"
                className="transition-colors hover:text-[#08755e]"
              >
                Cookie Policy
              </a>

            </div>


            <span className="flex items-center gap-2">
              <span className="h-5 w-px bg-[#dce9e3]" />
              Built for dreamers, by believers.
              <span className="ml-0.5">💚</span>
            </span>

          </div>

        </div>


        {/* =========================================
      BOTTOM RIGHT HANDWRITTEN NOTE
  ========================================== */}
        <div className="pointer-events-none absolute bottom-[20px] right-[38px] hidden rotate-[5deg] xl:block">

          <div className="font-[var(--font-caveat)] text-[19px] font-semibold leading-[0.9] text-[#64757b]">
            Same
            <br />
            Students.
            <br />
            Brighter
            <br />
            Tomorrows.
          </div>

          <svg
            className="ml-[28px] mt-2 h-[22px] w-[65px]"
            viewBox="0 0 65 22"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 11C15 5 31 5 47 9C54 11 59 13 63 16"
              stroke="#48c9aa"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

        </div>

      </footer>

    </main>
  );
}