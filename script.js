const input = document.querySelector("input");
const audio = document.querySelector("audio");
const canvas = document.querySelector("canvas");

const tool = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  audio.src = URL.createObjectURL(file);
  audio.play();

  // Audio Processing

  // 1. Create Audio Context
  // 2. Create Audio Source
  // 3. Create Audio Effects (in our case, we'll analyze)
  // 4. Create Audio Destination

  // Audio context processing graph or simple modular route
  const audioContext = new AudioContext();

  // Source Node
  const audioSource = audioContext.createMediaElementSource(audio);

  // Analyzer Node
  const analyser = audioContext.createAnalyser();

  audioSource.connect(analyser);

  // Destination Node
  analyser.connect(audioContext.destination); // Hardware speaker

  analyser.fftSize = 512; // determines the number of frequency bins, which essentially translates to the number of data points used for the frequency analysis.
  const bufferDataLength = analyser.frequencyBinCount; // retrieves the number of frequency bins that the analyser node will generate during the analysis. represents how many bars or data points we'll have for visualization.

  const bufferDataArr = new Uint8Array(bufferDataLength); //to store the frequency data obtained from the analyser node. The length of this array is set to bufferDataLength, which represents the number of frequency bins.

  const barWidth = canvas.width / bufferDataLength;
  let x = 0;

  function drawAndAnimateSoundBars() {
    x = 0;
    tool.clearRect(0, 0, canvas.width, canvas.height);

    analyser.getByteFrequencyData(bufferDataArr); //retrieves frequency data from the analyser node and stores it in the bufferDataArr

    bufferDataArr.forEach((dataValue) => {
      const barHeight = dataValue; // dataValue represents intensity of the audio signal

      const red = (barHeight * 2) % 150; // 0 to 149 - make more noticeable and to keep the resulting value within a certain
      const green = (barHeight * 5) % 200; // 0 to 199
      const blue = (barHeight * 7) % 120; // 0 to 119

      tool.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      tool.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth; // ensures that each successive sound bar is drawn at a position to the right of the previous one
    });

    if (!audio.ended) requestAnimationFrame(drawAndAnimateSoundBars);
  }

  drawAndAnimateSoundBars();
});
