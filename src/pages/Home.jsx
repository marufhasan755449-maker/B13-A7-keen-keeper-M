import { useState, useEffect } from "react";
import { UserPlus, Users, AlertCircle, Clock, CheckCircle } from "lucide-react";
import FriendCard from "../components/FriendCard";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      fetch("/friends.json")
        .then((r) => r.json())
        .then((data) => { setFriends(data); setLoading(false); })
        .catch(() => setLoading(false));
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const overdue  = friends.filter((f) => f.status === "overdue").length;
  const almost   = friends.filter((f) => f.status === "almost due").length;
  const onTrack  = friends.filter((f) => f.status === "on-track").length;

  const stats = [
    { label: "Total Friends",  value: friends.length, Icon: Users,         color: "text-gray-400"    },
    { label: "Overdue",        value: overdue,        Icon: AlertCircle,   color: "text-red-400"     },
    { label: "Almost Due",     value: almost,         Icon: Clock,         color: "text-amber-400"   },
    { label: "On Track",       value: onTrack,        Icon: CheckCircle,   color: "text-emerald-500" },
  ];

  return (
    <div>
      {/* ── Banner ── */}
      <section className="bg-white border-b border-gray-200 py-16 text-center px-4">
        <div className="max-w-xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight mb-4 tracking-tight">
            Friends to keep close<br />in your life
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>
          <button className="inline-flex items-center gap-2 bg-leaf hover:bg-forest
                             text-white px-5 py-2.5 rounded-lg text-sm font-semibold
                             transition-all duration-150 hover:-translate-y-0.5
                             hover:shadow-lg hover:shadow-leaf/30">
            <UserPlus size={16} />
            Add a Friend
          </button>
        </div>

        {/* Stat Cards */}
        <div className="max-w-3xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
          {stats.map(({ label, value, Icon, color }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-2xl
                                        py-6 px-4 text-center shadow-sm
                                        hover:-translate-y-0.5 hover:shadow-md transition-all">
              <Icon size={22} className={`${color} mx-auto mb-2`} />
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight leading-none">
                {loading ? "—" : value}
              </p>
              <p className="text-xs text-gray-400 mt-1.5 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Friends Grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Your Friends</h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-leaf
                            rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading your friends...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map((f) => <FriendCard key={f.id} friend={f} />)}
          </div>
        )}
      </section>
    </div>
  );
}
