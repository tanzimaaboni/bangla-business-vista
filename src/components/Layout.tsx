
import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Bangla Business Vista</p>
          <p className="mt-2">A demo application showcasing top Bangladeshi companies</p>
        </div>
      </footer>
    </div>
  );
}
