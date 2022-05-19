//========== Variables ===========
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
        // static files
app.use(express.static('public'));

//========== Routes ==============
        //===== Index / GET =====
        // Standard ReRoute
app.get('/', (req, res) => {
    res.send("Nearly there... click here to visit the: <a href='http://localhost:3000/pokedex'style='text-decoration: none; color: black;'>Pokedex<a>")
})
        //Main Index Setup
app.get('/pokedex', (req, res)=> {
    res.render('index.ejs', {poke});
})
        //===== Show / GET =====
        //Show Pokemon Info

        //===== New / GET =====
        //Create New Link to form (Set up Modal if possible)
app.get('/new', (req, res) => {

})
        //===== Edit / GET =====

        //===== Create / POST =====

        //===== Update / PUT =====

        //===== Destroy / DELETE =====