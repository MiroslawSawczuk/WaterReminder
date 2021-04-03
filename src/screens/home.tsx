import React, { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { View, StyleSheet, Alert } from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import Login from '../components/login';
import WaterController from '../components/waterController';
import { COLOR_WHITE } from '../types/consts';
import BtnSignOut from '../components/btnSignOut';

const Home = () => {
  const [loggedUser, setLoggedUser] = useState<FirebaseAuthTypes.User | null>(
    null,
  );

  useEffect(() => {
    const firebaseUserSubscriber = auth().onAuthStateChanged(async (user) => {
      setLoggedUser(user);
    });

    return firebaseUserSubscriber;
  }, []);

  useEffect(() => {
    const firebaseMessagingSubscriber = messaging().onMessage(
      async (msg: FirebaseMessagingTypes.RemoteMessage) => {
        displayNotificationInAlert(msg);
      },
    );

    return firebaseMessagingSubscriber;
  }, []);

  const displayNotificationInAlert = (
    msg: FirebaseMessagingTypes.RemoteMessage,
  ): void => {
    Alert.alert(
      msg.notification?.title ? msg.notification?.title : "It's time!",
      msg.notification?.body
        ? msg.notification?.body
        : "Let's drink a glass of wather!",
    );
  };

  return (
    <View style={styles.container}>
      {loggedUser == null ? (
        <Login />
      ) : (
        <>
          <View style={styles.btnSignOutContainer}>
            <BtnSignOut />
          </View>
          <View style={styles.waterControllerContainer}>
            <WaterController />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLOR_WHITE,
  },
  btnSignOutContainer: {
    flex: 1,
    paddingTop: 20,
  },
  waterControllerContainer: {
    flex: 4,
  },
});

export default Home;
