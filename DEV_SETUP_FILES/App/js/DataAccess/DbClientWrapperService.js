/*-------------------------------------------------------------------------------
 * DbClientWrapperService.js - Written by Ranjeeth PT
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
 * Module: Database client wrapper Service 
 * Description: DB client wrapper service which uses angularpouchdb for accessing pouchdb and then backend database.
 * The client wrapper exposes read, write, create, update, remove and invoke services.
 *
 *------------------------------------------------------------------------------*/
'use strict';

(function (){
	var self = null;//self is used to carry the scope.

	//=============================================================================
	// Class: DbClientWrapperClass
	//    Service to return a db promise based on url.
	//
	//-----------------------------------------------------------------------------

	var DbClientWrapperClass = Class.extend({
		dbUrl:null,//To store URL path.
		dbPromise:null,//To provide DB promise.
		db:null,//pouchdb instance.

		//===========================================================================
		// Section: Public members
		//===========================================================================


		//---------------------------------------------------------------------------
		// Function: init
		//   Used to initialize the defaults
		//
		// Parameters:
		//   pouchDB        - To provide pouchDB instance.
		init:function(pouchDB){
			self = this;
			self.pouchDB = pouchDB;
			self.dbUrl = (config == null) ? window.location.origin : (config.dbUrl === undefined || config.dbUrl == null || config.dbUrl == "") ? window.location.origin : config.dbUrl;
		},

		//---------------------------------------------------------------------------
		// Function: read
		//   Used to read or get data from db.
		// Parameters:
		//   url        - The complete url for the resource.
		// Returns:
		//   A promise which can be used with .then for data or response and .catch for any exception.  
		read:function(url){
			self.dbPromise = self.pouchDB(self.dbUrl+url).get('');
			return self.dbPromise;
		},

		//---------------------------------------------------------------------------
		// Function: write
		//   Used to write or insert the data to db.
		// Parameters:
		//   url        - The complete url for the resource.
		//   data       - The data which need to be inserted.
		// Returns:
		//   A promise which can be used with .then for data or response and .catch for any exception.  
		write:function(url,data){
			self.dbPromise = self.pouchDB(self.dbUrl+url).put(data);
			return self.dbPromise;
		},
		
		writeBulkData : function(url, data){
		  self.dbPromise = self.pouchDB(self.dbUrl+url).bulkDocs(data);
      return self.dbPromise;
		},

		//---------------------------------------------------------------------------
		// Function: create
		//   Used to write or insert the data to db with couchdb generating an auto id.
		// Parameters:
		//   url        - The complete url for the resource.
		//   data       - The data which need to be inserted.
		// Returns:
		//   A promise which can be used with .then for data or response and .catch for any exception.  
		create:function(url,data){
			self.dbPromise = self.pouchDB(self.dbUrl+url).post(data);
			return self.dbPromise;
		},

		//---------------------------------------------------------------------------
		// Function: readById
		//   Used to read the data from db based on the _id provided.
		// Parameters:
		//   url        - The complete url for the resource.
		//   id       	- The _id value.
		// Returns:
		//   A promise which can be used with .then for data or response and .catch for any exception.  
		readById: function(url,id){
			self.dbPromise = self.pouchDB(self.dbUrl+url).get(id);
			return self.dbPromise;
		},


		//---------------------------------------------------------------------------
		// Function: remove
		//   Used to delete the data to db.
		// Parameters:
		//   url        - The complete url for the resource.
		//   docId       - The unique id for which data need to be deleted.
		// Returns:
		//   A promise which can be used with .then for data or response and .catch for any exception.  
		remove:function(url,docId){
			self.db = self.pouchDB(self.dbUrl+url);
			self.dbPromise = self.db.get(docId).then(function(doc) {
				return self.db.remove(doc);
			});
			return self.dbPromise;
		},

		//---------------------------------------------------------------------------
		// Function: readAllDocs
		//   Used to read or get data from backend, which can be db, socket or rest web service.
		//   For DB append /db
		// Parameters:
		//   url        - The complete url for the resource.
		//   limit      - Limit the fetched data
		//   skipOffset - Skip number of doc data
		// Returns:
		//   A promise which can be used with .then for data or response and .catch for any exception 
		// Exception:
		//   If argument not passed or proper url is not send as an argument then exception will be thrown
		readAllDocs:function(url,limit,skipOffset) {
		  self.dbPromise = self.pouchDB(self.dbUrl+url).allDocs(
		          {
		            include_docs : true, 
		            limit : limit, 
		            skip : skipOffset,
		            startkey : "_design",
		            descending : true
		          }
		          ); 
			return self.dbPromise; 	
		},

		//---------------------------------------------------------------------------
    // Function: readAllDocuments
    //   Used to read or get data from backend, which can be db, socket or rest web service.
    //   For DB append /db
    // Parameters:
    //   url        - The complete url for the resource.   
    // Returns:
    //   A promise which can be used with .then for data or response and .catch for any exception 
    // Exception:
    //   If argument not passed or proper url is not send as an argument then exception will be thrown
    readAllDocuments:function(url){     
      self.dbPromise = self.pouchDB(self.dbUrl+url).allDocs({include_docs: true}); 
      return self.dbPromise;  
    },
	
    readBulkDocs:function(url,bulkIds){
    	self.dbPromise = self.pouchDB(self.dbUrl+url).allDocs({keys: bulkIds, include_docs: true}); 
        return self.dbPromise;
    },
		//TODO
		invoke:function(url,data){

		}


	});

	//Injecting angular pouchDB.
	esseApp.service('DbClientWrapperService',['pouchDB',DbClientWrapperClass]);

})();
