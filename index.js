// - [ SERVER SETUP ] -

console.log("STARTING SERVER...")

// Import libaries
const express = require('express');
const path = require('path');
const fs = require('fs');

const subjects = fs.readdirSync( __dirname + '/content/');

const app = express();
const server = app.listen(8080, () => console.log("LISTENING FOR REQUESTS")); // Listens on port 3000
app.use('/static', express.static('public')); // Files the client will see from ./static

app.set('views', './views');
app.set('view engine', 'ejs');

// - [ ROUTING ] -

app.get('/', (req, res) => {
    res.sendFile( __dirname + '/views/@.html');
});

app.get( '/:subject/*', (req, res) => {

    if( subjects.indexOf( req.params.subject ) != -1 ){
        let page, content;

        let subject = req.params.subject;
        let dir = path.join( __dirname, 'content', subject, ...req.params[0].split('/') );

        if( fs.existsSync(`${dir}/.html`) ){
            content = fs.readFileSync( `${dir}/.html`, 'utf8' );

        } else if( req.params[0] == '' ){
            content = '<h1>Welcome!</h1>\n<p>Please select the topic you want to explore or revise in the side menu. 😊</p>';

        }else if( fs.existsSync(`${dir}.html`) ){
            content = fs.readFileSync( `${dir}.html`, 'utf8' );

        } else {
            content = `<h1>Oh no!</h1>\n<p>This page doesn't exist. <a href=\"/${req.params.subject}\">Go back</a>`
        }

        if( req.params[0] ){ let pages = req.params[0].split('/'); page = `- ${pages[pages.length-1].toUpperCase()}`; }
        
        res.render( subject, { page, content } );

    } else { return res.redirect('/'); }

});

app.get('/*', (req, res) => {
    let request = req.params[0].toLowerCase();
    if( subjects.indexOf( request ) != -1 ){
        res.redirect(`./${request}/`);
    } else {
        res.redirect(`./`);
    }
});