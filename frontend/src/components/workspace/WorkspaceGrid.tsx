import { navigation } from "../../config/navigation";
import WorkspaceCard from "./WorkspaceCard";

function WorkspaceGrid() {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {navigation.map((item) => (
          <WorkspaceCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

export default WorkspaceGrid;