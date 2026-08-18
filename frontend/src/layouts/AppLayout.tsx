import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { navigation } from "../config/navigation";
import { accentThemes } from "../config/theme";

export default function AppLayout() {
  const location = useLocation();

  const currentItem = navigation.find(
    (item) =>
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/")
  );

  const theme = currentItem ? accentThemes[currentItem.color] : accentThemes.slate;

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${theme.surfaceBg}`}>
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="flex-1 overflow-y-auto p-6 md:p-8"
        >
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
}
