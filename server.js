var exp = require("express");
//const { MongoClient } = require("mongodb");
var app = exp();
var port = 3000;
//var url = "mongodb://127.0.0.1:27017";

const dotenv = require('dotenv');
dotenv.config();

app.use(exp.urlencoded({
    extended : true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.use(exp.static(__dirname));

//For online database MongoDB Atlas
app.post('/', (req, res) => {
    //console.log(JSON.stringify(req.body));
    var details = req.body

    var MC= require('mongodb').MongoClient;
    var url = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.xjoqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    MC.connect(url, (err, dbase) => {
        if (err) throw err;
        console.log(`Connected to Mongodb Atlas`);
        var data = dbase.db(`mydb`);
        data.createCollection(`details`, (err, res) => {
            if (err) throw err;
            console.log(`Collection created`)
            data.collection(`details`).insertOne(details, (err, res) => {
                if(err) throw "Could not insert";
                console.log(`inserted Data into Collection`);
                dbase.close();
            });
        });
    });
    res.send("Thank you for your details");
});

app.listen(port, () => console.log(`http://127.0.0.1:${port}`));
    

//For local database

/*mc.connect(url, (err, db) => {
    if (err) throw err;
    var dbname = db.db("mydb");
    console.log("Connected");
    dbname.createCollection("first", (err, res) => {
        if (err) throw err;
        console.log("Collection created");
        dbname.collection("first").insertOne(data, (err) => {
            if (err) throw err;
            console.log("Document Inserted");
            db.close();
        });
    });
});*/