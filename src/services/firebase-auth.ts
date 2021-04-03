import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const signIn = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    return await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);

        Alert.alert('Opss!', 'Entered email or password is incorrect!');
      });
  } catch (ex) {
    console.error(ex);
    throw ex;
  } finally {
  }
};

export const signOut = async (): Promise<void> => {
  try {
    return await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  } catch (ex) {
    console.error(ex);
    throw ex;
  } finally {
  }
};

export const getSignedInUser = (): FirebaseAuthTypes.User | null => {
  try {
    return auth().currentUser;
  } catch (ex) {
    console.error(ex);
    throw ex;
  } finally {
  }
};
