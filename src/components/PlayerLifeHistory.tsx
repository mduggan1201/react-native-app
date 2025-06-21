import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLifeTracker } from '../context/LifeTrackerContext';

interface PlayerLifeHistoryProps {
  playerName: string;
}

const PlayerLifeHistory: React.FC<PlayerLifeHistoryProps> = ({ playerName }) => {
  const { players } = useLifeTracker();
  const player = players[playerName];


  const containerStyle = [
    styles.historyContainer,
    playerName === 'Player 1' && styles.flipped,
  ];

  return (
    <View style={containerStyle}>
      <Text style={styles.historyTitle}>{playerName}</Text>
      {player.lifeHistory.length === 0 ? (
        <Text style={styles.noHistoryText}>No history available</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCol}>Life</Text>
            <Text style={styles.headerCol}>Change</Text>
          </View>
          <ScrollView style={{ flex: 1 }}>
            {player.lifeHistory.map((entry, index) => (
              <View key={index} style={styles.historyRow}>
                <Text style={styles.historyCol}>{entry[0]}</Text>
                <Text style={styles.historyCol}>{entry[1] !== 0 ? entry[1] : ' '}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 10,
    justifyContent: 'flex-start'
  },
  flipped: { transform: [{ rotate: '180deg' }] },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8
  },
  noHistoryText: {
    color: '#888',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  headerCol: {
    fontWeight: 'bold',
    width: '48%',
    textAlign: 'center',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  historyCol: {
    width: '48%',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PlayerLifeHistory