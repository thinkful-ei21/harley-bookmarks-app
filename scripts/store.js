'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){

  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const toggleDetailed = function(id) {
    const item = findById(id);
    item.detailed = !item.detailed;
  };

  const setErrorMessage = function(message) {
    this.errorMessage = message;
  };

  const setMinimumRating = function(rating) {
    this.minimumRating = rating;
  };

  return {
    items: [],
    minimumRating: 1,
    errorMessage: '',
    addItem,
    findById,
    findAndDelete,
    setErrorMessage,
    setMinimumRating,
    toggleDetailed,
  };
}());