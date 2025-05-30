import React from "react";
import type { Route } from "../+types/root";
import Diseases from "../components/diseases";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Disease" },
    { name: "Diseases", content: "View diseases information" },
  ];
}

export default function ({ params }: Route.ComponentProps) {
  if (!params.sourceId) return <div>Source not defined</div>;
  else return <Diseases sourceId={params.sourceId} />;
}
