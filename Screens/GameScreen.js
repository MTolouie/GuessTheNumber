import { Text,StyleSheet,View } from "react-native";
import Title from "../Components/UI/Title";
import NumberContainer from '../Components/Game/NumberContainer';
import { useState } from "react";
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
const GameScreen = (props) => {
  const generatedNumber = generateRandomBetween(1,100,props.userNumber);
  const [guessedNumber,setGuessedNumber] = useState(generatedNumber);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{guessedNumber}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        {/* + - */}
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
