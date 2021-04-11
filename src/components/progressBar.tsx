import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLOR_BLUE, COLOR_GREY } from '../types/consts';

interface ProgressBarProps {
  countGlassesOfWater: number;
  maxCountGlassesOfWater: number;
  glassCapacity: number;
}

const ProgressBar = ({
  countGlassesOfWater,
  maxCountGlassesOfWater,
  glassCapacity,
}: ProgressBarProps) => {
  const animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: countGlassesOfWater * glassCapacity,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [countGlassesOfWater, glassCapacity]);

  const width = animation.current.interpolate({
    inputRange: [0, maxCountGlassesOfWater * glassCapacity],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View style={{ ...styles.progressBar, width }} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 20,
    borderRadius: 20,
    backgroundColor: COLOR_GREY,
    overflow: 'hidden',
  },
  progressBar: {
    height: 20,
    borderRadius: 20,
    width: '100%',
    backgroundColor: COLOR_BLUE,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default ProgressBar;
