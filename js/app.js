'use strict';

const imageArray = [];

function ImageGallery(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;

  imageArray.push(this);
}

ImageGallery.prototype.appendImages = () => {
  $('#photo-gallery').append(`
    <h2>${this.title}</h2>
    <img src=${this.image_url} alt=${this.keyword}></img>
    <p>${this.description}</p>
    <p>${this.horns}</p>
  `);
}

// new ImageGallery = 
$(function() {
  $.ajax("data/page-1.json").then( data => {
    data.forEach( (idx) => {
      new ImageGallery(idx.image_url, idx.title, idx.description, idx.keyword, idx.horns)
      }
    );
  });
})
