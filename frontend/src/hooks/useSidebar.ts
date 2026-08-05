import { useEffect, useState } from "react";

const STORAGE_KEY = "decisio-sidebar";

export function useSidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored);
    }

    return false;
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(collapsed)
    );
  }, [collapsed]);

  const toggleSidebar = () =>
    setCollapsed((prev) => !prev);

  return {
    collapsed,
    toggleSidebar,
    setCollapsed,
  };
}