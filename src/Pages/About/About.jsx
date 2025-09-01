import React, { useEffect, useState } from "react";
import {
  Stethoscope,
  ShieldCheck,
  Users2,
  BookOpen,
  Clock,
  Sparkles,
  HeartPulse,
  ChevronDown,
  CalendarCheck2,
  Search,
  ListChecks,
  Smartphone,
  Lock,
} from "lucide-react";
import { Link } from "react-router";

/* -------------------------- Content (easy to edit) -------------------------- */

const FEATURES = [
  {
    icon: <Search className="text-indigo-600" size={22} />,
    title: "Doctor Directory",
    desc: "Browse a paginated list of verified doctors with photos and specialization tags.",
  },
  {
    icon: <Stethoscope className="text-indigo-600" size={22} />,
    title: "Advanced Search & Filters",
    desc: "Search by name and filter by specialization to quickly find the right doctor.",
  },
  {
    icon: <CalendarCheck2 className="text-indigo-600" size={22} />,
    title: "One-Click Booking",
    desc: "Book appointments via a modal with a friendly date picker and instant feedback.",
  },
  {
    icon: <ListChecks className="text-indigo-600" size={22} />,
    title: "Patient Dashboard",
    desc: "Track your appointments, filter by status, and cancel pending ones if needed.",
  },
  {
    icon: <BookOpen className="text-indigo-600" size={22} />,
    title: "Doctor Dashboard",
    desc: "View daily schedules, filter by date/status, and mark visits completed or cancelled.",
  },
  {
    icon: <Lock className="text-indigo-600" size={22} />,
    title: "Secure Authentication",
    desc: "Email/password & Google sign-in with role-based access for doctors and patients.",
  },
];

const WHO_CAN_USE = [
  "Patients who want fast, hassle-free booking",
  "Doctors managing schedules and visit statuses",
  "Clinics that need a simple appointment workflow",
];

const HOW_IT_WORKS = [
  { t: "Create an Account", d: "Register as Patient or Doctor and complete your profile." },
  { t: "Find Your Doctor", d: "Use search and filters to discover the right specialist." },
  { t: "Pick a Date", d: "Open the booking modal, select a date, and confirm." },
  { t: "Manage Easily", d: "See status in real-time and update/cancel when needed." },
];

const WHY_POINTS = [
  { n: "Fast", l: "Quick booking flow" },
  { n: "Simple", l: "Clean, modern UI" },
  { n: "Secure", l: "Role-based access" },
  { n: "Responsive", l: "Works on any device" },
];

const FAQS = [
  {
    q: "Do I need an account to book?",
    a: "Yes. Patients sign up to book and track appointments; doctors sign up to manage schedules.",
  },
  {
    q: "Can I cancel an appointment?",
    a: "Patients can cancel appointments that are still pending. Doctors can cancel when necessary.",
  },
  {
    q: "How do doctors update status?",
    a: "From the Doctor Dashboard, mark visits as Completed or Cancelled. The UI updates in real-time.",
  },
  {
    q: "Is my data secure?",
    a: "Authentication and role checks protect access. Only authorized users can view or change appointments.",
  },
];

/* ------------------------------ Small components --------------------------- */

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className="border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-white/80 dark:bg-zinc-900/60 backdrop-blur">
      <button
        onClick={toggle}
        onKeyDown={onKey}
        aria-expanded={open}
        aria-controls={`faq-${q}`}
        className="w-full flex items-center justify-between text-left px-4 py-3 md:px-5 md:py-4 hover:bg-indigo-50/50 dark:hover:bg-zinc-800 transition"
      >
        <span className="font-medium text-gray-800 dark:text-gray-100">{q}</span>
        <ChevronDown
          className={`text-indigo-600 transition-transform ${open ? "rotate-180" : ""}`}
          size={18}
        />
      </button>
      {open && (
        <div id={`faq-${q}`} className="px-4 pb-4 md:px-5 md:pb-5 text-gray-600 dark:text-gray-300">
          {a}
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, title, desc }) => (
  <div className="group rounded-2xl bg-white/90 dark:bg-zinc-900/70 backdrop-blur p-5 border border-indigo-50 dark:border-zinc-700 shadow hover:shadow-lg transition">
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 group-hover:scale-105 transition">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{desc}</p>
      </div>
    </div>
  </div>
);

/* --------------------------------- Page ----------------------------------- */

const About = () => {
  useEffect(() => {
    document.title = "About • Doctor Appointment System";
  }, []);

  return (
    <div className="relative">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-12 -left-10 h-64 w-64 bg-indigo-200/40 dark:bg-indigo-900/40 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 h-72 w-72 bg-purple-200/40 dark:bg-purple-900/40 blur-3xl rounded-full" />
      </div>

      {/* hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-20">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white p-6 md:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/10 rounded-full" />
          <div className="absolute right-10 bottom-6 h-24 w-24 bg-white/10 rounded-full" />
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                About the <span className="text-white/90">Doctor Appointment System</span>
              </h1>
              <p className="mt-3 md:mt-4 text-white/90 md:text-lg">
                A modern platform that connects patients with doctors—search by specialization,
                book in seconds, and manage appointments with real-time status updates.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-full text-sm">
                  <ShieldCheck size={16} /> Secure • Role-based access
                </span>
                <span className="inline-flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-full text-sm">
                  <HeartPulse size={16} /> Patient-centric experience
                </span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-white/90 dark:bg-zinc-900/80 text-gray-900 dark:text-gray-100 rounded-2xl p-5 shadow-lg border border-white/60 dark:border-zinc-700">
                <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-zinc-700 text-center">
                  <div className="px-3">
                    <div className="text-2xl md:text-3xl font-bold">Patients</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Book & manage</div>
                  </div>
                  <div className="px-3">
                    <div className="text-2xl md:text-3xl font-bold">Doctors</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Control schedule</div>
                  </div>
                  <div className="px-3">
                    <div className="text-2xl md:text-3xl font-bold">Real-time</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Status updates</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Clock size={16} className="text-indigo-200" />
                  Fast, reliable, responsive UI
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="text-indigo-600" /> What You Can Do
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {FEATURES.map((f, i) => (
            <StatCard key={i} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </div>
      </section>

      {/* who can use + how it works */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/70 backdrop-blur p-6 border border-indigo-50 dark:border-zinc-700 shadow">
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
            Who Can Use It?
          </h2>
          <ul className="grid gap-2 text-gray-700 dark:text-gray-300">
            {WHO_CAN_USE.map((t, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/70 backdrop-blur p-6 border border-indigo-50 dark:border-zinc-700 shadow">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            How It Works
          </h2>
          <ol className="relative border-s border-indigo-100 dark:border-zinc-700 ms-3 space-y-5">
            {HOW_IT_WORKS.map((s, i) => (
              <li key={i} className="ms-4">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{s.t}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* why choose us */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
          Why Choose This System?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          {WHY_POINTS.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/90 dark:bg-zinc-900/70 backdrop-blur p-5 border border-indigo-50 dark:border-zinc-700 shadow text-center hover:shadow-lg transition"
            >
              <div className="text-xl font-bold text-indigo-700 dark:text-indigo-400">{s.n}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-5">
          FAQ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map(({ q, a }) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12 md:mt-16 pb-16">
        <div className="rounded-2xl p-6 md:p-8 bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold">Ready to book your next appointment?</h3>
              <p className="text-white/90 mt-1">
                Explore doctors, choose your slot, and manage everything in one place.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/patient/dashboard"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-white/90 active:scale-[0.98] transition"
              >
                Explore Doctors
              </Link>
              <Link
                to="/auth/login"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white/15 text-white border border-white/30 hover:bg-white/20 active:scale-[0.98] transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* footer note */}
      <div className="text-center px-4 pb-16 -mt-6">
        <p className="text-gray-700 dark:text-gray-300">
          Need help?{" "}
          <Link to="/contact" className="text-indigo-600 dark:text-indigo-400 underline underline-offset-4">
            Contact support
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
