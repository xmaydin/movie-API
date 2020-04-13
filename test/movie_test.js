const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');
chai.use(chaiHttp);

let token, movieId;

describe('Chechout api/movie ..', () => {

    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'test', password: '123123'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('Checkout GET Movies ', () => {
        it('it should get all movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('Checkout POST Movies', () => {
        it('It should post a movie', (done) => {
            let  movie= {
                title: 'test',
                director_id: '5e93904f12305040ec75f365',
                category: 'Fantastiko',
                year: '2011',
                country: 'Chaina',
                imdb_score: 9.2
            };

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.property('title');
                    res.body.should.be.property('director_id');
                    res.body.should.be.property('category');
                    res.body.should.be.property('year');
                    res.body.should.be.property('country');
                    res.body.should.be.property('imdb_score');
                    movieId = res.body._id;
                    done();
                })
        });
    });

    describe('Checkout Movie Detail...',() => {
        it('It should get a movie detail',(done) => {
            chai.request(server)
                .get('/api/movies/'+ movieId)
                .set('x-access-token', token)
                .end((error, res) => {
                    
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.be.property('title');
                    res.body.should.be.property('director_id');
                    res.body.should.be.property('category');
                    res.body.should.be.property('year');
                    res.body.should.be.property('country');
                    res.body.should.be.property('imdb_score');
                    res.body.should.be.property('_id').eql(movieId);
                    done();
                })
        });
    });
});

