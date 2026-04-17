import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Phone, MessageSquare, Video,
  AlarmClock, Archive, Trash2, Edit, ArrowLeft,
  Calendar, Target, Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTimeline } from "../context/TimelineContext";

const statusMap = {
  "overdue":    { label: "Overdue",    badge: "bg-red-100 text-red-600",              bar: "bg-red-500"     },
  "almost due": { label: "Almost Due", badge: "bg-amber-100 text-amber-700",          bar: "bg-amber-400"   },
  "on-track":   { label: "On-Track",   badge: "bg-emerald-100 text-emerald-700",      bar: "bg-emerald-500" },
};

export default function FriendDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const { addEntry } = useTimeline();

  useEffect(() => {
    fetch("/friends.json")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((f) => f.id === parseInt(id));
        if (!found) navigate("/*");
        else setFriend(found);
      });
  }, [id]);

  if (!friend)
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-leaf rounded-full animate-spin" />
      </div>
    );

  const st = statusMap[friend.status] ?? statusMap["on-track"];
  const pct = Math.min(Math.round((friend.days_since_contact / friend.goal) * 100), 100);
  const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  const handleCheckin = (type) => {
    addEntry(friend.name, type);
    toast.success(`${type} with ${friend.name} logged!`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700
                   bg-white border border-gray-200 rounded-lg px-4 py-2 mb-7
                   transition-colors hover:border-gray-300"
      >
        <ArrowLeft size={15} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm
                        flex flex-col items-center text-center h-fit">
          <img src={friend.picture} alt={friend.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100 mb-3" />

          <h2 className="text-lg font-bold text-gray-900 mb-1">{friend.name}</h2>
          <span className={`text-xs font-bold px-3 py-1 rounded-full mb-3 ${st.badge}`}>
            {st.label}
          </span>

          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {friend.tags.map((t) => (
              <span key={t} className="text-[0.65rem] font-bold uppercase tracking-wide
                                       bg-gray-100 text-gray-500 border border-gray-200
                                       px-2 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>

          {friend.bio && (
            <p className="text-xs text-gray-400 italic leading-relaxed mb-2">"{friend.bio}"</p>
          )}
          <p className="text-xs text-gray-400">📧 {friend.email}</p>

          <div className="w-full border-t border-gray-100 mt-5 pt-4 space-y-1.5">
            {[
              { Icon: AlarmClock, label: "Snooze 2 Weeks", cls: "hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300" },
              { Icon: Archive,    label: "Archive",         cls: "hover:text-amber-600 hover:bg-amber-50 hover:border-amber-300"     },
              { Icon: Trash2,     label: "Delete",          cls: "hover:text-red-600 hover:bg-red-50 hover:border-red-300"           },
            ].map(({ Icon, label, cls }) => (
              <button key={label}
                className={`w-full flex items-center justify-center gap-2 text-xs font-medium
                             text-gray-500 border border-gray-200 rounded-lg py-2.5
                             transition-all ${cls}`}>
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { Icon: Clock,    label: "Days Since Contact", value: friend.days_since_contact },
              { Icon: Target,   label: "Goal (Days)",         value: friend.goal              },
              { Icon: Calendar, label: "Next Due Date",       value: fmt(friend.next_due_date) },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-2xl
                                          p-4 text-center shadow-sm">
                <Icon size={18} className="text-leaf mx-auto mb-2" />
                <p className="text-2xl font-extrabold text-gray-900 tracking-tight leading-none">
                  {value}
                </p>
                <p className="text-xs text-gray-400 mt-1.5 font-medium">{label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-gray-900">Relationship Goal</h3>
              <button className="flex items-center gap-1 text-xs text-gray-400
                                 bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5
                                 hover:text-leaf hover:border-leaf hover:bg-emerald-50 transition-all">
                <Edit size={11} /> Edit
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">
              Contact <strong className="text-gray-700">{friend.name.split(" ")[0]}</strong> every{" "}
              <strong className="text-gray-700">{friend.goal} days</strong> to maintain this friendship.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Quick Check-In</h3>
            <p className="text-xs text-gray-400 mb-4">Log an interaction to reset the timer</p>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => handleCheckin("Call")}
                className="flex flex-col items-center gap-2 py-5 rounded-xl
                           bg-emerald-50 text-emerald-700 border-2 border-emerald-200
                           hover:bg-emerald-500 hover:text-white hover:border-emerald-500
                           transition-all hover:-translate-y-0.5 font-semibold text-sm">
                <Phone size={20} /> Call
              </button>
              <button onClick={() => handleCheckin("Text")}
                className="flex flex-col items-center gap-2 py-5 rounded-xl
                           bg-violet-50 text-violet-700 border-2 border-violet-200
                           hover:bg-violet-500 hover:text-white hover:border-violet-500
                           transition-all hover:-translate-y-0.5 font-semibold text-sm">
                <MessageSquare size={20} /> Text
              </button>
              <button onClick={() => handleCheckin("Video")}
                className="flex flex-col items-center gap-2 py-5 rounded-xl
                           bg-amber-50 text-amber-700 border-2 border-amber-200
                           hover:bg-amber-500 hover:text-white hover:border-amber-500
                           transition-all hover:-translate-y-0.5 font-semibold text-sm">
                <Video size={20} /> Video
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
