import { notesRepository } from '../repositories/notes'
import { Note } from '../types/Note'
import * as yup from 'yup'

const notesSchema = yup.array(
  yup.object({
    id: yup.string().notRequired(),
    name: yup.string().required(),
    created: yup.string().required(),
    category: yup.string().required(),
    content: yup.string().required()
  })
)

const noteSchema = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().required(),
  created: yup.string().required(),
  category: yup.string().required(),
  content: yup.string().required()
})

const idSchema = yup
  .string()
  .required('Id is required')
  .trim()
  .min(1, 'Id cannot be empty')

const statsSchema = yup.object().shape({
  totalNotes: yup
    .number()
    .required('Total notes is required')
    .positive('Total notes must be positive')
})

export const notesService = {
  getAllNotes: async () => {
    const allNotes = notesRepository.getAllNotes()
    try {
      const validNotes = await notesSchema.validate(allNotes)
      return validNotes
    } catch (error:any) {
      console.error('Validation error:', error.message)
      return []
    }
  },
  createNote: async (note: Note) => {
    try {
      await noteSchema.validate(note)
      return notesRepository.createNote(note)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  getStats: async () => {
    try {
      const stats = notesRepository.getStats()
      await statsSchema.validate(stats)
      return stats
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  removeNote: async (id: string) => {
    try {
      await idSchema.validate(id)
      return notesRepository.removeNote(id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  editNote: async (id: string, updatedNote: Partial<Note>) => {
    try {
      await noteSchema.validate(updatedNote)
      return notesRepository.editNote(id, updatedNote)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  getNoteById: async (id: string) => {
    try {
      await idSchema.validate(id)
      return notesRepository.getNoteById(id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
