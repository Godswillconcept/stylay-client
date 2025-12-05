import { useNavigate } from "react-router";

export default function JournalCard({ journal }) {
  const navigate = useNavigate()
  // const image = journal.featured_images?.[0] || "https://picsum.photos/300/300?random=9999990";
  const image = "https://picsum.photos/300/300?random=9999990";



  return (
    <div className="relative">
      <div
        aria-label={journal.title}
        className="
          block w-full group overflow-hidden rounded-2xl
          shadow-lg hover:shadow-xl transition-all duration-300
          aspect-[3/4] bg-neutral-200
        "
        onClick={() => navigate(`/journals/${journal.id}`)}
      >
        <img
          src={image}
          alt={journal.title}
          className="
            h-full w-full object-cover
            transition-transform duration-500 group-hover:scale-105
          "
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Text */}
        <div className="absolute bottom-0 p-4 md:p-6 text-white">
          <p className="text-xs opacity-80">{journal.date}</p>
          <h3 className="mt-1 text-lg font-semibold">{journal.title}</h3>
          <p className="mt-1 text-sm opacity-90 text-cyan-200 line-clamp-2">
            {journal.excerpt}
          </p>
        </div>
      </div>
    </div>
  );
}
