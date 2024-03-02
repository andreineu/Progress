import { ProgressRing } from "./progress.js";

const blue = "#005bff";
const grey = "#eff3f6";

const container = document.getElementById("progress");
const progressRing = new ProgressRing(container, {
  radius: 100,
  strokeWidth: 20,
  strokeColor: grey,
  fillColor: blue,
});

progressRing.setProgress(75);

const valueInput = document.getElementById("progress-value");
valueInput.value = progressRing.progress;

valueInput.addEventListener("change", (event) => {
  const value = parseInt(event.target.value);

  if (value >= 100) {
    progressRing.setProgress(100);
  } else if (value <= 0) {
    progressRing.setProgress(0);
  } else {
    progressRing.setProgress(value);
  }
  valueInput.value = progressRing.progress;
});

const animateSwitch = document.getElementById("progress-animate");
animateSwitch.addEventListener("change", (event) => {
  const value = event.target.checked;
  if (value) {
    progressRing.startAnimation();
  } else {
    progressRing.stopAnimation();
  }
});

const hideSwitch = document.getElementById("progress-hide");
hideSwitch.addEventListener("change", (event) => {
  const value = event.target.checked;
  if (value) {
    progressRing.hide();
  } else {
    progressRing.show();
  }
});
