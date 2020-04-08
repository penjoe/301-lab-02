'use strict';

// global array of constructor objects
const imageArray = [];

// constructor function that creates image objects
function ImageGallery(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;

  imageArray.push(this);
}

//prototype of constructor function that renders each image to page, not currently working
// ImageGallery.prototype.appendImages = () => {
//   $('#photo-gallery').append(`
//     <h2>${this.title}</h2>
//     <img src=${this.image_url} alt=${this.keyword}></img>
//     <p>${this.description}</p>
//     <p>${this.horns}</p>
//   `);
// }

// function used to render images to page
const renderImages = (item) => {
  $('#photo-gallery').append(`
    <h2>${item.title}</h2>
    <img src=${item.image_url} alt=${item.keyword}></img>
    <p>${item.description}</p>
    <p>${item.horns}</p>
  `);
}

// Pulls data from page-1.json file and runs through constructor
$(function() {
  $.ajax("data/page-1.json").then( data => {
    data.forEach( (idx) => {
      new ImageGallery(idx.image_url, idx.title, idx.description, idx.keyword, idx.horns)
      }
    );
    data.forEach(renderImages)
  });
})

// function used to render images to page, not currently working
// function render() {
//   for (let i = 0; i < imageArray.length; i++) {
//     imageArray[i].appendImages();
//   };
// }

// render();
