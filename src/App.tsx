import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import e from 'express';

type Note = {
	id: number;
	title: string;
	content: string;
};

const App = () => {
	const [notes, setNotes] = useState<Note[]>([
		{
			id: 1,
			title: 'note title 1',
			content: 'content 1',
		},
		{
			id: 2,
			title: 'note title 2',
			content: 'content 2',
		},
		{
			id: 3,
			title: 'note title 3',
			content: 'content 3',
		},
		{
			id: 4,
			title: 'note title 4',
			content: 'content 4',
		},
	]);

	const uniqueKey = uuidv4();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const [selectedNote, setSelectedNote] = useState<Note | null>(null);

	const handleNoteClick = (note: Note) => {
		setSelectedNote(note);
		setTitle(note.title);
		setContent(note.content);
	};

	const handleAddNote = (e: React.FormEvent) => {
		e.preventDefault();

		const newNote: Note = {
			id: notes.length + 1,
			title: title,
			content: content,
		};

		setNotes([newNote, ...notes]);
		setTitle('');
		setContent('');
	};

	const handleUpdatedNote = (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedNote) {
			return;
		}

		const upDatedNote: Note = {
			id: selectedNote.id,
			title: title,
			content: content,
		};

		const upDatedNotesList = notes.map((note) =>
			note.id === selectedNote.id ? upDatedNote : note
		);

		setNotes(upDatedNotesList);
		setTitle('');
		setContent('');
		setSelectedNote(null);
	};

	const handleCancel = () => {
		setTitle('');
		setContent('');
		setSelectedNote(null);
	};

	return (
		<div className="app-container">
			<form
				className="note-form"
				onSubmit={(event) =>
					selectedNote ? handleUpdatedNote(event) : handleAddNote(event)
				}
			>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="title"
					required
				></input>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="content"
					rows={10}
					required
				></textarea>

				{selectedNote ? (
					<div className="edit-buttons">
						<button type="submit">Save</button>
						<button onClick={handleCancel}>Cancel</button>
					</div>
				) : (
					<button type="submit">Add Note</button>
				)}
			</form>
			<div className="notes-grid">
				{notes.map((note) => (
					<div
						key={uuidv4()}
						className="note-item"
						onClick={() => handleNoteClick(note)}
					>
						<div className="notes-header">
							<button>x</button>
						</div>
						<h2>{note.title}</h2>
						<p>{note.content}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
