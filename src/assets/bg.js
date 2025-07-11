(function () {
  "use strict";
  window.addEventListener("load", function () {
    var canvas = document.getElementById("canvas");

    if (!canvas || !canvas.getContext) {
      return false;
    }

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    console.log(
      "File Name / net.js\nCreated Date / July 11, 2020\nAuthor / Toshiya Marukubo\nTwitter / https://twitter.com/toshiyamarukubo"
    );
  });
});
