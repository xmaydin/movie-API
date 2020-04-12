var express = require('express');
var router = express.Router();

// Models
const Movie = require('../models/Movie');
const Director = require('../models/Director');


/*********** Tüm Filmleri Listeleme **************/
router.get('/', function (req, res, next) {
    const Promise = Movie.aggregate([
        {
            $lookup: {
                from: 'directors',
                localField: 'director_id',
                foreignField: '_id',
                as: 'director'
            }
        }
    ]);


    Promise
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json(error);
        })
});

/*********** Top10 Filmleri Listeleme **************/
router.get('/top10', function (req, res, next) {

    const Promise = Movie.find({}).limit(10).sort({imdb_score: -1});

    Promise
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json(error);
        })
});

/*********** Film Detaylarını Getirme **************/
router.get('/:movie_id', function (req, res, next) {

    const movie_id = req.params.movie_id;
    const Promise = Movie.findById({_id: movie_id});
    Promise.then((movie) => {
        if (!movie) {
            next({message: 'The Movie Was Not Found', code: 911})
        }
        res.json(movie);
    }).catch((error) => {
        res.json(error);
    });

});

/*********** Film Ekleme **************/
router.post('/', function (req, res, next) {

    const movie = new Movie(req.body);

    const promise = movie.save();
    promise.then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json(error);
    })
});

/*********** Film Güncelleme **************/
router.put('/:movie_id', (req, res, next) => {

    const movie_id = req.params.movie_id;
    const Promise = Movie.findByIdAndUpdate(
        movie_id,
        req.body,
        {
            new: true
        }
    );
    Promise.then((movie) => {
        if (!movie) {
            next({message: 'The Movie Was Not Found !!', code: 911})
        }
        res.json(movie);
    }).catch((error) => {
        res.json(error);
    });

});

/*********** Film Detaylarını Getirme **************/
router.delete('/:movie_id', function (req, res, next) {

    const movie_id = req.params.movie_id;
    const Promise = Movie.findByIdAndRemove({_id: movie_id});
    Promise.then((movie) => {
        if (!movie) {
            next({message: 'The Movie Was Not Found', code: 911})
        } else {
            res.json(movie);
        }
    }).catch((error) => {
        res.json(error);
    });

});

/*********** 2 Yıl Arasındaki Filmleri Listeleme **************/
router.get('/between/:start_year/:end_year', function (req, res, next) {

    const {start_year, end_year} = req.params;
    const Promise = Movie.find({
        year: {"$gte": parseInt(start_year), "$lte": parseInt(end_year)}
    });
    Promise
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json(error);
        })
});

module.exports = router;

