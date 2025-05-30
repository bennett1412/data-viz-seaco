// routes/_layout.tsx
import { Outlet } from "react-router";
import Header from "~/components/homepage/Header";
import type { Route } from "../+types/root";


export default function Layout() {
  return (
    <div>
      <Header />
      <div>
        <Outlet /> {/* Renders child routes */}
      </div>
    </div>
  );
}
