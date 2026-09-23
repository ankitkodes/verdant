"use client";

import { useId } from "react";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Code2,
  MessageSquare,
  Mic,
  Sparkles,
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

const navItems = ["Features", "Roles", "How it Works", "Pricing", "Testimonials"];

const features = [
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
  const iconId = `verdatLogo_${size}_${reactId.replace(/:/g, '')}`;

  return (
    <div className={`inline-flex items-center gap-2 ${current.wrapper} ${className}`}>
      <svg
        width={current.icon}
        height={current.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Verdat logo"
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
          Verdat
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

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faf8] text-[#142029]">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-white/60 bg-[#f7faf8]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 lg:px-10">
          <a href="#" className="flex items-center">
            <Logo size="md" />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="text-sm font-medium text-[#45535b] transition hover:text-[#08755e]"
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
                <button className="group inline-flex items-center gap-3 rounded-full bg-[#075d4c] px-7 py-3.5 text-base font-semibold text-white shadow-[0_14px_28px_rgba(7,93,76,.18)] transition hover:-translate-y-0.5">
                  <span>Start Practicing Free</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>

                <span className="text-sm italic text-[#68757d]">
                  No credit card required.
                </span>
              </div>

              <div className="mt-11 grid max-w-[520px] grid-cols-2 gap-4 sm:grid-cols-4">
                {features.map((feature) => {
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

            <p className="text-[10px] font-semibold uppercase tracking-[.19em] text-[#72878d] sm:text-[11px]">
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
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
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
              © 2026 Verdat. All rights reserved.
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