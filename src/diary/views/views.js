var jwtDecode = require('jwt-decode');
const operations = require('../operations/operations');

/**
 *This function will read theme and background image
 * @param {object} ctx - the context object of koa
 */

    async function writePage(ctx) {
        var token = ctx.query;
        //var decoded = jwtDecode(token.token);
        //var myquery = decoded.user;
        //console.log('**************************'+myquery+'************************');
  
        const data = ctx.request.fields;
        var dateTime = data.dateTime;
        var title = data.title;
        var content = data.content;
        //console.log('**************************'+name+'************************');
        const result = await operations.writePage(dateTime, title, content);

        ctx.successJson(result);
    }

    async function readPage(ctx){
        const data = ctx.request.fields;
        var pageId = ctx.query;
        const result = await operations.readPage(pageId);
        ctx.successJson(result);
    }

    async function editPage(ctx){
        const data = ctx.request.fields;
        var pageId = ctx.query;
        const result = await operations.editPage(pageId,data);
        ctx.successJson(result); 
    }   

    async function readAll(ctx){
        const result = await operations.readAll();
        ctx.successJson(result);
    }

    module.exports = {
        writePage,
        readPage,
        editPage,
        readAll
    };