import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import { Ionicons } from "@expo/vector-icons";

const BASE_DIR = FileSystem.documentDirectory + "MyFiles/";

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default function App() {
  const [currentPath, setCurrentPath] = useState("");
  const [pathHistory, setPathHistory] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [memoryStats, setMemoryStats] = useState({
    total: 0,
    free: 0,
    used: 0,
  });

  useEffect(() => {
    initApp();
    loadMemoryStats();
  }, []);

  useEffect(() => {
    if (currentPath) {
      loadDirectory(currentPath);
    }
  }, [currentPath]);

  const initApp = async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(BASE_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(BASE_DIR, { intermediates: true });
      }
      setCurrentPath(BASE_DIR);
    } catch (error) {
      console.error("Помилка створення базової директорії:", error);
    }
  };

  const loadMemoryStats = async () => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      setMemoryStats({
        total,
        free,
        used: total - free,
      });
    } catch (error) {
      console.error("Помилка читання пам'яті:", error);
    }
  };

  const loadDirectory = async (path) => {
    setLoading(true);
    try {
      const fileNames = await FileSystem.readDirectoryAsync(path);
      const fileInfos = await Promise.all(
        fileNames.map(async (name) => {
          const info = await FileSystem.getInfoAsync(path + name);
          return {
            name,
            uri: path + name,
            isDirectory: info.isDirectory,
          };
        }),
      );
      fileInfos.sort((a, b) => {
        if (a.isDirectory === b.isDirectory)
          return a.name.localeCompare(b.name);
        return a.isDirectory ? -1 : 1;
      });

      setFiles(fileInfos);
    } catch (error) {
      console.error("Помилка читання директорії:", error);
    }
    setLoading(false);
  };

  const handlePressFolder = (folderName) => {
    setPathHistory([...pathHistory, currentPath]);
    setCurrentPath(currentPath + folderName + "/");
  };

  const handleGoBack = () => {
    if (pathHistory.length === 0) return;
    const newHistory = [...pathHistory];
    const prevPath = newHistory.pop();
    setPathHistory(newHistory);
    setCurrentPath(prevPath);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.fileItem}
      onPress={() =>
        item.isDirectory
          ? handlePressFolder(item.name)
          : alert("Роботу з файлами додамо в наступному коміті!")
      }
    >
      <Ionicons
        name={item.isDirectory ? "folder" : "document-text"}
        size={24}
        color={item.isDirectory ? "#FFD700" : "#007AFF"}
      />
      <Text style={styles.fileName}>{item.name}</Text>
      <Ionicons
        name="chevron-forward"
        size={16}
        color="#ccc"
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
  );

  const displayPath = currentPath
    ? currentPath.replace(BASE_DIR, "Root/")
    : "Loading...";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Статистика пам'яті пристрою</Text>
        <Text style={styles.statsText}>
          Всього: {formatBytes(memoryStats.total)}
        </Text>
        <Text style={styles.statsText}>
          Використано: {formatBytes(memoryStats.used)}
        </Text>
        <Text style={styles.statsText}>
          Вільно: {formatBytes(memoryStats.free)}
        </Text>
      </View>
      <View style={styles.navHeader}>
        {pathHistory.length > 0 ? (
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24, marginHorizontal: 10 }} />
        )}
        <Text style={styles.breadcrumb} numberOfLines={1} ellipsizeMode="head">
          {displayPath}
        </Text>
      </View>
      {loading || !currentPath ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 50 }}
        />
      ) : files.length === 0 ? (
        <Text style={styles.emptyText}>Папка порожня</Text>
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item) => item.uri}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  statsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  statsText: { fontSize: 14, color: "#555", marginTop: 2 },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#e0e0e0",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: { marginHorizontal: 10 },
  breadcrumb: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    paddingRight: 15,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
  },
  fileName: { fontSize: 16, marginLeft: 15, color: "#333" },
  separator: { height: 1, backgroundColor: "#eee", marginLeft: 50 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});
