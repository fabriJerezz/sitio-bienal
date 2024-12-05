import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

interface PlotProps {
  data: Plotly.Data[];
  layout?: Partial<Plotly.Layout>;
  config?: Partial<Plotly.Config>;
}

const Plot: React.FC<PlotProps> = ({ data, layout = {}, config = {} }) => {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (plotRef.current) {
      Plotly.newPlot(plotRef.current, data, layout, config);
    }

    return () => {
      if (plotRef.current) {
        Plotly.purge(plotRef.current);
      }
    };
  }, [data, layout, config]);

  return <div ref={plotRef} />;
};

export default Plot;
