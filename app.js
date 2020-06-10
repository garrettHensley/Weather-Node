const weather = require("./weather");

const location = process.argv.slice(2);

location.forEach(weather.get);
