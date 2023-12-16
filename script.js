var weatherInfoObj={};
window.addEventListener('load',()=>{
    var apiKey='KSkNYk7zl5K3LVCoUf93zQj7tUdFmV4X';
    var lat,long;
    var country,timeZone,locationName,locationKey,currentLocation;
    navigator.geolocation.getCurrentPosition((position)=>{
        lat =position['coords']['latitude'];
        long=position['coords']['longitude'];
        console.log(lat +" "+ long);
        var geopositionUrl=`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${long}`;
        
        console.log(geopositionUrl);

     axios.get(geopositionUrl)
     .then((response) => {
       // console.log(response);
 /* 
        country=response.data.Country.EnglishName;
        locationKey=response.data.Key;
        locationName=response.data.LocalizedName;
        timeZone=response.data.TimeZone;

        console.log('Country',country);
        console.log('location key',locationKey);
        console.log('timeZone',timeZone);
        console.log('locatonName',locationName);  */

        weatherInfoObj['country']=response.data.Country.EnglishName;
        weatherInfoObj['locationKey']=response.data.Key;
        weatherInfoObj['timeZone']=response.data.TimeZone;
        weatherInfoObj['currentLocation']=response.data.LocalizedName;
        console.log('aaa',weatherInfoObj);

        getweatherData(apiKey,weatherInfoObj.locationKey);

        
     })
   
    })
})
function getweatherData(apiKey,LocationKey){
        var weatherUrl=`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${LocationKey}?apikey=${apiKey}`;
        axios.get(weatherUrl).then((response)=>{
            console.log(response);
            weatherInfoObj['today']=response.data.DailyForecasts[0].Date;
            weatherInfoObj['day']=response.data.DailyForecasts[0].Day;
            weatherInfoObj['night']=response.data.DailyForecasts[0].Night;
            weatherInfoObj['temperature']=response.data.DailyForecasts[0].Temperature;

            var today =new Date(weatherInfoObj['today']);
            var iconUrl=`https://developer.accuweather.com/sites/default/files/01-s.png` ;
            console.log('weatherInfoObject',today);

                returnId('country').textContent= weatherInfoObj['country'];
                returnId('currentLocation').textContent=  weatherInfoObj['currentLocation'];
                returnId('date').textContent=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
                if(weatherInfoObj.day.Icon<10){
                    returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherInfoObj.day.Icon}-s.png`)
                }else{
                    returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherInfoObj.day.Icon}-s.png`)

                }
                if(weatherInfoObj.night.Icon<10){
                    returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherInfoObj.night.Icon}-s.png`)
                }else{
                    returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherInfoObj.night.Icon}-s.png`)

                }

    })

}
function returnId(id){
return document.getElementById(id);
}