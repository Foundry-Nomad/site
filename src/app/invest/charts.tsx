/**
 * Chart primitives for the invest page. Server components: the SVG geometry
 * is computed at build time and ships as static markup, so the page carries no
 * client-side charting bundle. Every stroke uses `vector-effect` so the
 * non-uniform `preserveAspectRatio="none"` stretch never thickens the line.
 */

type Geometry = {
  line: string;
  area: string;
  /** Y of the first point, used as the entry reference line. */
  baselineY: number;
  lastX: number;
  lastY: number;
  low: number;
  high: number;
};

function geometry(series: number[], padRatio = 0.14): Geometry {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const pad = (max - min || 0.001) * padRatio;
  const low = min - pad;
  const high = max + pad;

  const points = series.map((value, index) => {
    const x = (index / (series.length - 1)) * 100;
    const y = 100 - ((value - low) / (high - low)) * 100;
    return [x, y] as const;
  });

  const line = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(3)},${y.toFixed(3)}`)
    .join(" ");

  return {
    line,
    area: `${line} L100,100 L0,100 Z`,
    baselineY: points[0][1],
    lastX: points[points.length - 1][0],
    lastY: points[points.length - 1][1],
    low,
    high,
  };
}

type SparklineProps = {
  series: number[];
  /** Drives the stroke colour and the accessible description. */
  direction: "up" | "down";
  label: string;
  /** Staggers the draw-in so cards resolve in reading order. */
  order?: number;
};

export function Sparkline({ series, direction, label, order = 0 }: SparklineProps) {
  const { line, area, baselineY } = geometry(series, 0.18);
  const gradientId = `spark-${label.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <svg
      className="qv-spark"
      data-direction={direction}
      style={{ "--qv-order": order } as React.CSSProperties}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.26" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line
        className="qv-spark-baseline"
        x1="0"
        y1={baselineY}
        x2="100"
        y2={baselineY}
        vectorEffect="non-scaling-stroke"
      />
      <path className="qv-spark-area" d={area} fill={`url(#${gradientId})`} />
      <path
        className="qv-spark-line"
        d={line}
        pathLength={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

type TrendChartProps = {
  series: number[];
  label: string;
  /** Rendered under the plot, evenly spaced from the first session to the last. */
  xLabels: string[];
};

export function TrendChart({ series, label, xLabels }: TrendChartProps) {
  const { line, area, baselineY, lastX, lastY, low, high } = geometry(series, 0.16);
  const ticks = Array.from({ length: 5 }, (_, index) =>
    (high - (index / 4) * (high - low)).toFixed(3),
  );

  return (
    <div className="qv-trend">
      <div className="qv-trend-plot">
        <div className="qv-trend-canvas">
          <svg
            className="qv-trend-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            role="img"
            aria-label={label}
          >
            <defs>
              <linearGradient id="qv-trend-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line
              className="qv-trend-baseline"
              x1="0"
              y1={baselineY}
              x2="100"
              y2={baselineY}
              vectorEffect="non-scaling-stroke"
            />
            <path className="qv-trend-area" d={area} fill="url(#qv-trend-fill)" />
            <path
              className="qv-trend-line"
              d={line}
              pathLength={1}
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            className="qv-trend-marker"
            style={{ left: `${lastX}%`, top: `${lastY}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="qv-trend-ticks" aria-hidden="true">
          {ticks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
      </div>
      <div className="qv-trend-axis" aria-hidden="true">
        {xLabels.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </div>
  );
}
