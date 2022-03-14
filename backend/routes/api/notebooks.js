const express = require('express');
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');;

const { Notebook, Note } = require('../../db/models');


const router = express.Router();

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
  const notebookId = req.params.notebookId

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


module.exports = router;
