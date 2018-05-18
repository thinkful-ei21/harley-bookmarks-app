'use strict';
/* global bookmarkList, store, Item, api*/

$(document).ready(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  api.getItems(response => {
    response.forEach(bookmark => store.addItem(bookmark));
    bookmarkList.render();
  });
//   const bookmarkItem = Item.create('best site ever', 'http://www.google.com', 'Google Search Engine', 5);
//   store.addItem(bookmarkItem);
//   bookmarkList.render();

//   api.getItems((items) => {
//     items.forEach((item) => store.addItem(item));
//     bookmarkList.render();
//   });
});