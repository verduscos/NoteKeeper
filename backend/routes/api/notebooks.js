const express = require('express');
const asyncHandler = require('express-async-handler');

const { Notebook, Note } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateNotebook = [
  check("title")
    .isLength({ min: 4 })
    .withMessage("Title must be at least 4 characters."),
    handleValidationErrors
];

// Get all notebooks for a user
router.get('/:userId', asyncHandler(async (req, res) => {
  const id = req.params.userId;

  const notebooks = await Notebook.findAll({
    where: {
      userId: id
    },
    order: [
      ['updatedAt', 'DESC']
    ]
  });
  console.log(notebooks)
  return res.json(notebooks);
}))


// Get all notes for a notebook
router.get('/:userId/:notebookId', asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const notebookId = req.params.notebookId;

  const notes = await Note.findAll({
    where: {
      notebookId: notebookId,
      userId: id
    },
    order: [
      ['createdAt', "DESC"]
    ]
  })

  return res.json(notes);
}))


// Create a notebook
router.post("/", validateNotebook, asyncHandler(async(req, res) => {
  const { user_id, title } = req.body;
  let newNotebook = await Notebook.build({
    userId: user_id,
    title: title
  })

  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    await newNotebook.save();
    return res.json(newNotebook);

  } else {
    const errors = validationErrors.array().map(err => err.msg);
    return res.json(errors)
  }
}))



// Delete a notebook
router.delete("/", asyncHandler(async(req, res) => {
  const { notebookId } = req.body;
  const notebook = await Notebook.findByPk(notebookId);

  await notebook.destroy();
  return res.json(notebook);
}))


// Update a notebook title
router.put("/", asyncHandler(async(req, res) => {
  const { notebookId, title } = req.body;

  console.log("WE HIT")
  // console.log(req.body)
  console.log(title)
  console.log(notebookId)
  const notebook = await Notebook.findByPk(notebookId);

  notebook.title = title
  await notebook.save();

  return res.json(notebook);
}))


module.exports = router;
