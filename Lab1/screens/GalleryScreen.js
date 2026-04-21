import { View, StyleSheet, FlatList } from "react-native";

const GALLERY_DATA = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i),
}));

export default function GalleryScreen() {
  const renderItem = () => <View style={styles.photoPlaceholder} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={GALLERY_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  list: { padding: 10 },
  photoPlaceholder: {
    flex: 1,
    height: 120,
    backgroundColor: "#fff",
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});
