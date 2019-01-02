const mongoose = require('mongoose');

const {Schema } = mongoose;

const ArticleSchema = new Schema({
    name: {
        type: String,
       // required: 'name is required'
    },
    context: {
        type: String,
        
    },
    user:{
        type: String
    }
},
    {
        timestamps:{
            createdAt: 'created',
            updatedAt: 'modified',
        },
});
const Article = mongoose.model('Article',ArticleSchema);

module.exports = Article;