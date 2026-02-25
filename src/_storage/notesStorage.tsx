import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../_context/NotesContext";

const NOTES_STORAGE_KEY = "NOTES_STORAGE";

// Load notes from storage
export const loadNotes = async (): Promise<Note[]> => {
  try {
    const data = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Failed to load notes:", error);
    return [];
  }
};

// Save notes to storage
export const saveNotes = async (notes: Note[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.log("Failed to save notes:", error);
  }
};

// Optional: clear all notes
export const clearNotes = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(NOTES_STORAGE_KEY);
  } catch (error) {
    console.log("Failed to clear notes:", error);
  }
};
