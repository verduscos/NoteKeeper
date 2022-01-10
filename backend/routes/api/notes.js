const express = require('express');
const asyncHandler = require('express-async-handler');
const { db } = require('../../config');

const { Note } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');;


const router = express.Router();

router.get("/", asyncHandler(async(req, res) => {
  console.log('INSIDE ROUTE')
  const notes = await Note.findAll();
  console.log(notes)
  }));

module.exports = router;
