const https = require("https");
const apiKey = "01dca2b05ee4bb1b44311bfc21622618";

function printMessage(location, temperature, description) {
  console.log(
    `Today in ${location} it is ${temperature} degrees with ${description}.`
  );
}
function tempConvert(t){
  return Math.floor(t * (9/5) - 459.67)
}

function get(location) {
  try {
    const request = https.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`,
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
                tempConvert(weather.main.temp),
                weather.weather[0].description
              );
            } catch (e) {
              console.log("big sad");
            }
          });
        } else {
          console.log("Entered an invalid City");
          console.log("Example 'node app.js Miami'")
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
