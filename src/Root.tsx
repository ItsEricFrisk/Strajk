import Loading from "./pages/Loading/Loading";
import { Outlet } from "react-router-dom";
import { useLoadingStore } from "./zustand/store";

export default function Root() {
  // Zustand
  const loading: boolean = useLoadingStore((state) => state.loading);

  return (
    <main className="min-h-screen overflow-hidden bg-default">
      {loading ? <Loading /> : <Outlet />}
    </main>
  );
}
