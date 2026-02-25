import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import uuid from "react-native-uuid";
import * as notesStorage from "../_storage/notesStorage";

// Note type with timestamps
export type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

// Context type
type NotesContextType = {
  notes: Note[];
  addNote: (title: string, content: string, color?: string) => Promise<void>;
  updateNote: (
    id: string,
    title: string,
    content: string,
    color: string,
  ) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load notes from AsyncStorage on app start
  useEffect(() => {
    const fetchNotes = async () => {
      const storedNotes = await notesStorage.loadNotes();
      setNotes(storedNotes);
    };
    fetchNotes();
  }, []);

  const saveAndSetNotes = async (updatedNotes: Note[]) => {
    // Sort notes by updatedAt descending
    const sortedNotes = updatedNotes.sort((a, b) =>
      b.updatedAt > a.updatedAt ? 1 : -1,
    );
    setNotes(sortedNotes);
    await notesStorage.saveNotes(sortedNotes);
  };

  // Add new note
  const addNote = async (
    title: string,
    content: string,
    color: string = "#b98b8b",
  ) => {
    const now = new Date().toISOString();
    const newNote: Note = {
      id: uuid.v4().toString(),
      title,
      content,
      color,
      createdAt: now,
      updatedAt: now,
    };
    await saveAndSetNotes([newNote, ...notes]);
  };

  // Update existing note
  const updateNote = async (
    id: string,
    title: string,
    content: string,
    color: string,
  ) => {
    const now = new Date().toISOString();
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? { ...note, title, content, color, updatedAt: now }
        : note,
    );
    await saveAndSetNotes(updatedNotes);
  };

  // Delete note
  const deleteNote = async (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    await saveAndSetNotes(updatedNotes);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

// Hook
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
};
