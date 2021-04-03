import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import * as firebaseAuth from '../services/firebase-auth';
import {
  COLOR_BLUE,
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_DARK_GREY,
} from '../types/consts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnPressSignIn = async (): Promise<void> => {
    if (email && password) {
      await firebaseAuth.signIn(email, password);
    } else {
      Alert.alert('Opss!', 'Login or password is empty!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Welcome to Water reminder!</Text>
        </View>

        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={async () => await handleOnPressSignIn()}>
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    top: '15%',
  },
  welcomeTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    color: COLOR_BLACK,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLOR_DARK_GREY,
  },
  btnSignIn: {
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    height: 35,
    borderRadius: 15,
    borderWidth: 1,
  },
  btnText: {
    color: COLOR_BLUE,
  },
});

export default Login;
