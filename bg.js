const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imageNumber) {
  const image = new Image();
  image.src = `images/${imageNumber}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  const number = Math.ceil(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
