import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function NewsDetailsScreen({ route }) {
  const { title, description, image } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={styles.title}>{title || "Назва не знайдена"}</Text>
      <Text style={styles.description}>{description || "Опис відсутній"}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  image: { width: "100%", height: 200, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, color: "#000" },
  description: { fontSize: 16, lineHeight: 24, color: "#444" },
});
