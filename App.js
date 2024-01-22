import { StyleSheet, ImageBackground } from "react-native";
import StartGameScreen from "./Screens/StartGameScreen";
import GameScreen from "./Screens/GameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
export default function App() {
  const [pickedNumber,setPickedNumber] = useState();
  
  const pickedNumberHandler = (chosenNumber)=>{
    setPickedNumber(chosenNumber);
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler}/>
  if(pickedNumber){
    screen = <GameScreen />
  }
  
  return (
    <LinearGradient colors={["#72063c", "#ddb52f"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/Images/background.png")}
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        {screen}
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
