// create BEFORE map object
var center = [38.895, 2.020];
var zoom = 2;
var before = L.map('before', {
        attributionControl: false,
        inertia: false,
        minZoom: 1
    }).setView(center, zoom);

// create AFTER map object
var after = L.map('after', {
        inertia: false,
        minZoom: 1
    }).setView(center, zoom);

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        // id: "mapbox.streets-basic",
        id: "mapbox.light",
        accessToken: API_KEY
      }).addTo(after);

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        // id: "mapbox.streets-basic",
        id: "mapbox.light",
        accessToken: API_KEY
      }).addTo(before);

// Configure a parseTime function which will return a new Date object from a string
var timeParse = d3.timeParse("%m/%d/%y");
// Format time so it is easy to filter
var timeFormat = d3.timeFormat("%Y-%m-%d")

dataCsv = "data/2020_combined2.csv"

d3.csv(dataCsv, function(data) {
    console.log(data);

    // parse through time
    data.forEach(function(d) {
        d.Date = timeParse(d.Date);
        d.Date = timeFormat(d.Date)
    });

    // filter for jan dates
    dec = data.filter(function(d){ return d.Date > "2020-01-01" && d.Date < "2020-01-26"})
    // dec = data.filter(function(d){ return d.Date == "2019-10-03"})
    console.log(dec.length)  

    // filter for april dates
    april = data.filter(function(d){ return d.Date > "2020-04-05"})
    // april = data.filter(function(d){ return d.Date == "2020-05-01"})
    console.log(april.length)    
    
    // get location data for dec dates and store in heatArray
    var heatArrayDec = [];
    for (var i = 0; i < dec.length; i++) {
        var location = [dec[i].Lat, dec[i].Long, dec[i].median]

        if (location) {
            heatArrayDec.push(location)
        };
    };
    console.log(heatArrayDec);

    // get location data for april dates and store in heatArray
    var heatArrayApril = [];
    for (var i = 0; i < april.length; i++) {
        var location = [april[i].Lat, april[i].Long, april[i].median]

        if (location) {
            heatArrayApril.push(location)
        };
    };
    console.log(heatArrayApril);

    // heat layer for dec
    var heat = L.heatLayer(heatArrayDec, {
        // radius: 20,
        radius: 18,
        blur: 25
        }).addTo(before);
    
    // heat layer for April
    var heat = L.heatLayer(heatArrayApril, {
        // radius: 20,
        radius: 18,
        blur: 25
        }).addTo(after);
});

L.marker([38.895, -77.060]).addTo(before);

$('#map').beforeAfter(before, after);