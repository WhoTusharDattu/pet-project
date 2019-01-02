//const User = require('../../users/models');
const Article = require('../models/article.model');
const errors = require('njs/lib/errors');

async function storedata(myquery, name, context){
    const article = new Article();
    article.user = myquery;
    article.name = name;
    article.context = context;
    const result = await article.save();

    return result;
}


 async function read(decoded) {
     console.log('calling');
    var myquery = { user: decoded.user};
    const result = Article.find(myquery);
  return result;
}

async function edit(data, context){
    
    var myquery = { _id: data,  user: '5b935a8d6ad64e0382c8ec2'};
    // console.log('XXXXXXXXX'+myquery+'XXXXXXXXXXXXXXXXXXXXXXXXXX')
    var newdata = {$set: {context: context}};
    const result = await Article.findOneAndUpdate({ _id: data,  user: '5b935a8d6ad64e0382c8ec2'}, newdata);
    console.log(result);
    if(!result){
        throw new errors.NotAllowed({message:'Something went wrong'});
    }

    return result;
}

module.exports = {
    read,
    storedata,
    edit
}

