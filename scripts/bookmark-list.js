'use strict';
/* global store, Item*/

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function(){

  const handleNewItemSubmit = function() {
    $('#js-bookmark-form').submit(function(event) {
      event.preventDefault();
      const newItemTitle = $('.js-bookmark-title').val();
      const newItemUrl = $('.js-bookmark-url').val();
      const newItemDesc = $('.js-bookmark-desc').val();
      const newItemRating = $('input[name=rating]:checked').val();
      try{
        Item.validateFields(newItemTitle, newItemUrl);
        store.addItem(Item.create(newItemTitle, newItemUrl, newItemDesc, newItemRating));
        store.errorMessage = '';
      } catch(e) {
        store.errorMessage = e.message;
      }
      render();
    });
  };

  const bindEventListeners = function() {
    handleNewItemSubmit();
    // handleMinimumRating();
    // handleDelete();
    // handleDetailed();
  };
  
  const generateItemElement = function(item) {
    let detailed = item.detailed ? 'shown' : 'hidden';
    return `<li class="js-item-element" data-item-id="${item.id}">
    <button class="bookmark-item">${item.title}</button>
    <p class="bookmark-item-rating">
        ${item.rating} out of 5 stars
    </p>
    <p class="${detailed}">
        <a href="${item.url}">Visit Site</a>
    </p>
    <p class="${detailed}">
        ${item.desc}
    </p>
    <div class="bookmark-item-controls">
        <button class="bookmark-item-delete js-item-delete">
        <span class="button-label">delete</span>
        </button>
    </div>
    </li>`;
  };
  
  const generateBookmarkItemsString = function(bookmarkItems) {
    const items = bookmarkItems.map(item => generateItemElement(item));
    return items.join('');
  };

  const render = function() {
    let items = store.items.filter(item => item.rating >= store.minimumRating);
    console.log('render function ran');
    const bookmarkListItemsString = generateBookmarkItemsString(items);
    $('.js-bookmark-list').html(bookmarkListItemsString);
  };
  
  return {
    bindEventListeners,
    render,
  };

}());