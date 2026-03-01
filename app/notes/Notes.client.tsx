'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './Notes.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', search],
    queryFn: () => fetchNotes(1, 12, search),
  });

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Could not fetch the list of notes.</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && data.notes.length === 0 && <p>No notes found.</p>}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
