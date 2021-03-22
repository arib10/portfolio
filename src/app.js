const express   = require("express"),
      app       = express(),
      mongodb  = require("mongodb"),
      mongoClient = mongodb.MongoClient,
      bodyParser  = require("body-parser"),
      serverless  = require("serverless-http"),
      router      = express.Router(),
      url         = process.env.DATABASEURL;


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

router.get("/", (req, res) => {
    res.render("home");
});

router.post("/hire", (req, res) => {
    mongoClient.connect(url, (err, database) => {
        if (err) throw err;
        const dbo = database.db("portfolio");
        const newHire = {name: req.body.name, email: req.body.email, hire_type: req.body.job_type, description: req.body.job_description}
        dbo.collection("hire").insertOne(newHire, (err, result) => {
            if (err) throw err;
            res.send("sent!");
            database.close();
        });
    });
});

router.post("/messages", (req, res) => {
    mongoClient.connect(url, (err, database) => {
        if (err) throw err;
        const dbo = database.db("portfolio");
        const data = {name: req.body.name, email: req.body.email, message: req.body.message}
        dbo.collection("messages").insertOne(data, (err, result) => {
            if (err) throw err;
            res.send("Sent!");
            database.close();
        });
    });
});

router.get("/aribakande1052001/hire", (req, res) => {
    mongoClient.connect(url, (err, database) => {
        if (err) throw err;
        const dbo = database.db("portfolio");
        dbo.collection("hire").find({}).toArray( (err, result) => {
            if (err) throw err;
            res.render("hires", {hires: result});
            database.close();
        });
    })
})


router.get("/aribakande1052001/messages", (req, res) => {
    mongoClient.connect(url, (err, database) => {
        if (err) throw err;
        const dbo = database.db("portfolio");
        dbo.collection("messages").find({}).toArray( (err, result) => {
            if (err) throw err;
            res.render("messages", {messages: result});
            database.close();
        })
    })
})

router.get("*", (req, res) => {
    res.render("error");
});

app.use("/.netlify/functions/app", router);

module.exports.handler = serverless(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Your portfolio site is on....");
});

// mongod --storageEngine=mmapv1 --dbpath C:\mongodb\data\db
