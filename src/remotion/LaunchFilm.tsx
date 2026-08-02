import {
  AbsoluteFill,
  Easing,
  Interactive,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const prices = [
  { label: "S&P 500", value: "5,482.87", change: "+0.62%" },
  { label: "NASDAQ", value: "17,862.23", change: "+0.91%" },
  { label: "BTC / USD", value: "68,429.10", change: "+2.48%" },
  { label: "GOLD", value: "2,376.40", change: "+0.34%" },
];

const bars = [36, 58, 42, 74, 54, 88, 66, 78, 46, 92, 70, 98, 62, 82, 76, 100];

export const LaunchFilm = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loopFrame = frame % 150;

  return (
    <AbsoluteFill
      name="Financial launch scene"
      style={{
        backgroundColor: "#120f0d",
        color: "#fff4e8",
        fontFamily: 'Arial, "PingFang SC", "Microsoft YaHei", sans-serif',
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name="Ambient glow"
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          left: 800,
          top: -500,
          borderRadius: 999,
          background: "radial-gradient(circle, rgba(255,171,46,0.2) 0%, rgba(198,63,31,0.08) 38%, transparent 70%)",
          scale: interpolate(loopFrame, [0, 75, 149], [0.95, 1.08, 0.95], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.inOut(Easing.ease),
          }),
        }}
      />

      <div className="finance-grid" />
      <div
        className="radar-ring radar-ring-outer"
        style={{
          rotate: interpolate(loopFrame, [0, 149], ["0deg", "360deg"], { easing: Easing.linear }),
          scale: interpolate(loopFrame, [0, 75, 149], [0.92, 1.04, 0.92], { easing: Easing.inOut(Easing.ease) }),
        }}
      />
      <div
        className="radar-ring radar-ring-inner"
        style={{ rotate: interpolate(loopFrame, [0, 149], ["360deg", "0deg"], { easing: Easing.linear }) }}
      />
      <div
        className="scan-line"
        style={{
          translate: interpolate(loopFrame, [0, 149], ["0px -160px", "0px 1120px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
          }),
        }}
      />

      <svg className="market-line" viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff612f" stopOpacity="0" />
            <stop offset="0.35" stopColor="#ff7a32" stopOpacity="0.28" />
            <stop offset="1" stopColor="#ffba26" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff9b2f" stopOpacity="0.13" />
            <stop offset="1" stopColor="#ff612f" stopOpacity="0" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d="M-20 825 C120 820 160 770 280 790 S440 730 540 752 S690 665 790 705 S960 635 1060 652 S1210 545 1320 585 S1460 490 1570 520 S1730 430 1940 390 L1940 1080 L-20 1080 Z" fill="url(#areaGradient)" />
        <path
          d="M-20 825 C120 820 160 770 280 790 S440 730 540 752 S690 665 790 705 S960 635 1060 652 S1210 545 1320 585 S1460 490 1570 520 S1730 430 1940 390"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeDasharray="2300"
          strokeDashoffset={interpolate(frame, [0, 3 * fps], [2300, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}
          filter="url(#glow)"
        />
        <circle
          cx={interpolate(loopFrame, [0, 30, 60, 90, 120, 149], [280, 540, 790, 1060, 1320, 1570])}
          cy={interpolate(loopFrame, [0, 30, 60, 90, 120, 149], [790, 752, 705, 652, 585, 520])}
          r="8"
          fill="#ffbd2e"
          filter="url(#glow)"
        />
      </svg>

      <Interactive.Div name="Top navigation" className="topbar">
        <div className="brand">
          <Img name="Foundry Nomad logo" src={staticFile("logo.png")} className="brand-logo" />
          <span>FOUNDRY NOMAD</span>
        </div>
        <div className="system-state"><span className="live-dot" /> SYSTEMS INITIALIZING</div>
      </Interactive.Div>

      <Interactive.Div
        name="Launch message"
        className="hero-copy"
        style={{
          translate: interpolate(frame, [0, 32], ["0px 18px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        <div className="eyebrow"><span>PRIVATE ACCESS</span><span className="eyebrow-rule" /></div>
        <h1>下一程，<br /><em style={{ backgroundPosition: `${interpolate(loopFrame, [0, 149], [-80, 180])}% 50%` }}>即将启航。</em></h1>
        <p>我们正在构建新一代金融科技体验。<br />业务即将上线，敬请期待。</p>
        <div className="progress-row"><span>LAUNCH SEQUENCE</span><div className="progress-track"><span style={{ width: `${interpolate(loopFrame, [0, 149], [18, 88])}%` }} /></div><span>{Math.round(interpolate(loopFrame, [0, 149], [18, 88]))}%</span></div>
      </Interactive.Div>

      <Interactive.Div name="Market data" className="market-data">
        {prices.map((price, index) => (
          <div className="quote" key={price.label} style={{ translate: `0 ${interpolate(frame, [35 + index * 5, 65 + index * 5], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px`, opacity: interpolate((loopFrame + index * 18) % 150, [0, 55, 110, 149], [0.55, 1, 0.72, 0.55]) }}>
            <span>{price.label}</span><strong>{price.value}</strong><i>{price.change}</i>
          </div>
        ))}
      </Interactive.Div>

      <div className="volume-bars" aria-hidden="true">
        {bars.map((height, index) => <span key={index} style={{ height: `${height * interpolate(loopFrame, [0, 55, 110, 149], [0.46, 1, 0.62, 0.46])}%`, opacity: 0.15 + index * 0.015 }} />)}
      </div>

      <div className="corner corner-a" /><div className="corner corner-b" />
      <div className="coordinates">22.3193° N&nbsp;&nbsp; 114.1694° E</div>
    </AbsoluteFill>
  );
};
