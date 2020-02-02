const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// express() is used to create an express application by returning an express application
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static("public"));

const names = [
  { firstName: "Shereena", lastName: "The Poet" },
  { firstName: "Faroo7", lastName: "The Wise One" },
  { firstName: "Abdulrahman", lastName: "The Philosopher" }
];

// set the view engine to the parameter pug. Basically it's telling express which template engine to use
app.set("view engine", "pug");

const mainRoutes = require("./routes");
const cardRoutes = require("./routes/cards");

app.use(mainRoutes); //to make middleware
app.use("/cards", cardRoutes);

app.use((req, res, next) => {
  req.message = "This message made it"; // message isn't a special name, you can call it whatever you want
  console.log("Helloo");
  const err = new Error("I'm an error message.");
  err.status = 500; //we're setting the status beause the error we generated by JavaScript doesn't have a status

  next();
  // next(err); //this will interrupt the app, the next malware function will not be called
});

app.use((req, res, next) => {
  console.log(req.message);
  next();
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err; //just another way of doing things
  console.log("ERROR STATUS", err.status);
  res.status(err.status); //read the status property. Now the browser will be able to receive the error code
  res.render("error");
});

// app.get("/sandbox", (req, res) => {
//   res.render("sandbox", { names });
// });

// const laughs = [
//   { id: 1, text: "lol" },
//   { id: 2, text: "hah" },
//   { id: 3, text: "kak" }
// ];

// app.get("/lol/:id", (req, res) => {
//   const laugh = laughs.find(laugh => laugh.id == req.params.id);

//   if (!laugh) res.sendStatus(404);

//   return res.json(laugh);
// });

// set a development server using the listen method (3000 is the port number)
// the second argument is a callback function (we add an console log to make it clear in the terminal what port we're using)
app.listen(3000, () => {
  console.log("The application is running on local host:3000");
});

// By default express will look for a folder called views for the templates, this can be changed in the
