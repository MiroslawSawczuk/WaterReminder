import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firestoreDb from '../services/firestore';
import {
  COLOR_BLUE,
  COLOR_WHITE,
  COLOR_DARK_GREY_DISABLED,
} from '../types/consts';

interface BtnAddWaterProps {
  countGlassesOfWater: number;
  maxCountGlassesOfWater: number;
  userId: string;
  dateNowString: string;
}

const BtnAddWater = ({
  countGlassesOfWater,
  maxCountGlassesOfWater,
  userId,
  dateNowString,
}: BtnAddWaterProps) => {
  const handleOnPressAddWater = async (): Promise<void> => {
    await firestoreDb.addWater(userId, dateNowString);
  };

  return countGlassesOfWater < maxCountGlassesOfWater ? (
    <TouchableOpacity
      style={[styles.btnAddWater, styles.btnAddWaterActive]}
      onPress={async () => await handleOnPressAddWater()}>
      <Icon style={styles.iconCup} name="cup-water" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[styles.btnAddWater, styles.btnAddWaterDisabled]}
      disabled>
      <Icon style={styles.iconCup} name="cup-off-outline" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnAddWater: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BLUE,
    borderColor: COLOR_BLUE,
    height: 180,
    width: 180,
    borderRadius: 180,
    borderWidth: 1,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 30,
    shadowRadius: 180,
    shadowOffset: { width: 10, height: 10 },
  },
  btnAddWaterActive: {
    backgroundColor: COLOR_BLUE,
    borderColor: COLOR_BLUE,
  },

  btnAddWaterDisabled: {
    backgroundColor: COLOR_DARK_GREY_DISABLED,
    borderColor: COLOR_DARK_GREY_DISABLED,
  },
  iconCup: {
    fontSize: 50,
    color: COLOR_WHITE,
  },
});

export default BtnAddWater;
