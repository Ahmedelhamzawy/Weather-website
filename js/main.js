const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let d=new Date();
document.getElementById('first-day').innerHTML=days[d.getDay()];
if(d.getDay()==5){
document.getElementById('second-day').innerHTML=days[d.getDay()+1];
document.getElementById('third-day').innerHTML=days[0];
}else if(d.getDay()==6){
document.getElementById('second-day').innerHTML=days[0];
document.getElementById('third-day').innerHTML=days[1];
}else{
document.getElementById('second-day').innerHTML=days[d.getDay()+1];
document.getElementById('second-day').innerHTML=days[d.getDay()+2];
}
document.getElementById('first-date').innerHTML=`${d.getDate()+monthNames[d.getMonth()]}`
function getImageUrl(text){
if(text=='Sunny'){
    return 'images/sunny.png'
}
else if(text=='Light rain'||text=='Moderate rain'){
return 'images/Lightrain.png'
}
else if(text=='Partly cloudy'){
    return 'images/116.png'
}
else if(text=='Overcast'){
    return 'images/overcast.png'
}
else if(text=='Patchy rain possible'){
    return 'images/176.png'
}
else if(text=='Clear'){
    return 'images/113.png'
}
else if(text=='Mist'){
    return 'images/mist.png'
}
else if(text=='Fog'){
    return 'images/fog.png'
}
else if(text=='Heavy rain'){
    return 'images/heavy rain.png'
}
else if(text=='Moderate or heavy snow showers'){
    return 'images/snow.png'
}
else if(text=='Cloudy'){
    return 'images/cloud.png'
}

}
async function search(city){
var apiData=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
if(apiData.ok&&apiData.status!=400){
var obj=await apiData.json();
displayData(obj);
}
}
function displayData(w){
    //first day
    let src=getImageUrl(w.current.condition.text);
    document.getElementById('city').innerHTML=w.location.name;
    document.getElementById('firstDay-weather').innerHTML=`   ${w.current.temp_c}
    <sup>o</sup>
    C
    <img class="ml-5" src="${src}" alt="">`
    document.getElementById('atmosphere').innerHTML=`${w.current.condition.text}`
    //second day
    let src2=getImageUrl(w.forecast.forecastday[1].day.condition.text);
    document.getElementById('weather-img2').innerHTML=`<img src="${src2}" alt="">`
    document.getElementById('max-temp2').innerHTML=`  ${w.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup> C`
    document.getElementById('min-temp2').innerHTML=`${w.forecast.forecastday[1].day.mintemp_c} <sup>o</sup>`
    document.getElementById('atmosphere2').innerHTML=`${w.forecast.forecastday[1].day.condition.text}`
    //third day
    let src3=getImageUrl(w.forecast.forecastday[2].day.condition.text);
    document.getElementById('weather-img3').innerHTML=`<img src="${src3}" alt="">`
    document.getElementById('max-temp3').innerHTML=`  ${w.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup> C`
    document.getElementById('min-temp3').innerHTML=`${w.forecast.forecastday[2].day.mintemp_c} <sup>o</sup>`
    document.getElementById('atmosphere3').innerHTML=`${w.forecast.forecastday[2].day.condition.text}`
}
document.getElementById("search").addEventListener("keyup", function(e){
    search(e.target.value);
}
);
search('alex');

