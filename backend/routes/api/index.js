const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const notesRouter = require('./notes');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/mynotes', notesRouter);


router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

module.exports = router;
