const log = console.log;
    window.onload = () => {
      let scene = document.querySelector('a-scene'); /* Apply to whole scene */

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let gps = document.createAttribute('gps-entity-place'),
            arjs = document.createAttribute('arjs'),
            welcome = document.getElementById('welcome');

          arjs.value = 'sourceType: webcam; sourceWidth: 1280; sourceHeight: 960; trackingMethod: best; debugUIEnabled: false;';
          gps.value = `latitude: ${position.coords.latitude - 0.001}; longitude: ${position.coords.longitude + 0.001}`;
          log(gps.value);
          scene.setAttributeNode(gps); /* Apply to whole scene */
          scene.setAttributeNode(arjs);
        });
      }

    };