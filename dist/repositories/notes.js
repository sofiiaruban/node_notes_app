"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRepository = exports.initialNotes = void 0;
const uuid_1 = require("uuid");
exports.initialNotes = [
    {
        id: (0, uuid_1.v4)(),
        name: 'Shopping List',
        created: '7/26/2023',
        category: 'Task',
        content: 'eggs, pasta, butter,salt'
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'Thought',
        created: '7/26/2023',
        category: 'Random Thought',
        content: 'donec pretium vulputate'
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'Bagfix',
        created: '7/26/2023',
        category: 'Idea',
        content: 'tincidunt ornare massa eget'
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'Shopping List',
        created: '7/26/2023',
        category: 'Task',
        content: 'tincidunt ornare massa eget'
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'Ornare Lectus',
        created: '7/26/2023',
        category: 'Random Thought',
        content: 'pellentesque massa placerat duis'
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'Rhoncus Mattis',
        created: '7/26/2023',
        category: 'Idea',
        content: 'magna etiam tempor orci'
    },
    {
        id: (0, uuid_1.v4)(),
        name: 'Nullam Non Nisi',
        created: '8/1/2023',
        category: 'Idea',
        content: 'magna etiam tempor orc'
    }
];
exports.notesRepository = {
    getAllNotes: () => {
        return exports.initialNotes;
    },
    createNote: (note) => {
        const newNote = Object.assign(Object.assign({}, note), { id: (0, uuid_1.v4)() });
        exports.initialNotes.push(newNote);
        return newNote;
    },
    getStats: () => {
        const totalNotes = exports.initialNotes.length;
        return { totalNotes };
    },
    removeNote: (id) => {
        exports.initialNotes = exports.initialNotes.filter((note) => note.id !== id);
    },
    editNote: (id, updatedNote) => {
        const index = exports.initialNotes.findIndex((note) => note.id === id);
        if (index !== -1) {
            exports.initialNotes[index] = Object.assign(Object.assign({}, exports.initialNotes[index]), updatedNote);
            return exports.initialNotes[index];
        }
        else {
            return null;
        }
    },
    getNoteById: (id) => {
        return exports.initialNotes.find((note) => note.id === id);
    },
};
