//na mundeson startimin e HTTP serverit

const express = require("express");        //modul qe mundeson mi bo set up middlewares per menaxhimin e HTTP requests
const dotenv = require("dotenv");          //modul qe mundeson me nda sekretin prej sourcecode
const morgan = require("morgan");          //modul qe mundeson me log ni mesazh cdohere kur bejme request
const bodyparser = require("body-parser"); //na mundeson publikimin e te dhenave dhe qasjen ne to permes body property
const path = require("path");
                                          //nodemon modul qe mundeson restartimin e serverit per cdo ndryshim ne projekt
                                          //ejs template engine qe na mundeson me shkru dynamic HTML
                                          //mongose modul qe mundeson lidhjen me mongoDB
                                          //axios modul qe mundeson me bo request ma leht ne express apps
const connectDB = require('./server/database/connection'); //thirr ./server/database/connection.js per me mmundesu lidhjen

const app = express();                    //inicializimi i aplikacionit si express app

dotenv.config({path:'config.env'});      //i tregon dotenv se ku osht config falli te cilin ka me shfrytezu
const PORT = process.env.PORT || 8080;   //krejt detajet ruhen brenda dotenv fajllit

//log request
app.use(morgan('tiny'));                 //shfaq ne console llojin e requestit, pathin dhe responsin ne milisekond (psh  GET /js/index.js 304 - - 2.832 ms)

//mongodb connection
connectDB();                             //starton lidhjen me db (duke thirr metoden connectDB te ./server/database/connection.js)

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css"))); //kjo mundeson qe css me ju qas si /css pa pas nevoj me thirr assets/css
app.use("/img", express.static(path.resolve(__dirname, "assets/img"))); //kjo mundeson qe img me ju qas si /img pa pas nevoj me thirr assets/img
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));   //kjo mundeson qe js me ju qas si /js pa pas nevoj me thirr assets/js

//load routes
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {                                                //degjimi i projektit ne portin e percaktuar
  console.log(`Server is running on http://localhost:${PORT}`);         //e merr PORT te config.env
});
