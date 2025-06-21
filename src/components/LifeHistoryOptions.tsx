import React from 'react';
import { defaultPlayerState, useLifeTracker } from '../context/LifeTrackerContext';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const LifeTrackerOptions: React.FC = () => {
  const { setPlayerState, toggleShowHistory } = useLifeTracker();

  const handleResetPress = () => {
    setPlayerState('Player 1', () => ({ ...defaultPlayerState }));
    setPlayerState('Player 2', () => ({ ...defaultPlayerState }));
  };

  const handleHistoryPress = () => {
    toggleShowHistory()
  }

  return (
    <View style ={styles.container}>
      <TouchableOpacity onPress={handleResetPress}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleHistoryPress}>
        <Text>Tracker</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f0f0f0',
  }
})

export default LifeTrackerOptions;