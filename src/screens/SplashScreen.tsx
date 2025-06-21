import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import { importSplashImages, SplashImages } from '../utils/importSplashImages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const [currentImageSource, setCurrentImageSource] = useState<number | null>(null);
  const splashImages: SplashImages = importSplashImages();

  useEffect(() => {
    const imageKeys = Object.keys(splashImages);
    const randomIndex = Math.floor(Math.random() * imageKeys.length);
    const randomImageKey = imageKeys[randomIndex];

    setCurrentImageSource(splashImages[randomImageKey as keyof SplashImages]);
  }, []);

  const handleStartPress = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <View>
      {currentImageSource && (
        <ImageBackground source={currentImageSource} style={styles.image} resizeMode="cover" imageStyle={{ marginBottom: -200, height: '140%'}}>
          <View>
            <Image style={styles.headerImage} source = {require('../assets/fab_logo.jpg')} resizeMode="contain"/>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleStartPress}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
           </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    height: 150,
    position: 'absolute',
    top: 50,
    alignSelf: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'rgba(218,218,218,0.9)',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SplashScreen;