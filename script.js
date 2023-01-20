function callback(data, status)
{
  console.log(status);
  $(".pacsin").remove();
  $("#title").append("<td class='pacsin'>"+data.city.name+ ", "+data.city.country+"</td>");
  for(var i = 8; i<=31; i+=8)
    {
      var day = data.list[i].dt_txt;
      day = day.split(" ")[0];

      var temp = 0;
      var pressure = 0;
      var cloud = 0;
      var temps = [];
      for(var j = 0; j<= 7; j++)
        {
          temps.push(data.list[i+j].clouds.all);
          cloud += data.list[i+j].clouds.all;
          if (data.list[i+j].main.temp_max > temp)
          {
            temp = data.list[i+j].main.temp_max;
          }
          if (data.list[i+j].main.pressure > pressure)
          {
            pressure = data.list[i+j].main.pressure;
          }
        }
        cloud = cloud*1.0/8;
      
      $("#day").append("<td class='pacsin'><div><p>date: "+day+"</p><p>high temp: "+temp+"°F</p><p>cloud cover: "+cloud+"%</p><p>pressure: "+pressure+" atm</p></div></td>")
    }
}

function buttonHandler()
{
  var location = $("#location").val();
  if (location == "")
    alert("enter a location");
  var type = $('input[name="type"]:checked').val();
  var url;
  
  if (type == "city name")
  {
    url = "https://api.openweathermap.org/data/2.5/forecast?q="+location+"&units=imperial&appid=636db482db536c2e63020f0789968ff0";
  }
  else if (type == "zip code")
  {
    url = "https://api.openweathermap.org/data/2.5/forecast?zip="+location+"&units=imperial&appid=636db482db536c2e63020f0789968ff0";
  }
  else if (type == "coordinate")
  {
    var coor = location.split('_');
    url = "https://api.openweathermap.org/data/2.5/forecast?lat="+coor[0]+"&lon="+coor[1]+"&units=imperial&appid=636db482db536c2e63020f0789968ff0";
  }
  else
  {
    alert("select a valid input");
  }

  $.get(url, callback).fail(function(err, status) {
    alert(status + ": url couldn't be found")
  });
}

$("#submit").on("click", buttonHandler);