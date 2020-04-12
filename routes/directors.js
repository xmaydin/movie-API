var express = require('express');
var router = express.Router();

// Models
const Director = require('../models/Director');

/*********** Tüm Yönetmenleri Listeleme **************/
router.get('/', function (req, res, next) {

    const Promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localfield: '_id',
                foreignfield: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies'
            }
        }
    ]);

    Promise.then((data) => {
        res.json(data)
    }).catch((error) => {
        res.json(error);
    })
});

/*********** Yönetmen Detayı Listeleme **************/
router.get('/:director_id', (req, res, next) => {

    const Promise = Director.findById({_id: req.params.director_id});

    Promise.then((data) => {
        if (!data) {
            next({message: "The Director Was Not Found !!", code: 911})
        } else {
            res.json(data);
        }
    }).catch((error) => {
        res.json(error);
    })
});

/*********** Yönetmen Detayı Listeleme **************/
router.get('/:director_id', (req, res, next) => {

    const director_id = req.params.director_id;
    const Promise = Director.findByIdAndUpdate(
        director_id,
        req.body,
        {
            new: true
        }
    );

    Promise.then((data) => {
        if (!data) {
            next({message: "The Director Was Not Found !!", code: 911});
        } else {
            res.json(data);
        }
    }).catch((error) => {
        res.json(error);
    })

});


/*********** Yönetmen Ekleme **************/
router.post('/', function (req, res, next) {

    const director = new Director(req.body);

    console.log(director);
    const Promise = director.save(req.params);

    Promise
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json(error);
        })
});

/*********** Yönetmen Silme **************/
router.delete('/:director_id', (req, res, next) => {

    const Promise = Director.findByIdAndRemove(req.params.director_id);

    Promise.then((data) => {
        if (!data) {
            next({message: "The Director Was Not Found", code: 911});
        } else {
            res.send(`"${req.body.name}" The Director Deleting..`);
        }
    }).catch((error) => {
        res.json(error)
    })
});
module.exports = router;

