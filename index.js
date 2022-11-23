require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const fileUpload = require("express-fileupload");
const customValidate = require('./middlewares/customValidate');
const auth = require("./middlewares/authenticated");
const redirectIfAuth = require('./middlewares/redirectfAuth');
const loggedInMiddleware = require("./middlewares/loggedIn");
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const postController = require("./controllers/getPost");
const storePostController = require("./controllers/storePost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/loginController");
const loginUserController = require("./controllers/loginUser");

const app = new express();

app.use(express.json());
global.loggedIn = null;
app.use(expressSession({ secret: "bathu123", resave: false, saveUninitialized: true }));
app.use("*", loggedInMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
// app.use(auth);
app.use(express.static("public"));
app.use("/posts/store", customValidate);
app.set("view engine", "ejs");

mongoose.connect(
    process.env.MONGO_URL, { useNewUrlParser: true }
    // "mongodb+srv://divyaniparte27:jenika%40123@divyani.p5eyzpy.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true }
);

// "mongodb+srv://nbathula8123:Bathmay2022@nikhiklmongodb.hvjp42q.mongodb.net/fall22?retryWrites=true&w=majority",
// "mongodb+srv://nikhiklmongodb.hvjp42q.mongodb.net/fall22?retryWrites=true&w=majority",
// { user: "nbathula8123", pass: "Bathmay2022" },


global.locals = { createPost: true };

const port = 4008;

app.get("/", homeController);

app.get("/post/:id", postController);

app.get("/posts/new", auth, newPostController);

app.post("/posts/store", storePostController);

app.get("/auth/register", redirectIfAuth, newUserController);

app.post("/users/register", redirectIfAuth, storeUserController);

app.get("/auth/login", redirectIfAuth, loginController);

app.post("/users/login", redirectIfAuth, loginUserController);

app.listen(port, () => {
    console.log("App Listening on Port " + port);
});