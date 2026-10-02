# Verdant - AI-Powered Mock Interview Platform

Verdant is a modern, interactive web application designed to help job seekers practice mock interviews and get instant, structured feedback. Featuring Chat, Voice, and Video interview formats, Verdant simulates real interview pressure and delivers quantitative evaluation metrics across technical knowledge, communication, confidence, and problem-solving skills.

---

## Features

- 🎯 **Multiple Interview Formats**: Practice via Text Chat, Voice Interviews, or Video Call simulations.
- 📊 **Instant AI Feedback**: Receive detailed scoring and actionable feedback on technical depth, structure, and communication.
- 💼 **Role-Specific Scenarios**: Specialized interview tracks for Software Engineers (DSA/System Design), Product Managers, Data Analysts, UX Designers, Marketing, and Business Analysts.
- 🔐 **Redesigned Split Authentication System**:
  - Two-column responsive modal on desktop (880x640px) and bottom-sheet on mobile.
  - **Login**: Instant credentials login + social login (Google, GitHub, LinkedIn).
  - **2-Step Signup**: Fast social/email step 1 + detail step 2 with real-time 4-segment password strength meter.
  - **Email Verification**: 6-digit OTP box verification with auto-advance, paste support, and resend countdown timer.
  - **Email Validation**: Real-time typo suggestions (e.g. `gmial.com` $\rightarrow$ `gmail.com`), disposable email blocking, and domain restrictions.

---

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & React**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database / Backend Tools**: [Supabase](https://supabase.com/)
- **Icons & Typography**: [Lucide React](https://lucide.dev/), Google Fonts (Geist, Caveat)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## Project Structure

```text
verdant/
├── app/
│   ├── api/
│   │   └── auth/           # NextAuth route handler
│   ├── globals.css         # Design tokens, custom animations & Tailwind imports
│   ├── layout.tsx          # Root layout & providers wrapper
│   └── page.tsx            # Main landing page & interactive UI
├── components/
│   └── auth/               # Modular Auth System
│       ├── AppProviders.tsx
│       ├── AuthModal.tsx          # Responsive split modal container
│       ├── AuthModalProvider.tsx  # Global modal state context
│       ├── EmailField.tsx         # Auto-validating email field
│       ├── LoginForm.tsx          # Compact login form
│       ├── OtpInput.tsx           # 6-digit OTP code inputs
│       ├── SignupForm.tsx         # 2-step signup flow
│       ├── SocialButtons.tsx      # Google, GitHub, LinkedIn auth row
│       └── VerifyEmailForm.tsx    # Email OTP verification & timer
├── lib/
│   ├── auth-client.ts      # Authentication client utilities
│   ├── auth-config.ts      # Auth domain configuration
│   ├── disposable-domains.ts # Disposable email domain blacklist
│   └── email-validation.ts # Typo detection & email validation engine
├── public/                 # Static assets & graphics
└── supabase/               # Supabase database config & migrations
```

---

## Getting Started

### Prerequisites

Ensure you have Node.js 18+ and `npm` installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ankitkodes/verdant.git
   cd verdant
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory (or copy `.env.example`):
   ```bash
   cp .env.example .env.local
   ```
   Add your NextAuth secret and provider keys as needed:
   ```env
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Available Scripts

- `npm run dev` - Starts the development server with Hot Module Replacement.
- `npm run build` - Builds the application for production.
- `npm run start` - Runs the built production application.
- `npm run lint` - Runs ESLint to check for code style and syntax issues.

---

## License

This project is licensed under the MIT License.
