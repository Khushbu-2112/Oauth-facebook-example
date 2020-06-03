require('dotenv').config();

module.exports = {

    'facebookAuth': {
        'clientId': process.env.CLIENT_ID ,
        'clientSecret': process.env.CLIENT_SECRET,
        'callBackUrl': process.env.CALLBACK_URL
    }
};