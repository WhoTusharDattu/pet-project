const CountryData = require('country-data');

const allLanguages = CountryData.languages.all;
const languages = allLanguages.filter(l => l.alpha2).map(l => l.alpha2);

const multiLingualField = {};
languages.forEach((language) => {
    multiLingualField[language] = { type: 'String', trim: true };
});

module.exports = { languages, multiLingualField };
