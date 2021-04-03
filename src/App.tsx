import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import { COLOR_GREY, WATER_REMINDER, HOME } from './types/consts';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLOR_GREY,
          },
        }}>
        <Stack.Screen
          name={HOME}
          component={Home}
          options={{ title: WATER_REMINDER }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
