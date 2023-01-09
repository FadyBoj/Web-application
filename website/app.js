// Personal API Key for OpenWeatherMap API
const apiKey = '2335ad3d71aefb553189c2046dd43863&units=imperial';

const generate = document.getElementById('generate');


generate.addEventListener('click',()=>{

let zipCode = document.getElementById('zip').value;
let feels = document.getElementById('feelings').value;

    getLatLon(apiKey,zipCode)
    .then((data)=>{

        if(data.hasOwnProperty('status')){
            alert("Invalid zip Code! , please try again.")
            console.log("status : " + data.status);
        return 0;
        }
        else
        getWeather(data.lat,data.lon,apiKey)
        .then((data)=>{

            postWeather(data,feels);
            retrieveData();
        })
    })
})


//getting the latitude and the longitude

 const getLatLon = async (apiKey,zipCode)=>{
    const request = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${apiKey}`)
    try {

        const Data = await request.json();

        if(Data.hasOwnProperty('cod'))
        {
            return data = {status : "Not Found !"};
        }
        else{
            data  = {lat : Data.lat , lon : Data.lon};
            console.log(data);
            return data;
        }

    } catch (error) {
        console.log("error")
    }
 }

//getting the weather information based on the longitude and the latitude

 const getWeather = async (lat,lon,apiKey)=>{

    const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);

    try {
        const data = await request.json();
        console.log(data);
        return data;

    } catch (error) {
        console.log("error");

    }
 }

//sent via the API from the client side and save it in the projectData variable
 const postWeather = async (data,feels)=>{

    let allData = {temp: data.main.temp, date: data.dt, feel : feels}
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(allData)
    }

    const newData = await fetch('/postData',options)
    const response = await newData.json();
    console.log(response);

    try {

        
    } catch (error) {
        console.log("error");
        console.error(error);
    }
 }


 const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = "<b>Temp</b> : " + Math.round(allData.temp)+ ' °';
    document.getElementById('content').innerHTML = "<b>I feel</b> " + allData.feel;
    document.getElementById("date").innerHTML = "<b>Date</b> : " + allData.date;
    }   
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}