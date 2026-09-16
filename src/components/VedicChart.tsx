import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Line,
  Path,
  Rect,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
  G,
} from 'react-native-svg';
import { useTheme } from '../theme/ThemeContext';

interface Planet {
  name: string;
  house: number;
}

interface VedicChartProps {
  planets: Planet[];
  size?: number;
  showAsc?: boolean;
}

const V: number = 600;
const PAD: number = 8;
const MIN: number = PAD;
const MAX: number = V - PAD;
const H: number = V / 2;

const SQR_CORNERS = [
  { x: MIN, y: MIN },
  { x: MAX, y: MIN },
  { x: MAX, y: MAX },
  { x: MIN, y: MAX },
];

const DMN_VERTS = [
  { x: H, y: MIN },
  { x: MAX, y: H },
  { x: H, y: MAX },
  { x: MIN, y: H },
];

function lineIntersect(
  x1: number, y1: number, x2: number, y2: number,
  x3: number, y3: number, x4: number, y4: number,
): { x: number; y: number } | null {
  const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(d) < 1e-10) return null;
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

const DIAG_I = (() => {
  const i1 = lineIntersect(MIN, MIN, MAX, MAX, MIN, H, H, MIN)!;
  const i2 = lineIntersect(MAX, MIN, MIN, MAX, H, MIN, MAX, H)!;
  const i3 = lineIntersect(MAX, MAX, MIN, MIN, MAX, H, H, MAX)!;
  const i4 = lineIntersect(MIN, MAX, MAX, MIN, H, MAX, MIN, H)!;
  return [i1, i2, i3, i4];
})();

function ctr(...pts: { x: number; y: number }[]) {
  const s = pts.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y }), { x: 0, y: 0 });
  return { x: s.x / pts.length, y: s.y / pts.length };
}

const HOUSE_CTR: Record<number, { x: number; y: number }> = {
  1:  ctr(DMN_VERTS[0], DIAG_I[0], { x: H, y: H }, DIAG_I[1]),
  2:  ctr(SQR_CORNERS[0], DMN_VERTS[0], DIAG_I[0]),
  3:  ctr(SQR_CORNERS[0], DMN_VERTS[3], DIAG_I[0]),
  4:  ctr(DMN_VERTS[3], DIAG_I[3], { x: H, y: H }, DIAG_I[0]),
  5:  ctr(SQR_CORNERS[3], DMN_VERTS[3], DIAG_I[3]),
  6:  ctr(SQR_CORNERS[3], DMN_VERTS[2], DIAG_I[3]),
  7:  ctr(DMN_VERTS[2], DIAG_I[2], { x: H, y: H }, DIAG_I[3]),
  8:  ctr(SQR_CORNERS[2], DMN_VERTS[2], DIAG_I[2]),
  9:  ctr(SQR_CORNERS[2], DMN_VERTS[1], DIAG_I[2]),
  10: ctr(DMN_VERTS[1], DIAG_I[1], { x: H, y: H }, DIAG_I[2]),
  11: ctr(SQR_CORNERS[1], DMN_VERTS[1], DIAG_I[1]),
  12: ctr(SQR_CORNERS[1], DMN_VERTS[0], DIAG_I[1]),
};

function nudge(c: { x: number; y: number }, h: number): { x: number; y: number } {
  const e = 6;
  switch (h) {
    case 2:  return { x: c.x, y: c.y + e };
    case 3:  return { x: c.x + e, y: c.y };
    case 5:  return { x: c.x + e, y: c.y };
    case 6:  return { x: c.x, y: c.y - e };
    case 8:  return { x: c.x, y: c.y - e };
    case 9:  return { x: c.x - e, y: c.y };
    case 11: return { x: c.x - e, y: c.y };
    case 12: return { x: c.x, y: c.y + e };
    default: return c;
  }
}

const HOUSE_POS: Record<number, { x: number; y: number }> = {};
const PLANET_POS: Record<number, { x: number; y: number }> = {};
for (let h = 1; h <= 12; h++) {
  const base = HOUSE_CTR[h];
  HOUSE_POS[h] = nudge(base, h);
  const isInner = [1, 4, 7, 10].includes(h);
  PLANET_POS[h] = {
    x: HOUSE_POS[h].x,
    y: HOUSE_POS[h].y + (isInner ? 18 : 15),
  };
}

const VedicChart: React.FC<VedicChartProps> = ({ planets, size = 340, showAsc = false }) => {
  const { colors } = useTheme();

  const getHousePlanets = (house: number) =>
    planets
      .filter((p) => p.house === house)
      .map((p) => p.name)
      .join(' ');

  const STROKE = '#8B6B4A';

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${V} ${V}`}>
        <Defs>
          <LinearGradient id="kg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FFF5EC" />
            <Stop offset="50%" stopColor="#FFE8D2" />
            <Stop offset="100%" stopColor="#FFD9B8" />
          </LinearGradient>
        </Defs>

        <Rect
          x={0} y={0}
          width={V} height={V}
          rx={16} ry={16}
          fill="url(#kg)"
          stroke={STROKE}
          strokeWidth={2}
        />

        <Rect
          x={MIN} y={MIN}
          width={MAX - MIN} height={MAX - MIN}
          fill="none"
          stroke={STROKE}
          strokeWidth={1.8}
        />

        <Path
          d={`M ${DMN_VERTS[0].x} ${DMN_VERTS[0].y} L ${DMN_VERTS[1].x} ${DMN_VERTS[1].y} L ${DMN_VERTS[2].x} ${DMN_VERTS[2].y} L ${DMN_VERTS[3].x} ${DMN_VERTS[3].y} Z`}
          fill="none"
          stroke={STROKE}
          strokeWidth={1.5}
        />

        <Line
          x1={SQR_CORNERS[0].x} y1={SQR_CORNERS[0].y}
          x2={SQR_CORNERS[2].x} y2={SQR_CORNERS[2].y}
          stroke={STROKE} strokeWidth={1}
        />
        <Line
          x1={SQR_CORNERS[1].x} y1={SQR_CORNERS[1].y}
          x2={SQR_CORNERS[3].x} y2={SQR_CORNERS[3].y}
          stroke={STROKE} strokeWidth={1}
        />

        <G opacity={0.5}>
          <Path
            d={`M ${MIN + 6} ${MIN + 32} Q ${MIN + 6} ${MIN + 6} ${MIN + 32} ${MIN + 6}`}
            fill="none" stroke="#D4A574" strokeWidth={1.6}
          />
          <Path
            d={`M ${MIN + 6} ${MIN + 20} Q ${MIN + 14} ${MIN + 14} ${MIN + 20} ${MIN + 6}`}
            fill="none" stroke="#D4A574" strokeWidth={0.9}
          />
          <Path
            d={`M ${MAX - 32} ${MIN + 6} Q ${MAX - 6} ${MIN + 6} ${MAX - 6} ${MIN + 32}`}
            fill="none" stroke="#D4A574" strokeWidth={1.6}
          />
          <Path
            d={`M ${MAX - 20} ${MIN + 6} Q ${MAX - 14} ${MIN + 14} ${MAX - 6} ${MIN + 20}`}
            fill="none" stroke="#D4A574" strokeWidth={0.9}
          />
          <Path
            d={`M ${MIN + 6} ${MAX - 32} Q ${MIN + 6} ${MAX - 6} ${MIN + 32} ${MAX - 6}`}
            fill="none" stroke="#D4A574" strokeWidth={1.6}
          />
          <Path
            d={`M ${MIN + 6} ${MAX - 20} Q ${MIN + 14} ${MAX - 14} ${MIN + 20} ${MAX - 6}`}
            fill="none" stroke="#D4A574" strokeWidth={0.9}
          />
          <Path
            d={`M ${MAX - 32} ${MAX - 6} Q ${MAX - 6} ${MAX - 6} ${MAX - 6} ${MAX - 32}`}
            fill="none" stroke="#D4A574" strokeWidth={1.6}
          />
          <Path
            d={`M ${MAX - 20} ${MAX - 6} Q ${MAX - 14} ${MAX - 14} ${MAX - 6} ${MAX - 20}`}
            fill="none" stroke="#D4A574" strokeWidth={0.9}
          />
        </G>

        {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((h) => {
          const p = HOUSE_POS[h];
          return (
            <SvgText
              key={`hn${h}`}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              fontSize={h === 1 ? 15 : 13}
              fontWeight="700"
              fill="#B55A2A"
            >
              {h}
            </SvgText>
          );
        })}

        {showAsc && (
          <SvgText
            x={HOUSE_POS[1].x}
            y={HOUSE_POS[1].y - 14}
            textAnchor="middle"
            fontSize={9}
            fontWeight="600"
            fill="#8B5A2A"
          >
            Asc
          </SvgText>
        )}

        {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((h) => {
          const txt = getHousePlanets(h);
          if (!txt) return null;
          const p = PLANET_POS[h];
          return (
            <SvgText
              key={`pt${h}`}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              fontSize={9}
              fontWeight="600"
              fill="#8B5A2A"
            >
              {txt}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});

export default VedicChart;
