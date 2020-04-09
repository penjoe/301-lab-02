'use strict';

// global array of constructor objects
const imageArray = [];
// default ajax call path
let defaultValue = 'page-1';

// constructor function that creates image objects
function ImageGallery(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;

  imageArray.push(this);
}

// function used to render images to page
const renderImages = (item) => {
  $('#photo-gallery').append(`
    <article class="images ${item.keyword}">
      <h2>${item.title}</h2>
      <img src=${item.image_url} alt=${item.keyword}>
      <p>${item.description}</p>
  `);
}

// adds drop down menu items
const handleDropdown = (newArr) => {
  newArr.forEach( (idx) => {
    $('select').append(`<option value="${idx.keyword}">${idx.keyword}</option>`)
  });
};

// handles click event
const clickHandler = (event) => {
  $('.images').hide();
  let item = `.${event.target.value}`;
  $(item).show();
}

$('select').on('change', clickHandler);

// const pageOneGallery = () => {
//   $('#photo-gallery').html('');
// }

// functions to refresh page and reload with new set of images

const oldGallery = (event) => {
  $('#photo-gallery').empty();
  $('select').html('');
  event.preventDefault();
  defaultValue = 'page-1';
  callAjax(defaultValue);
}

const newGallery = (event) => {
  $('#photo-gallery').empty();
  $('select').html('');
  event.preventDefault();
  defaultValue = 'page-2';
  callAjax(defaultValue);
}

// $('#page1').on('click', pageOneGallery);
$('#page1').on('click', oldGallery);
$('#page2').on('click', newGallery);

// Pulls data from .json file, dependant on variable, and runs through constructor
function callAjax(defaultValue) {
  $.ajax(`data/${defaultValue}.json`).then( data => {
    let newImageArray = [];
    data.forEach( (idx) => {
      let hornedCreature = new ImageGallery(idx.image_url, idx.title, idx.description, idx.keyword, idx.horns)
      newImageArray.push(hornedCreature);
      }
    );

    newImageArray.forEach( (element) => {
      renderImages(element);
    });
    handleDropdown(newImageArray);
  });
}  

callAjax(defaultValue);









//prototype of constructor function that renders each image to page, not currently working
// ImageGallery.prototype.appendImages = () => {
//   $('#photo-gallery').append(`
//     <h2>${this.title}</h2>
//     <img src=${this.image_url} alt=${this.keyword}></img>
//     <p>${this.description}</p>
//     <p>${this.horns}</p>
//   `);
// }

// function used to render images to page, not currently working
// function render() {
//   for (let i = 0; i < imageArray.length; i++) {
//     imageArray[i].appendImages();
//   };
// }

// render();
