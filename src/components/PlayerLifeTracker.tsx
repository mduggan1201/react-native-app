import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useLifeTracker } from '../context/LifeTrackerContext';
import { importSplashImages, SplashImages } from '../utils/importSplashImages';

const PlayerLifeTracker: React.FC<{ playerName: string }> = ({ playerName }) => {
  const { players, setPlayerState } = useLifeTracker();
  const player = players[playerName];
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const holdInterval = useRef<NodeJS.Timeout | null>(null);
  const [currentImageSource, setCurrentImageSource] = useState<number>(0);
  const splashImages: SplashImages = importSplashImages();

  useEffect(() => {
    const imageKeys = Object.keys(splashImages);
    const randomIndex = Math.floor(Math.random() * imageKeys.length);
    const randomImageKey = imageKeys[randomIndex];

    setCurrentImageSource(splashImages[randomImageKey as keyof SplashImages]);
  }, []);

  useEffect(() => {
    if (player.lifeChange !== 0) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setPlayerState(playerName, prev => ({
          ...prev,
          lifeChange: 0,
          lifeHistory: [...prev.lifeHistory, [prev.life, prev.lifeChange]],
        }));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [player.lifeChange, player.life, playerName, setPlayerState]);

  const containerStyle = [
    styles.container,
    playerName === 'Player 1' && styles.flipped,
  ];

  const handleChange = (delta: number) => {
    setPlayerState(playerName, prev => ({
      ...prev,
      life: prev.life + delta,
      lifeChange: prev.lifeChange + delta,
    }));
  };

  return (
    <View style={containerStyle}>
      <ImageBackground source={currentImageSource} style={styles.image} resizeMode="cover" imageStyle={{ marginBottom: -200, height: '140%', opacity: 0.5}}>
        <View style={styles.lifeDisplay}>
          <Text style={styles.lifeText}>{player.life}</Text>
        </View>
        <View style={styles.buttonOverlay}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChange(-1)}
            onPressIn={() => {
              holdInterval.current = setInterval(() => handleChange(-5), 500);
            }}
            onPressOut={() => {
              if (holdInterval.current) {
                clearInterval(holdInterval.current);
                holdInterval.current = null;
              }
            }}
          >
            <Text style={styles.sign}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChange(1)}
            onPressIn={() => {
              holdInterval.current = setInterval(() => handleChange(5), 500);
            }}
            onPressOut={() => {
              if (holdInterval.current) {
                clearInterval(holdInterval.current);
                holdInterval.current = null;
              }
            }}
          >
            <Text style={styles.sign}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.lifeChangeText}>{player.lifeChange !== 0 ? player.lifeChange : ' '}</Text>
        <Text style={styles.playerName}>{playerName}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  flipped: { transform: [{ rotate: '180deg' }] },
  lifeDisplay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -40 }],
    minWidth: 80,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  lifeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 3,
  },
  button: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lifeChangeText: {
    position: 'absolute',
    top: 10,
    right: 16,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    zIndex: 4,
  },
  playerName: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    fontSize: 18,
    color: '#333',
    zIndex: 4,
  },
  sign: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PlayerLifeTracker;