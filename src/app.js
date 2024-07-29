const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

const sayHello = (req, res) => {
  console.log(req.query);
  const name = req.query.name;
  const content = name ? `Hello, ${name}!` : "Hello!";
  res.send(content);
};

const saySomething = (req, res) => {
  const greeting = req.params.greeting;
  const name = req.query.name;

  const content = greeting && name ? `${greeting}, ${name}!` : `${greeting}!`;
  res.send(content);
};

const sayGoodbye = (req, res) => {
  res.send("Sorry to see you go!");
};

app.get('/songs', (req, res) => {
  const title = req.query.title;
  res.send(title);
});

app.get('/states/:abbreviation', (req,res, next)=> {
  const abbreviation = req.params.abbreviation;

  if (abbreviation.length !==2 ){
    next('State abbreviation is invalid.' );
  } else {
    res.send(`${abbreviation} is a nice state, I'd like to visit.`);
  }
});

app.use((err, req,res, next) => {
  console.error(err);
  res.send(err);

})

app.get('/hello', sayHello);
app.get("/say/goodbye", sayGoodbye);
app.get("/say/:greeting", saySomething);


module.exports = app;
