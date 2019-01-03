//const User = require('../../users/models');
const Diary = require('../models/diary.model');
const errors = require('njs/lib/errors');

async function writePage(dateTime, title, content){
    const diary = new Diary();
    diary.dateTime = dateTime;
    diary.title = title;
    diary.content = content;
    const result = await diary.save();

    return result;
}

async function readPage(pageId){
    const diary = new Diary();
    const result = await Diary.find(pageId);

    return result;
}

async function editPage(pageId,data){
    const diary = new Diary();
    const result = await Diary.findOneAndUpdate(pageId , data);
    console.log(result);
    if(!result){
        throw new errors.NotAllowed({message:'Something went wrong'});
    }

    return result;
}

async function readAll(){
    const diary = new Diary();
    const result = await Diary.find();

    return result;
}


module.exports = {
    writePage,
    readPage,
    editPage,
    readAll
}