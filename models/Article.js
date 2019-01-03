let mongoose = require('mongoose')

let Schema = mongoose.Schema

let ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true,
        unique: true
    },
    URL: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
})

let Article = mongoose.model('Article', ArticleSchema)

module.exports = Article