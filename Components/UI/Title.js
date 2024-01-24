import { Text, StyleSheet } from "react-native";

import Colors from "../../Constants/colors";

const Title = (props) => {
  return <Text style={styles.title}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily:'open-sans-bold',
    fontSize: 24,
    //fontWeight: "bold",
    color: 'white',
    textAlign: "center",
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
  },
});

export default Title;
