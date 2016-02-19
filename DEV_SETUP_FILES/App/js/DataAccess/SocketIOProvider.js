/*-------------------------------------------------------------------------------
 * SocketIOProvider.js - Written by Ranjeeth PT
 * 
 *                     Proprietary Information of
 *                       Ingersoll-Rand Company
 *
 *                   Copyright 2015 © Ingersoll-Rand
 *                         All Rights Reserved
 *
 * This document is the property of Ingersoll-Rand Company and contains
 * contains proprietary and confidential information of Ingersoll-Rand
 * Company.  Neither this document nor said proprietary information
 * shall be published, reproduced, copied, disclosed, or communicated to
 * any third party, nor be used for any purpose other than that stated
 * in the particular enquiry or order for which it is issued. The
 * reservation of copyright in this document extends from each date
 * appearing thereon and in respect of the subject matter as it appeared
 * at the relevant date.
 *
 *
 * Module: Socket
 * Description: Socket is for connecting, accessing and sending data to server.
 * The library have dependency on socket.io library 
 * 
 *------------------------------------------------------------------------------*/
angular.module('esse-socket.io', []).provider('esseSocket', function EsseSocketProvider() {
  var ioUrl = (config == null) ? '' : (config.socketIOUrl === undefined || config.socketIOUrl == null || config.socketIOUrl == '') ? '' : config.socketIOUrl; //For holding socket url
  var ioConfig = {}; //For holding socket configiguration

  //---------------------------------------------------------------------------
  // Function: setOption
  //   Private function used to set socket related configuration option
  //
  // Parameters: 
  // name : Socket config property
  // value : property value
  // type : property type
  // Exception:
  //   If value type and type doesn't match then throws type error exception 
  function setOption(name, value, type) {
    if (typeof value !== type) {
      throw new TypeError("'"+ name +"' must be of type '"+ type + "'");
    }     
    ioConfig[name] = value;
  }

  //---------------------------------------------------------------------------
  // Function: setResource
  //   Function used to set resource property of socket. value need to be a valid string
  //
  // Parameters: 
  // value : resource value
  // Exception:
  //   If value is not String, typeerror will be thrown 
  this.setResource = function setResource(value) {
    setOption('resource', value, 'string');
  };

  //---------------------------------------------------------------------------
  // Function: setConnectTimeout
  //   Function used to set connect timeout property of socket. Value need to be a valid number
  //
  // Parameters: 
  // value : connect timeout value
  // Exception:
  //   If value is not number, typeerror will be thrown 
  this.setConnectTimeout = function setConnectTimeout(value) {
    setOption('connect timeout', value, 'number');
  };

  //---------------------------------------------------------------------------
  // Function: setTryMultipleTransports
  //   Function used to try multiple transports property of socket. Value need to be a valid boolean
  //
  // Parameters: 
  // value : try multiple transports value
  // Exception:
  //   If value is not boolean, typeerror will be thrown 
  this.setTryMultipleTransports = function setTryMultipleTransports(value) {
    setOption('try multiple transports', value, 'boolean');
  };

  //---------------------------------------------------------------------------
  // Function: setReconnect
  //   Function used to set reconnect property of socket. Value need to be a valid boolean
  //
  // Parameters: 
  // value : reconnect value
  // Exception:
  //   If value is not boolean, typeerror will be thrown
  this.setReconnect = function setReconnect(value) {
    setOption('reconnect', value, 'boolean');
  };

  //---------------------------------------------------------------------------
  // Function: setReconnectionDelay
  //   Function used to set reconnection delay property of socket. Value need to be a valid number
  //
  // Parameters: 
  // value : reconnection delay value
  // Exception:
  //   If value is not number, typeerror will be thrown
  this.setReconnectionDelay = function setReconnectionDelay(value) {
    setOption('reconnection delay', value, 'number');
  };

  //---------------------------------------------------------------------------
  // Function: setReconnectionLimit
  //   Function used to set reconnection limit property of socket. Value need to be a valid number
  //
  // Parameters: 
  // value : reconnection limit value
  // Exception:
  //   If value is not number, typeerror will be thrown
  this.setReconnectionLimit = function setReconnectionLimit(value) {
    setOption('reconnection limit', value, 'number');
  };

  //---------------------------------------------------------------------------
  // Function: setMaxReconnectionAttempts
  //   Function used to set max reconnection attempts property of socket. Value need to be a valid number
  //
  // Parameters: 
  // value : max reconnection attempts value
  // Exception:
  //   If value is not number, typeerror will be thrown
  this.setMaxReconnectionAttempts = function setMaxReconnectionAttempts(value) {
    setOption('max reconnection attempts', value, 'number');
  };

  //---------------------------------------------------------------------------
  // Function: setSyncDisconnectOnUnload
  //   Function used to set sync disconnect on unload property of socket. Value need to be a valid boolean
  //
  // Parameters: 
  // value : sync disconnect on unload value
  // Exception:
  //   If value is not boolean, typeerror will be thrown
  this.setSyncDisconnectOnUnload = function setSyncDisconnectOnUnload(value) {
    setOption('sync disconnect on unload', value, 'boolean');
  };

  //---------------------------------------------------------------------------
  // Function: setAutoConnect
  //   Function used to set auto connect property of socket. Value need to be a valid boolean
  //
  // Parameters: 
  // value : auto connect value
  // Exception:
  //   If value is not boolean, typeerror will be thrown
  this.setAutoConnect = function setAutoConnect(value) {
    setOption('auto connect', value, 'boolean');
  };

  //---------------------------------------------------------------------------
  // Function: setFlashPolicyPort
  //   Function used to flash policy port property of socket. Value need to be a valid number
  //
  // Parameters: 
  // value : flash policy port value
  // Exception:
  //   If value is not number, typeerror will be thrown
  this.setFlashPolicyPort = function setFlashPolicyPort(value) {
    setOption('flash policy port', value, 'number')
  };

  //---------------------------------------------------------------------------
  // Function: setForceNewConnection
  //   Function used to set force new connection property of socket. Value need to be a valid boolean
  //
  // Parameters: 
  // value : force new connection value
  // Exception:
  //   If value is not boolean, typeerror will be thrown
  this.setForceNewConnection = function setForceNewConnection(value) {
    setOption('force new connection', value, 'boolean');
  };

  //---------------------------------------------------------------------------
  // Function: setConnectionUrl
  //   Function used to set URL of socket. Value need to be a valid boolean
  //
  // Parameters: 
  // value : socket url
  // Exception:
  //   If value is not string, typeerror will be thrown
  this.setConnectionUrl = function setConnectionUrl(value){
    if ('string' !== typeof value) {
      throw new TypeError("setConnectionUrl error: value must be of type 'string'");
    }
    ioUrl = (config == null) ? value : (config.socketIOUrl === undefined || config.socketIOUrl == null || config.socketIOUrl == '') ? value : config.socketIOUrl;
  }

  //---------------------------------------------------------------------------
  // Function: esseSocketFactory
  //   Socket Service function which give three options
  //  1. Listen: to listen to a socket.
  //  2. disconnect: for disconnecting a socket.
  //  3. send: for sending data to socket.
  // Parameters: 
  // $rootScope : rootscope
  this.$get = function esseSocketFactory($rootScope) {
    //For connecting socket io is from socket.io library
   var socket = io.connect(ioUrl);   
    return {
      //---------------------------------------------------------------------------
      // Function: listen
      // Calls Socket.io on method. Callback and rootscope apply assures that 
      // the data is from backend is received in angular variable Continuously
      // Parameters: 
      // event : socket event name
      // callback : a callback function to handle the Continuous data flow from server.
      listen : function on(event, callback){
        socket.on(event, function(){
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      //---------------------------------------------------------------------------
      // Function: disconnect
      // Calls Socket.io removeListener method. 
      // Parameters: 
      // event : socket event name
      // callback : a callback function to handle the server response data.
      disconnect: function off(event, callback) {
        if (typeof callback == 'function') {
          socket.removeListener(event, callback);
        } else {
          socket.removeAllListeners(event);
        }
      },
      //---------------------------------------------------------------------------
      // Function: socketClose
      // Calls Socket.io close method. 
      // Parameters: 
      // None
      socketClose: function off() {
        socket.close();
      },
      //---------------------------------------------------------------------------
      // Function: send
      // Calls Socket.io emit method. 
      // Parameters: 
      // event : socket event name
      // data : the data which need to be send to server.
      // callback : a callback function to handle the server response data.
      send: function emit(event, data, callback) {
        if (typeof callback == 'function') {
          socket.emit(event, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        }    
        else{
          socket.emit(event, data);
        }
      },
      
      //---------------------------------------------------------------------------
      // Function: setConnectionUrl
      //   Function used to set URL of socket. Value need to be a valid boolean
      //
      // Parameters: 
      // value : socket url
      // Exception:
      //   If value is not string, typeerror will be thrown
      setConnectionUrl : function setConnectTimeout(value) {
        if ('string' !== typeof value) {
          throw new TypeError("setConnectionUrl error: value must be of type 'string'");
        }        
        ioUrl = (config == null) ? value : (config.socketIOUrl === undefined || config.socketIOUrl == null || config.socketIOUrl == '') ? value : config.socketIOUrl;
        socket =  io.connect(ioUrl);        
      }
    };
  };
});
