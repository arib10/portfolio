const express   = require("express"),
      app       = express(),
      mongodb  = require("mongodb"),
      mongoClient = mongodb.MongoClient,
      bodyParser  = require("body-parser"),
      url         = "mongodb://localhost:27017/";


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/hire", (req, res) => {
    mongoClient.connect(url, (err, database) => {
        if (err) throw err;
        const dbo = database.db("portfolio");
        const newHire = {name: req.body.name, email: req.body.email, hire_type: req.body.job_type, description: req.body.job_description}
        dbo.collection("hire").insertOne(newHire, (err, res) => {
            if (err) throw err;
            console.log(res.ops[0]);
            database.close();
        });
    });
    res.send("sent!");
});

app.post("/messages", (req, res) => {
    mongoClient.connect(url, (err, database) => {
        if (err) throw err;
        const dbo = database.db("portfolio");
        const data = {name: req.body.name, email: req.body.email, message: req.body.message}
        dbo.collection("messages").insertOne(data, (err, res) => {
            if (err) throw err;
            console.log("inserted");
            console.log(res.ops[0]);
            database.close();
        });
    });
    res.send("Sent!");
});

app.get("/blog/what-you-really-need-to-become-a-web-developer", (req, res) => {
    res.render("article1");
});

app.get("/blog/5-steps-that-made-my-first-javascript-project-successful", (req, res) => {
    res.render("article2");
});

app.get("/blog/why-you-can't-code-with-phone", (req, res) => {
    res.render("article3");
});
app.get("/form", (req, res) => {
    res.render("form");
})

app.listen(3000, () => {
    console.log("Your portfolio site is on....");
});

// mongod --storageEngine=mmapv1 --dbpath C:\mongodb\data\db