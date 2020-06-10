const https = require("https");
const apiKey = "01dca2b05ee4bb1b44311bfc21622618";

function printMessage(location, temperature, description) {
  console.log(
    `Today in ${location} it is ${temperature} degrees with ${description}.`
  );
}

function get(location) {
  try {
    const request = https.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=01dca2b05ee4bb1b44311bfc21622618`,
      (response) => {
        if (response.statusCode === 200) {
          let body = "";
          response.on("data", (data) => {
            body += data.toString();
          });

          response.on("end", () => {
            try {
              const weather = JSON.parse(body);
              printMessage(
                weather.name,
                weather.main.temp,
                weather.weather[0].description
              );
            } catch (e) {
              console.log("big sad");
            }
          });
        } else {
          console.log("we had a prolem");
        }
        response.on("error", (error) => {
          console.log("try again");
        });
      }
    );
  } catch (e) {
    console.error(e);
    console.log("sorry!!!!!!");
  }
}

module.exports.get = get;
