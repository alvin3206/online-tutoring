const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const auth = require('../middlewares/auth');
const cats = ["user", "tutor"];

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
recordRoutes.use(express.json());
recordRoutes.use(express.urlencoded({ extended: false }));
recordRoutes.use(auth);

// This will help us connect to the database
const dbo = require("../db/conn");
const { ConnectionPoolMonitoringEvent } = require("mongodb");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
// recordRoutes.route("/tutors").get(function (req, res) {
//     let db_connect = dbo.getDb().db("tutors");
//     db_connect
//         .collection("records")
//         .find({})
//         .toArray(function (err, result) {
//             if (err) throw err;
//             res.json(result);
//         });
// });

recordRoutes.route("/tutors/new").post(function (req, res) {
    let db_connect = dbo.getDb().db("tutors");
    // let newTutor = {
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    // };
    let newTutor = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        cred_id: req.body.cred_id,
        certificate: [],
        rating: null,
        city: "",
        country: "",
        about: "",
        hours: 0.0,
        complete: false

    };

    db_connect.collection("records").insertOne(newTutor, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/users/new").post(function (req, res) {
    let db_connect = dbo.getDb().db("users");
    // let newTutor = {
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    // };
    let newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        cred_id: req.body.cred_id,
        favoraties: [],
        hours: 0.0

    };

    db_connect.collection("records").insertOne(newUser, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// recordRoutes.route("/tutors/:id").get(function (req, res) {
//     let db_connect = dbo.getDb().db("tutors");
//     let query = { _id: ObjectId(req.params.id) };
//     db_connect
//         .collection("records")
//         .findOne(query, function (err, result) {
//             if (err) throw err;
//             res.json(result);
//         });
// });

recordRoutes.route("/tutors/:id").put(function (req, res) {
    let db_connect = dbo.getDb().db("tutors");
    let query = { _id: ObjectId(req.params.id) };
    let updateTutor = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        certificate: req.body.certificate.trim().split(/\s+/),
        city: req.body.city,
        country: req.body.country,
        about: req.body.about,
    }
    db_connect
        .collection("records")
        .updateOne(query, {
            $set: updateTutor
        }, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/tutors/:id").delete(function (req, res) {
    let db_connect = dbo.getDb().db("tutors");
    let query = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("records")
        .deleteOne(query, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/appointments").get(function (req, res) {
    let db_connect = dbo.getDb().db("appointments");
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });;
});

// recordRoutes.route("/appointments/tutor/:id").get(function (req, res) {
//     let db_connect = dbo.getDb().db("appointments");
//     let query = { tutor_id: req.params.id };
//     db_connect
//         .collection("records")
//         .find(query)
//         .toArray(function (err, result) {
//             if (err) throw err;
//             res.json(result);
//         });;
// });

// recordRoutes.route("/appointments/:id").get(function (req, res) {
//     let db_connect = dbo.getDb().db("appointments");
//     let query = { _id: ObjectId(req.params.id) };
//     db_connect
//         .collection("records")
//         .findOne(query, function (err, result) {
//             if (err) throw err;
//             res.json(result);
//         });
// });

recordRoutes.route("/infos").post(function (req, res) {
    let db_connect = dbo.getDb().db(req.body.cat + "s");
    let query = { cred_id: req.body.cred_id };
    db_connect
        .collection("records")
        .findOne(query, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/appointments/new").post(function (req, res) {
    let db_connect = dbo.getDb().db("appointments");
    const start = new Date(req.body.start);
    const end = new Date(req.body.end);
    console.log(end - start);
    let newAppointment = {
        tutor_id: req.body.tutor_id,
        user_id: req.body.user_id,
        start: start,
        end: end,
        duration: (end - start) / (1000 * 3600),
        finished: false,
        rating: null
    };
    console.log(newAppointment);
    db_connect.collection("records").insertOne(newAppointment, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/appointments/:id").delete(function (req, res) {
    let db_connect = dbo.getDb().db("appointments");
    let query = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("records")
        .deleteOne(query, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/appointments/:cat").post(function (req, res) {
    let db_connect = dbo.getDb().db("creds");
    // let db_connect = dbo.getDb().db("appointments");
    let query = { _id: ObjectId(req.body.cred_id) };
    db_connect
        .collection("records")
        .findOne(query, function (err, result) {
            if (err) throw err;
            console.log(result);
            let db_1 = req.params.cat + "s";
            let db_connect_1 = dbo.getDb().db(db_1);
            let query_1 = { cred_id: result._id.toString() };
            db_connect_1
                .collection("records")
                .findOne(query_1, function (err_1, result_1) {
                    if (err_1) throw err_1;
                    // console.log(result_1);
                    let db_connect_2 = dbo.getDb().db("appointments");
                    let query_2 = {};
                    let key = req.params.cat + "_id";
                    query_2[key] = result_1._id.toString();
                    // console.log(query_2);
                    db_connect_2
                        .collection("records")
                        .find(query_2)
                        .toArray(function (err_2, result_2) {
                            if (err_2) throw err_2;
                            res.json(result_2);
                        });;
                });;

        });;
});

// recordRoutes.route("/register/:cat").post(function (req, res) {
//     const cat = req.params.cat;
//     if (cats.indexOf(cat) === -1) {
//         res.send("Not permitted");
//     }
//     let db_connect = dbo.getDb().db("creds");
//     let { username, email, password } = req.body;
//     if (!(username && email && password)) {
//         res.send("All fields are required");
//     } else {
//         password = bcrypt.hashSync(req.body.password, 8);
//         db_connect
//             .collection("records")
//             .findOne({ email: email }, function (err, result) {
//                 if (err) throw err;
//                 if (result) {
//                     res.send("User already exists. Please login!")
//                 } else {
//                     let newUser = {
//                         username: username,
//                         email: email,
//                         password: password,
//                         cat: cat
//                     }
//                     db_connect
//                         .collection("records")
//                         .insert(newUser, function (err, result) {
//                             if (err) throw err;
//                             var token = jwt.sign({ user_id: result._id, email }, 'secretkey');

//                             if (token) {
//                                 result.token = token;
//                             }
//                             res.json(result);
//                         });
//                 }
//             });
//     }
// });

// recordRoutes.route("/login").post(function (req, res, next) {
//     let db_connect = dbo.getDb().db("creds");
//     const { email, password } = req.body;
//     if (!(email && password)) {
//         res.send("All fields are required");
//     } else {
//         db_connect
//             .collection("records")
//             .findOne({ email: email }, function (err, result) {
//                 if (err) throw err;
//                 if (result == null) {
//                     res.send("User doesn't exist!")
//                 } else {
//                     const passwordIsValid = bcrypt.compareSync(
//                         password,
//                         result.password
//                       );
//                     if (passwordIsValid) {
//                         var token = jwt.sign({ user_id: result._id, email }, 'secretkey');
//                         result.token = token;
//                         res.json(result);
//                     }
//                     else {
//                         res.send("User email or password is incorrect!");
//                     }
//                 }
//             });
//         }
// });


// // This section will help you get a single record by id
// recordRoutes.route("/record/:id").get(function (req, res) {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     db_connect
//         .collection("records")
//         .findOne(myquery, function (err, result) {
//             if (err) throw err;
//             res.json(result);
//         });
// });

// // This section will help you create a new record.
// recordRoutes.route("/record/add").post(function (req, response) {
//     let db_connect = dbo.getDb();
//     let myobj = {
//         name: req.body.name,
//         position: req.body.position,
//         level: req.body.level,
//     };
//     db_connect.collection("records").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         response.json(res);
//     });
// });

// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     let newvalues = {
//         $set: {
//             name: req.body.name,
//             position: req.body.position,
//             level: req.body.level,
//         },
//     };
// });

// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//     let db_connect = dbo.getDb();
//     let myquery = { _id: ObjectId(req.params.id) };
//     db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//         if (err) throw err;
//         console.log("1 document deleted");
//         response.json(obj);
//     });
// });

module.exports = recordRoutes;