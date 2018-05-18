'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/harley/bookmarks';
  
  const getItems = function(callback){
    $.getJSON(`${BASE_URL}`, callback);
  };

  const createItem = function(bookmark, callback){
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(bookmark),
      success: callback,
    });
  };

  const deleteItem = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      data: '',
      success: callback,
    });
  };

  return {
    createItem,
    deleteItem,
    getItems,
  };
}());