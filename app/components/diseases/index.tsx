import React from "react";
import DiseasesVis from "./DiseasesViz";

const Diseases = ({ sourceId }: { sourceId: string }) => {
  const sourceMap: Record<string, string> = {
    "health-round-1": "/data/demo.csv",
  };
  console.log(sourceId);
  console.log(sourceMap[sourceId]);
  return <DiseasesVis sourcePath={sourceMap[sourceId]} />;
};

export default Diseases;
