"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Code2,
  Crown,
  FileText,
  GraduationCap,
  Layers,
  Menu,
  MessageSquare,
  MessageSquareText,
  Mic,
  RotateCcw,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Video,
  X,
  Zap,
} from "lucide-react";
import { useSession } from "@/components/auth/AppProviders";
import { logout } from "@/lib/auth-client";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
});

const navItems = ["Features", "How it Works", "Pricing", "FAQ"];

const heroFeatures = [
  { label: "Chat Interviews", icon: MessageSquare },
  { label: "Voice Interviews", icon: Mic, comingSoon: true },
  { label: "Video Interviews", icon: Video, comingSoon: true },
  { label: "AI Feedback", icon: BarChart3 },
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
    title: "Practice Without Feedback",
    description: "You finish an interview but don't know why your answer wasn't strong.",
    icon: MessageSquareText,
  },
  {
    title: "Practice Without Pressure",
    description: "Reading answers is different from answering a real interviewer.",
    icon: Clock3,
  },
  {
    title: "Practice Without Direction",
    description: "You keep practicing what you're already comfortable with instead of fixing your weaknesses.",
    icon: Target,
  },
];

const howItWorksSteps = [
  {
    step: "Step 01",
    title: "Choose Your Role",
    description: "Select your target role, experience level, interview type, and difficulty.",
    pills: ["Role-based", "Difficulty levels"],
  },
  {
    step: "Step 02",
    title: "Start the Interview",
    description: "Practice with an AI interviewer that asks realistic questions and follows up based on your answers.",
    pills: ["AI-generated questions", "Adaptive follow-ups"],
  },
  {
    step: "Step 03",
    title: "Get Instant Feedback",
    description: "Understand what you did well and exactly where you need to improve.",
    pills: ["Detailed review", "Actionable tips"],
  },
  {
    step: "Step 04",
    title: "Improve & Repeat",
    description: "Use your feedback to focus your preparation and come back stronger.",
    pills: ["Progress tracking", "Targeted practice"],
  },
];

const faqItems = [
  { id: "faq-01", category: "Getting started", question: "What is Verdant?", answer: "Verdant is an AI-powered mock interview platform that helps you practice realistic interviews, receive instant feedback, and systematically improve your performance before real interviews." },
  { id: "faq-02", category: "Getting started", question: "How does the AI mock interview work?", answer: "You choose a role and difficulty, then answer AI-generated interview questions in a chat format. The AI adapts follow-up questions based on your responses, simulating a real interview experience." },
  { id: "faq-03", category: "Getting started", question: "Which roles can I practice for?", answer: "Verdant supports practice interviews for Software Engineers, Product Managers, Data Analysts, Business Analysts, UX Designers, and Marketing roles — with more being added." },
  { id: "faq-04", category: "Getting started", question: "Is Verdant free?", answer: "Yes. You can start practicing for free with limited interviews per month. A Pro plan with additional features is coming soon." },
  { id: "faq-05", category: "Practice and feedback", question: "How does Verdant evaluate my answers?", answer: "After each answer, our AI evaluates your response across multiple dimensions including technical knowledge, communication clarity, confidence, problem-solving approach, and answer structure." },
  { id: "faq-06", category: "Practice and feedback", question: "Can I retake a session?", answer: "Yes. You can repeat sessions as often as you like and compare your progress over time." },
  { id: "faq-07", category: "Practice and feedback", question: "Can I practice with voice?", answer: "Voice interviews are coming soon. Currently, all interviews are conducted via text chat." },
  { id: "faq-08", category: "Practice and feedback", question: "Can I track my improvement?", answer: "Yes. Your interview history and performance metrics are saved so you can track progress and identify areas that need more practice." },
  { id: "faq-09", category: "Privacy", question: "Is my interview data private?", answer: "Your interview data is stored securely and is only accessible to you. We do not share your responses or performance data with third parties." },
  { id: "faq-10", category: "Privacy", question: "Can I delete my data?", answer: "Yes. You can delete your interview history and account data at any time from your account settings." },
];

const faqCategories = ["All", "Getting started", "Practice and feedback", "Privacy"];

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

  return (
    <div className={`inline-flex items-center gap-2 ${current.wrapper} ${className}`}>
      <svg
        width={current.icon}
        height={current.icon}
        viewBox="0 0 223 184"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Verdant logo"
        className="shrink-0"
      >
        {/* Left arm — light mint */}
        <path
          d="M 26.3,29.2 Q 22.0,18.0 34.0,18.2 L 66.0,18.8 Q 78.0,19.0 82.8,30.0 L 137.2,154.0 Q 142.0,165.0 130.0,164.4 L 90.0,162.6 Q 78.0,162.0 73.7,150.8 Z"
          fill="#83DDC5"
        />
        {/* Right arm — dark teal */}
        <path
          d="M 144.2,29.6 Q 150.0,19.0 162.0,19.6 L 198.0,21.4 Q 210.0,22.0 205.2,33.0 L 160.8,134.0 Q 156.0,145.0 150.2,134.5 L 124.8,88.5 Q 119.0,78.0 124.6,67.4 Z"
          fill="#0B705F"
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
    <div className="relative w-full max-w-[220px] rotate-[2deg] rounded-[20px] border border-white/70 bg-white/70 p-2.5 shadow-[0_24px_65px_rgba(17,60,48,0.20)] backdrop-blur-xl sm:max-w-[240px] lg:max-w-[280px] lg:rounded-[22px] lg:p-3">
      <img
        src="/images/videoInterview.png"
        alt="Video interview preview"
        className="block w-full rounded-[14px] object-cover lg:rounded-[16px]"
        style={{ aspectRatio: "3/4" }}
      />
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="relative w-full max-w-[420px] rounded-[20px] border border-[#dfe8e3] bg-white p-4 shadow-[0_20px_55px_rgba(20,58,47,0.10)] sm:rounded-[22px] sm:p-6">
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
    <div className="w-full rounded-[18px] border border-[#dceae4] bg-[#edf7f2] p-4 shadow-[0_16px_45px_rgba(17,74,58,0.08)] sm:rounded-[20px] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#17a985] shadow-[0_2px_8px_rgba(23,169,133,0.1)]">
              <BarChart3 className="h-3.5 w-3.5" />
            </div>
            <span className="text-[15px] font-bold text-[#172128] sm:text-[16px]">
              AI Feedback
            </span>
          </div>

          <div className="space-y-3">
            {feedbackMetrics.map((metric) => (
              <div key={metric.label} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 sm:grid-cols-[118px_1fr_32px]">
                <span className="text-[12px] text-[#3d4c53] sm:text-[13px]">
                  {metric.label}
                </span>
                <span className="text-right text-[12px] font-semibold text-[#253039] sm:hidden">
                  {metric.value.toFixed(1)}
                </span>
                <div className="col-span-2 h-[7px] overflow-hidden rounded-full bg-[#d4e6dd] sm:col-span-1">
                  <div
                    className="h-full rounded-full bg-[#17a985]"
                    style={{ width: `${metric.value * 10}%` }}
                  />
                </div>
                <span className="hidden text-right text-[13px] font-semibold text-[#253039] sm:block">
                  {metric.value.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-row items-center gap-3 rounded-[14px] bg-white/70 px-4 py-3 text-left shadow-[0_4px_16px_rgba(17,74,58,0.05)] sm:w-[160px] sm:flex-col sm:justify-center sm:px-4 sm:py-5 sm:text-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#17a985] text-white shadow-[0_8px_20px_rgba(23,169,133,0.25)] sm:mb-1.5 sm:h-11 sm:w-11">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          </div>
          <div>
            <div className="text-[14px] font-bold leading-[1.2] text-[#1a1d1f] sm:text-[15px]">
              Keep going!
            </div>
            <div className="mt-0.5 text-[12px] leading-[1.4] text-[#5a6a72] sm:text-[13px]">
              You&apos;re on the right track.
            </div>
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
            You don&apos;t need more interview questions. You need better practice.
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-[1.7] text-[#617079] sm:text-[16px]">
            Watching interview videos and memorizing answers isn&apos;t enough. Real interviews require you to think, communicate, and perform under pressure.
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

function smoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function ProgressTrendChart({ compact = false }: { compact?: boolean }) {
  const gradientId = `progressFill_${useId().replace(/:/g, "")}`;
  const glowId = `progressGlow_${useId().replace(/:/g, "")}`;
  const scores = [5.4, 6.4, 7.0, 8.2, 9.1];
  const previousScores = [4.8, 5.5, 5.9, 6.4, 6.8];
  const plot = (score: number) => 28 + ((10 - score) / 6) * 108;
  const xs = [52, 118, 184, 250, 316];
  const current = scores.map((score, i) => ({ x: xs[i], y: plot(score), score }));
  const previous = previousScores.map((score, i) => ({ x: xs[i], y: plot(score) }));
  const currentLine = smoothPath(current);
  const previousLine = smoothPath(previous);
  const currentArea = `${currentLine} L ${current[current.length - 1].x} 148 L ${current[0].x} 148 Z`;

  return (
    <div className={`flex h-full min-h-0 flex-col ${compact ? "" : "rounded-[16px] border border-[#e2eae6] bg-gradient-to-b from-white to-[#f7fbf9] p-3 sm:p-4"}`}>
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold text-[#243038] sm:text-[13px]">Performance trend</p>
          <p className="mt-0.5 text-[11px] text-[#72878d]">Average score across 5 sessions</p>
        </div>
        <div className="rounded-full bg-[#eaf7f2] px-2.5 py-1 text-[11px] font-semibold text-[#08755e]">
          +3.7
        </div>
      </div>
      <svg
        viewBox="0 0 360 176"
        className={`w-full ${compact ? "h-[148px] sm:h-[158px]" : "h-[140px] sm:h-[156px]"}`}
        role="img"
        aria-label="Interview score improving from 5.4 to 9.1 across five sessions"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#17a985" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#17a985" stopOpacity="0" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[28, 64, 100, 136].map((y, index) => (
          <line key={y} x1="36" x2="336" y1={y} y2={y} stroke={index === 3 ? "#dce6e1" : "#edf3f0"} strokeWidth="1" />
        ))}
        {["10", "8", "6", "4"].map((label, index) => (
          <text key={label} x="6" y={[32, 68, 104, 140][index]} fill="#8a989e" fontSize="9" fontFamily="inherit">
            {label}
          </text>
        ))}
        <path d={currentArea} fill={`url(#${gradientId})`} />
        {!compact && (
          <path d={previousLine} className="animate-chart-line" stroke="#b7d7c9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 5" fill="none" />
        )}
        <path d={currentLine} className="animate-chart-line" stroke="#08755e" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" filter={`url(#${glowId})`} />
        {current.map((point, index) => (
          <g key={point.x}>
            <circle cx={point.x} cy={point.y} r="5.5" fill="white" />
            <circle cx={point.x} cy={point.y} r="3.4" fill="#08755e" />
            {(compact || index === 0 || index === current.length - 1) && (
              <text x={point.x} y={point.y - 10} textAnchor="middle" fill="#075d4c" fontSize="10" fontWeight="700" fontFamily="inherit">
                {point.score.toFixed(1)}
              </text>
            )}
          </g>
        ))}
        {["S1", "S2", "S3", "S4", "S5"].map((label, index) => (
          <text key={label} x={current[index].x} y="166" textAnchor="middle" fill="#8a989e" fontSize="10" fontFamily="inherit">
            {label}
          </text>
        ))}
      </svg>
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#52636a] sm:text-[12px]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-3.5 rounded-full bg-[#08755e]" />
          This week
        </span>
        {!compact && (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-px w-3.5 border-t-2 border-dashed border-[#b7d7c9]" />
            Last week
          </span>
        )}
      </div>
    </div>
  );
}

function StepPreview({ activeStep }: { activeStep: number }) {
  return (
    <div aria-hidden="true" className="mt-6 hidden h-[340px] w-full max-w-[420px] flex-col overflow-hidden rounded-[24px] border border-[#dceae4] bg-white p-5 shadow-[0_16px_38px_rgba(17,74,58,0.08)] lg:flex">
      <p className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#72878d]">Step {String(activeStep + 1).padStart(2, "0")} preview</p>
      <div key={activeStep} className="animate-timeline-preview mt-3 flex min-h-0 flex-1 flex-col">
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
            <ProgressTrendChart compact />
            <button tabIndex={-1} className="mt-3 inline-flex h-9 w-fit items-center rounded-full border border-[#dce5e0] bg-white px-4 text-[14px] font-medium text-[#243038] transition hover:bg-[#f0f5f2]">Retake session</button>
          </div>
        )}
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const { openSignup } = useAuthModal();
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

          <button
            type="button"
            onClick={openSignup}
            className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#dce5e0] bg-white px-5 py-2.5 text-sm font-medium text-[#243038] transition hover:bg-[#f0f5f2]"
          >
            Start Free Interview <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
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

function AIQuestionsMock() {
  return (
    <div aria-hidden="true" className="flex h-full min-h-[300px] flex-col bg-white p-4 sm:min-h-[370px] sm:p-5">
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
    <div aria-hidden="true" className="flex h-full min-h-[300px] flex-col gap-4 bg-white p-4 sm:min-h-[370px] sm:p-5">
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
    <div aria-hidden="true" className="flex h-full min-h-[300px] flex-col bg-white p-4 sm:min-h-[370px] sm:p-5">
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
    <div aria-hidden="true" className="flex h-full min-h-[300px] flex-col bg-white p-4 sm:min-h-[370px] sm:p-5">
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
    <div aria-hidden="true" className="flex h-full min-h-[300px] flex-col gap-3 bg-white p-4 sm:min-h-[370px] sm:p-5">
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
        <ProgressTrendChart />
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

function FeaturesSection() {
  const { openSignup } = useAuthModal();
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
          <div key={activeTab.id} className="relative z-10 grid min-h-0 gap-8 lg:min-h-[400px] lg:grid-cols-[2fr_3fr] lg:items-stretch lg:gap-8">
            <div className="flex flex-col justify-center py-2 lg:py-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#08755e] animate-feature-copy">{activeTab.label}</p>
              <h3 className="mt-4 max-w-[440px] text-[1.55rem] font-semibold leading-[1.12] tracking-[-0.04em] text-[#172128] sm:text-[2.125rem] animate-feature-copy">
                {activeTab.title}
              </h3>
              <p className="mt-4 max-w-[460px] text-[16px] leading-[1.65] text-[#617079] sm:text-[18px] animate-feature-copy">
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
              <button type="button" onClick={openSignup} className="mt-5 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-[#08755e] transition hover:text-[#075d4c]">
                Start Free Interview
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="min-w-0 lg:-mb-4">
              <div className="flex h-full min-h-[300px] flex-col overflow-hidden rounded-[20px] border border-[#dce5e0] bg-white shadow-[0_24px_60px_rgba(17,74,58,0.14)] sm:min-h-[390px] lg:min-h-[440px] animate-feature-mock">
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

// ============================================================
// PART 2 — New sections + WhoItsFor + FAQ + Home component
// This will be concatenated with part 1
// ============================================================

function ImprovementLoopSection() {
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

  const loopSteps = [
    { label: "Interview", icon: MessageSquare, color: "#08755e" },
    { label: "Feedback", icon: BarChart3, color: "#16a987" },
    { label: "Weakness", icon: Target, color: "#48c9aa" },
    { label: "Targeted Practice", icon: Layers, color: "#16a987" },
    { label: "Improvement", icon: TrendingUp, color: "#08755e" },
  ];

  return (
    <section
      ref={sectionRef}
      id="improvement-loop"
      aria-labelledby="improvement-loop-heading"
      className="relative px-5 py-[72px] sm:py-[88px] lg:px-10 lg:py-[110px]"
    >
      <div className="mx-auto max-w-[1320px]">
        <div
          data-fade-item
          className="mx-auto max-w-[760px] text-center transition duration-700 ease-out"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#08755e]">
            The Verdant method
          </p>
          <h2
            id="improvement-loop-heading"
            className="mt-4 text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.055em] text-[#101c24] sm:text-[2.6rem] lg:text-[3.2rem]"
          >
            Don&apos;t Just Practice.{" "}
            <span className="text-[#08755e]">Improve.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-[1.7] text-[#617079] sm:text-[16px]">
            Every interview should teach you something about how you
            perform&mdash;and what you should work on next.
          </p>
        </div>

        {/* Loop visualization */}
        <div
          data-fade-item
          className="mx-auto mt-12 max-w-[980px] transition duration-700 ease-out"
        >
          <div className="rounded-[24px] border border-[#dceae4] bg-white p-5 shadow-[0_16px_40px_rgba(17,74,58,0.06)] sm:p-8">
            <ol className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
              {loopSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={step.label} className="flex items-center gap-3 sm:min-w-0 sm:flex-1 sm:flex-col sm:items-center sm:gap-3 sm:text-center">
                    <div className="flex items-center sm:w-full">
                      <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#dceae4] bg-[#f7faf8] shadow-[0_8px_20px_rgba(17,74,58,0.06)] sm:mx-auto sm:h-14 sm:w-14">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: step.color }} strokeWidth={1.8} />
                      </span>
                      {index < loopSteps.length - 1 && (
                        <span aria-hidden="true" className="relative mx-2 hidden h-px flex-1 bg-gradient-to-r from-[#cfe7dc] to-[#eaf7f2] sm:block">
                          <ChevronRight className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b7d7c9]" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a989e]">
                        0{index + 1}
                      </p>
                      <p className="mt-0.5 text-[13px] font-semibold leading-snug text-[#243038] sm:text-[14px]">
                        {step.label}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 flex items-center justify-center gap-3 rounded-[16px] border border-dashed border-[#c8e4d8] bg-[#f7faf8] px-4 py-3 sm:mt-8">
              <RotateCcw className="h-4 w-4 shrink-0 text-[#08755e]" strokeWidth={2} />
              <span className="text-[13px] font-medium leading-[1.45] text-[#52636a]">
                Then interview again&mdash;better prepared each time.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DifferentiationSection() {
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

  const rows = [
    { traditional: "Read questions", verdant: "Practice answering" },
    { traditional: "Memorize answers", verdant: "Think under pressure" },
    { traditional: "Generic feedback", verdant: "Personalized feedback" },
    { traditional: "Random practice", verdant: "Targeted practice" },
    { traditional: "One-time score", verdant: "Track your progress" },
    { traditional: "Static questions", verdant: "Adaptive interviews" },
  ];

  return (
    <section
      ref={sectionRef}
      id="why-verdant"
      aria-labelledby="why-verdant-heading"
      className="relative px-5 py-[72px] sm:py-[88px] lg:px-10 lg:py-[110px]"
    >
      <div className="mx-auto max-w-[1320px]">
        <div
          data-fade-item
          className="mx-auto max-w-[760px] text-center transition duration-700 ease-out"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#08755e]">
            Why Verdant
          </p>
          <h2
            id="why-verdant-heading"
            className="mt-4 text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.055em] text-[#101c24] sm:text-[2.6rem] lg:text-[3.2rem]"
          >
            Not Another Question Generator.
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-[1.7] text-[#617079] sm:text-[16px]">
            Most interview prep tools give you a list of questions and leave you
            on your own. Verdant is designed to actually make you better.
          </p>
        </div>

        <div
          data-fade-item
          className="mx-auto mt-12 max-w-[780px] overflow-hidden rounded-[22px] border border-[#dceae4] bg-white shadow-[0_10px_30px_rgba(18,61,49,0.04)] transition duration-700 ease-out"
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr] border-b border-[#e6ece8] bg-[#f7faf8]">
            <div className="px-3 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#72878d] sm:px-6 sm:py-4 sm:text-[13px]">
              Traditional Prep
            </div>
            <div className="border-l border-[#e6ece8] px-3 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#08755e] sm:px-6 sm:py-4 sm:text-[13px]">
              Verdant
            </div>
          </div>

          {/* Table rows */}
          {rows.map((row, index) => (
            <div
              key={row.traditional}
              className={`grid grid-cols-[1fr_1fr] ${
                index < rows.length - 1 ? "border-b border-[#edf2ef]" : ""
              }`}
            >
              <div className="px-3 py-3 text-[13px] leading-[1.45] text-[#617079] sm:px-6 sm:py-4 sm:text-[15px]">
                {row.traditional}
              </div>
              <div className="flex items-center gap-2 border-l border-[#edf2ef] bg-[#fafdfb] px-3 py-3 text-[13px] font-medium leading-[1.45] text-[#243038] sm:gap-2.5 sm:px-6 sm:py-4 sm:text-[15px]">
                <Check
                  className="h-4 w-4 shrink-0 text-[#08755e]"
                  strokeWidth={2.5}
                />
                {row.verdant}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RolesSection() {
  return (
    <section
      id="roles"
      aria-labelledby="roles-heading"
      className="relative px-5 py-[72px] sm:py-[88px] lg:px-10 lg:py-[110px]"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#08755e]">
            Roles
          </p>
          <h2
            id="roles-heading"
            className="mt-4 text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.055em] text-[#101c24] sm:text-[2.6rem] lg:text-[3.2rem]"
          >
            Practice for the role you want
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#617079] sm:text-[16px]">
            Choose from a growing list of interview tracks. Each one is designed
            around what that role actually tests.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[900px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className="group rounded-[20px] border border-[#dceae4] bg-[#f9fbfa] p-6 shadow-[0_10px_30px_rgba(18,61,49,0.04)] transition duration-200 ease-out hover:-translate-y-1 hover:border-[#c9e7dc] hover:shadow-[0_16px_36px_rgba(15,140,108,0.10)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#d8efe6] bg-[#e9f7f1] text-[#08755e]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-[1.1rem] font-semibold text-[#181f24]">
                  {role.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-[1.6] text-[#617079]">
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const { openSignup } = useAuthModal();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative px-5 py-[72px] sm:py-[88px] lg:px-10 lg:py-[110px]"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#08755e]">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="mt-4 text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.055em] text-[#101c24] sm:text-[2.6rem] lg:text-[3.2rem]"
          >
            Start free. Upgrade when you&apos;re ready.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#617079] sm:text-[16px]">
            Experience Verdant with our free plan. Unlock your full preparation
            potential with Pro.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[820px] gap-6 md:grid-cols-2">
          {/* Free tier */}
          <div className="animate-pricing-in rounded-[24px] border border-[#dceae4] bg-white p-7 shadow-[0_10px_30px_rgba(18,61,49,0.04)] sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#e9f7f1] text-[#08755e]">
                <Sparkles className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-[1.25rem] font-semibold text-[#172128]">
                  Free
                </h3>
                <p className="text-[13px] text-[#617079]">Experience Verdant</p>
              </div>
            </div>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-[2.5rem] font-extrabold tracking-[-0.04em] text-[#101c24]">
                ₹0
              </span>
              <span className="text-[15px] text-[#617079]">/ forever</span>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                "Limited interviews per month",
                "Role-based interviews",
                "Basic AI feedback",
                "Interview history",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-[15px] text-[#42515a]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5f4ee] text-[#08755e]">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={openSignup}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border border-[#dce5e0] bg-white py-3.5 text-[15px] font-semibold text-[#243038] transition hover:bg-[#f0f5f2]"
            >
              Start Free Interview
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Pro tier */}
          <div className="animate-pricing-in relative rounded-[24px] border-2 border-[#08755e] bg-white p-7 shadow-[0_16px_40px_rgba(8,117,94,0.12)] sm:p-8" style={{ animationDelay: "120ms" }}>
            <div className="absolute -top-3.5 left-6 rounded-full bg-[#08755e] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              Launching Soon
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#08755e] text-white">
                <Crown className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-[1.25rem] font-semibold text-[#172128]">
                  Pro
                </h3>
                <p className="text-[13px] text-[#617079]">
                  Get interview-ready
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-[1.5rem] font-bold text-[#101c24]">
                Coming soon
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                "Unlimited interviews",
                "Detailed feedback & scoring",
                "Resume-based interviews",
                "Weakness tracking",
                "Personalized preparation",
                "Priority access to new features",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-[15px] text-[#42515a]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5f4ee] text-[#08755e]">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={openSignup}
              className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#075d4c] py-3.5 text-[15px] font-semibold text-white shadow-[0_9px_22px_rgba(7,93,76,.18)] transition hover:-translate-y-0.5 hover:bg-[#064f41]"
            >
              Join Waitlist
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
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
              <article key={panel.id} style={{ backgroundColor: panel.tint, borderColor: isActive ? "rgba(8,117,94,0.25)" : "#cfe7dc" }} className={`persona-panel relative isolate min-w-0 overflow-hidden rounded-[28px] border ${isActive ? "flex-[3] max-[899px]:h-auto max-[899px]:min-h-[460px]" : "flex-[1] max-[899px]:h-[88px]"} max-[899px]:flex-none ${reducedMotion ? "transition-none" : "transition-[flex,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"}`} onMouseEnter={() => { if (window.matchMedia("(min-width: 900px)").matches) setActiveIndex(index); }}>
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
  const { openSignup } = useAuthModal();
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

  const toggleFaq = (id: string) => setOpenFaqId((current) => current === id ? null : id);

  return (
    <section ref={sectionRef} id="faq" aria-labelledby="faq-heading" className="relative px-5 py-10 sm:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-8 flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#08755e]">FAQ</p>
            <h2 id="faq-heading" className="mt-4 max-w-[700px] text-left text-[2rem] font-extrabold leading-[1.05] tracking-[-0.055em] text-[#101c24] [text-wrap:balance] sm:text-[2.35rem] lg:text-[2.8rem]">Questions, answered</h2>
          </div>
          <button type="button" onClick={openSignup} className="inline-flex h-11 items-center gap-3 rounded-full border border-[#dce5e0] bg-white px-5 text-sm font-medium text-[#243038] transition hover:bg-[#f0f5f2]">
            Contact us <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div role="group" aria-label="Filter frequently asked questions" className="-mx-5 mb-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {faqCategories.map((category) => (
            <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => { setActiveCategory(category); setOpenFaqId(faqItems.find((item) => category === "All" || item.category === category)?.id ?? null); }} className={`shrink-0 snap-start rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${activeCategory === category ? "border-[#075d4c] bg-[#075d4c] text-white" : "border-[#dce5e0] bg-transparent text-[#617079] hover:border-[#c8e4d8] hover:text-[#243038]"}`}>
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
          <button type="button" onClick={openSignup} className="relative z-10 mt-5 inline-flex h-[50px] items-center gap-3 rounded-full bg-[#075d4c] px-6 text-sm font-semibold text-white shadow-[0_9px_22px_rgba(7,93,76,.18)] transition hover:-translate-y-0.5 hover:bg-[#064f41] lg:mt-0">
            Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Home Component — Updated hero, navbar, CTA, and footer
// ============================================================

export default function Home() {
  const { openLogin, openSignup } = useAuthModal();
  const { data: session, status } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

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
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between gap-3 px-5 sm:h-[76px] lg:px-10">
          <a href="#" className="flex min-w-0 items-center">
            <Logo size="md" />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                aria-current={activeNavItem === item ? "location" : undefined}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#08755e] ${activeNavItem === item ? "font-semibold text-[#08755e]" : "text-[#45535b]"}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {status === "authenticated" && session?.user ? (
              <div className="relative">
                <button type="button" aria-label="Open account menu" aria-expanded={userMenuOpen} onClick={() => setUserMenuOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#dce5e0] bg-[#eaf7f2] text-sm font-semibold text-[#08755e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08755e]/35">
                  {session.user.user_metadata?.avatar_url ? <img src={session.user.user_metadata.avatar_url} alt="" className="h-full w-full object-cover" /> : <span>{(session.user.user_metadata?.full_name ?? session.user.email ?? "V").trim().slice(0, 1).toUpperCase()}</span>}
                </button>
                {userMenuOpen && <div className="absolute right-0 top-12 z-50 w-44 rounded-[16px] border border-[#dce5e0] bg-white p-1.5 shadow-[0_12px_30px_rgba(17,74,58,0.12)]">
                  <a href="/dashboard" className="block rounded-[11px] px-3 py-2.5 text-sm font-medium text-[#243038] hover:bg-[#f0f5f2]">Dashboard</a>
                  <button type="button" onClick={async () => { await logout(); window.location.href = "/"; }} className="block w-full rounded-[11px] px-3 py-2.5 text-left text-sm font-medium text-[#52636a] hover:bg-[#f0f5f2]">Log out</button>
                </div>}
              </div>
            ) : (
              <>
                <button type="button" onClick={openLogin} disabled={status === "loading"} className="hidden h-11 rounded-full border border-[#dce5e0] bg-white px-5 text-sm font-medium text-[#243038] transition duration-200 hover:bg-[#f0f5f2] disabled:opacity-60 lg:block">Log in</button>
                <button type="button" onClick={openSignup} disabled={status === "loading"} className="hidden h-11 rounded-full bg-[#075d4c] px-5 text-sm font-semibold text-white shadow-[0_9px_22px_rgba(7,93,76,.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#064f41] lg:block">
                  Start Free Interview
                </button>
              </>
            )}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dce5e0] bg-white text-[#243038] transition duration-200 hover:bg-[#f0f5f2] lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-[#dceae4] bg-[#f7faf8] px-5 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-[12px] px-3 py-3 text-sm font-medium transition-colors ${activeNavItem === item ? "bg-[#eaf7f2] text-[#08755e]" : "text-[#45535b] hover:bg-[#edf3f0]"}`}
                >
                  {item}
                </a>
              ))}
              {status !== "authenticated" && (
                <>
                  <button type="button" onClick={() => { setMobileMenuOpen(false); openLogin(); }} className="mt-2 rounded-[12px] px-3 py-3 text-left text-sm font-medium text-[#243038] hover:bg-[#edf3f0]">
                    Log in
                  </button>
                  <button type="button" onClick={() => { setMobileMenuOpen(false); openSignup(); }} className="mt-1 rounded-[12px] bg-[#075d4c] px-3 py-3 text-center text-sm font-semibold text-white transition duration-200 hover:bg-[#064f41]">
                    Get Started
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_13%_16%,rgba(107,188,159,.18),transparent_27%),radial-gradient(circle_at_78%_8%,rgba(139,202,181,.17),transparent_23%),linear-gradient(180deg,#f7faf8_0%,#f8fbf9_100%)]" />

        <div className="mx-auto max-w-[1320px] px-5 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-16">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            {/* LEFT CONTENT */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe7dc] bg-[#e5f4ee] px-4 py-2 text-sm font-medium text-[#08755e]">
                <Sparkles className="h-4 w-4" />
                Practice Today. Perform Tomorrow.
              </div>

              <h1 className="mt-6 max-w-[720px] text-[2.15rem] font-extrabold leading-[1.05] tracking-[-.065em] text-[#101c24] sm:mt-7 sm:text-[3.4rem] md:text-[4.2rem] lg:text-[5.2rem] lg:leading-[.95]">
                Practice Interviews.
                <span className="block bg-gradient-to-r from-[#08755e] via-[#16a987] to-[#48c9aa] bg-clip-text text-transparent">
                  Get Interview-Ready.
                </span>
              </h1>

              <p className="mt-7 max-w-[520px] text-base leading-7 text-[#617079] sm:text-[17px]">
                Practice realistic AI interviews for your target role, get
                instant feedback, and know exactly what to improve before the
                real interview.
              </p>

              <div className="mt-7 flex w-full flex-col items-stretch gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                <button id="get-started" type="button" onClick={openSignup} className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-full bg-[#075d4c] px-6 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(7,93,76,.18)] transition hover:-translate-y-0.5 sm:h-[52px] sm:px-7 sm:text-base">
                  <span>Start Free Interview</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>

                <a
                  href="#how-it-works"
                  className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full border border-[#dce5e0] bg-white px-5 text-sm font-medium text-[#243038] transition hover:bg-[#f0f5f2] sm:h-auto sm:py-3"
                >
                  See How It Works
                </a>
              </div>

              <span className="mt-4 block text-sm text-[#68757d]">
                No credit card required
              </span>

              <div className="mt-11 grid max-w-[520px] grid-cols-2 gap-4 sm:grid-cols-4">
                {heroFeatures.map((feature) => {
                  const Icon = feature.icon;
                  const isComingSoon = 'comingSoon' in feature && feature.comingSoon;

                  return (
                    <div
                      key={feature.label}
                      className="group flex flex-col items-center text-center"
                    >
                      <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border border-[#d8eae2] bg-[#ebf5f0] text-[#08755e] shadow-[inset_0_1px_0_white] transition group-hover:-translate-y-1 group-hover:bg-[#e2f3ec]">
                        <Icon className="h-5 w-5" strokeWidth={1.45} />
                        {isComingSoon && (
                          <span className="absolute -right-1 -top-1 rounded-full bg-[#08755e] px-1.5 py-0.5 text-[8px] font-bold text-white">
                            Soon
                          </span>
                        )}
                      </div>

                      <span className="mt-2.5 max-w-[100px] text-[11px] font-bold leading-4 text-[#2f3d46]">
                        {feature.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HERO PRODUCT MOCKUP — Right Side */}
            <div className="relative min-w-0 overflow-hidden sm:overflow-visible lg:min-h-[720px]">
              {/* Background glow */}
              <div className="absolute right-[-40px] top-[40px] h-[280px] w-[280px] rounded-full bg-[#dcefe8] opacity-50 blur-[80px] sm:right-[-60px] sm:top-[60px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />

              {/* Handwritten text — top right */}
              <div className={`${caveat.className} text-[27px] font-semibold leading-[.9] text-[#56686f] absolute right-0 -top-2 z-30 hidden max-w-[220px] text-right xl:block`}>
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
              <div className="relative pt-2 sm:pt-10 lg:pt-14">
                {/* Chat Mockup */}
                <div className="relative z-10 w-full max-w-[420px] rotate-0 sm:inline-block sm:rotate-[1deg]">
                  <ChatMockup />
                </div>

                {/* Video Mockup */}
                <div className="relative z-20 mx-auto mt-4 hidden w-fit min-[480px]:block sm:absolute sm:right-2 sm:top-[72px] sm:mx-0 sm:mt-0 md:right-4 lg:right-[-28px] lg:top-[100px] xl:right-[-48px]">
                  <VideoMockup />
                </div>

                {/* Feedback Card — below, shifted right */}
                <div className="relative z-30 mt-4 w-full sm:-mt-3 sm:ml-6 sm:w-[calc(100%-1.5rem)] sm:rotate-[1deg] lg:ml-8 lg:w-[100%]">
                  <FeedbackCard />
                </div>
              </div>
            </div>
          </div>

          {/* ROLE CHIPS */}
          <div className="mt-14 border-t border-[#e6ece8] pt-8">
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
      <ImprovementLoopSection />
      <FeaturesSection />
      <DifferentiationSection />
      <WhoItsForSection />
      <RolesSection />
      <PricingSection />
      <FAQSection />

      {/* ================= FINAL CTA ================= */}
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
              Your next step
            </p>

            <h2 className="mt-4 text-[31px] font-extrabold leading-[1.05] tracking-[-.055em] text-[#101c24] sm:text-[39px] lg:text-[42px]">
              Your next interview starts with{" "}
              <span className="text-[#08755e]">practice.</span>
            </h2>

            <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-[1.6] text-[#617079]">
              Don&apos;t wait until interview day to find out what you need to
              improve.
            </p>

            <button type="button" onClick={openSignup} className="group mt-6 inline-flex h-[52px] items-center gap-4 rounded-full bg-[#075d4c] px-8 text-[16px] font-semibold text-white shadow-[0_12px_25px_rgba(7,93,76,.19)] transition hover:-translate-y-0.5 hover:bg-[#064f41]">
              Start Free Interview
              <ArrowRight className="h-[17px] w-[17px] transition group-hover:translate-x-1" />
            </button>

            <p className="mt-3 text-[11px] text-[#72857f]">
              No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative overflow-hidden bg-[#fbfdfc]">

        {/* Decorative waves */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="absolute bottom-[-2px] left-[-5%] h-[240px] w-[55%] min-w-[600px]"
            viewBox="0 0 700 240"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 145 C95 75 170 72 265 125 C350 174 430 180 520 132 C590 94 650 94 700 110 L700 240 L0 240 Z" fill="#e1f5ee" />
            <path d="M0 180 C110 108 190 108 280 155 C370 201 450 200 535 153 C600 117 660 116 700 130 L700 240 L0 240 Z" fill="#edf9f5" />
          </svg>

          <svg
            className="absolute bottom-[-5px] right-[-5%] h-[250px] w-[53%] min-w-[600px]"
            viewBox="0 0 700 250"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 150 C85 88 160 85 250 130 C340 175 420 178 505 128 C595 77 650 78 700 115 L700 250 L0 250 Z" fill="#e2f6ef" />
            <path d="M0 190 C90 128 170 124 265 165 C355 204 430 208 515 163 C600 118 655 120 700 145 L700 250 L0 250 Z" fill="#eefaf6" />
          </svg>

          <div className="absolute bottom-[-100px] left-1/2 h-[250px] w-[700px] -translate-x-1/2 rounded-full bg-[#f0faf7] blur-[40px]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
          <div className="border-t border-[#dcebe5]" />

          <div className="grid gap-12 border-b border-[#e1ece7] py-12 md:grid-cols-2 lg:grid-cols-[1.55fr_1fr_1fr_1fr] lg:gap-8 lg:py-14">

            {/* Brand */}
            <div>
              <a href="#" className="inline-block">
                <Logo size="footer" />
              </a>

              <p className="mt-4 text-[14px] font-medium text-[#667980]">
                Practice today. Perform tomorrow.
              </p>

              <p className="mt-3 max-w-[285px] text-[14px] leading-[1.7] text-[#718087]">
                AI-powered mock interview platform that helps you practice,
                get feedback, and improve before real interviews.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-[14px] font-bold text-[#17242c]">Product</h3>
              <div className="mt-5 space-y-[11px] text-[14px] text-[#718087]">
                <a href="#features" className="block transition-colors duration-200 hover:text-[#08755e]">Features</a>
                <a href="#how-it-works" className="block transition-colors duration-200 hover:text-[#08755e]">How it Works</a>
                <a href="#pricing" className="block transition-colors duration-200 hover:text-[#08755e]">Pricing</a>
                <a href="#faq" className="block transition-colors duration-200 hover:text-[#08755e]">FAQ</a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-[14px] font-bold text-[#17242c]">Company</h3>
              <div className="mt-5 space-y-[11px] text-[14px] text-[#718087]">
                <a href="#" className="block transition-colors duration-200 hover:text-[#08755e]">About</a>
                <a href="#" className="block transition-colors duration-200 hover:text-[#08755e]">Contact</a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-[14px] font-bold text-[#17242c]">Legal</h3>
              <div className="mt-5 space-y-[11px] text-[14px] text-[#718087]">
                <a href="/privacy" className="block transition-colors duration-200 hover:text-[#08755e]">Privacy Policy</a>
                <a href="/terms" className="block transition-colors duration-200 hover:text-[#08755e]">Terms of Service</a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 flex flex-col justify-between gap-5 py-6 text-[12px] text-[#899399] sm:flex-row sm:items-center">
            <span>© 2026 Verdant. All rights reserved.</span>
            <span className="flex items-center gap-2">
              <span className="h-5 w-px bg-[#dce9e3]" />
              Built for dreamers, by believers.
              <span className="ml-0.5">💚</span>
            </span>
          </div>
        </div>
      </footer>

    </main>
  );
}
