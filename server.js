require('dotenv').config();
//Add Express and Mongoose
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

//Connect to our servers
mongoose.connect('mongodb+srv://edmond725:edmond725pp@cluster0.c750ujh.mongodb.net/testDatabase');
const database = mongoose.connection;

//Throw success or error message
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8099, () => {
    console.log(`Server Started at ${8099}`)
})

//The file is imported into our main script file sever.js
const routes = require('./routes/routes');
app.use('/api', routes);

//login user id and password
app.set('view engine', 'ejs');
var usersinfo = new Array(
    {name: "Usera", password: "cs381"},
    {name: "Userb", password: "cs381"},
    {name: "Userc", password: "cs381"}
);

app.use(session({
    name: 'session',
    secret: 'cs381',
    resave: false,
    saveUninitialized: false
}));
//display login page
app.get('/', function(req, res){
    if(!req.session.authenticated){
        console.log("...Not authenticated; directing to login");
        res.redirect("/login");
    }else{
        console.log("...Hello, welcome back");
        res.send("Welcome back!");
    }
});

app.get('/login', function(req, res){
    console.log("...Welcome to login page.")
    return res.status(200).render("login");
});
//Verify ID and password
app.post('/login', function(req, res){
    console.log("...Handling your login request");
    for (var i=0; i<usersinfo.length; i++){
        if (usersinfo[i].name == req.body.name && usersinfo[i].password == req.body.password) {
            req.session.authenticated = true;
            req.session.userid = usersinfo[i].name;
            console.log(req.session.userid);
            return res.status(200).redirect("api/getAll");
        }
    }
    console.log("Error: Invalid username or password.");
    return res.redirect("/login");
});
