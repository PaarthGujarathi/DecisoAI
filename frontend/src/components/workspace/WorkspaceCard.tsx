import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { NavItem } from "../../config/navigation";

interface WorkspaceCardProps {
  item: NavItem;
}

const iconStyles: Record<NavItem["color"], string> = {
  blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
  emerald:
    "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
  violet:
    "bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
  amber:
    "bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
  pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
  cyan: "bg-cyan-100 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white",
  orange:
    "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
  slate:
    "bg-slate-200 text-slate-700 group-hover:bg-slate-700 group-hover:text-white",
};

function WorkspaceCard({ item }: WorkspaceCardProps) {
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl"
    >
      {/* Background Glow */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-100 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-60" />

      {/* Icon */}
      <div
        className={`relative mb-8 inline-flex rounded-2xl p-4 transition-all duration-300 group-hover:scale-110 ${iconStyles[item.color]}`}
      >
        <Icon size={30} />
      </div>

      {/* Title */}
      <h3 className="relative text-2xl font-bold text-slate-900">
        {item.label}
      </h3>

      {/* Description */}
      <p className="relative mt-4 leading-7 text-slate-500">
        {item.description}
      </p>

      {/* Footer */}
      <div className="relative mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
        <span className="text-sm font-medium text-slate-500 transition-colors group-hover:text-blue-600">
          Open Module
        </span>

        <ArrowUpRight
          size={20}
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
    </Link>
  );
}

export default WorkspaceCard;