export function importSplashImages() {
  return {
    splash1: require('../assets/heroes/Aurora.jpg'),
    splash2: require('../assets/heroes/Enigma.jpg'),
    splash3: require('../assets/heroes/Florian.jpg'),
    splash4: require('../assets/heroes/Nuu.jpg'),
    splash5: require('../assets/heroes/Oscillio.jpg'),
    splash6: require('../assets/heroes/Verdance.jpg'),
    splash7: require('../assets/heroes/Zen.jpg'),
    splash8: require('../assets/heroes/Kano.jpg')
  }
}

export type SplashImages = ReturnType<typeof importSplashImages>;