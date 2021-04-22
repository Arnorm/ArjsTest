const log = console.log;
    window.onload = () => {
      let scene = document.querySelector('a-scene'); 
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let gps = document.createAttribute('gps-entity-place'),
            arjs = document.createAttribute('arjs'),
            welcome = document.getElementById('welcome');
          arjs.value = 'sourceType: webcam; sourceWidth: 1280; sourceHeight: 960; trackingMethod: best; debugUIEnabled: false;';
          gps.value = `latitude: ${position.coords.latitude - 0.001}; longitude: ${position.coords.longitude + 0.001}`;
          log(gps.value);
          scene.setAttributeNode(gps); 
          scene.setAttributeNode(arjs);
          let box = document.createElement('a-box');
          box.setAttribute('gps-entity-place', `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude}`);
          box.setAttribute('scale', '20 20 20');
          box.setAttribute('color', 'red')
          scene.appendChild(box);
        });
      }
    };