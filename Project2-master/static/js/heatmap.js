var myMap = L.map("map", {
    center: [39.8283, -94.5795],
    zoom: 4.2
    });
    
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
    }).addTo(myMap);
    function datashwoing(artist){       
        d3.json(`/songs/${artist}`).then(function(artistdata) {
              console.log(artistdata);
            //   var data = d3.select("#artist");
            
            //data=d3.select('#artist');
            //data.html("")
              var heatArray = [];
    
              for (var i = 0; i < artistdata.length; i++) {
            //   var location = artistdata[i].location;
              
            //   if (location) {
              heatArray.push([artistdata[i].LAT, artistdata[i].LON,5000.0]);
              
              }
              myMap.eachLayer(function (layer) {
                if(layer instanceof L.HeatLayer)
                {
                    myMap.removeLayer(layer);
                }
            });
              var heat = L.heatLayer(heatArray, {
              radius: 10,
            //   blur: 35
              }).addTo(myMap);
              
              });
               
        }
// var artist="Kiss"
    function init() {
        console.log("init")
        // Grab a reference to the dropdown select element
        var selector = d3.select("#artist");
        d3.json('/artistnames').then(function(artist) {

            artist.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
            });
            const firstSample = artist[0];
            datashwoing(firstSample);

        }); }
    function optionChanged(firstSample) {
            console.log("newSample")
            // Fetch new data each time a new sample is selected
            datashwoing(firstSample)
           
           }
    init();  
    
    