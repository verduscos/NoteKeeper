const express = require('express');
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');;

const { Notebook } = require('../../db/models');


const router = express.Router();

// Get all notebooks for a user
router.get('/:userId', asyncHandler(async (req, res) => {
    const id = req.params.userId;
    console.log('INSIDE ROUTE')
    console.log(id);

    const notebooks = await Notebook.findAll({
        where: {
            userId: id
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    });

    return res.json(notebooks);
}))


module.exports = router;
