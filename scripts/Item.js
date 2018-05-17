'use strict';
/* global cuid */

// eslint-disable-next-line no-unused-vars
const Item = (function(){

  const validateFields = function(title, url) {
    if (!title || !url) throw new TypeError('Title and url are required fields');
  };

  const create = function(title, url, desc='', rating=1) {
    return {
      id: cuid(),
      title,
      url,
      desc,
      rating,
      detailed: false,
    };
  };

  return {
    validateFields,
    create,
  };

}());