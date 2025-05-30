import type { Route } from "../+types/root";
import Home from "../components/homepage";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "Home Page", content: "Welcome to SEACO viz" },
  ];
}

const homepage = () => {
  return <Home />;
};

export default homepage;
