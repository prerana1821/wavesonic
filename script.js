const input = document.querySelector("input");
const audio = document.querySelector("audio");
const canvas = document.querySelector("canvas");

const tool = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

input.addEventListener("change", (event) => {
  const file = input.files[0];

  if (!file) {
    return;
  }

  audio.src = URL.createObjectURL(file);
  audio.play();

  // Audio Processing

  // 1. Create Audio Context
  // 2. Create Audio Source
  // 3. Create Audio Effects (in our case, we'll analyze)
  // 4. Create Audio Destination
});
