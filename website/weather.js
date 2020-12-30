console.log("Starting Weather API");
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

const apiKey ='424da8262fe2c0a1438e98a1e6a28341';
const error = " ";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
// button event lisner function
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {

const  zipcode = document.getElementById('zip').value;
if(zipcode.length<5 || zipcode.length>5)
{
alert("Enter a Correct ZipCode inside US ")
return;

}
const feelings = document.getElementById('feelings').value;
/// starting the action get,post,update ////////
getdata(baseURL, zipcode, apiKey)
    //post data
    .then((data) => postData('/add', { temp: data.main.temp, date: newDate, content: feelings }))
    // calling function uqdate ui
    .then(function(newdata){updateUI()})
}/// end action
/////////////////////////////////////////////////////////////////////////
    const getdata= async(baseURL, zipcode, apikey)=> {
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
        //console.log(baseURL + zipcode + ',us&appid=' + apikey);
        const response = await fetch(baseURL + zipcode + ',us&appid=' + apikey+ '&units=metric');
        const data = await response.json();
        console.log(response);
       // document.getElementById('temp').value=data.main.temp;
        try {
            console.log("get data in line34 : " + data);
            return data;
            
        } catch (error) {
            console.log('Error', error);
        }
    }
////////////////////////////////////////////////////////////////////////////
    const postData = async(url, data = {})=> {
        const postRequest = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        try {
            const newdata = await postRequest.json();
            console.log("PostRequeted line 53 " + newdata);
            return newdata;
        } catch (error) {
            console.log('Error56', error);
        }
    }
///////////////////////////////////////////////////////////////////////////////////


    //function to add data in gui ////////////////////////////////////////////////////////
const updateUI = async() => {

    const request = await fetch('/all');
    try {
        const allData = await request.json()
            // update new entry values
         document.getElementById('date').innerHTML = allData.date;
         document.getElementById('temp').innerHTML = allData.temp;
         document.getElementById('content').innerHTML = allData.content;
         document.getElementById('myTextarea').innerHTML = allData.content;
    } catch (error) {
        console.log("error74 is :" + error);
    }

}

