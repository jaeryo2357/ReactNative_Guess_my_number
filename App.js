import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font'
import AppLoding from 'expo-app-loading'

export default function App() {
  const [pickedNumber, setPickedNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(false)
  const [roundsNumber, setRoundsNumber] = useState(0)

  const [fontLoaded] = useFonts({
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf"),
  })

  if (!fontLoaded) {
    return <AppLoding />
  }

  function pickedNumberHandler(pickedNumber) {
    setPickedNumber(pickedNumber)
    setGameIsOver(false)
  }

  function gameOverHandler(rounds) {
    setGameIsOver(true)
    setRoundsNumber(rounds)
  }

  function startGameHandler() {
    setPickedNumber(null)
    setRoundsNumber(0)
    setGameIsOver(false)
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler}/>
  if (pickedNumber) {
    screen = <GameScreen userNumber={pickedNumber} onGameOver={gameOverHandler}/>
  }

  if (gameIsOver) {
    screen = <GameOverScreen userNumber={pickedNumber} roundsNumber={roundsNumber} onStartGame={startGameHandler}/>
  }

  return (
    <LinearGradient colors={[Colors.primary500, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        style={styles.rootScreen}
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        imageStyle={styles.imageBackground}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  imageBackground: {
    opacity: 0.25
  }
});
