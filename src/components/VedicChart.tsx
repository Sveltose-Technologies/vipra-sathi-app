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

const H_MID = 0.5;
const O_MID = 0.25;
const O_NUM = 0.08;
const O_PLN = 0.16;
const I_NUM = 0.18;
const I_PLN = 0.28;

const HOUSE_POS: Record<number, { x: number; y: number }> = {
  1: { x: V * H_MID, y: V * I_NUM },
  2: { x: V * O_MID, y: V * O_NUM },
  3: { x: V * O_NUM, y: V * O_MID },
  4: { x: V * I_NUM, y: V * H_MID },
  5: { x: V * O_NUM, y: V * (1 - O_MID) },
  6: { x: V * O_MID, y: V * (1 - O_NUM) },
  7: { x: V * H_MID, y: V * (1 - I_NUM) },
  8: { x: V * (1 - O_MID), y: V * (1 - O_NUM) },
  9: { x: V * (1 - O_NUM), y: V * (1 - O_MID) },
  10: { x: V * (1 - I_NUM), y: V * H_MID },
  11: { x: V * (1 - O_NUM), y: V * O_MID },
  12: { x: V * (1 - O_MID), y: V * O_NUM },
};

const PLANET_POS: Record<number, { x: number; y: number }> = {
  1: { x: V * H_MID, y: V * I_PLN },
  2: { x: V * O_MID, y: V * O_PLN },
  3: { x: V * O_PLN, y: V * O_MID },
  4: { x: V * I_PLN, y: V * H_MID },
  5: { x: V * O_PLN, y: V * (1 - O_MID) },
  6: { x: V * O_MID, y: V * (1 - O_PLN) },
  7: { x: V * H_MID, y: V * (1 - I_PLN) },
  8: { x: V * (1 - O_MID), y: V * (1 - O_PLN) },
  9: { x: V * (1 - O_PLN), y: V * (1 - O_MID) },
  10: { x: V * (1 - I_PLN), y: V * H_MID },
  11: { x: V * (1 - O_PLN), y: V * O_MID },
  12: { x: V * (1 - O_MID), y: V * O_PLN },
};

const VedicChart: React.FC<VedicChartProps> = ({ planets, size = 340, showAsc = false }) => {
  const { colors } = useTheme();

  const getHousePlanets = (house: number) =>
    planets
      .filter((p) => p.house === house)
      .map((p) => p.name)
      .join(' ');

  const STROKE = '#8B6B4A';
  const BG_COLOR = '#FFF9F2';

  const pTL = { x: (MIN + H) / 2, y: (MIN + H) / 2 };
  const pTR = { x: (MAX + H) / 2, y: (MIN + H) / 2 };
  const pBL = { x: (MIN + H) / 2, y: (MAX + H) / 2 };
  const pBR = { x: (MAX + H) / 2, y: (MAX + H) / 2 };

  const tip = (H - MIN) * 0.19;

  const lotusPath = `
    M ${H} ${MIN}
    Q ${pTR.x} ${MIN + tip} ${pTR.x} ${pTR.y}
    Q ${MAX - tip} ${pTR.y} ${MAX} ${H}
    Q ${MAX - tip} ${pBR.y} ${pBR.x} ${pBR.y}
    Q ${pBR.x} ${MAX - tip} ${H} ${MAX}
    Q ${pBL.x} ${MAX - tip} ${pBL.x} ${pBL.y}
    Q ${MIN + tip} ${pBL.y} ${MIN} ${H}
    Q ${MIN + tip} ${pTL.y} ${pTL.x} ${pTL.y}
    Q ${pTL.x} ${MIN + tip} ${H} ${MIN}
    Z
  `;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${V} ${V}`}>

        {/* Background */}
        <Rect x={MIN} y={MIN} width={MAX - MIN} height={MAX - MIN} fill={BG_COLOR} />

        {/* Outer Double Border */}
        <Rect x={MIN} y={MIN} width={MAX - MIN} height={MAX - MIN} fill="none" stroke={STROKE} strokeWidth={3} />
        <Rect x={MIN + 6} y={MIN + 6} width={MAX - MIN - 12} height={MAX - MIN - 12} fill="none" stroke={STROKE} strokeWidth={1} />

        {/* Diagonals */}
        <Line x1={MIN} y1={MIN} x2={MAX} y2={MAX} stroke={STROKE} strokeWidth={1.5} />
        <Line x1={MAX} y1={MIN} x2={MIN} y2={MAX} stroke={STROKE} strokeWidth={1.5} />

        {/* Lotus Petals */}
        <Path d={lotusPath} fill="none" stroke={STROKE} strokeWidth={1.5} />

        {/* Center Om Box */}
        <Rect x={H - 24} y={H - 24} width={48} height={48} fill={BG_COLOR} stroke={STROKE} strokeWidth={2} />
        <Rect x={H - 20} y={H - 20} width={40} height={40} fill="none" stroke={STROKE} strokeWidth={1} />
        <SvgText x={H} y={H + 9} textAnchor="middle" fontSize={26} fontWeight="bold" fill={STROKE}>ॐ</SvgText>

        {/* Houses */}
        {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((h) => {
          const p = HOUSE_POS[h];
          return (
            <SvgText
              key={`hn${h}`}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              fontSize={h === 1 ? 16 : 14}
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
            y={HOUSE_POS[1].y - 18}
            textAnchor="middle"
            fontSize={10}
            fontWeight="600"
            fill="#8B5A2A"
          >
            Asc
          </SvgText>
        )}

        {/* Planets */}
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
              fontSize={12}
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
