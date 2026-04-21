import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const NEWS_DATA = Array.from({ length: 6 }).map((_, i) => ({
  id: String(i),
  title: "Заголовок новини",
  date: "Дата новини",
  text: "Короткий текст новини",
}));

export default function NewsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.newsItem}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageIcon}>🖼️</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Новини</Text>
      <FlatList
        data={NEWS_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15 },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  newsItem: { flexDirection: "row", marginBottom: 15, alignItems: "center" },
  imagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  imageIcon: { fontSize: 30 },
  textContainer: { flex: 1, marginLeft: 15 },
  title: { fontSize: 16, fontWeight: "bold" },
  date: { fontSize: 12, color: "#888", marginVertical: 2 },
  text: { fontSize: 14, color: "#444" },
});
