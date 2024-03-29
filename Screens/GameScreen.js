import { Text, StyleSheet, View, Alert, FlatList } from "react-native";
import Title from "../Components/UI/Title";
import NumberContainer from "../Components/Game/NumberContainer";
import { useEffect, useState } from "react";
import PrimaryButton from "../Components/UI/PrimaryButton";
import Card from "../Components/UI/Card";
import InstructionText from "../Components/UI/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../Components/Game/GuessLogItem";
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
  const generatedNumber = generateRandomBetween(1, 100, props.userNumber);
  const [guessedNumber, setGuessedNumber] = useState(generatedNumber);
  const [guessRounds, setGuessRounds] = useState([generatedNumber]);

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
    setGuessRounds((prevRounds) => [newRndNumber, ...prevRounds]);
  };

  useEffect(() => {
    if (guessedNumber === props.userNumber) {
      props.onGameOver(guessRounds.length);
    }
  }, [guessedNumber, props.userNumber, props.userNumber]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{guessedNumber}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" color="white" size={24} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" color="white" size={24} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
      <FlatList
        data={guessRounds}
        renderItem={(itemData) => (
          <GuessLogItem guess={itemData.item} roundNumber={((guessRounds.length) - itemData.index)} />
        )}
        keyExtractor={(item) => item}
      ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
  },
  instructionText: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;
