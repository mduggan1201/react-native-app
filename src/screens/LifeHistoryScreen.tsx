import React from 'react';
import { StyleSheet, View } from 'react-native';
import PlayerLifeHistory from '../components/PlayerLifeHistory';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { LifeTrackerProvider } from '../context/LifeTrackerContext';
import LifeHistoryOptions from '../components/LifeHistoryOptions';

type LifeHistoryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LifeHistory'>;
};

const LifeHistoryScreen: React.FC<LifeHistoryScreenProps> = () => {
  return (
    <LifeTrackerProvider>
      <View style={styles.container}>
        <PlayerLifeHistory playerName="Player 1" />
        <LifeHistoryOptions/>
        <PlayerLifeHistory playerName="Player 2" />
      </View>
    </LifeTrackerProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'space-evenly'
  }
});

export default LifeHistoryScreen