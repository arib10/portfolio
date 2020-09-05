const express   = require("express"),
      app       = express(),
      mongodb  = require("mongodb"),
      mongoClient = mongodb.MongoClient,
      bodyParser  = require("body-parser"),
      url         = process.env.DATABASEURL;


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

app.get("/aribakande1052001/hire", (req, res) => {
    mongoClient.connect(url, (err, database) => {
        if (err) throw err;
        const dbo = database.db("portfolio");
        dbo.collection("hire").find({}).toArray( (err, result) => {
            if (err) throw err;
            console.log(res);
            res.render("hires", {hires: result});
            database.close();
        });
    })
})


app.get("/aribakande1052001/messages", (req, res) => {
    mongoClient.connect(url, (err, database) => {
        if (err) throw err;
        const dbo = database.db("portfolio");
        dbo.collection("messages").find({}).toArray( (err, result) => {
            if (err) throw err;
            console.log(res);
            res.render("messages", {messages: result});
            database.close();
        })
    })
})

app.get("*", (req, res) => {
    res.render("error");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Your portfolio site is on....");
});

// mongod --storageEngine=mmapv1 --dbpath C:\mongodb\data\db