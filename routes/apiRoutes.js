const fs = require('fs');

//API Routing: 
module.exports = (app) => {
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    app.get('/api/notes', (req, res) => {
        return res.json(noteList);
    });

    app.post('/api/notes', (req, res) => {
        // get Id of last note if it exists
        let lastId;
        if (noteList.length) {
          lastId = noteList[noteList.length - 1].id;
        //Otherwise set to 0
        } else {
            lastId = 0;
        }
        //Starts the id's at 1
        const id = lastId + 1;

        let newNote = req.body;
        newNote['id'] = id;

        // pushes the id of the note along with the rest of the text/input of the array in the request.body
        noteList.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
        res.end("Success");
    });

    // * DELETE `/api/notes/:id` -
    app.delete('/api/notes/:id', (req, res) => {
        //finds note by id, then converts the string into a JSON object with the id parameters of the request made
        let findNote = noteList.find(({ id }) => id === JSON.parse(req.params.id));

        let nodeElement = noteList.filter(node => node.id == req.params.id);    
        
        //Delete object matching the index of the note ID
        noteList.splice(noteList.indexOf(nodeElement[0]), 1);
        fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
        res.end("Note was deleted");
    });
};