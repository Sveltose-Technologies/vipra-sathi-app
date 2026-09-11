import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface Planet {
  name: string;
  house: number;
}

interface VedicChartProps {
  planets: Planet[];
  size?: number;
}

const VedicChart: React.FC<VedicChartProps> = ({ planets, size = 300 }) => {
  const { colors } = useTheme();

  const renderHouseContent = (house: number, style: any) => {
    const housePlanets = planets.filter(p => p.house === house);
    return (
      <View style={[styles.houseContainer, style]}>
        <Text style={[styles.houseNumber, { color: colors.primary + '80' }]}>{house}</Text>
        {housePlanets.map((p, i) => (
          <Text key={i} style={[styles.planetText, { color: colors.text }]}>
            {p.name}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { width: size, height: size, backgroundColor: colors.surface }]}>
      <Image
        source={require('../assets/images/lotus_kundali.png')}
        style={{ width: size, height: size, position: 'absolute', tintColor: colors.border }}
        resizeMode="contain"
      />
      
      {/* Center OM symbol */}
      <View style={styles.centerOmContainer}>
         <Text style={[styles.centerOm, { color: colors.primary }]}>ॐ</Text>
      </View>

      {/* House Contents positioned manually */}
      {/* H1 (Top Petal) */}
      {renderHouseContent(1, { top: size * 0.10, left: size * 0.4, width: size * 0.2, alignItems: 'center' })}
      {/* H2 (Top Left Triangle) */}
      {renderHouseContent(2, { top: size * 0.05, left: size * 0.15, width: size * 0.2 })}
      {/* H3 (Bottom Left Triangle of Top Left) */}
      {renderHouseContent(3, { top: size * 0.25, left: size * 0.05, width: size * 0.2 })}
      {/* H4 (Left Petal) */}
      {renderHouseContent(4, { top: size * 0.4, left: size * 0.10, width: size * 0.2, alignItems: 'center' })}
      {/* H5 (Top Left Triangle of Bottom Left) */}
      {renderHouseContent(5, { top: size * 0.65, left: size * 0.05, width: size * 0.2 })}
      {/* H6 (Bottom Left Triangle) */}
      {renderHouseContent(6, { top: size * 0.85, left: size * 0.15, width: size * 0.2 })}
      {/* H7 (Bottom Petal) */}
      {renderHouseContent(7, { top: size * 0.75, left: size * 0.4, width: size * 0.2, alignItems: 'center' })}
      {/* H8 (Bottom Right Triangle) */}
      {renderHouseContent(8, { top: size * 0.85, left: size * 0.65, width: size * 0.2 })}
      {/* H9 (Top Right Triangle of Bottom Right) */}
      {renderHouseContent(9, { top: size * 0.65, left: size * 0.75, width: size * 0.2 })}
      {/* H10 (Right Petal) */}
      {renderHouseContent(10, { top: size * 0.4, left: size * 0.70, width: size * 0.2, alignItems: 'center' })}
      {/* H11 (Bottom Right Triangle of Top Right) */}
      {renderHouseContent(11, { top: size * 0.25, left: size * 0.75, width: size * 0.2 })}
      {/* H12 (Top Right Triangle) */}
      {renderHouseContent(12, { top: size * 0.05, left: size * 0.65, width: size * 0.2 })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  centerOmContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  centerOm: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  houseContainer: {
    position: 'absolute',
    padding: 2,
    zIndex: 10,
  },
  houseNumber: {
    fontSize: 10,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  planetText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default VedicChart;
