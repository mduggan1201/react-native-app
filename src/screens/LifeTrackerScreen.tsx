import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlayerLifeTracker from '../components/PlayerLifeTracker';
import LifeTrackerOptions from '../components/LifeTrackerOptions';
import { useLifeTracker } from '../context/LifeTrackerContext';
import PlayerLifeHistory from '../components/PlayerLifeHistory';


const LifeTrackerScreen: React.FC = () => {
  const { showHistory } = useLifeTracker()
  return (
      <View style={styles.container}>
        {showHistory ? (
          <>
            <PlayerLifeHistory playerName="Player 1" />
            <LifeTrackerOptions/>
            <PlayerLifeHistory playerName="Player 2" />
          </>
        ) : (
          <>
            <PlayerLifeTracker playerName="Player 1" />
            <LifeTrackerOptions/>
            <PlayerLifeTracker playerName="Player 2" />
          </>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'space-evenly'
  }
});

export default LifeTrackerScreen;