import { useState } from "react";
import { navigation } from "../../config/navigation";
import WorkspaceCard from "./WorkspaceCard";

function WorkspaceGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {navigation.map((item) => (
          <WorkspaceCard
            key={item.id}
            item={item}
            isHovered={hoveredId === item.id}
            isDimmed={hoveredId !== null && hoveredId !== item.id}
            onHoverStart={() => setHoveredId(item.id)}
            onHoverEnd={() => setHoveredId(null)}
          />
        ))}
      </div>
    </section>
  );
}

export default WorkspaceGrid;