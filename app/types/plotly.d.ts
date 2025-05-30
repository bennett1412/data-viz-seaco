declare module 'plotly.js-dist-min' {
  const Plotly: any;
  export default Plotly;
}

declare module 'react-plotly.js' {
  import { ComponentType } from 'react';
  export function createPlotlyComponent(plotly: any): ComponentType<any>;
} 