import { View, Text, StyleSheet, SectionList } from "react-native";

const CONTACTS_DATA = [
  {
    title: "Керівництво",
    data: [
      { id: "1", name: "Ректор", phone: "+380 412 24-14-22" },
      { id: "2", name: "Деканат ФІКТ", phone: "+380 412 24-14-27" },
    ],
  },
  {
    title: "Кафедри",
    data: [
      { id: "3", name: "Кафедра Інженерії ПЗ", phone: "+380 412 24-14-15" },
      { id: "4", name: "Кафедра Компютерних наук", phone: "+380 412 24-14-16" },
    ],
  },
  {
    title: "Студентська рада",
    data: [{ id: "5", name: "Голова студради", phone: "+380 67 111 2233" }],
  },
];

export default function ContactsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactPhone}>{item.phone}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <SectionList
        sections={CONTACTS_DATA}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  sectionHeader: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  sectionHeaderText: { color: "#333", fontSize: 16, fontWeight: "bold" },
  contactItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactName: { fontSize: 16, color: "#000" },
  contactPhone: { fontSize: 14, color: "#007AFF" },
  separator: { height: 1, backgroundColor: "#eee", marginHorizontal: 15 },
});
