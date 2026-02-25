import React, { createContext, ReactNode, useContext, useState } from "react";

// Note type
export type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
};

// Context type
type NotesContextType = {
  notes: Note[];
  addNote: (title: string, content: string, color?: string) => void;
  updateNote: (
    id: string,
    title: string,
    content: string,
    color: string,
  ) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (
    title: string,
    content: string,
    color: string = "#b98b8b",
  ) => {
    const newNote: Note = {
      id: (notes.length + 1).toString(),
      title,
      content,
      color,
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (
    id: string,
    title: string,
    content: string,
    color: string,
  ) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, title, content, color } : note,
      ),
    );
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

// Hook to use notes
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
};
