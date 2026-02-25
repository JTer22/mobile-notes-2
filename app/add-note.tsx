import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNotes } from "../src/_context/NotesContext";

const COLORS = ["#b98b8b", "#8bb9b9", "#b98bb9", "#8b8bb9", "#b9b98b"];

export default function AddNote() {
  const router = useRouter();
  const { noteId } = useLocalSearchParams();
  const { notes, addNote, updateNote } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [originalNote, setOriginalNote] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [color, setColor] = useState("#b98b8b");

  const isEdit = !!noteId;

  useEffect(() => {
    if (isEdit) {
      const note = notes.find((n) => n.id === noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setOriginalNote({ title: note.title, content: note.content });
        setColor(note.color ?? "#b98b8b");
      }
    }
  }, [noteId, notes]);

  const handleSave = async () => {
    if (!title && !content) return;
    if (isEdit) await updateNote(noteId as string, title, content, color);
    else await addNote(title, content, color);
    router.back();
  };

  const handleBack = () => {
    if (
      isEdit &&
      (title !== originalNote?.title || content !== originalNote?.content)
    ) {
      Alert.alert("Discard changes?", "You have unsaved changes.", [
        { text: "Cancel", style: "cancel" },
        { text: "Discard", style: "destructive", onPress: () => router.back() },
        { text: "Save", onPress: async () => await handleSave() },
      ]);
    } else router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#f9f9f9" },
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
              <Text style={styles.headerText}>← Back</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
              <Text style={[styles.headerText, styles.saveText]}>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TextInput
          placeholder="Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          style={styles.title}
        />
        <TextInput
          placeholder="Start writing..."
          placeholderTextColor="#aaa"
          value={content}
          onChangeText={setContent}
          multiline
          style={styles.content}
        />

        <View style={styles.colorContainer}>
          {COLORS.map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.colorCircle,
                { backgroundColor: c },
                c === color ? styles.selectedColor : {},
              ]}
              onPress={() => setColor(c)}
            />
          ))}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  title: { fontSize: 32, fontWeight: "700", color: "#111", marginBottom: 20 },
  content: {
    flex: 1,
    fontSize: 18,
    lineHeight: 28,
    color: "#222",
    textAlignVertical: "top",
  },
  headerButton: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8 },
  headerText: { fontSize: 16, fontWeight: "600", color: "#555" },
  saveText: { color: "#007AFF" },
  colorContainer: {
    position: "absolute",
    bottom: 70,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColor: { borderColor: "#000", borderWidth: 2 },
});
