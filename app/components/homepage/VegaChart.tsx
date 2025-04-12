import React, { useEffect } from 'react';
import { parse, View } from 'vega';
import spec from './pyramidSpec.json'; // place your Vega spec in this file or inline it

const VegaChart = () => {
  useEffect(() => {
    const runtime = parse(spec);
    new View(runtime)
      .renderer('canvas') // or 'svg'
      .initialize('#vega-view')
      .run();
  }, []);

  return <div id="vega-view" />;
};

export default VegaChart;
