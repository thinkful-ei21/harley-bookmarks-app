'use strict';
/* global cuid */

// eslint-disable-next-line no-unused-vars
const Item = (function(){

  const validateUrl = function(url) {
    return (url.length < 5 || url.slice(0,4) !== 'http');
  };

  const validateFields = function(title, url) {
    if (!title) throw new TypeError('Bookmark Title is a required field');
    else if (validateUrl(url)) throw new TypeError('Url must be at least 5 characters and start with `http`');
  };

  return {
    validateFields,
  };

}());