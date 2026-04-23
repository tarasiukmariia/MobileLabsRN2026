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
  Modal,
  TextInput,
  Alert,
  Button,
} from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import { Ionicons } from "@expo/vector-icons";
import MemoryStats from "./src/components/MemoryStats";
import FileItem from "./src/components/FileItem";

const BASE_DIR = FileSystem.documentDirectory + "MyFiles/";

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

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createType, setCreateType] = useState("folder");
  const [newItemName, setNewItemName] = useState("");
  const [newItemContent, setNewItemContent] = useState("");

  const [editorModalVisible, setEditorModalVisible] = useState(false);
  const [currentEditingFile, setCurrentEditingFile] = useState(null);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    initApp();
  }, []);
  useEffect(() => {
    if (currentPath) {
      loadDirectory(currentPath);
      loadMemoryStats();
    }
  }, [currentPath]);

  const initApp = async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(BASE_DIR);
      if (!dirInfo.exists)
        await FileSystem.makeDirectoryAsync(BASE_DIR, { intermediates: true });
      setCurrentPath(BASE_DIR);
    } catch (error) {
      console.error("Помилка ініціалізації:", error);
    }
  };

  const loadMemoryStats = async () => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      setMemoryStats({ total, free, used: total - free });
    } catch (error) {}
  };

  const loadDirectory = async (path) => {
    setLoading(true);
    try {
      const fileNames = await FileSystem.readDirectoryAsync(path);
      const fileInfos = await Promise.all(
        fileNames.map(async (name) => {
          const info = await FileSystem.getInfoAsync(path + name);
          return { name, uri: path + name, isDirectory: info.isDirectory };
        }),
      );
      fileInfos.sort((a, b) => {
        if (a.isDirectory === b.isDirectory)
          return a.name.localeCompare(b.name);
        return a.isDirectory ? -1 : 1;
      });
      setFiles(fileInfos);
    } catch (error) {}
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newItemName.trim()) return Alert.alert("Помилка", "Введіть назву!");
    try {
      if (createType === "folder") {
        await FileSystem.makeDirectoryAsync(currentPath + newItemName);
      } else {
        const fileName = newItemName.endsWith(".txt")
          ? newItemName
          : newItemName + ".txt";
        await FileSystem.writeAsStringAsync(
          currentPath + fileName,
          newItemContent,
        );
      }
      setCreateModalVisible(false);
      setNewItemName("");
      setNewItemContent("");
      loadDirectory(currentPath);
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося створити об'єкт");
    }
  };

  const handleOpenFile = async (item) => {
    if (item.isDirectory) {
      setPathHistory([...pathHistory, currentPath]);
      setCurrentPath(item.uri + "/");
    } else if (item.name.endsWith(".txt")) {
      try {
        const content = await FileSystem.readAsStringAsync(item.uri);
        setEditorContent(content);
        setCurrentEditingFile(item);
        setEditorModalVisible(true);
      } catch (error) {
        Alert.alert("Помилка", "Не вдалося прочитати файл");
      }
    } else {
      Alert.alert("Увага", "Цей застосунок читає лише .txt файли");
    }
  };

  const handleSaveFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(
        currentEditingFile.uri,
        editorContent,
      );
      setEditorModalVisible(false);
      Alert.alert("Успіх", "Файл збережено!");
      loadMemoryStats();
    } catch (error) {}
  };

  const handleLongPress = (item) => {
    Alert.alert(item.name, "Оберіть дію", [
      { text: "Інформація", onPress: () => showFileInfo(item) },
      {
        text: "Видалити",
        onPress: () => confirmDelete(item),
        style: "destructive",
      },
      { text: "Скасувати", style: "cancel" },
    ]);
  };

  const confirmDelete = (item) => {
    Alert.alert("Підтвердження", `Видалити ${item.name}?`, [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Видалити",
        style: "destructive",
        onPress: async () => {
          try {
            await FileSystem.deleteAsync(item.uri);
            loadDirectory(currentPath);
          } catch (error) {}
        },
      },
    ]);
  };

  const showFileInfo = async (item) => {
    try {
      const info = await FileSystem.getInfoAsync(item.uri, { size: true });
      const date = new Date(info.modificationTime * 1000).toLocaleString();
      const ext = item.isDirectory ? "Папка" : item.name.split(".").pop();
      Alert.alert(
        "Інформація",
        `Назва: ${item.name}\nТип: ${ext}\nРозмір: ${info.size} байт\nЗмінено: ${date}`,
      );
    } catch (error) {}
  };

  const handleGoBack = () => {
    if (pathHistory.length === 0) return;
    const newHistory = [...pathHistory];
    const prevPath = newHistory.pop();
    setPathHistory(newHistory);
    setCurrentPath(prevPath);
  };

  const displayPath = currentPath
    ? currentPath.replace(BASE_DIR, "Root/")
    : "Loading...";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <MemoryStats stats={memoryStats} />
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
      {loading ? (
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
          renderItem={({ item }) => (
            <FileItem
              item={item}
              onPress={() => handleOpenFile(item)}
              onLongPress={() => handleLongPress(item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.btnCreateFolder}
          onPress={() => {
            setCreateType("folder");
            setCreateModalVisible(true);
          }}
        >
          <Ionicons name="folder-open" size={20} color="#fff" />
          <Text style={styles.btnText}>Нова папка</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCreateFile}
          onPress={() => {
            setCreateType("file");
            setCreateModalVisible(true);
          }}
        >
          <Ionicons name="document" size={20} color="#fff" />
          <Text style={styles.btnText}>Новий файл</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={createModalVisible} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {createType === "folder"
                ? "Створити папку"
                : "Створити файл (.txt)"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Назва"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            {createType === "file" && (
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Початковий текст"
                value={newItemContent}
                onChangeText={setNewItemContent}
                multiline
              />
            )}
            <View style={styles.modalButtons}>
              <Button
                title="Скасувати"
                color="#888"
                onPress={() => setCreateModalVisible(false)}
              />
              <Button title="Створити" onPress={handleCreate} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={editorModalVisible} animationType="slide">
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <View style={styles.editorHeader}>
            <Button
              title="Закрити"
              color="#888"
              onPress={() => setEditorModalVisible(false)}
            />
            <Text style={styles.editorTitle} numberOfLines={1}>
              {currentEditingFile?.name}
            </Text>
            <Button title="Зберегти" onPress={handleSaveFile} />
          </View>
          <TextInput
            style={styles.editorArea}
            value={editorContent}
            onChangeText={setEditorContent}
            multiline
            textAlignVertical="top"
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
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
  separator: { height: 1, backgroundColor: "#eee", marginLeft: 50 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
  actionButtons: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  btnCreateFolder: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFB300",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  btnCreateFile: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  btnText: { color: "#fff", fontWeight: "bold", marginLeft: 8 },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 12 },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  editorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  editorTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  editorArea: { flex: 1, padding: 15, fontSize: 16, color: "#333" },
});
