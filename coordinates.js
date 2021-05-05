const log = console.log;

    window.onload = () => {
      if (navigator.geolocation) {

        
        navigator.geolocation.watchPosition(function (position) {

          // Managing logging on the left of the screen
          var displayed_Logs = document.getElementById('logs');
          var ar_Iframe = document.getElementById('arFrame');
          const distance_Message = ar_Iframe.contentWindow.document.querySelector('[gps-entity-place]').getAttribute('distanceMsg');
          displayed_Logs.innerHTML = `longitude:${position.coords.longitude}; 
          latitude:${position.coords.latitude};
          and ${distance_Message} away from you`;

          // Managing form pre-filling with gps coordinates
          var lat = document.getElementById('lat');
          var long = document.getElementById('long');
          lat.value=position.coords.latitude;
          long.value=position.coords.longitude;
        });

        
      }
    };