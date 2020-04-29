/* Global Variables */
const button = document.getElementById('generate');
const zip = document.getElementById('zip')
const temp = document.getElementById('temp')
const date = document.getElementById('date')
const feelings = document.getElementById('feelings')
const content = document.getElementById('content')

// Create a new date instance dynamically with JS
let d = new Date();
let clientDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const units = ',us&units=metric'
const apiKey = '&appid=86dc5e84c65832ca59f668da65dcd09f'

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

button.addEventListener('click', () => {
    console.log('clicked')
    getWeather(baseURL, zip.value, apiKey)
        .then(temp => {
            return { date: clientDate, temp: temp, content: feelings.value }
        })
        .then(data => {
            postData('/add', data)
                // Resetting variables after data is sent.
            clientDate = ""
            temp.value = ""
            feelings.value = ""

            return data
        })
        .then(({ temp, date, content }) =>
            updateUI())
        .catch(error => {
            console.log('error', error)
        })
});

/* Function to GET Web API Data*/
const getWeather = async(baseURL, zip, apiKey) => {
    const URL = baseURL + zip + units + apiKey
    console.log(URL)
    const request = await fetch(URL)

    try {
        const result = await request.json();

        const {
            main: { temp },
        } = result
        return temp
    } catch (error) {
        console.log("error", error);

    }
};

/* Function to POST data */
const postData = async(path, data) => {
    try {
        await fetch(path, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    } catch (error) {
        console.log("error", error);
    }
};

/* 
// Getting data from website

const updateUI = async(temperature, newDate, feelings) => {
    date.innerText = newDate;
    temp.innerText = `${temperature} deg`;
    content.innerText = feelings;

};
*/

// Getting data from server

const updateUI = async() => {
    const response = await fetch('/api/projectdata');
    try {
        const data = await response.json();
        console.log(data)
        date.innerText = data.date;
        temp.innerText = data.temp;
        content.innerText = data.content;
    } catch (error) {
        console.log('error', error);
    }
};