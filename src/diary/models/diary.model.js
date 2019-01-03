const mongoose = require('mongoose');

const {Schema } = mongoose;

const DiarySchema = new Schema({
    dateTime: {
        type: Date,
     
    },
    title:{
        type: String,
     
    },
    content: {
        type: String,
     
    }
},
    {
        timestamps:{
            createdAt: 'created',
            updatedAt: 'modified',
        }
});
const Diary = mongoose.model('Diary',DiarySchema);

module.exports = Diary;