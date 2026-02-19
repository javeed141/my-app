import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Nav */}
      <header className="border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <span className="text-white font-bold text-lg tracking-tight">MyApp</span>
        <nav className="flex gap-2">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/fetch"
            className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
          >
            Fetch
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Glow orb */}
        <div className="absolute w-96 h-96 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Next.js App Router
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">
              MyApp
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto mb-10">
            A modern Next.js starter with routing, a dashboard, and a documentation scraper.
          </p>

          {/* CTA cards */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40
                         rounded-2xl px-6 py-4 text-left transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors">Dashboard</div>
                <div className="text-slate-500 text-xs mt-0.5">Stats, users &amp; analytics</div>
              </div>
            </Link>

            <Link
              href="/fetch"
              className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40
                         rounded-2xl px-6 py-4 text-left transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-fuchsia-600/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold text-sm group-hover:text-fuchsia-300 transition-colors">Doc Scraper</div>
                <div className="text-slate-500 text-xs mt-0.5">Extract nav from any docs site</div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 px-8 py-4 text-center text-slate-600 text-xs">
        Built with Next.js &amp; Tailwind CSS
      </footer>
    </div>
  );
}
