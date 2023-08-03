import { Note } from '../types/Note'
import { v4 as uuidv4 } from 'uuid'

export let initialNotes: Note[] = [
  {
    id: uuidv4(),
    name: 'Shopping List',
    created: '7/26/2023',
    category: 'Task',
    content: 'eggs, pasta, butter,salt'
  },
  {
    id: uuidv4(),
    name: 'Thought',
    created: '7/26/2023',
    category: 'Random Thought',
    content: 'donec pretium vulputate'
  },
  {
    id: uuidv4(),
    name: 'Bagfix',
    created: '7/26/2023',
    category: 'Idea',
    content: 'tincidunt ornare massa eget'
  },
  {
    id: uuidv4(),
    name: 'Shopping List',
    created: '7/26/2023',
    category: 'Task',
    content: 'tincidunt ornare massa eget'
  },
  {
    id: uuidv4(),
    name: 'Ornare Lectus',
    created: '7/26/2023',
    category: 'Random Thought',
    content: 'pellentesque massa placerat duis'
  },
  {
    id: uuidv4(),
    name: 'Rhoncus Mattis',
    created: '7/26/2023',
    category: 'Idea',
    content: 'magna etiam tempor orci'
  },
  {
    id: uuidv4(),
    name: 'Nullam Non Nisi',
    created: '8/1/2023',
    category: 'Idea',
    content: 'magna etiam tempor orc'
  }
]
export const notesRepository = {
  getAllNotes: () => {
    return initialNotes
  },
  createNote: (note: Note) => {
    const newNote = { ...note, id: uuidv4() }
    initialNotes.push(newNote)
    return newNote
  },
  getStats: () => {
    const totalNotes = initialNotes.length
    return {totalNotes}
  },
  removeNote: (id: string) => {
    initialNotes = initialNotes.filter((note) => note.id !== id)
  },
  editNote: (id: string, updatedNote: Partial<Note>) => {
    const index = initialNotes.findIndex((note) => note.id === id)
    if (index !== -1) {
      initialNotes[index] = { ...initialNotes[index], ...updatedNote }
      return initialNotes[index]
    } else {
      return null
    }
  },
  getNoteById: (id: string) => {
    return initialNotes.find((note) => note.id === id)
  },
}