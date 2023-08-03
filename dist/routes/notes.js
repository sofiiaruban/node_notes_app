"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRouter = void 0;
const express_1 = __importDefault(require("express"));
const notes_1 = require("../services/notes");
exports.notesRouter = express_1.default.Router();
exports.notesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allNotes = yield notes_1.notesService.getAllNotes();
        return res.json(allNotes);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
exports.notesRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, created, category, content } = req.body;
    try {
        const newNote = yield notes_1.notesService.createNote({ name, created, category, content });
        return res.json(newNote);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
exports.notesRouter.get('/stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield notes_1.notesService.getStats();
        return res.json(stats);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
exports.notesRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield notes_1.notesService.removeNote(id);
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
exports.notesRouter.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedNote = yield notes_1.notesService.editNote(id, req.body);
    if (updatedNote !== null) {
        return res.json(updatedNote);
    }
    else {
        return res.status(404).json({ error: 'Note not found' });
    }
}));
exports.notesRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const note = yield notes_1.notesService.getNoteById(id);
    if (note) {
        return res.json(note);
    }
    else {
        return res.status(404).json({ error: 'Note not found' });
    }
}));
