import { useNavigate } from "react-router-dom";

const statusMap = {
  "overdue":    { label: "Overdue",    style: "bg-red-100 text-red-600"       },
  "almost due": { label: "Almost Due", style: "bg-amber-100 text-amber-700"   },
  "on-track":   { label: "On-Track",   style: "bg-emerald-100 text-emerald-700" },
};

export default function FriendCard({ friend }) {
  const navigate = useNavigate();
  const st = statusMap[friend.status] ?? statusMap["on-track"];

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col
                 items-center text-center cursor-pointer shadow-sm
                 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        loading="lazy"
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 mb-3"
      />

      <h3 className="text-sm font-bold text-gray-900 w-full truncate mb-1">
        {friend.name}
      </h3>

      <p className="text-xs text-gray-400 mb-2.5">
        {friend.days_since_contact}d ago
      </p>

      <div className="flex flex-wrap justify-center gap-1 mb-3">
        {friend.tags.map((tag) => (
          <span
            key={tag}
            className="text-[0.62rem] font-bold uppercase tracking-wider
                       px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <span className={`text-[0.7rem] font-bold px-3.5 py-1 rounded-full ${st.style}`}>
        {st.label}
      </span>
    </div>
  );
}
