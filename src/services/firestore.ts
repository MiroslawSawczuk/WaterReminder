import { WATER_GLASS } from '../types/consts';
import firestore from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const addWater = async (
  userId: string | undefined,
  dateNowString: string,
): Promise<
  FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
> => {
  try {
    return await firestore().collection(WATER_GLASS).add({
      addedByUserId: userId,
      createdAtDateString: dateNowString,
      createdAtTimestamp: Date.now(),
    });
  } catch (ex) {
    console.error(ex);
    throw ex;
  } finally {
  }
};
