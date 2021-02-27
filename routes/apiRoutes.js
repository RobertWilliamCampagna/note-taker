const path = require('path');
const router = require('express').Router();



// module.exports = (req, res) => {
// console.log(req.body);
// return res.send('Hello World');
// }

// GET /api/notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
})

// POST /api/notes
router.post('/notes', (req,res) => {
    const newNote = req.body;

    console.log(newNote);
// Require db.json
// Push newNote into db
// Return either db or newNote (try db first)
    res.json(newNote);
});

module.exports = router;



