const errors = require('njs/lib/errors');
const jwt = require('jsonwebtoken');
const { randomString } = require('../../../utils/randomization');
const bcrypt = require('bcrypt');

const User = require('../../users/models');
const Otp = require('../models/otp');
const deviceOperations = require('./devices');

const config = require('../../../config/base');

async function externalSignIn(data) {
    let user;
    let result;
    const { method } = data;
    const socialIdField = `socialIds.${method}`;

    try {
        const strategy = require(`./../strategies/${method}`);
        result = await strategy(data);
    } catch (e) {
        throw new errors.NotAllowed(e.message);
    }

    try {
        const condition = {};
        condition[socialIdField] = result.socialIds[method];
        user = await User.findOne(condition);
        if (!user) {
            user = await User.create(result);
        }
    } catch (e) {
        if (!(e instanceof errors.NotFound)) {
            throw e;
        }
    }

    return [user];
}

async function classicSignIn(email, password) {
    const user = await User.findOne({ email });
    if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            return user;
        }
        throw new errors.InvalidData('Email or password is wrong!');
    }
    // @ashish should it be "Username or password is wrong!" due to securlity reasons and making it mroe partial
    throw new errors.NotFound('User does not exists!');
}
async function classicSignUp(name, password, email){

    //console.log(name+''+ password );
    const user = new User();
        user.name = name;
        user.password = password;
        user.email = email;
    const result = await user.save();
    if(!result){
        console.log('err');
    }
    console.log('*******');
    // console.log(result);
    return result;
    

}

async function edit(decoded, email){
    
    var myquery = { _id: decoded.user };
    console.log('XXXXXXXXX'+myquery+'XXXXXXXXXXXXXXXXXXXXXXXXXX')
    var newvalues = {$set: { email: email}};
    const result = await User.updateOne(myquery, newvalues);
    console.log(result);

    return result;
}

async function remove(name){
    
    var query = { name: name};
    //console.log('------------------------------------------------------------------');
    //console.log(query);
    var mysort = { name: name};
    const result = await User.deleteMany(mysort);

    //console.log(result);
    return result;


          

}

async function mobileSignin(data) {
    const otp = new Otp();
    otp.otp = randomString.generate({
        length: 6,
        charset: 'numeric',
    });
    otp.mobile = data.mobile;
    otp.expiresIn = new Date(Date.now() + config.otp.expiresInMinutes * 60000);
    const getUser = await User.findOne({ phones: otp.mobile });
    if (!getUser) {
        const user = new User();
        user.phones = data.mobile;
        await user.save();
    }
    await otp.save();
    return {
        message: 'OTP sent to your mobile no.',
    };
}

async function mobileSigninOtp(data) {
    const { mobile, otp } = data;
    const result = await Otp.findOneAndRemove({ mobile, otp });
    if (!result) {
        throw new errors.InvalidData('Wrong OTP!');
    }
    if (result.expiresIn < Date.now()) {
        throw new errors.InvalidData('OTP Expired!');
    }
    return User.findOne({ phones: mobile });
}

async function signature(user, request) {
    //const key = await deviceOperations.devices(request, user);
    return jwt.sign({ user: user._id, name:user.name }, 'shubham');
}

async function signIn(data, request) {
    let user;
    user = await classicSignIn(data.email, data.password);

    const token = await signature(user, request);
    const authToken = {
        token,
    };
    return [user, authToken];
}

async function signUp(data){
    const result = await classicSignUp(data.name, data.password, data.email);

}

module.exports = {
    remove,
    edit,
    signUp,
    signIn,
    mobileSignin,
};
