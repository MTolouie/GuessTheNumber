import { StyleSheet } from 'react-native';
import StartGameScreen from './Screens/StartGameScreen';

export default function App() {
  return (
   <StartGameScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
