// - [ SERVER SETUP ] -

console.log("STARTING SERVER...")

// Import libaries
const path     = require('path');
const fs       = require('fs');
const express  = require('express');
const showdown = require('showdown');

const subjects = fs.readdirSync( __dirname + '/content/');

const converter = new showdown.Converter({ noHeaderId: true });

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
    let markdown;

    let subject = req.params.subject;
    let dir = path.join( __dirname, 'content', subject, ...req.params[0].split('/') );

    // Content for folder
    if( fs.existsSync(`${dir}/.md`) ){
      markdown = fs.readFileSync( `${dir}/.md`, 'utf8' );

    // Home page placeholder
    } else if( req.params[0] == '' ){
      markdown = '#Welcome!\nPlease select the topic you want to explore or revise in the side menu. 😊';

    // Content found
    }else if( fs.existsSync(`${dir}.md`) ){
      markdown = fs.readFileSync( `${dir}.md`, 'utf8' );

    // Content not found
    } else {
      markdown = `#Oh no!\nThis page doesn't exist or couldn't be found. You can find the home page [here](/${req.params.subject}).\n\n![](/static/resources/404.gif)`;
    }

    let content = converter.makeHtml(markdown);
    
    res.render( subject, { content } );

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