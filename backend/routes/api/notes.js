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

module.exports = router;
