//========== Variables ===========
        //Set up Express and App variables for future use
const express = require('express');
const app = express();

        //Bring Data from pokemon.js
const poke = require('./models/pokemon');

//========== Listener ============
        //Set up PORT number as standard 3000
const PORT = 3000;
        //Server is listening on PORT and console logging to which port that refers
app.listen(PORT, ()=> {
    console.log("listening on port: ", PORT);
})

//========== Middleware ==========
        //Include Static Files
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
        //Include Method Override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//========== Routes ==============
        //===== Index / GET =====
        // Standard Re-Route
app.get('/', (req, res) => {
    res.send("Nearly there... click here to visit the: <a href='http://localhost:3000/pokedex'style='text-decoration: none; color: black;'>Pokedex<a>");
});
        //Main Index Setup
app.get('/pokedex', (req, res)=> {
    res.render('index.ejs', {poke});
});
        //===== Show / GET =====
        //Show Pokemon Info
app.get('/pokedex/:id', (req, res) => {
    res.render('show.ejs', {poke: poke[req.params.id]});
});
        //===== New / GET =====
        //Create New Link to form (Set up Modal if possible)
app.get('/new', (req, res) => {
    res.render('new.ejs');
});
        //===== Edit / GET =====
app.get('/pokedex/:id/edit', (req, res) => {
    res.render('edit.ejs', {poke: poke[req.params.id], index: req.params.id});
});
        //===== Create / POST =====
        //Post new info from form into the object
app.post("/pokedex", (req, res) => {
         //Set the info in the form to a new item in an object
    poke.push(req.body);
    console.log(poke);
         //Redirect the page after creating new content to the main page
    res.redirect('http://localhost:3000/pokedex');
});
        //===== Update / PUT =====
app.put('/pokedex/:id', (req, res) => {
        //Set info from the selected id to the new information user inputs
    poke[req.params.id] = req.body;
         //Redirect the page after updating to the main page
    res.redirect('/pokedex');
});
        //===== Destroy / DELETE =====
app.delete('/pokedex/:id', (req, res) => {
        //Select the item by id and remove only one item
    poke.splice(req.params.id, 1);
        //Redirect back to home page after delete completes
    res.redirect('/pokedex');
});