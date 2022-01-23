const myMap = L.map('map').fitWorld();

const fourSquareClientId = 'HDG2IF0HLSCVRE3BW4DOWEZHTUJQVJ3NU0C0ZOX1QHRICBWZ';
const fourSquareClientSecret = '0OFNB23STAFTGISFKJULTSQFA5HJJ1IK3LQ1IYJDA3J1IUUY';
const fourSquareApiKey = 'fsq3OWQWtt35LdRkIlpq9RuKqhguYiI6kmkDGor2r5faYqs=';

// location fetched successfully
async function onCurrentPositionFound(position) {    
    let latitudeValueNumber = position.coords.latitude;
    let longitudeValueNumber = position.coords.longitude;
    let accuracyValueNumber = position.coords.accuracy;

    myMap.setView([latitudeValueNumber, longitudeValueNumber],15);
    
    await L.marker([latitudeValueNumber, longitudeValueNumber]).addTo(myMap)
        .bindPopup("You are within " + accuracyValueNumber + " meters from this point").openPopup();

    L.circle([latitudeValueNumber, longitudeValueNumber], accuracyValueNumber).addTo(myMap);

    messageUser(latitudeValueNumber,longitudeValueNumber,"Welcome!");        
}

// location fetching failed
async function onCurrentPositionFailure(error) {
	console.log("Error Code: " + error.code);
	console.log("Error Message: " + error.message);
    messageUser(0,0,"We could not find you sorry :(");
}

async function messageUser(latitudeValueNumber,longitudeValueNumber,userLocationMessage)
{
    let latitudeValue = document.getElementById("latitudeValue");    
    let longitudeValue = document.getElementById("longitudeValue");
    let userLocationLabel = document.getElementById("userLocationLabel");
    latitudeValue.textContent = latitudeValueNumber;
    longitudeValue.textContent = longitudeValueNumber;
    userLocationLabel.textContent = userLocationMessage;
}

async function getUserLocation()
{    
    if(window != undefined && window.navigator != undefined && window.navigator.geolocation != undefined)
    {
        if(window.navigator.geolocation)
        {        
            window.navigator.geolocation.getCurrentPosition(onCurrentPositionFound,onCurrentPositionFailure);        
        }
    }       
}

async function main()
{
    await getUserLocation()
    
    // Add OpenStreetMap tiles:
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
    }).addTo(myMap);

    document.getElementById("findLocations").addEventListener("click",async () => {
        let businessTypes = document.getElementById("businessTypes");
        let businessSelected = businessTypes.options[businessTypes.selectedIndex].value;
        console.log(businessSelected);

        console.log('FETCH PLACE SEARCH')

        let latitudeValueText = document.getElementById("latitudeValue").innerText;    
        let longitudeValueText = document.getElementById("longitudeValue").innerText;
        
        let options = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'fsq3OWQWtt35LdRkIlpq9RuKqhguYiI6kmkDGor2r5faYqs='
            }
          };


        let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${businessSelected}&limit=5&ll=${latitudeValueText},${longitudeValueText}`,options);
        let jsonObj = await response.json();

        let result = jsonObj.results;
        
        for(let r = 0;r < result.length;r++)
        {
            if(result[r] != undefined 
                && result[r].geocodes != undefined 
                && result[r].geocodes.main != undefined 
                && result[r].name != undefined)
            {
                let latitude = result[r].geocodes.main.latitude;
                let longitude = result[r].geocodes.main.longitude;
                let name = result[r].name;

                // // Create and add a geolocation marker:
                let marker = L.marker([latitude, longitude]);
                marker.addTo(myMap).bindPopup(`<p1><b>${name}</b></p1>`).openPopup();      
                
            }            
        }        
    });
}

main();

