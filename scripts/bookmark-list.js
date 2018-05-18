'use strict';
/* global store, Item, api*/

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
        api.createItem({
          title: newItemTitle,
          url: newItemUrl,
          desc: newItemDesc,
          rating: newItemRating,
        }, newBookmark => {
          store.addItem(newBookmark);
          render();
        });
        
      } catch(e) {
        store.errorMessage = e.message;
        render();
      }
    });
  };

  const handleMinimumRating = function() {
    $('.js-bookmark-filter').change(function() {
      store.minimumRating = parseInt($('select option:selected').val());
      render();
    });
  };

  const getIdfromElement = function(element) {
    return $(element).closest('.js-item-element').data('item-id');
  };

  const handleDelete = function() {
    $('.js-bookmark-list').on('click', '.js-item-delete', event =>{
      const id = getIdfromElement(event.currentTarget);
      store.findAndDelete(id);
      render();
    });
  };

  const handleDetailed = function() {
    $('.js-bookmark-list').on('click', '.js-item-title', event =>{
      const id = getIdfromElement(event.currentTarget);
      store.toggleDetailed(id);
      render();
    });
  };

  const bindEventListeners = function() {
    handleNewItemSubmit();
    handleMinimumRating();
    handleDelete();
    handleDetailed();
  };
  
  const generateItemElement = function(item) {
    let detailed = item.detailed ? 'shown' : 'hidden';
    return `<li class="js-item-element" data-item-id="${item.id}">
    <button class="bookmark-item-title js-item-title">${item.title}</button>
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

  const reset = function() {
    $('.js-bookmark-title').val('');
    $('.js-bookmark-url').val('');
    $('.js-bookmark-desc').val('');
    store.errorMessage = '';
  };

  const render = function() {
    let items = store.items.filter(item => item.rating >= store.minimumRating);
    console.log('render function ran');
    const bookmarkListItemsString = generateBookmarkItemsString(items);
    $('.js-bookmark-list').html(bookmarkListItemsString);
    $('#error-message').text(store.errorMessage);
    reset();
  };
  
  return {
    bindEventListeners,
    render,
  };

}());