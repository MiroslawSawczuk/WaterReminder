import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { WATER_GLASS, USER_ID, CREATED_AT_DATE_STRING } from '../types/consts';
import ProgressBar from './progressBar';
import * as firebaseAuth from '../services/firebase-auth';
import Spinner from './spinner';
import BtnAddWater from './btnAddWater';

const WaterController = () => {
  const [userId, setUserId] = useState<string>('');
  const [countGlassesOfWater, setCountGlassesOfWater] = useState<number>(0);
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const dateNowString = moment().format('DD-MM-YYYY');
  const maxCountGlassesOfWater = 9;
  const glassCapacity = 0.25;

  useEffect(() => {
    getLoggedUser();

    const drinkWaterCollectionSubscriber = firestore()
      .collection(WATER_GLASS)
      .where(USER_ID, '==', userId)
      .where(CREATED_AT_DATE_STRING, '==', dateNowString)
      .onSnapshot(async (snapshot) => {
        setCountGlassesOfWater(snapshot.size);
        if (spinnerVisible) {
          setSpinnerVisible(false);
        }
      });

    return () => drinkWaterCollectionSubscriber();
  }, [dateNowString, spinnerVisible, userId]);

  const getLoggedUser = (): void => {
    var user = firebaseAuth.getSignedInUser();
    if (user?.uid) {
      setUserId(user?.uid);
    }
  };

  const totalWaterDrunk =
    countGlassesOfWater < maxCountGlassesOfWater ? (
      <Text>
        You've already drunk today {countGlassesOfWater * glassCapacity} l of
        water!
      </Text>
    ) : (
      <Text>It seens that you are hydrated enought!</Text>
    );

  return spinnerVisible ? (
    <Spinner />
  ) : (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <BtnAddWater
          countGlassesOfWater={countGlassesOfWater}
          maxCountGlassesOfWater={maxCountGlassesOfWater}
          userId={userId}
          dateNowString={dateNowString}
        />
      </View>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          countGlassesOfWater={countGlassesOfWater}
          maxCountGlassesOfWater={maxCountGlassesOfWater}
          glassCapacity={0.25}
        />
        <View style={styles.totalWaterDrunkContainer}>{totalWaterDrunk}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    marginTop: 35,
  },
  totalWaterDrunkContainer: {
    marginTop: 4,
  },
});

export default WaterController;
