import { Text, StyleSheet, View, Alert } from "react-native";
import Title from "../Components/UI/Title";
import NumberContainer from "../Components/Game/NumberContainer";
import { useEffect, useState } from "react";
import PrimaryButton from "../Components/UI/PrimaryButton";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = (props) => {
  const generatedNumber = generateRandomBetween(
    1,
    100,
    props.userNumber
  );
  const [guessedNumber, setGuessedNumber] = useState(generatedNumber);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && guessedNumber < props.userNumber) ||
      (direction === "greater" && guessedNumber > props.userNumber)
    ) {
      Alert.alert("dont Lie", "Dont Lie I Know Thats Not True", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = guessedNumber;
    } else {
      minBoundary = guessedNumber + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      guessedNumber
    );

    setGuessedNumber(newRndNumber);
  };


  useEffect(()=>{
    if(guessedNumber === props.userNumber){
      props.onGameOver();
    }
  },[guessedNumber,props.userNumber,props.userNumber]);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{guessedNumber}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            +
          </PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
  },
});

export default GameScreen;
