const express = require('express');
const asyncHandler = require('express-async-handler');
// const { db } = require('../../config');

const { Note } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');;


const router = express.Router();

//Find one note
router.get('/:userId/notes/:noteId', asyncHandler(async (req, res) =>  {
  console.log('INSIDE ROUTE')

  let { userId, noteId } = req.params;
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

  await Note.create({
    title,
    body,
    userId,
    notebookId
  })
  return

}))

// Edit a note
router.put('/notes/:noteId', asyncHandler(async (req, res) => {
  console.log('asdfjlasdfjkl')
  const { body } = req.body;
  console.log(body);
  // res.json({})
}))

//DELETE
router.delete('/notes/:noteId', asyncHandler(async (req, res) => {
  const noteId = parseInt(req.params.noteId);
  const note = await Note.findByPk(noteId)

  await note.destroy();
}))

module.exports = router;
