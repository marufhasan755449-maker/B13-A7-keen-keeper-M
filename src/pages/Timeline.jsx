import { useState } from "react";
import { Phone, MessageSquare, Video, Clock } from "lucide-react";
import { useTimeline } from "../context/TimelineContext";

const typeConfig = {
  Call:  { Icon: Phone,         dot: "bg-emerald-500", border: "border-l-emerald-500", iconBg: "bg-emerald-50 text-emerald-600" },
  Text:  { Icon: MessageSquare, dot: "bg-violet-500",  border: "border-l-violet-500",  iconBg: "bg-violet-50 text-violet-600"   },
  Video: { Icon: Video,         dot: "bg-amber-500",   border: "border-l-amber-500",   iconBg: "bg-amber-50 text-amber-600"     },
};

const filters = ["All", "Call", "Text", "Video"];

export default function Timeline() {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? entries : entries.filter((e) => e.type === filter);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl text-gray-900 mb-1 tracking-tight">Timeline</h1>
      <p className="text-sm text-gray-400 mb-7">Your history of interactions with friends</p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm
                        font-medium border transition-all
                        ${filter === f
                          ? "bg-forest text-white border-forest shadow-sm"
                          : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
                        }`}
          >
            {f !== "All" && typeConfig[f] && (() => { const { Icon } = typeConfig[f]; return <Icon size={13} />; })()}
            {f}
          </button>
        ))}
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-3 text-center">
          <Clock size={44} className="text-gray-200" />
          <h3 className="text-base font-semibold text-gray-400">No interactions yet</h3>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            Go to a friend's page and log a call, text, or video to see it here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((entry) => {
            const cfg = typeConfig[entry.type] ?? typeConfig.Call;
            const { Icon } = cfg;
            return (
              <div
                key={entry.id}
                className={`flex items-center gap-4 bg-white border border-gray-200
                             border-l-4 ${cfg.border} rounded-2xl px-4 py-3.5 shadow-sm
                             hover:translate-x-1 hover:shadow-md transition-all`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{entry.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(entry.date).toLocaleDateString("en-GB", {
                      weekday: "short", day: "numeric", month: "long",
                      year: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>
                <span className="text-[0.7rem] font-semibold px-2.5 py-1 rounded-full
                                  bg-gray-100 text-gray-400 border border-gray-200 flex-shrink-0">
                  {entry.type}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
