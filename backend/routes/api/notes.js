const express = require('express');
const asyncHandler = require('express-async-handler');
const { db } = require('../../config');

const { Note } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');;


const router = express.Router();

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
  // console.log(req.params)
  console.log(title)
  console.log(body)
  console.log('IM IN THE ROUTE')
  await db.Note.create({
    title:'test',
    body:'test',
    userId: 1,
    notebookId: 1
  })
  res.json({});
}))

module.exports = router;
