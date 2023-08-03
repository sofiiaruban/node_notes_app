import express, { Request, Response } from 'express'
import { notesService } from '../services/notes'

export const notesRouter = express.Router()

notesRouter.get('/', async (req: Request, res: Response) => {
   try {
     const allNotes = await notesService.getAllNotes()
     return res.json(allNotes)
   } catch (error: any) {
     return res.status(500).json({ error: error.message })
   }
})
notesRouter.post('/', async (req: Request, res: Response) => {
  const { name, created, category, content } = req.body;
  try {
    const newNote = await notesService.createNote({ name, created, category, content });
    return res.json(newNote);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
}})
notesRouter.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await notesService.getStats()
    return res.json(stats)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
})
notesRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await notesService.removeNote(id)
    return res.sendStatus(204)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
})
notesRouter.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedNote = await notesService.editNote(id, req.body)
  if (updatedNote !== null) {
    return res.json(updatedNote)
  } else {
    return res.status(404).json({ error: 'Note not found' })
  }
})
notesRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const note = await notesService.getNoteById(id)
  if (note) {
    return res.json(note)
  } else {
    return res.status(404).json({ error: 'Note not found' })
  }
})
