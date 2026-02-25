import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotes } from "../context/NotesContext";

const { width } = Dimensions.get("window");
const BIG_WIDTH = width * 0.62;
const SMALL_WIDTH = width * 0.32;

const NotesList = () => {
  const { notes } = useNotes();
  const router = useRouter();

  const renderItem = ({ item, index }: any) => {
    const rowIndex = Math.floor(index / 2);
    const isEvenRow = rowIndex % 2 === 0;
    const isLeft = index % 2 === 0;
    const isBig = (isEvenRow && !isLeft) || (!isEvenRow && isLeft);

    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            width: isBig ? BIG_WIDTH : SMALL_WIDTH,
            marginRight: isLeft ? 4 : 0,
            marginLeft: !isLeft ? 4 : -5,
            backgroundColor: item.color || "#b98b8b",
          },
        ]}
        onPress={() => router.push(`/add-note?noteId=${item.id}`)}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        contentContainerStyle={{ padding: 16 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-note")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NotesList;

const styles = StyleSheet.create({
  card: {
    height: 180,
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#b98b8b",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "600", color: "#111" },
  content: { fontSize: 14, color: "#f8f8f8", marginTop: 8 },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#8B5CF6", // violet accent
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },

  fabText: {
    color: "#fff",
    fontSize: 30,
    marginTop: -2,
  },
});
