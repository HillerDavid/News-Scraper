let mongoose = require('mongoose')

let Schema = mongoose.Schema

let NoteSchema = new Schema ({
    message: {
        type: String,
        required: true
    }
})

let Note = mongoose.model('Note', NoteSchema)

module.exports = Note