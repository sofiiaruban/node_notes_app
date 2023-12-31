import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { notesRouter } from './routes/notes'

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/notes', notesRouter)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})