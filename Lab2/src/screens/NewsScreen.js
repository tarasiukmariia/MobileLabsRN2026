import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";

const generateNews = (startIndex, count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: String(startIndex + i),
    title: `Новина університету #${startIndex + i + 1}`,
    description:
      "Це детальний опис новини. Тут може бути багато цікавого тексту про події в Житомирській політехніці.",
    image: "https://cdn-icons-png.flaticon.com/512/2965/2965879.png",
  }));
};

export default function NewsScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => setData(generateNews(0, 15)), []);

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(generateNews(0, 15));
      setIsRefreshing(false);
    }, 1500);
  };

  const loadMoreData = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setData((prevData) => [
        ...prevData,
        ...generateNews(prevData.length, 10),
      ]);
      setIsLoadingMore(false);
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() =>
        navigation.navigate("NewsDetails", {
          title: item.title,
          description: item.description,
          image: item.image,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDesc} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <Text style={styles.headerTitle}>Стрічка новин</Text>
        )}
        ListFooterComponent={() =>
          isLoadingMore ? (
            <ActivityIndicator style={{ margin: 20 }} color="#007AFF" />
          ) : null
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
    backgroundColor: "#f8f8f8",
  },
  newsItem: { flexDirection: "row", padding: 15, alignItems: "center" },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  textContainer: { flex: 1 },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  newsDesc: { fontSize: 14, color: "#666" },
  separator: { height: 1, backgroundColor: "#eee", marginLeft: 90 },
});
