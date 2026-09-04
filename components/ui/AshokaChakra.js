'use client';

export default function AshokaChakra({ size = 300, className = '', opacity = 0.08 }) {
  const spokes = Array.from({ length: 24 }, (_, i) => i);
  const cx = size / 2;
  const cy = size / 2;
  const r  = size * 0.42;
  const innerR = size * 0.12;
  const color = '#06038D';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      className={className} style={{ opacity }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={cx} cy={cy} r={r}       stroke={color} strokeWidth="3" />
      <circle cx={cx} cy={cy} r={innerR}  stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15" />
      <circle cx={cx} cy={cy} r={r*0.85}  stroke={color} strokeWidth="1" strokeDasharray="4 4" />
      {spokes.map((i) => {
        const angle = (i * 360) / 24 - 90;
        const rad   = (angle * Math.PI) / 180;
        const x1 = cx + innerR * Math.cos(rad);
        const y1 = cy + innerR * Math.sin(rad);
        const x2 = cx + r * Math.cos(rad);
        const y2 = cy + r * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color} strokeWidth={i % 3 === 0 ? '2.5' : '1'} />;
      })}
      {spokes.map((i) => {
        if (i % 3 !== 0) return null;
        const angle = (i * 360) / 24 - 90;
        const rad   = (angle * Math.PI) / 180;
        const x = cx + (r + 8) * Math.cos(rad);
        const y = cy + (r + 8) * Math.sin(rad);
        return <circle key={`d${i}`} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}
