var express = require('express');
var router = express.Router();

// Models
const Movie = require('../models/Movie');

router.post('/', function (req, res, next) {

    const {title, country, imdb_score, year, category} = req.body;

        const movie = new Movie({
            title: title,
            country: country,
            imdb_score: imdb_score,
            year: year,
            category: category
        });
    /*
        movie.save((err, data) => {
            if (err) res.json(err);

            res.json(data);
        });
    */
        const promise = movie.save();
        promise.then((data) => {
          res.json({status : 1});
        }).catch((error) => {
          res.json(error);
        })
});

module.exports = router;
