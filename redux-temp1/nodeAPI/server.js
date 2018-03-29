let express = require('express');
let app = express();

let mongoose = require('mongoose');
let url = "mongodb://localhost:27017/newWork";

let bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    next();
});

// File Uploading Method
let expUpload=require('express-fileupload');
app.use(expUpload());
app.use(express.static(__dirname+'/'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/')
});

let depts = mongoose.Schema({
    name: {
        type: String,
        default:''
    },
    email: {
        type: String,
        default:''
    },
    hobby: {
        type: String,
        default:''
    },
    city: {
        type: String,
        default:''
    },
    fileName: {
        type: String,
        default:''
    },
    flag: {
        type: String,
        default:false
    }
});

let citys = mongoose.Schema({
    citys: {
        type: String,
    }
});

let dept = mongoose.model('dept', depts);

let city = mongoose.model('city', citys);

//for department
app.post('/insert', (req, res) => {
    console.log(req.body)

    console.log("File Name :- ",req.files.fileName);
    let sampleFile=req.files.fileName;
    sampleFile.mv(__dirname+'/upload/'+sampleFile.name);
    let newProject=new dept({
        name:req.body.name,
        email:req.body.email,
        hobby:req.body.hobby,
        city:req.body.city,
        fileName:sampleFile.name,
    });
    // let newdept = new dept(req.body);
    newProject.save().then((data) => {
        console.log("1 Record Inserted...");
        }).catch((err) => {
            res.send(err);
        });
});

app.get('/display', (req, res) => {
    dept.find({ flag:'false'}).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

app.post('/insert/city', (req, res) => {
    let newcity = new city(req.body);
    newcity.save().then((data) => {
        console.log("1 Record Inserted...");
        res.send();
    }).catch((err) => {
        res.send(err);
    });
});

app.get('/display/city', (req, res) => {
    city.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

// app.delete('/delete/:id',(req,res) => {
//     let id = req.params.id;
//     dept.findOneAndRemove({_id:id}).then((result) => {
//         res.send();
//         console.log("1 deleted record...");
//     }, (err) => {
//         console.log(err);
//     });
// });

app.post('/delete', (req, res) => {
    let id = req.body.info;
    let myquery = {_id: id};
    dept.findById(myquery).then((data) => {
        data.flag = true;
        data.save().then((data) => {
            console.log("1 Record Delete...");
            res.send(data);
        }).catch((err) => {
            res.send(err)
        });
    }).catch((err) => {
        res.send(err)
    });
});

app.post('/update', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let hobby = req.body.hobby;
    let city = req.body.city;
    let myquery = {_id: id};
    let newquery = {$set: {name: name,email:email,hobby:hobby,city:city}};
    dept.findOneAndUpdate(myquery, newquery).then((result) => {
        res.send("1 updated record...");
    }, (err) => {
        console.log(err);
    });
});

app.listen(8080, () => {
    console.log("server start on port 8080");
    mongoose.connect(url);
    console.log("Database connected");
});