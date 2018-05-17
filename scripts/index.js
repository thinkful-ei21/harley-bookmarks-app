'use strict';
/* global bookmarkList, store, Item*/

$(document).ready(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  const bookmarkItem = Item.create('best site ever', 'http://www.google.com', 'Google Search Engine', 5);
  store.addItem(bookmarkItem);
  bookmarkList.render();

//   api.getItems((items) => {
//     items.forEach((item) => store.addItem(item));
//     bookmarkList.render();
//   });
});