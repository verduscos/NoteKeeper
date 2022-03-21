const express = require('express');
const asyncHandler = require('express-async-handler');
// const { requireAuth}

const { Note } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


// Note Creation Validation
const validateNote = [
  check('title')
      .exists({ checkFalsy: true })
      .isLength({ min: 4})
      .withMessage('Title must be at least 4 characters.'),
  check('body')
      .exists({ checkFalsy: true })
      .withMessage('You should write something.'),
  handleValidationErrors,
];

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
      userId: id,

    },
    order: [
      ['updatedAt', 'DESC']
    ]
  });

  return res.json(notes);
  }));


  // Create a note
router.post('/', validateNote ,asyncHandler(async(req, res, next) => {
  const { title, body, userId, notebookId } = req.body;

  let test;

  notebookId >= 1 ? test = notebookId : null

  let newNote = await Note.build({
    title,
    body,
    userId,
    notebookId : test
  })

  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    await newNote.save();
    return res.json(newNote);
  } else {
    const errors = validationErrors.array().map(err => err.msg);
    console.log("ERRRORS HERE")
    console.log(errors)
    return res.json({ "errors" : errors });
  }

}))


// Edit a note
router.put('/notes/:noteId', validateNote, asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const { title, body, notebookId } = req.body;

  let test;

  notebookId >= 1 ? test = notebookId : null

  const note = await Note.findByPk(noteId);



  const validationErrors = validationResult(req.body);

  if (validationErrors.isEmpty()) {
    await note.update({
      title,
      body,
      notebookId: test
    })

    return res.json(note);
  } else {
    const errors = validationErrors.array().map(err => err.msg);
    return res.json({errors});
  }


}))


//DELETE
router.delete('/notes/:noteId', asyncHandler(async (req, res) => {
  const noteId = parseInt(req.params.noteId);
  const note = await Note.findByPk(noteId)

  await note.destroy();
  return res.json(note);
}))

module.exports = router;

//SEARCH
router.get('/notes', asyncHandler(async (req, res) => {
  let search = new URl
}))
