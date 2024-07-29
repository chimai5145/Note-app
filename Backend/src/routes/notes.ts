import * as NotesController from "../controller/notes";
// *: import all func
import express from "express";

//organizing and managing router
const router = express.Router();

router.get("/", NotesController.getNotes);

// anything after the / will be read by express
router.get("/:noteId", NotesController.getNote);

router.post("/",NotesController.createNote);

router.patch("/:noteId", NotesController.updateNote);

router.delete("/:noteId", NotesController.deleteNote);

export default router;