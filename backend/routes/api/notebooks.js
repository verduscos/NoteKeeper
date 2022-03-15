const express = require('express');
const asyncHandler = require('express-async-handler');

const { Notebook, Note } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateNotebook = [
  check("title")
    .exists({ checkFalsy: true})
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
  console.log("TESTINGEDSKLFJSDKLF")
  const id = req.params.userId;
  const notebookId = req.params.notebookId;
  console.log(id, notebookId)

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
  console.log("ASLKFJKLDJFDKLJSDKLJFSDKLFJDKLSFJSDKLJFSDKL")
  const { user_id, title } = req.body;
  console.log("ID", user_id)
  console.log("TITLE", title)

  let newNotebook = await Notebook.build({
    userId: user_id,
    title: title
  })

  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    console.log("IT IS EMPTY")
    await newNotebook.save();
    return res.json(newNotebook);
  } else {
    console.log("FAILED")
    const errors = validationErrors.array().map(err => err.msg);
    console.log(errors)
    return res.json(errors)
  }
}))


module.exports = router;
