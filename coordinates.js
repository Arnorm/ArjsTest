// DOES NOT WORK FOR NOW BUT LETS KEEP IT //

/* 
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;
  
    console.log('Votre position actuelle est :');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    console.log(`La précision est de ${crd.accuracy} mètres.`);
  }
  
  function error(err) {
    console.log("Ici on a un pb ...");
    console.warn(`ERREUR (${err.code}): ${err.message}`);
  }
  */

  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  
  console.log("The coordinates script :");  
  console.log(lat,long);