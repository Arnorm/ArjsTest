const log = console.log;

    window.onload = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          var displayed_Logs = document.getElementById('logs');
          displayed_Logs.innerHTML = `longitude:${position.coords.longitude}; latitude:${position.coords.latitude}`;
        });
      }
    };

    window.onchange = () => {
      if (navigator.geolocation) {
        log("Updating position");
        navigator.geolocation.watchPosition(function (position) {
          var displayed_Logs = document.getElementById('logs');
          displayed_Logs.innerHTML = `longitude:${position.coords.longitude}; latitude:${position.coords.latitude}`;
        });
      }
    };