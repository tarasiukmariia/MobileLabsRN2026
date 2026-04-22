import { View, Text, Button, StyleSheet } from "react-native";

export default function NewsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Список новин (FlatList буде тут)</Text>
      <Button
        title="Відкрити деталі новини"
        onPress={() =>
          navigation.navigate("NewsDetails", { id: 1, title: "Тестова новина" })
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 20 },
});
