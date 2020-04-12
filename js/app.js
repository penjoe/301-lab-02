'use strict';

// global array of constructor objects
let imageArray = [];
// default ajax call path
let defaultValue = 'page-1';

// constructor function that creates image objects
function ImageGallery(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

// function that handles the mustache template
const renderImages = (item) => {
  const template = $('#template').html();
  const renderTemplate = Mustache.render(template, item);
  $('#photo-gallery').append(renderTemplate);
}

// adds drop down menu items

const handleDropdown = () => {
  let selectItems = [];
  imageArray.forEach((idx) => {
    if (!selectItems.includes(idx.keyword))
    selectItems.push(idx.keyword);
  });
  $('select').append(`<option value="default">Filter by Keyword</option>`);
  selectItems.forEach((value) => {
    let menuItems = `<option value="${value}">${value}</option>`;

    $('select').append(menuItems);
  });
};

// handles click event
const clickHandler = (event) => {
  event.preventDefault();
  $('[name="filters"]').prop('checked', false);
  $('.images').hide();
  let item = `.${event.target.value}`;
  $(item).show();
}

$('select').on('change', clickHandler);

// functions to refresh page and reload with new set of images

const pageOneGallery = (event) => {
  $('#photo-gallery').empty();
  $('select').html('');
  event.preventDefault();
  defaultValue = 'page-1';
  callAjax(defaultValue);
}

const pageTwoGallery = (event) => {
  $('#photo-gallery').empty();
  $('select').html('');
  event.preventDefault();
  defaultValue = 'page-2';
  callAjax(defaultValue);
}

// $('#page1').on('click', pageOneGallery);
$('#page1').on('click', pageOneGallery);
$('#page2').on('click', pageTwoGallery);

// function to sort images by title
const titleSort = (event) => {
  event.preventDefault();
  $('#photo-gallery').empty();
  imageArray.sort( (a,b) => {
    return (a.title.toLowerCase() > b.title.toLowerCase()) ? 1:-1;
  });
  imageArray.forEach( value => {
    renderImages(value);
  })
}

$('#sort-title').on('click', titleSort);

// function to sort images by # of horns
const sortHorns = (event) => {
  event.preventDefault();
  $('#photo-gallery').empty();
  imageArray.sort( (a,b) => {
    return (a.horns > b.horns) ? 1:-1;
  });
  imageArray.forEach( value => {
    renderImages(value);
  })
}

$('#sort-horns').on('click', sortHorns);

// Pulls data from .json file, dependant on variable, and runs through constructor
function callAjax(defaultValue) {
  $.ajax(`data/${defaultValue}.json`).then( data => {
    imageArray = [];
    data.forEach( (idx) => {
      let hornedCreature = new ImageGallery(idx.image_url, idx.title, idx.description, idx.keyword, idx.horns)
      imageArray.push(hornedCreature);
      }
    );

    imageArray.forEach( (element) => {
      renderImages(element);
    });
    handleDropdown(imageArray);
  });
}  

callAjax(defaultValue);