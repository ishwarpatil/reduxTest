const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser());

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "finalproject"
});


con.connect(function (err) {
    if (err) throw err;

    //passprotjs
    passport.serializeUser((user, done) => {
        done(null, user)
    });
    passport.deserializeUser((user, done) => {
        done(null, user)
    });
    //Need to pass body value like username:'',password:''
    passport.use(new LocalStrategy((username, password, done) => {
        let sql = "select * from signup where email='"+ username +"' and password='"+ password +"'";
        con.query(sql,function(err, rows) {
            if (err)
                return done(err);
            if (!rows[0]) {
                return done(null, false, {message: 'Wrong user'});
            }
            return done(null,rows);
        });
    }));
    app.post('/api/login', passport.authenticate('local', {
        successRedirect: '/ok',
        failureRedirect: '/no'
    }));
    app.get('/ok', (req, res) => {
        res.send({'msg':'success'});
    });
    app.get('/no', (req, res) => {
        res.send({'msg':'fail'});
    });

    app.post('/api/addUser', (req, res) => {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;
        let sql = "INSERT INTO signup (firstName,lastName,email,password) VALUES ('" + firstName + "','" + lastName + "','" + email + "','" + password + "')";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send("1 Record Inserted");
        });
    });

    // app.post('/api/login', (req, res) => {
    //     let email = req.body.email;
    //     let password = req.body.password;
    //     let sql = "select * from users where email='"+ email +"' and password='"+ password +"'";
    //     con.query(sql, (err, result) => {
    //         if (err) throw err;
    //         if(result[0]!==undefined){
    //             res.send({'msg':'success'});
    //         }
    //         else{
    //             res.send({'msg':'fail'});
    //         }
    //     });
    // });

    app.get('/api/state', (req, res) => {
        let sql = "select * from state";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    app.get('/api/city', (req, res) => {
        let sid = req.body.sid;
        let sql = "select * from city where sid="+sid;
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });


    //student
    app.post('/api/student', (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let city = req.body.city;
        let sql = "INSERT INTO student (name,email,city) VALUES ('" + name + "','" + email + "','" + city + "')";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send("1 Record Inserted");
        });
    });

    // app.get('/api/student', (req, res) => {
    //     let sql = "select * from student where display='' ";
    //     con.query(sql, (err, result, fields) => {
    //         if (err) throw err;
    //         res.send(result);
    //     });
    // });
    //
    // app.delete('/api/student/:id', (req, res) => {
    //     let id = req.params.id;
    //     let sql = "update student,marks set student.display='no',marks.display='no' where student.id = " + id;
    //     con.query(sql, (err, result) => {
    //         if (err) throw err;
    //         res.send("1 Record Delete");
    //     });
    // });
    //
    // app.put('/api/student/:id', (req, res) => {
    //     let id = req.params.id;
    //     let name = req.body.name;
    //     let email = req.body.email;
    //     let city = req.body.city;
    //     let sql = "update student set name='" + name + "',email='"+ email +"',city='" + city + "' where id = " + id;
    //     con.query(sql, (err, result) => {
    //         if (err) throw err;
    //         res.send("1 Record Updated");
    //     });
    // });

});

app.listen(8010,()=>{
    console.log("8010 Sever Is Connected...");
});