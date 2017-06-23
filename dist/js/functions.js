'use strict';

// Open links in new window.
var links = document.querySelectorAll('a');
links.forEach(function (link) {
  return link.target = '_blank';
});