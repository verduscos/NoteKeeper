const express = require('express');
const asyncHandler = require('express-async-handler');
const { db } = require('../../config');

const { Note } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');;


const router = express.Router();

router.get("/", asyncHandler(async(req, res) => {
    const notes = await Note.findAll();
    console.log('INSIDE ROUTE')
    return res.json(notes)
  }));

module.exports = router;
