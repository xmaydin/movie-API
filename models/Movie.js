const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({

    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` Alanı Girilmesi Zorunludur..'],
        maxlength: [15 , '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden Küçük Olmalıdır.. '],
        minlength:[4, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden Büyük Olmalıdır.. ']
    },
    category: {
        type: String,
        maxlength: 30,
        minlength: 3
    },
    country: {
        type: String,
        maxlength: 30,
        minlength: 3
    },
    year: Number,
    imdb_score: {
        type: Number,
        max:10,
        min:0
    },
    createdAd: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);