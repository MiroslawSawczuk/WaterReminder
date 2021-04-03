import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLOR_BLUE, COLOR_GREY } from '../types/consts';

interface ProgressBarProps {
  countGlassesOfWater: number;
  maxCountGlassesOfWater: number;
}

const ProgressBar = ({
  countGlassesOfWater,
  maxCountGlassesOfWater,
}: ProgressBarProps) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, reactive]);

  useEffect(() => {
    reactive.setValue(
      -width + (width * countGlassesOfWater) / maxCountGlassesOfWater,
    );
  }, [countGlassesOfWater, maxCountGlassesOfWater, reactive, width]);

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={[
          styles.progressBar,
          {
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          },
        ]}
      />
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
