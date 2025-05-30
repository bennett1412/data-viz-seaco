import type { Route } from "../types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "Home Page", content: "Welcome to SEACO viz" },
  ];
}

export default function Home() {
  return <Welcome />;
}
