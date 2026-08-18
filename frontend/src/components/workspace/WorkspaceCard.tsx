import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { NavItem } from "../../config/navigation";

interface WorkspaceCardProps {
  item: NavItem;
  isHovered: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const colorStyles: Record<
  NavItem["color"],
  { iconBg: string; iconColor: string; hoverBorder: string }
> = {
  blue: {
    iconBg: "bg-blue-50 text-blue-600 border-blue-100",
    iconColor: "text-blue-600",
    hoverBorder: "group-hover:border-blue-300",
  },
  emerald: {
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    iconColor: "text-emerald-600",
    hoverBorder: "group-hover:border-emerald-300",
  },
  violet: {
    iconBg: "bg-violet-50 text-violet-600 border-violet-100",
    iconColor: "text-violet-600",
    hoverBorder: "group-hover:border-violet-300",
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-600 border-amber-100",
    iconColor: "text-amber-600",
    hoverBorder: "group-hover:border-amber-300",
  },
  rose: {
    iconBg: "bg-rose-50 text-rose-600 border-rose-100",
    iconColor: "text-rose-600",
    hoverBorder: "group-hover:border-rose-300",
  },
  indigo: {
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
    iconColor: "text-indigo-600",
    hoverBorder: "group-hover:border-indigo-300",
  },
  orange: {
    iconBg: "bg-orange-50 text-orange-600 border-orange-100",
    iconColor: "text-orange-600",
    hoverBorder: "group-hover:border-orange-300",
  },
  slate: {
    iconBg: "bg-slate-100 text-slate-700 border-slate-200",
    iconColor: "text-slate-700",
    hoverBorder: "group-hover:border-slate-400",
  },
};

export default function WorkspaceCard({
  item,
  isHovered,
  isDimmed,
  onHoverStart,
  onHoverEnd,
}: WorkspaceCardProps) {
  const Icon = item.icon;
  const styleConfig = colorStyles[item.color];

  return (
    <motion.div
      animate={{
        scale: isHovered ? 1.025 : isDimmed ? 0.98 : 1,
        opacity: isDimmed ? 0.65 : 1,
        y: isHovered ? -4 : 0,
      }}
      transition={{
        duration: 0.22,
        ease: "easeOut",
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      className="h-full"
    >
      <Link
        to={item.path}
        className={`group relative flex h-full flex-col justify-between rounded-2xl border bg-white p-6 shadow-2xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isHovered
            ? "border-blue-400/80 shadow-md"
            : "border-slate-200/90 hover:border-slate-300"
        }`}
      >
        <div>
          {/* Header Row: Icon & Open Arrow */}
          <div className="flex items-center justify-between">
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border ${styleConfig.iconBg}`}
            >
              <Icon size={24} />
            </motion.div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-400 transition-colors group-hover:border-slate-200 group-hover:bg-slate-100 group-hover:text-slate-700">
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
            {item.label}
          </h3>

          {/* Description */}
          <motion.p
            animate={{
              opacity: isHovered ? 1 : 0.8,
            }}
            className="mt-2 text-xs leading-relaxed text-slate-500"
          >
            {item.description}
          </motion.p>
        </div>

        {/* Footer Link Label */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-400 transition-colors group-hover:text-blue-600">
          <span>Open Module</span>
          <span className="text-[11px] font-normal text-slate-400">Launch →</span>
        </div>
      </Link>
    </motion.div>
  );
}