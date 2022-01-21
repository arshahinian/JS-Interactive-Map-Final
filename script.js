const myMap = L.map('map').fitWorld();

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

    document.getElementById("findLocations").addEventListener("click",() => {
        let businessTypes = document.getElementById("businessTypes");
        console.log( businessTypes.options[businessTypes.selectedIndex].value);
    })

    // // Create and add a geolocation marker:
    // const marker = L.marker([48.87007, 2.346453])
    // marker.addTo(myMap).bindPopup('<p1><b>The Hoxton, Paris</b></p1>').openPopup()

    // // Draw the 2nd Arrondissement
    // var polygon = L.polygon([
    //     [48.863368120198004, 2.3509079846928516],
    //     [48.86933262048345, 2.3542531602919805],
    //     [48.87199261164275, 2.3400569901592183],
    //     [48.86993336274516, 2.3280142476578813], 
    //     [48.86834104280146, 2.330308418109664]
    // ]).addTo(myMap);


    // // create red pin marker
    // var myIcon = L.icon({
    //     iconUrl: './assets/RedArrow.png',
    //     iconSize: [40, 20],
    //     iconAnchor: [40, 20],
    //     popupAnchor: [-40, -20],
    //     shadowUrl: './assets/BlueArrow.png',
    //     shadowSize: [20, 20],
    //     shadowAnchor: [20, 20]    
    // });

    // // Metro station markers:
    // const rS = L.marker([48.866200610611926, 2.352236247419453],{icon: myIcon}).bindPopup('Réaumur-Sébastopol')
    // const sSD = L.marker([48.869531786321566, 2.3528590208055196],{icon: myIcon}).bindPopup('Strasbourg-Saint-Denis')
    // const sentier = L.marker([48.8673721067762, 2.347107922912739],{icon: myIcon}).bindPopup('Sentier')
    // const bourse = L.marker([48.86868503971672, 2.3412285142058167],{icon: myIcon}).bindPopup('Bourse')
    // const qS = L.marker([48.869560129483226, 2.3358638645569543],{icon: myIcon}).bindPopup('Quatre Septembre')
    // const gB = L.marker([48.871282159004856, 2.3434818588892714],{icon: myIcon}).bindPopup('Grands Boulevards')

    // const stations = L.layerGroup([rS, sSD, sentier, bourse, qS, gB]).addTo(myMap)


}

main();

