/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKEY = 'f0156ea6e56e2f423b1d3e5f51860674';
let countryCode = 'us';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+(d.getMonth()+1)+'.'+ d.getFullYear();

//Listen to the press of the button
document.getElementById('generate').addEventListener('click', performAction);

//What to do when button is pressed
function performAction(e){

    // Reading out the content
    const newZIP =  document.getElementById('zip').value;
    const content =  document.getElementById('feelings').value;
    countryCode = document.getElementById('country-select').value;

    //Fetch the API Data from Openweather
    getApiWeather(baseURL,newZIP,apiKEY)
    //return the object in JSON and continue to work with it
    //by sending the relevant data + content to the server
    .then(function(weatherData){
        // Combine Data and get it to the server on the '/add' route
        postData('/add', {date:newDate, city: weatherData.name, temp: weatherData.main.temp, content})
        // Update the index.html with the combined data received from the Server
        updateUI();
    })
}

//Function to get the requested information from the OpenWeatherMap API and convert it into JSON
const getApiWeather = async (baseURL,newZIP,apiKEY) => {

    console.log(`Generated URL: ${baseURL}${newZIP},${countryCode}&units=metric&appid=${apiKEY}`)
    const result = await fetch(`${baseURL}${newZIP},${countryCode}&units=metric&appid=${apiKEY}`)
    try {
        const weather = await result.json();
        console.log('weather from API:  ');
        console.log(weather);
        return weather;
    }   catch(error) {
        console.log("error", error);
    }
}

//POST to server
const postData = async ( url = '', weatherData = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(weatherData), 
    });
  
    try {
        const newWeatherData = await response.json();
        return newWeatherData;
        } catch(error) {
            console.log("error", error);
        }
  }

//Update the information on the index.html in the area 'entryholder'
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const serverData = await request.json();
        console.log('Data from Server to update UI with');
        console.log(serverData);
        document.getElementById('date').innerHTML = serverData.date;
        document.getElementById('city').innerHTML = serverData.city;
        document.getElementById('temp').innerHTML = (serverData.temp+'°C');
        document.getElementById('content').innerHTML = serverData.content;
    } catch(error){
        console.log('error', error);
    }
}