"use client";

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

function LogoMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-8 w-8 drop-shadow-[0_8px_16px_rgba(11,90,73,0.12)]">
      <rect x="4" y="4" width="56" height="56" rx="16" fill="#0d5f4d" />
      <path
        d="M15 18.5 28.2 44.5h7.6L49 18.5h-8.1L31.9 34l-5.5-15.5H15Zm16.5 0 4 12.2 4-12.2h-8Z"
        fill="#ffffff"
      />
      <path d="M21 18.5 31.2 42h1.6L42 18.5H35l-5.9 15.8L23.2 18.5H21Z" fill="#dff4ec" opacity="0.35" />
    </svg>
  );
}

function VideoMockup() {
  return (
    <div className="relative w-full max-w-[280px] rotate-[3deg] rounded-[22px] border border-white/70 bg-white/70 p-3 shadow-[0_24px_65px_rgba(17,60,48,0.20)] backdrop-blur-xl">
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
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f3ed]">
              <LogoMark />
            </div>

            <span className="text-[25px] font-bold tracking-[-0.055em] text-[#142029]">
              Verdant
            </span>
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

                      <span className="mt-2.5 max-w-[100px] text-[11px] font-medium leading-4 text-[#37454c]">
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
                <div className="relative z-10 inline-block rotate-[3deg]">
                  <ChatMockup />
                </div>

                {/* Video Mockup — no longer overlapping */}
                <div className="absolute right-[-70px] top-[80px] z-20 hidden sm:block lg:right-[-50px]">
                  <VideoMockup />
                </div>

                {/* Feedback Card — below, shifted right */}
                <div className="relative z-30 -mt-6 ml-8 w-[90%]">
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
      <section className="px-5 py-20 lg:px-10 lg:py-24">
        <div className="relative mx-auto max-w-[1250px] overflow-hidden rounded-[22px] border border-[#dcefe7] bg-[#effaf6] px-5 py-12 text-center shadow-[0_16px_45px_rgba(13,95,77,.06)] sm:px-10 lg:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_90%,rgba(159,222,201,.25),transparent_34%),radial-gradient(ellipse_at_85%_20%,rgba(184,231,215,.24),transparent_28%)]" />
          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#708991]">
              Your Next Opportunity Is Closer Than You Think
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-[#101c24] sm:text-4xl">
              Start Your Interview Practice <span className="text-[#08755e]">Today</span>
            </h2>
            <button className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#075d4c] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(7,93,76,.2)] transition hover:-translate-y-0.5">
              Get Started for Free
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-xs text-[#71847e]">No credit card required.</p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative overflow-hidden bg-[#fbfdfc]">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute -left-20 bottom-[-130px] h-[230px] w-[520px] rounded-[50%] bg-[#e0f5ee] blur-[2px]" />
          <div className="absolute left-[8%] bottom-[-155px] h-[240px] w-[520px] rounded-[50%] border-t-[24px] border-[#edf9f5] bg-[#d8f1e9]" />
          <div className="absolute right-[-120px] bottom-[-100px] h-[290px] w-[620px] rounded-[50%] bg-[#e5f7f1]" />
          <div className="absolute right-[-40px] top-[-100px] h-[180px] w-[360px] rounded-[50%] bg-[#eefaf6]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-5 pt-0 lg:px-10">
          <div className="border-t border-[#dcebe5]" />

          <div className="grid gap-10 border-b border-[#e1ece7] py-12 md:grid-cols-[1.45fr_1fr_1fr_1fr_1.55fr] lg:py-14">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e4f3ed]">
                  <LogoMark />
                </div>

                <span className="text-xl font-bold tracking-[-.05em] text-[#17242c]">
                  Verdant
                </span>
              </div>

              <p className="mt-4 max-w-[250px] text-sm leading-6 text-[#718087]">
                Practice today. Perform tomorrow.
              </p>
              <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#718087]">
                AI-powered mock interview platform for students to build confidence, improve skills, and land their dream opportunities.
              </p>

              <div className="mt-5 flex gap-2.5">
                {[
                  [MessageSquare, "LinkedIn"],
                  [Zap, "Twitter"],
                  [Sparkles, "Instagram"],
                  [Video, "YouTube"],
                  [Code2, "GitHub"],
                ].map(([Icon, label]) => (
                  <a key={label as string} href="#" aria-label={label as string} className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#eaf7f2] text-[#114d45] transition hover:-translate-y-0.5 hover:bg-[#d8f1e8]">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#17242c]">Product</h3>

              <div className="mt-4 space-y-2.5 text-sm text-[#718087]">
                <a className="block hover:text-[#08755e]" href="#">Features</a>
                <a className="block hover:text-[#08755e]" href="#">Roles</a>
                <a className="block hover:text-[#08755e]" href="#">How it Works</a>
                <a className="block hover:text-[#08755e]" href="#">Pricing</a>
                <a className="block hover:text-[#08755e]" href="#">For Students</a>
                <a className="block hover:text-[#08755e]" href="#">For Educators</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#17242c]">Company</h3>

              <div className="mt-4 space-y-2.5 text-sm text-[#718087]">
                <a className="block hover:text-[#08755e]" href="#">About Us</a>
                <a className="block hover:text-[#08755e]" href="#">Our Mission</a>
                <a className="block hover:text-[#08755e]" href="#">Careers</a>
                <a className="block hover:text-[#08755e]" href="#">Blog</a>
                <a className="block hover:text-[#08755e]" href="#">Press</a>
                <a className="block hover:text-[#08755e]" href="#">Contact</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#17242c]">Resources</h3>

              <div className="mt-4 space-y-2.5 text-sm text-[#718087]">
                <a className="block hover:text-[#08755e]" href="#">Interview Tips</a>
                <a className="block hover:text-[#08755e]" href="#">Resume Guide</a>
                <a className="block hover:text-[#08755e]" href="#">Sample Questions</a>
                <a className="block hover:text-[#08755e]" href="#">Success Stories</a>
                <a className="block hover:text-[#08755e]" href="#">Help Center</a>
                <a className="block hover:text-[#08755e]" href="#">Community</a>
              </div>
            </div>

            <div className="border-l border-[#e3eee9] pl-7">
              <h3 className="text-sm font-bold text-[#17242c]">Stay in the Loop</h3>
              <p className="mt-2 max-w-[220px] text-sm leading-6 text-[#718087]">
                Get the latest updates, interview tips, and product news.
              </p>
              <div className="mt-4 flex overflow-hidden rounded-full border border-[#dce9e3] bg-white">
                <input aria-label="Email address" placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-xs text-[#52676d] outline-none placeholder:text-[#9aa9aa]" />
                <button aria-label="Subscribe" className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full bg-[#075d4c] text-white transition hover:bg-[#064f41]">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-[11px] text-[#8b9a9b]">No spam. Just valuable updates.</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 py-5 text-xs text-[#899399] sm:flex-row">
            <span>© 2025 Verdant. All rights reserved.</span>
            <div className="flex flex-wrap gap-5">
              <a href="#" className="hover:text-[#08755e]">Privacy Policy</a>
              <a href="#" className="hover:text-[#08755e]">Terms of Service</a>
              <a href="#" className="hover:text-[#08755e]">Cookie Policy</a>
            </div>
            <span>Built for dreamers, by believers. <span className="text-[#16a987]">♥</span></span>
          </div>
        </div>
      </footer>

    </main>
  );
}