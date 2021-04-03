import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { COLOR_BLUE } from '../types/consts';

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLOR_BLUE} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Spinner;
