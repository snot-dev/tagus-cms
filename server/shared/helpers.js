const S = require('string');

const convertToAlias = name => {
    return S(name).slugify().camelize().s;
};

const convertToUrl = name => {
    return S(name).slugify().s;
}

const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
};

module.exports  = {
    convertToAlias,
    convertToUrl,
    generateRandomPassword
};