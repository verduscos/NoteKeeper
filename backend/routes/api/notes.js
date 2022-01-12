const express = require('express');
const asyncHandler = require('express-async-handler');
// const { requireAuth}

const { Note } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');;


const router = express.Router();

//Find one note
router.get('/:userId/notes/:noteId', asyncHandler(async (req, res) =>  {
  let { noteId } = req.params;
  let id = parseInt(noteId);

  const note = await Note.findByPk(id)
return res.json(note)
}));


// Get all notes
router.get("/:userId", asyncHandler(async(req, res) => {
  const id = req.params.userId;

  const notes = await Note.findAll({
    where: {
      userId: id
    }
  });

  return res.json(notes);
  }));


  // Create a note
router.post('/', asyncHandler(async(req, res) => {
  const { title, body, userId, notebookId} = req.body;

  let newNote = await Note.create({
    title,
    body,
    userId,
    notebookId
  })
  return res.json(newNote);

}))


// Edit a note
router.patch('/notes/:noteId', asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const { body } = req.body;

  const note = await Note.findByPk(noteId);
  await note.update({
    body
  })
  await note.save();

  return res.json(note);
}))


//DELETE
router.delete('/notes/:noteId', asyncHandler(async (req, res) => {
  const noteId = parseInt(req.params.noteId);
  const note = await Note.findByPk(noteId)

  await note.destroy();
  return res.json(note);
}))

module.exports = router;
