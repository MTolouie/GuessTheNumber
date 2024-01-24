import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./Screens/StartGameScreen";
import GameScreen from "./Screens/GameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import Colors from "./Constants/colors";
import GameOverScreen from "./Screens/GameOverScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
export default function App() {
  const [pickedNumber, setPickedNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(true);
  const [numberOfRounds, setNumberOfRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

   SplashScreen.hideAsync();

  const pickedNumberHandler = (chosenNumber) => {
    setPickedNumber(chosenNumber);
    setIsGameOver(false);
  };

  const startNewGameHandler = () => {
    setPickedNumber(null);
    setNumberOfRounds(0);
  };

  const gameOver = () => {
    setIsGameOver(true);
  };

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;
  if (pickedNumber) {
    screen = <GameScreen userNumber={pickedNumber} onGameOver={gameOver} />;
  }

  if (isGameOver && pickedNumber) {
    screen = <GameOverScreen userNumber={pickedNumber} roundsNumber={numberOfRounds} onStartNewGame={startNewGameHandler}/>;
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/Images/background.png")}
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
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
  backgroundImage: {
    opacity: 0.15,
  },
});
