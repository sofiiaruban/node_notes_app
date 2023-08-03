"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesService = void 0;
const notes_1 = require("../repositories/notes");
const yup = __importStar(require("yup"));
const notesSchema = yup.array(yup.object({
    id: yup.string().notRequired(),
    name: yup.string().required(),
    created: yup.string().required(),
    category: yup.string().required(),
    content: yup.string().required()
}));
const noteSchema = yup.object().shape({
    id: yup.string().notRequired(),
    name: yup.string().required(),
    created: yup.string().required(),
    category: yup.string().required(),
    content: yup.string().required()
});
const idSchema = yup
    .string()
    .required('Id is required')
    .trim()
    .min(1, 'Id cannot be empty');
const statsSchema = yup.object().shape({
    totalNotes: yup
        .number()
        .required('Total notes is required')
        .positive('Total notes must be positive')
});
exports.notesService = {
    getAllNotes: () => __awaiter(void 0, void 0, void 0, function* () {
        const allNotes = notes_1.notesRepository.getAllNotes();
        try {
            const validNotes = yield notesSchema.validate(allNotes);
            return validNotes;
        }
        catch (error) {
            console.error('Validation error:', error.message);
            return [];
        }
    }),
    createNote: (note) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield noteSchema.validate(note);
            return notes_1.notesRepository.createNote(note);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getStats: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const stats = notes_1.notesRepository.getStats();
            yield statsSchema.validate(stats);
            return stats;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    removeNote: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield idSchema.validate(id);
            return notes_1.notesRepository.removeNote(id);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    editNote: (id, updatedNote) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield noteSchema.validate(updatedNote);
            return notes_1.notesRepository.editNote(id, updatedNote);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getNoteById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield idSchema.validate(id);
            return notes_1.notesRepository.getNoteById(id);
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
