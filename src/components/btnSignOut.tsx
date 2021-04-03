import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import * as firebaseAuth from '../services/firebase-auth';
import { COLOR_DARK_GREY } from '../types/consts';

const BtnSignOut = () => {
  const handleOnPressSignOut = async (): Promise<void> => {
    await firebaseAuth.signOut();
  };

  return (
    <TouchableOpacity
      style={styles.btnSignOut}
      onPress={async () => await handleOnPressSignOut()}>
      <Icon style={styles.iconSignOut} name="sign-out" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnSignOut: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  iconSignOut: {
    fontSize: 30,
    color: COLOR_DARK_GREY,
  },
});

export default BtnSignOut;
