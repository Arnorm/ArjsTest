const log = console.log;
  window.onload = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        // Managing logging on the left of the screen
        geolocation.change({lat: 48.87387635804005, lng: 2.295006040964578});
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

// From https://github.com/2gis/mock-geolocation
// MIT license
// Script that allows geolocation mocking for testing

(function(window, navigator) {
  var exports = {},
      counterId = 0,
      successData = {
          accuracy: 50,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          latitude: 54.9799,
          longitude: 82.89683699999999,
          speed: null
      },
      errorData = {
          code: 1,
          message: 'The acquisition of the geolocation information failed because the page didn\'t have the permission to do it.'
      };

  var getCurrentPositionArguments = {},
      watchPositionArguments = {},
      _navigatorGeolocation;

  var changeGeolocation = function(object) {
      if (Object.defineProperty) {
          Object.defineProperty(navigator, 'geolocation', {
              get: function() {
                  return object;
              },
              configurable: true
          });
      } else if (navigator.__defineGetter__) {
          navigator.__defineGetter__('geolocation', function() {
              return object;
          });
      } else {
          throw new Error('Cannot change navigator.geolocation method');
      }
  };

  exports.use = function() {
      _navigatorGeolocation = navigator.geolocation;

      changeGeolocation({
          getCurrentPosition: function(success, error, opt) {
              counterId++;
              getCurrentPositionArguments[counterId] = arguments;
          },
          watchPosition: function(success, error, opt) {
              counterId++;
              getCurrentPositionArguments[counterId] = arguments;
              watchPositionArguments[counterId] = arguments;
              return counterId;
          },
          clearWatch: function(i) {
              if (watchPositionArguments[i]) {
                  delete watchPositionArguments[i];

                  if (getCurrentPositionArguments[i]) {
                      delete getCurrentPositionArguments[i];
                  }
              }
          }
      });

      return this;
  };

  exports.restore = function() {
      if (_navigatorGeolocation) {
          changeGeolocation(_navigatorGeolocation);
      } else {
          delete navigator.geolocation;
      }

      getCurrentPositionArguments = {};
      watchPositionArguments = {};

      return this;
  };

  function changeSuccessData(options) {
      // copy available parameter to successData
      for (var i in successData) {
          if (options.hasOwnProperty(i)) {
              successData[i] = options[i];
          }
      }

      // lat and lng are available parameters too
      if (options.lat !== undefined) {
          successData.latitude = options.lat;
      }
      if (options.lng !== undefined) {
          successData.longitude = options.lng;
      }
  }

  function getRequestData(options) {
      options = options || {};

      var data = {
          coords: {}
      };

      for (var i in successData) {
          data.coords[i] = successData[i];
      }

      if (options.timestamp !== undefined) {
          data.timestamp = options.timestamp;
      } else {
          data.timestamp = Date.now();
      }

      return data;
  }

  function getErrorData(options) {
      options = options || {};

      var data = {};

      if (options.code !== undefined) {
          data.code = options.code;
      } else {
          data.code = errorData.code;
      }

      if (options.message !== undefined) {
          data.message = options.message;
      } else {
          data.message = errorData.message;
      }

      return data;
  }

  exports.send = function(options) {
      if (options) {
          changeSuccessData(options);
      }

      for (var i in getCurrentPositionArguments) {
          if (typeof getCurrentPositionArguments[i][0] === 'function') {
              getCurrentPositionArguments[i][0](getRequestData(options));
          }
      }

      getCurrentPositionArguments = {};

      return this;
  };

  exports.sendError = function(options) {
      for (var i in getCurrentPositionArguments) {
          if (typeof getCurrentPositionArguments[i][1] === 'function') {
              getCurrentPositionArguments[i][1](getErrorData(options));
          }
      }

      getCurrentPositionArguments = {};

      return this;
  };

  exports.change = function(options) {
      if (options) {
          changeSuccessData(options);
      }

      for (var i in watchPositionArguments) {
          if (typeof watchPositionArguments[i][0] === 'function') {
              watchPositionArguments[i][0](getRequestData(options));
          }

          if (getCurrentPositionArguments[i]) {
              delete getCurrentPositionArguments[i];
          }
      }

      return this;
  };

  exports.changeError = function(options) {
      for (var i in watchPositionArguments) {
          if (typeof watchPositionArguments[i][1] === 'function') {
              watchPositionArguments[i][1](getErrorData(options));
          }

          if (getCurrentPositionArguments[i]) {
              delete getCurrentPositionArguments[i];
          }
      }

      return this;
  };

  function expose() {
      var _geolocation = window.geolocation;

      exports.noConflict = function() {
          if (_geolocation !== undefined) {
              window.geolocation = _geolocation;
          } else {
              delete window.geolocation;
          }

          return exports;
      };

      window.geolocation = exports;
  }

  // define for Node module pattern loaders, including Browserify
  if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = exports;

  // define as an AMD module
  } else if (typeof define === 'function' && define.amd) {
      define(exports);

  // define as a global variable, saving the original to restore later if needed
  } else if (typeof window !== 'undefined') {
      expose();
  }
})(window, navigator);