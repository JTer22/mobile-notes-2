import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotes } from "../../src/_context/NotesContext";

const { width } = Dimensions.get("window");
const BIG_WIDTH = width * 0.62;
const SMALL_WIDTH = width * 0.32;

const NotesList = () => {
  const { notes, deleteNote } = useNotes();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()),
    );
  }, [notes, search]);

  const handleDelete = (id: string) => {
    Alert.alert("Delete Note?", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => await deleteNote(id),
      },
    ]);
  };

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
        onLongPress={() => handleDelete(item.id)}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search notes..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredNotes}
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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "600", color: "#111" },
  content: { fontSize: 14, color: "#ffffff", marginTop: 8 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 25,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  fabText: { color: "#fff", fontSize: 32, fontWeight: "600", marginTop: -2 },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
  },
  searchInput: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
