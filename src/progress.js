export class ProgressRing {
  constructor(container, { radius, strokeWidth, strokeColor, fillColor }) {
    this.container = container;
    this.radius = radius;
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;

    this.createSVG();
    this.createCircle();
    this.createProgressPath();

    this.currentAngle = 0;
    this.animationId = null;
  }

  createSVG() {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", this.radius * 2);
    this.svg.setAttribute("height", this.radius * 2);
    this.container.appendChild(this.svg);
  }

  createCircle() {
    this.circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    this.circle.setAttribute("cx", this.radius);
    this.circle.setAttribute("cy", this.radius);
    this.circle.setAttribute("r", this.radius - this.strokeWidth / 2);
    this.circle.setAttribute("stroke-width", this.strokeWidth);
    this.circle.setAttribute("stroke", this.strokeColor);
    this.circle.setAttribute("fill", "none");
    this.svg.appendChild(this.circle);
  }

  createProgressPath() {
    this.progressPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    this.progressPath.setAttribute("fill", "none");
    this.progressPath.setAttribute("stroke-width", this.strokeWidth);
    this.progressPath.setAttribute("stroke", this.fillColor);
    this.svg.appendChild(this.progressPath);
  }

  setProgress(percentage) {
    this.progress = percentage;

    const angle = (percentage / 100) * 360;

    if (angle === 360) {
      this.circle.setAttribute("stroke", this.fillColor);
    } else {
      this.circle.setAttribute("stroke", this.strokeColor);
    }

    const x1 =
      this.radius +
      (this.radius - this.strokeWidth / 2) * Math.cos(-Math.PI / 2);
    const y1 =
      this.radius +
      (this.radius - this.strokeWidth / 2) * Math.sin(-Math.PI / 2);

    const x2 =
      this.radius +
      (this.radius - this.strokeWidth / 2) *
        Math.cos(((angle - 90) * Math.PI) / 180);
    const y2 =
      this.radius +
      (this.radius - this.strokeWidth / 2) *
        Math.sin(((angle - 90) * Math.PI) / 180);

    const largeArcFlag = angle <= 180 ? "0" : "1";
    const pathData = `M ${x1},${y1} A ${this.radius - this.strokeWidth / 2},${
      this.radius - this.strokeWidth / 2
    } 0 ${largeArcFlag},1 ${x2},${y2}`;
    this.progressPath.setAttribute("d", pathData);
  }

  startAnimation() {
    let angle = 0;

    const animateFrame = () => {
      angle = (angle + 1) % 720;
      this.svg.style.transform = `rotate(${angle / 2}deg)`;
      this.animationId = requestAnimationFrame(animateFrame);
    };

    animateFrame();
  }

  stopAnimation() {
    cancelAnimationFrame(this.animationId);
    this.svg.style.transform = null;
    this.animationId = null;
  }

  hide() {
    this.svg.style.display = "none";
  }

  show() {
    this.svg.style.display = "block";
  }
}
