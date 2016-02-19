/*-------------------------------------------------------------------------------
 * RestClientWrapperService.js - Written by Ranjeeth PT
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
 * Module: Rest client wrapper Service
 * Description:Rest client wrapper service which uses Restangular for accessing the backend Rest service.
 * The client wrapper exposes read and write services.
 *
 *------------------------------------------------------------------------------*/
'use strict';

(function (){
  var self = null;//self is used to carry the scope.
  
  //=============================================================================
  // Class: RestClientWrapperClass
  //    Service to return a rest promise based on url.
  //
  //-----------------------------------------------------------------------------
  var RestClientWrapperClass = Class.extend({
    
    //===========================================================================
    // Section: Public members
    //===========================================================================
    
    
    //---------------------------------------------------------------------------
    // Function: init
    //   Used to initialize the defaults
    //
    // Parameters:
    //   Restangular        - To provide Restangular instance.
    init:function(Restangular){
      self = this;
      self.Restangular = Restangular;
      self.isIPSet = false;
      if(config != null || config == undefined) {
        if(!(config.restUrl == undefined || config.restUrl == null || config.restUrl == "")) {
          self.isIPSet = true;
        }
      }
      self.restPromise;
    },
    //---------------------------------------------------------------------------
    // Function: read
    //   Used to read or get data from rest resource.
    // Parameters:
    //   url        - The complete url for the resource.
    // Returns:
    //   A promise which can be used with .then for data or response and .catch for any exception.  
    read:function(url){
      self.restPromise = (self.isIPSet) ? self.Restangular.allUrl("home", config.restUrl).one(url).get() : self.Restangular.one(url).get();
      return self.restPromise;
    },
    
    //---------------------------------------------------------------------------
    // Function: write
    //   Used to write data to rest resource.
    // Parameters:
    //   url        - The complete url for the resource.
    //   data       - The data which need to be written.
    // Returns:
    //   A promise which can be used with .then for data or response and .catch for any exception.  
    write:function(url,data){
      self.restPromise = (self.isIPSet) ? self.Restangular.allUrl("home", config.restUrl).one(url).post(data) : self.Restangular.one(url).post(data);
      return self.restPromise;
    },
    //TODO
    invoke:function(url,data){

    }


  });
  
  // Injecting Restangular
  esseApp.service('RestClientWrapperService',['Restangular',RestClientWrapperClass]);

})();
