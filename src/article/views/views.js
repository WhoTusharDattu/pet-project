var jwtDecode = require('jwt-decode');
const operations = require('../operations/operations');

/**
 *This function will read theme and background image
 * @param {object} ctx - the context object of koa
 */

    async function storedata(ctx) {
    var token = ctx.query;
    var decoded = jwtDecode(token.token);
    var myquery = decoded.user;
    //console.log('**************************'+myquery+'************************');
  
    const data = ctx.request.fields;
    var name = data.name;
    var context= data.context;

    //console.log('**************************'+name+'************************');
    const result = await operations.storedata(myquery, name, context);

    ctx.successJson(result);
    }
 async function read(ctx) {

    console.log('XXXxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    const token = ctx.query;
   
    var decoded = jwtDecode(token.token);

    const result = await operations.read(decoded);
    ctx.successJson(result);
}

async function edit(ctx){
    var token = ctx.query;
    var decoded = jwtDecode(token.token);
    //var myquery = decoded.user;
    const id = ctx.query.id;
    var myquery = id;
    console.log('XXXxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'+myquery+'XXXxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    

    var data = ctx.request.fields;
    var context= data.context;

    const result = await operations.edit(myquery, context);
    ctx.successJson(result);


}

module.exports = {
    read, 
    storedata,
    edit
}
