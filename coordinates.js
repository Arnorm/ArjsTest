const log = console.log;

    window.onload = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          var displayed_Logs = document.getElementById('logs');
          const distanceMessage = document.querySelector('[gps-entity-place]').getAttribute('distanceMsg');
          displayed_Logs.innerHTML = `longitude:${position.coords.longitude}; latitude:${position.coords.latitude} and ${distanceMessage}`;
        });
      }
    };