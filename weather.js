document.getElementById("heading").innerHTML="Weather App";
document.getElementById("heading").style.color="blue";
var localStorageElement=JSON.parse(localStorage.getItem("city"));
window.addEventListener("keydown",keyPress);
// displayStorage();

var api="eb1410c509e95be5b479d840e24fab78";
function displayStorage()
{
    if(localStorageElement!=null)
    {
        $("#prevSearch").html("Previous Searches");
        $("#lslist").empty();
          localStorageElement.forEach(function(city) {
           $("#lslist").append("<li>" + city + "</li>");
       });
    }
}

function emptyResults()
{
    $("#results").empty();
}

function printResults(data)
{
    var cityname="<tr><td>City Name</td><td>"+data.name+"</td></tr>";
    var temp = "<tr><td>Temperature</td><td>"+(data.main.temp-273).toFixed(2)+"&#176;C</td></tr>";
    var wind="<tr><td>Wind Speed</td><td>"+data.wind.speed+"m/s</td></tr>";
    var pressure="<tr><td>Pressure</td><td>"+data.main.pressure+"hPa</td></tr>";
    $("#results").append(cityname);
    $("#results").append(temp);
    $("#results").append(wind);
    $("#results").append(pressure);

    
}

function findweather()
{
    var cityname=document.getElementById("city").value;
    $.get
    (
        "http://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+api,
        function()
        {
        console.log("Success");
        }
    )
    .done
    (
        function(data)
        {
        console.log(data);
        emptyResults();
        printResults(data);
        if(localStorageElement==null)
        {
            localStorageElement=[];
        }
        if(!localStorageElement.includes(cityname))
        {
            if(localStorageElement.length>=5)
            {
                localStorageElement.pop();
            }
            localStorageElement.unshift(cityname);
            localStorage.setItem("city",JSON.stringify(localStorageElement)); 
        }
        displayStorage();
        }
    )
    .fail
    (
        function()
        {
        console.log("invalid City");
        }
    );
}
function findMyWeather()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            var lat=position.coords.latitude;
            var lon=position.coords.longitude;
            $.get
            (
                "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api,function(data)
                {
                    console.log(data);
                    emptyResults();
                    printResults(data);
                }
            );
            
        });
    }
}
    function keyPress(event)
    {
        if(event.keyCode==13) //key code of enter is 13.
        {
            findweather();
        }
    }

