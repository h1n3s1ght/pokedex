        //========== Variables ===========
        //Set up Express and App variables for future use
const express = require('express');
const userAgent = require('express-useragent');
        //Bring Data from pokemon.js
const poke = require('./models/pokemon');

const app = express();

app.use(userAgent.express());

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
const { resolveInclude } = require('ejs');
app.use(methodOverride('_method'));

        //========== Routes ==============
        //===== Index / GET =====
        // Standard Re-Route
app.get('/', (req, res) => {
    res.send("Nearly there... click here to visit the: <a href='http://localhost:3000/pokedex'style='text-decoration: none; color: black;'>Pokedex<a>");
});
        //Main Index Setup
app.get('/pokedex', (req, res)=> {
    let isMobile = req.useragent.isMobile;
    let screenSize = req.useragent.screenWidth;
    res.render('index.ejs', {poke , screenSize , isMobile});
    console.log(req.useragent);
});
        //===== Show / GET =====
        //Show Pokemon Info
app.get('/pokedex/:id', (req, res) => {
    let isMobile = req.useragent.isMobile;
    let screenSize = req.useragent.screenWidth;
    res.render('show.ejs', {poke: poke[req.params.id] , isMobile, screenSize});
});
        //===== New / GET =====
        //Create New Link to form (Set up Modal if possible)
app.get('/new', (req, res) => {
    let isMobile = req.useragent.isMobile;
    let screenSize = req.useragent.screenWidth;
    let pokeLength = Object.keys(poke).length;
    res.render('new.ejs', {poke , pokeLength , isMobile, screenSize});
    console.log(pokeLength);
});
        //===== Edit / GET =====
app.get('/pokedex/:id/edit', (req, res) => {
    let isMobile = req.useragent.isMobile;
    let screenSize = req.useragent.screenWidth;
    res.render('edit.ejs', {poke: poke[req.params.id], index: req.params.id , isMobile, screenSize});
});
        //===== Create / POST =====
        //Post new info from form into the object
app.post("/pokedex", (req, res) => {
         //Set the info in the form to a new item in an object
    poke.push(req.body);
    console.log(req.body);
         //Redirect the page after creating new content to the main page
    res.redirect('http://localhost:3000/pokedex');
});
        //===== Update / PUT =====
// app.put('/pokedex/:id', (req, res) => {
        //Set info from the selected id to the new information user inputs
    //Update
app.put('/pokedex/:id', (req, res) => {
poke[req.params.id] = req.body
  req.body.stats = {};
  req.body.stats.hp = JSON.parse(JSON.stringify(req.body.hp));
  req.body.stats.attack = JSON.parse(JSON.stringify(req.body.attack));
  req.body.stats.defense = JSON.parse(JSON.stringify(req.body.defense));
  req.body.stats.spattack = JSON.parse(JSON.stringify(req.body.spattack));
  req.body.stats.spdefense = JSON.parse(JSON.stringify(req.body.spdefense));
  req.body.stats.speed = JSON.parse(JSON.stringify(req.body.speed));
  console.log(JSON.parse(JSON.stringify(req.body.stats)));
  poke[req.params.id] = JSON.parse(JSON.stringify(req.body));
  res.redirect('/pokedex');
});
        //===== Destroy / DELETE =====
app.delete('/pokedex/:id', (req, res) => {
        //Select the item by id and remove only one item
    poke.splice(req.params.id, 1);
        //Redirect back to home page after delete completes
    res.redirect('/pokedex');
});