
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LifeTrackerScreen from '../screens/LifeTrackerScreen';
import { LifeTrackerProvider } from '../context/LifeTrackerContext';

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="LifeTracker"
        children={() => (
          <LifeTrackerProvider>
            <LifeTrackerScreen />
          </LifeTrackerProvider>
        )}
      />
    </Tab.Navigator>
  );
}