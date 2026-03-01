import axios from 'axios';
import { Note, CreateNoteDto, UpdateNoteDto } from '@/types/note';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchNotes = async (search?: string): Promise<Note[]> => {
  const { data } = await axios.get<Note[]>(`${API_URL}/notes`, {
    params: search ? { search } : undefined,
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`${API_URL}/notes/${id}`);
  return data;
};

export const createNote = async (noteData: CreateNoteDto): Promise<Note> => {
  const { data } = await axios.post<Note>(`${API_URL}/notes`, noteData);
  return data;
};

export const updateNote = async (id: string, noteData: UpdateNoteDto): Promise<Note> => {
  const { data } = await axios.put<Note>(`${API_URL}/notes/${id}`, noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/notes/${id}`);
};