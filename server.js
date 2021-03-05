
const express = require('express');
const path = require('path');
const  fs  = require('fs');
const { notes } = require('./data/notes.json');

const app = express();
const PORT = process.env.PORT || 3001;




// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// const app = require('express')
// // Routes to express network
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if(query.title) {
    filteredResults = filteredResults.filter(notes => notes.title === query.title);
  }
  if (query.text ) {
    filteredResults = filteredResults.filter(notes => notes.text === query.text);
  }
  return filteredResults;
}

function findById(id, notesArray) {
  const result = notesArray.filter(notes => notes.id === id)[0];
  return result;
}

// This will create a New Note
function createNote(body, notesArray){
  const note= body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './data/notes.json'),
    JSON.stringify({ notes: notesArray}, null, 2)
  );
}

function checkNote(note){
  if (!note.title || typeof note.title !== 'string'){
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
}

//  Gets 
app.get('/api/notes', (req,res) => {
  let result = notes;
  if(req.query){
    result = filterByQuery(req.query, result);
  }
  res.json(result);
});

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes/:id', (req, res) =>{
  const result = findById(req.params.id, notes);
  res.json(result)
});

app.post('/api/notes', (req, res ) => {
  req.body.id = notes.length.toString();
  if (!checkNote(req.body)) {
    res.status(400).send('Please use correct format for making a note.');
  } else {
    const note = createNote(req.body, notes);
    res.json(note);
  }
  
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/.public/index.html'));
})

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });