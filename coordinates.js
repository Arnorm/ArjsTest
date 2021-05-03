const log = console.log;

    window.onload = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var displayed_Logs = document.getElementById('logs');
          displayed_Logs.innerHTML = `longitude:${position.coords.longitude}; latitude:${position.coords.latitude}`;
        });
      }
    };

    window.onchange = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var displayed_Logs = document.getElementById('logs');
          displayed_Logs.innerHTML = `longitude:${position.coords.longitude}; latitude:${position.coords.latitude}`;
        });
      }
    };