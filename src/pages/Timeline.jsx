import { useState } from "react";
import { Phone, MessageSquare, Video, Clock, ChevronDown } from "lucide-react";
import { useTimeline } from "../context/TimelineContext";

const typeConfig = {
  Call:  { Icon: Phone,  iconBg: "bg-emerald-50 text-emerald-600" },
  Text:  { Icon: MessageSquare,  iconBg: "bg-violet-50 text-violet-600"   },
  Video: { Icon: Video, iconBg: "bg-amber-50 text-amber-600"     },
};

export default function Timeline() {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? entries : entries.filter((e) => e.type === filter);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-bold text-3xl text-gray-900 mb-3 tracking-tight">Timeline</h1>

      <div className="relative mb-8 w-64">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2.5
                     text-sm text-gray-600 bg-white cursor-pointer
                     focus:outline-none focus:border-gray-400"
        >
          <option value="All">Filter timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>
        <ChevronDown size={15} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
      </div>

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