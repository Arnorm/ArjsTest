const log = console.log;

    window.onload = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          var displayed_Logs = document.getElementById('logs');
          var ar_Iframe = document.getElementById('arFrame');
          const distance_Message = ar_Iframe.contentWindow.document.querySelector('[gps-entity-place]').getAttribute('distanceMsg');
          displayed_Logs.innerHTML = `longitude:${position.coords.longitude}; 
          latitude:${position.coords.latitude};
          altitude:${position.coords.altitude};
          and ${distance_Message}`;
        });
      }
    };