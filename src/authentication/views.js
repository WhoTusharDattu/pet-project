const operations = require('./operations/operations');
const devices = require('./operations/devices');
const config = require('../../config');
const jwtDecode = require('jwt-decode');

const allowSession = config.sessions && config.sessions.enabled;
const key = config.authentication.tokenKey;
const sessionKey = allowSession ? key : '';

async function logIn(ctx) {
    const data = ctx.request.fields;
    const { request } = ctx;
    const result = await operations.signIn(data, request);

    // create session
    if (allowSession) {
        ctx.session = {};

        //  store token in session
        ctx.session[sessionKey] = result.token;
    }

    ctx.successJson(result);
}

async function signUp(ctx){
    const data = ctx.request.fields;
    const result = await operations.signUp(data);
    
    ctx.successJson(result);
}

async function edit(ctx){
    //console.log(ctx.query);
    const token = ctx.query;
    console.log('*********************4444444444***********************');
    console.log(token);
    console.log('*********************4444444444***********************');
    var decoded = jwtDecode(token.token);
    //var decoded1 = jwtDecode(token._id);
    console.log(decoded);
    //console.log(decoded1);
    console.log('*********************4444444444***********************');
    
    
    const data = ctx.request.fields;
    const result = await operations.edit(decoded, data.email);

    ctx.successJson(result);
    

}

async function remove(ctx){
    const data = ctx.request.fields;
    console.log('*********************4444444444***********************');
    //console.log(data);
    const result = await operations.remove(data.name);
    ctx.successJson(result);

}
async function mobileSignin(ctx) {
    const data = ctx.request.fields;
    const result = await operations.mobileSignin(data);

    ctx.successJson(result);
}

async function getUserDevices(ctx) {
    const { user } = ctx.request;
    const result = await devices.getUserDevices(user);

    ctx.successJson(result);
}

module.exports = {
    remove,
    edit,
    signUp,
    logIn,
    mobileSignin,
    getUserDevices,
};
