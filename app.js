const express = require("express");
const engines = require("consolidate");
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));

var publicDir = require("path").join(__dirname, "/public");
app.use(express.static(publicDir));

var MongoClient = require("mongodb").MongoClient;
var url =
    "mongodb+srv://vuduc15:Vuduc2302@cluster0.okqna.mongodb.net/test";

// npm i handlebars consolidate --save
app.engine("hbs", engines.handlebars);
app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/insert", (req, res) => {
    res.render("insert");
});

app.post("/doInsert", async (req, res) => {
    let inputName = req.body.txtName;
    let inputType = req.body.txtType;
    let inputPrice = req.body.txtPrice;
    let newProduct = {
        name: inputName,
        type: inputType,
        price: inputPrice,
    };

    let client = await MongoClient.connect(url);
    let dbo = client.db("Storeman");
    await dbo.collection("Product").insertOne(newProduct);
    // res.redirect('/student');
    res.redirect('/');
});

//localhost:3000
app.get('/', async function (req, res) {
    let client = await MongoClient.connect(url);
    let dbo = client.db("Storeman");
    let result = await dbo.collection("Product").find({}).toArray();
    res.render('index', {
        model: result
    });
})

app.get('/remove', async (req, res) => {
    let id = req.query.id;
    let ObjectID = require('mongodb').ObjectID;
    let client = await MongoClient.connect(url);
    let dbo = client.db("Storeman");
    await dbo.collection("Product").deleteOne({
        _id: ObjectID(id)
    });
    res.redirect('/');
})

app.get('/research', async (req, res) => {
    let inputName = req.query.txtName;
    let client = await MongoClient.connect(url);
    let dbo = client.db("Storeman");
    let result = await dbo.collection("Product").find({
        name: inputName
    }).toArray();
    res.render('index', {
        model: result
    });
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running in 3000 port");
});