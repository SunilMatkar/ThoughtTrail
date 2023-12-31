const express = require("express");
const app = express();
const port = 8080;
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const path = require("path");

const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'



app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Apna College",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "Apna College",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "Apna College",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "Apna College",
        content: "I love coding"
    }
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts }); // Pass the posts data to the view
});

app.get("/posts/new",(req ,res)=>{
  res.render("new.ejs");
});

app.post("/posts",(req , res)=>{
    let{username, content}= req.body;
    let id  = uuidv4();
    posts.push({id ,username , content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;


    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});
app.patch("/posts/:id" ,(req , res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;

    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);  // Corrected the condition
    res.render("edit.ejs",{ post });  // Pass the post data to the template
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);  // Corrected the condition and updated variable name
    res.redirect("/posts");
});





app.listen(port, () => {
  console.log("App is listening on port " + port);
});
