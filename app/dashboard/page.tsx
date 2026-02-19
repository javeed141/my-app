import Link from "next/link";

const users = [
  { id: 1, name: "Alice Johnson", role: "Admin", status: "Active", avatar: "AJ" },
  { id: 2, name: "Bob Smith", role: "Editor", status: "Active", avatar: "BS" },
  { id: 3, name: "Carol White", role: "Viewer", status: "Inactive", avatar: "CW" },
  { id: 4, name: "David Lee", role: "Editor", status: "Active", avatar: "DL" },
];

const stats = [
  {
    label: "Total Users",
    value: "1,284",
    change: "+12%",
    up: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    color: "violet",
  },
  {
    label: "Active Sessions",
    value: "42",
    change: "+3",
    up: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: "emerald",
  },
  {
    label: "Revenue",
    value: "$8,540",
    change: "+8.2%",
    up: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
      </svg>
    ),
    color: "blue",
  },
  {
    label: "Uptime",
    value: "99.9%",
    change: "30 days",
    up: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "fuchsia",
  },
];

const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
  violet: { bg: "bg-violet-500/15", icon: "text-violet-400", badge: "bg-violet-500/20 text-violet-300" },
  emerald: { bg: "bg-emerald-500/15", icon: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300" },
  blue:    { bg: "bg-blue-500/15",    icon: "text-blue-400",    badge: "bg-blue-500/20 text-blue-300" },
  fuchsia: { bg: "bg-fuchsia-500/15", icon: "text-fuchsia-400", badge: "bg-fuchsia-500/20 text-fuchsia-300" },
};

const roleColor: Record<string, string> = {
  Admin:  "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Editor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Viewer: "bg-slate-600/40 text-slate-300 border-slate-500/30",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Topbar */}
      <header className="border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 bg-slate-900/80 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-slate-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="w-px h-5 bg-white/10" />
          <h1 className="text-white font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400 text-sm">Live</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => {
            const c = colorMap[s.color];
            return (
              <div
                key={s.label}
                className="bg-slate-800/60 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.bg} ${c.icon}`}>
                    {s.icon}
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.badge}`}>
                    {s.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-slate-500 text-xs mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Users table */}
        <div className="bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-white font-semibold">Users</h2>
            <span className="text-xs text-slate-500 bg-slate-700/60 px-2.5 py-1 rounded-full">
              {users.length} total
            </span>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={u.id}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    i === users.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-600/30 text-violet-300 text-xs font-bold flex items-center justify-center shrink-0">
                        {u.avatar}
                      </div>
                      <span className="text-white font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${roleColor[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-emerald-400" : "bg-slate-500"}`} />
                      <span className={u.status === "Active" ? "text-emerald-400" : "text-slate-500"}>
                        {u.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono">#{u.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
