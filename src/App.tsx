import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import MainTabs from './navigation/NavBar';
import LifeHistoryScreen from './screens/LifeHistoryScreen';
import LifeTrackerScreen from './screens/LifeTrackerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name= "LifeTracker" component={LifeTrackerScreen}/>
        <Stack.Screen name ="LifeHistory" component={LifeHistoryScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}