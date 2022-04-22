const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
recordRoutes.use(express.json());
recordRoutes.use(express.urlencoded({ extended: false }));

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/tutors").get(function (req, res) {
    let db_connect = dbo.getDb().db("tutors");
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/tutors/new").post(function (req, res) {
    let db_connect = dbo.getDb().db("tutors");
    let newTutor = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        certificate: req.body.certificate.trim().split(/\s+/),
        rating: 0.0,
        city: req.body.city,
        country: req.body.country,
        about: req.body.about,

    };

    db_connect.collection("records").insertOne(newTutor, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/tutors/:id").get(function (req, res) {
    let db_connect = dbo.getDb().db("tutors");
    let query = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("records")
        .findOne(query, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

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

recordRoutes.route("/appointments/tutor/:id").get(function (req, res) {
    let db_connect = dbo.getDb().db("appointments");
    let query = { tutor_id: req.params.id };
    db_connect
        .collection("records")
        .find(query)
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });;
});

recordRoutes.route("/appointments/:id").get(function (req, res) {
    let db_connect = dbo.getDb().db("appointments");
    let query = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("records")
        .findOne(query, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/appointments/new").post(function (req, res) {
    let db_connect = dbo.getDb().db("appointments");
    const start = (Date.parse(req.body.start));
    const end = (Date.parse(req.body.end));
    console.log(end - start);
    let newAppointment = {
        tutor_id: req.body.tutor_id,
        user_id: req.body.user_id,
        start: req.body.start,
        end: req.body.end,
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